import { nowSeconds } from "@/lib/clock/now";
import { isAddressFormatValid } from "@/lib/format/address";
import { FundError } from "../errors";
import type { FundClient } from "../fund-client";
import {
  checkEligibility,
  claimAmount,
  computeFactorBps,
  estimateLiability,
  payoutBpsFor,
  poolFree,
  premiumFor,
  reserveFor,
} from "../rules";
import { createSeedSnapshot } from "../seed";
import type { EnrollInput, EventReport, FundEvent, FundSnapshot, Payout, Policy } from "../types";
import { clearSnapshot, loadSnapshot, saveSnapshot, type KeyValueStorage } from "./snapshot-storage";

const READ_LATENCY_MS = 250;
const WRITE_LATENCY_MS = 900;

type MockOptions = {
  storage: KeyValueStorage;
  /** Simulated network delay. Tests pass false to run instantly. */
  simulateLatency?: boolean;
  now?: () => number;
};

function sameReport(event: FundEvent, report: EventReport): boolean {
  return (
    event.hazard === report.hazard &&
    event.value === report.value &&
    event.occurredAt === report.occurredAt &&
    event.zoneIds.length === report.zoneIds.length &&
    event.zoneIds.every((zoneId) => report.zoneIds.includes(zoneId))
  );
}

/** In-memory fund that follows the contract rules, persisted to storage so reloads keep the demo state. */
export function createMockFundClient({ storage, simulateLatency = true, now = nowSeconds }: MockOptions): FundClient {
  let state: FundSnapshot | null = null;

  const pause = (ms: number) =>
    simulateLatency ? new Promise<void>((resolve) => setTimeout(resolve, ms)) : Promise.resolve();

  function current(): FundSnapshot {
    if (state === null) {
      state = loadSnapshot(storage) ?? createSeedSnapshot(now());
    }
    return state;
  }

  function commit(next: FundSnapshot): void {
    state = next;
    saveSnapshot(storage, next);
  }

  return {
    async getSnapshot() {
      await pause(READ_LATENCY_MS);
      return current();
    },

    async enroll(input: EnrollInput) {
      await pause(WRITE_LATENCY_MS);
      const snapshot = current();
      const { config } = snapshot;

      if (!input.sponsor) throw new FundError("wallet-not-connected");
      const zoneExists = config.zones.some((zone) => zone.id === input.zoneId);
      if (!input.beneficiaryName.trim() || !zoneExists || !isAddressFormatValid(input.payoutTo)) {
        throw new FundError("invalid-params");
      }
      if (input.coverage < config.minCoverage || input.coverage > config.maxCoverage) {
        throw new FundError("coverage-out-of-range");
      }

      const createdAt = now();
      const policy: Policy = {
        id: snapshot.nextPolicyId,
        zoneId: input.zoneId,
        beneficiaryName: input.beneficiaryName.trim(),
        coverage: input.coverage,
        sponsor: input.sponsor,
        payoutTo: input.payoutTo,
        activeFrom: createdAt + config.waitingSeconds,
        coveredUntil: createdAt + config.periodSeconds,
        createdAt,
      };

      commit({
        ...snapshot,
        policies: [...snapshot.policies, policy],
        poolAvailable: snapshot.poolAvailable + premiumFor(input.coverage, config.premiumBps),
        nextPolicyId: snapshot.nextPolicyId + 1,
      });
      return policy;
    },

    async contribute(donor, amount) {
      await pause(WRITE_LATENCY_MS);
      const snapshot = current();
      if (!donor) throw new FundError("wallet-not-connected");
      if (amount <= 0n) throw new FundError("invalid-amount");

      commit({
        ...snapshot,
        poolAvailable: snapshot.poolAvailable + amount,
        contributions: [...snapshot.contributions, { donor, amount, at: now() }],
      });
    },

    async reportEvent({ attesterId, report }) {
      await pause(WRITE_LATENCY_MS);
      const snapshot = current();
      const { config } = snapshot;

      if (!config.attesters.some((attester) => attester.id === attesterId)) {
        throw new FundError("not-attester");
      }

      const existing = snapshot.events.find((event) => event.ref === report.ref);
      if (existing && !sameReport(existing, report)) throw new FundError("event-mismatch");
      if (existing?.confirmed) throw new FundError("event-already-confirmed");
      if (existing?.approvals.includes(attesterId)) throw new FundError("already-approved");

      const approvals = [...(existing?.approvals ?? []), attesterId];
      const confirmed = approvals.length >= config.quorum;
      const payoutBps = confirmed ? payoutBpsFor(report.hazard, report.value, config.rules) : 0;
      const liability = confirmed ? estimateLiability(snapshot.policies, report.zoneIds, payoutBps) : 0n;
      const factorBps = confirmed ? computeFactorBps(poolFree(snapshot.poolAvailable, snapshot.events), liability) : 0;
      const reserved = reserveFor(liability, factorBps);

      const event: FundEvent = {
        ref: report.ref,
        hazard: report.hazard,
        value: report.value,
        occurredAt: report.occurredAt,
        zoneIds: report.zoneIds,
        approvals,
        confirmed,
        payoutBps,
        factorBps,
        reserved,
      };

      commit({
        ...snapshot,
        events: existing
          ? snapshot.events.map((item) => (item.ref === event.ref ? event : item))
          : [...snapshot.events, event],
      });
      return event;
    },

    async payOut(eventRef) {
      await pause(WRITE_LATENCY_MS);
      const snapshot = current();
      const event = snapshot.events.find((item) => item.ref === eventRef);
      if (!event) throw new FundError("event-not-found");
      if (!event.confirmed) throw new FundError("event-not-confirmed");

      const paidAt = now();
      let poolAvailable = snapshot.poolAvailable;
      let remaining = event.reserved;
      const newPayouts: Payout[] = [];

      for (const policy of snapshot.policies) {
        const alreadyPaid = snapshot.payouts.some(
          (payout) => payout.eventRef === eventRef && payout.policyId === policy.id,
        );
        if (!checkEligibility(policy, event, alreadyPaid).eligible) continue;

        // A payout can only draw from what this event reserved, never from another event's reserve.
        const wanted = claimAmount(policy.coverage, event.payoutBps, event.factorBps);
        const amount = wanted > remaining ? remaining : wanted;
        if (amount <= 0n) continue;

        poolAvailable -= amount;
        remaining -= amount;
        newPayouts.push({ eventRef, policyId: policy.id, amount, paidAt });
      }

      // Every eligible policy was handled above, so whatever is left of the reserve is released to the pool.
      commit({
        ...snapshot,
        poolAvailable,
        events: snapshot.events.map((item) => (item.ref === eventRef ? { ...item, reserved: 0n } : item)),
        payouts: [...snapshot.payouts, ...newPayouts],
      });
      return newPayouts;
    },

    async reset() {
      await pause(READ_LATENCY_MS);
      clearSnapshot(storage);
      state = createSeedSnapshot(now());
      saveSnapshot(storage, state);
    },
  };
}
