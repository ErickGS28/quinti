import { beforeEach, describe, expect, it } from "vitest";
import { DEMO_RELATIVE, DEMO_SPONSOR } from "@/lib/demo/demo-people";
import { toBaseUnits } from "@/lib/format/amount";
import { reportFromScenario, SCENARIOS } from "../catalog";
import { FundError } from "../errors";
import type { FundClient } from "../fund-client";
import { summarizeEvent } from "../event-summary";
import type { FundSnapshot } from "../types";
import { createMockFundClient } from "./mock-fund-client";
import { SNAPSHOT_STORAGE_KEY, type KeyValueStorage } from "./snapshot-storage";

const START = 2_000_000;

function memoryStorage(): KeyValueStorage {
  const data = new Map<string, string>();
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => void data.set(key, value),
    removeItem: (key) => void data.delete(key),
  };
}

function totalMoney(snapshot: FundSnapshot): bigint {
  return snapshot.poolAvailable + snapshot.payouts.reduce((sum, payout) => sum + payout.amount, 0n);
}

describe("mock fund client", () => {
  let clock: number;
  let client: FundClient;
  const storage = memoryStorage();

  beforeEach(() => {
    clock = START;
    storage.removeItem(SNAPSHOT_STORAGE_KEY);
    client = createMockFundClient({ storage, simulateLatency: false, now: () => clock });
  });

  const choco = SCENARIOS[0];

  async function confirmEvent(sequence = 1) {
    const report = reportFromScenario(choco, clock, sequence);
    await client.reportEvent({ attesterId: "attester-1", report });
    return client.reportEvent({ attesterId: "attester-2", report });
  }

  it("enrolls a policy, charges the premium and starts it in a waiting period", async () => {
    const before = await client.getSnapshot();
    const policy = await client.enroll({
      sponsor: DEMO_SPONSOR.address,
      beneficiaryName: " Ana ",
      zoneId: 2,
      coverage: toBaseUnits(100),
      payoutTo: DEMO_RELATIVE.address,
    });
    const after = await client.getSnapshot();

    expect(policy.beneficiaryName).toBe("Ana");
    expect(policy.activeFrom).toBe(START + before.config.waitingSeconds);
    expect(after.poolAvailable - before.poolAvailable).toBe(toBaseUnits(1));
    expect(after.policies).toHaveLength(before.policies.length + 1);
  });

  it("rejects invalid enrollments with typed errors", async () => {
    const valid = {
      sponsor: DEMO_SPONSOR.address,
      beneficiaryName: "Ana",
      zoneId: 1,
      coverage: toBaseUnits(100),
      payoutTo: DEMO_RELATIVE.address,
    };
    await expect(client.enroll({ ...valid, sponsor: "" })).rejects.toMatchObject({ code: "wallet-not-connected" });
    await expect(client.enroll({ ...valid, payoutTo: "not-an-address" })).rejects.toMatchObject({ code: "invalid-params" });
    await expect(client.enroll({ ...valid, zoneId: 99 })).rejects.toMatchObject({ code: "invalid-params" });
    await expect(client.enroll({ ...valid, coverage: toBaseUnits(500) })).rejects.toMatchObject({
      code: "coverage-out-of-range",
    });
  });

  it("confirms an event only when the quorum reports the exact same data", async () => {
    const report = reportFromScenario(choco, clock, 1);
    const first = await client.reportEvent({ attesterId: "attester-1", report });
    expect(first.confirmed).toBe(false);

    await expect(client.reportEvent({ attesterId: "attester-1", report })).rejects.toMatchObject({ code: "already-approved" });
    await expect(client.reportEvent({ attesterId: "attester-2", report: { ...report, value: 20 } })).rejects.toMatchObject({
      code: "event-mismatch",
    });
    await expect(client.reportEvent({ attesterId: "stranger", report })).rejects.toBeInstanceOf(FundError);

    const confirmed = await client.reportEvent({ attesterId: "attester-2", report });
    expect(confirmed).toMatchObject({ confirmed: true, payoutBps: 10_000, factorBps: 10_000 });
    await expect(client.reportEvent({ attesterId: "attester-3", report })).rejects.toMatchObject({
      code: "event-already-confirmed",
    });
  });

  it("pays eligible policies to their fixed address and conserves the money", async () => {
    const before = await client.getSnapshot();
    const event = await confirmEvent();

    const payouts = await client.payOut(event.ref);
    const after = await client.getSnapshot();

    const luz = payouts.find((payout) => payout.policyId === 1);
    expect(luz?.amount).toBe(toBaseUnits(200));
    expect(payouts).toHaveLength(4);
    expect(totalMoney(after)).toBe(totalMoney(before));
    expect(after.poolAvailable).toBe(before.poolAvailable - payouts.reduce((sum, p) => sum + p.amount, 0n));
  });

  it("never pays the same policy twice for one event", async () => {
    const event = await confirmEvent();
    await client.payOut(event.ref);
    expect(await client.payOut(event.ref)).toEqual([]);
  });

  it("does not pay a policy still in its waiting period", async () => {
    const newcomer = await client.enroll({
      sponsor: DEMO_SPONSOR.address,
      beneficiaryName: "Nuevo",
      zoneId: 1,
      coverage: toBaseUnits(100),
      payoutTo: DEMO_RELATIVE.address,
    });
    const event = await confirmEvent();
    const payouts = await client.payOut(event.ref);

    expect(payouts.some((payout) => payout.policyId === newcomer.id)).toBe(false);
    const summary = summarizeEvent(await client.getSnapshot(), event);
    expect(summary.outcomes.find(({ policy }) => policy.id === newcomer.id)?.outcome).toEqual({
      kind: "blocked",
      reason: "waiting-period",
    });
  });

  it("refuses to pay an unconfirmed or unknown event", async () => {
    const report = reportFromScenario(choco, clock, 1);
    await client.reportEvent({ attesterId: "attester-1", report });
    await expect(client.payOut(report.ref)).rejects.toMatchObject({ code: "event-not-confirmed" });
    await expect(client.payOut("missing")).rejects.toMatchObject({ code: "event-not-found" });
  });

  it("pays nothing when the event is below every threshold", async () => {
    const light = SCENARIOS[2];
    const report = reportFromScenario(light, clock, 1);
    await client.reportEvent({ attesterId: "attester-1", report });
    const event = await client.reportEvent({ attesterId: "attester-2", report });

    expect(event).toMatchObject({ confirmed: true, payoutBps: 0 });
    expect(await client.payOut(event.ref)).toEqual([]);
  });

  it("scales payouts down when the pool cannot cover them", async () => {
    for (let index = 0; index < 20; index += 1) {
      await client.enroll({
        sponsor: DEMO_SPONSOR.address,
        beneficiaryName: `Extra ${index}`,
        zoneId: 3,
        coverage: toBaseUnits(200),
        payoutTo: DEMO_RELATIVE.address,
      });
    }
    clock += 120;
    const poolBefore = (await client.getSnapshot()).poolAvailable;

    const strong = { ...reportFromScenario(SCENARIOS[1], clock, 1), value: 70 };
    await client.reportEvent({ attesterId: "attester-1", report: strong });
    const confirmed = await client.reportEvent({ attesterId: "attester-2", report: strong });
    expect(confirmed.factorBps).toBeGreaterThan(0);
    expect(confirmed.factorBps).toBeLessThan(10_000);

    const payouts = await client.payOut(confirmed.ref);
    const total = payouts.reduce((sum, payout) => sum + payout.amount, 0n);
    const after = await client.getSnapshot();

    expect(total).toBeGreaterThan(0n);
    expect(total).toBeLessThanOrEqual(poolBefore);
    expect(after.poolAvailable).toBe(poolBefore - total);
  });

  it("does not promise the same money to two events confirmed before either is paid", async () => {
    for (let index = 0; index < 20; index += 1) {
      await client.enroll({
        sponsor: DEMO_SPONSOR.address,
        beneficiaryName: `Extra ${index}`,
        zoneId: 3,
        coverage: toBaseUnits(200),
        payoutTo: DEMO_RELATIVE.address,
      });
    }
    clock += 120;
    const poolBefore = (await client.getSnapshot()).poolAvailable;

    const first = await confirmEvent(1);
    const secondReport = { ...reportFromScenario(SCENARIOS[1], clock, 2), value: 70 };
    await client.reportEvent({ attesterId: "attester-1", report: secondReport });
    const second = await client.reportEvent({ attesterId: "attester-2", report: secondReport });

    const afterConfirm = await client.getSnapshot();
    const reserved = afterConfirm.events.reduce((sum, event) => sum + event.reserved, 0n);
    expect(first.factorBps).toBe(10_000);
    expect(second.factorBps).toBeLessThan(10_000);
    expect(reserved).toBeLessThanOrEqual(poolBefore);

    const paidFirst = await client.payOut(first.ref);
    const paidSecond = await client.payOut(second.ref);
    const total = [...paidFirst, ...paidSecond].reduce((sum, payout) => sum + payout.amount, 0n);
    const final = await client.getSnapshot();

    expect(total).toBeLessThanOrEqual(poolBefore);
    expect(final.poolAvailable).toBe(poolBefore - total);
    expect(final.events.every((event) => event.reserved === 0n)).toBe(true);
  });

  it("keeps the demo state across clients that share the same storage", async () => {
    await client.contribute(DEMO_SPONSOR.address, toBaseUnits(10));
    const reloaded = createMockFundClient({ storage, simulateLatency: false, now: () => clock });
    expect((await reloaded.getSnapshot()).contributions).toHaveLength(3);
  });

  it("restores the initial state on reset", async () => {
    await client.contribute(DEMO_SPONSOR.address, toBaseUnits(10));
    await client.reset();
    expect((await client.getSnapshot()).contributions).toHaveLength(2);
  });
});
