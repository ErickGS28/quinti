import { BASIS_POINTS } from "@/config/constants";
import type { FundEvent, Hazard, PayoutRule, Policy } from "./types";

/**
 * Pure fund rules. They follow `docs/03-contract-design.md` exactly so that what the
 * prototype shows is what the contract will enforce. Fund rules live in the contract;
 * the UI only presents these results.
 */

export type PolicyStatus = "waiting" | "active" | "expired";

export type IneligibleReason =
  | "not-confirmed"
  | "already-paid"
  | "outside-zone"
  | "below-threshold"
  | "waiting-period"
  | "expired";

export type Eligibility = { eligible: true } | { eligible: false; reason: IneligibleReason };

const BASIS = BigInt(BASIS_POINTS);

/** Premium for one period: coverage * premiumBps / 10_000. */
export function premiumFor(coverage: bigint, premiumBps: number): bigint {
  return (coverage * BigInt(premiumBps)) / BASIS;
}

/** Payout share of the highest rule that the measured value reaches. 0 when no rule applies. */
export function payoutBpsFor(hazard: Hazard, value: number, rules: PayoutRule[]): number {
  return rules
    .filter((rule) => rule.hazard === hazard && value >= rule.minValue)
    .reduce((best, rule) => Math.max(best, rule.payoutBps), 0);
}

/** Sum of coverage over every policy in a zone. Deliberately conservative: includes waiting and expired ones. */
export function zoneExposure(policies: Policy[], zoneId: number): bigint {
  return policies
    .filter((policy) => policy.zoneId === zoneId)
    .reduce((total, policy) => total + policy.coverage, 0n);
}

/** Estimated amount owed if payoutBps applied to every policy of the affected zones. */
export function estimateLiability(policies: Policy[], zoneIds: number[], payoutBps: number): bigint {
  return zoneIds.reduce(
    (total, zoneId) => total + (zoneExposure(policies, zoneId) * BigInt(payoutBps)) / BASIS,
    0n,
  );
}

/** Pro-rata factor: 10_000 when the pool covers the liability, lower when it does not. */
export function computeFactorBps(poolAvailable: bigint, liability: bigint): number {
  if (liability <= 0n) return BASIS_POINTS;
  const factor = (poolAvailable * BASIS) / liability;
  return Number(factor > BASIS ? BASIS : factor);
}

/** Amount paid to one policy: coverage * payoutBps / 10_000 * factorBps / 10_000. */
export function claimAmount(coverage: bigint, payoutBps: number, factorBps: number): bigint {
  return (((coverage * BigInt(payoutBps)) / BASIS) * BigInt(factorBps)) / BASIS;
}

/** Where a policy stands at a given moment. */
export function policyStatus(policy: Policy, now: number): PolicyStatus {
  if (now < policy.activeFrom) return "waiting";
  if (now > policy.coveredUntil) return "expired";
  return "active";
}

/** Whether a policy can be paid for an event, and if not, the first reason why. */
export function checkEligibility(policy: Policy, event: FundEvent, alreadyPaid: boolean): Eligibility {
  if (!event.confirmed) return { eligible: false, reason: "not-confirmed" };
  if (alreadyPaid) return { eligible: false, reason: "already-paid" };
  if (!event.zoneIds.includes(policy.zoneId)) return { eligible: false, reason: "outside-zone" };
  if (event.payoutBps === 0) return { eligible: false, reason: "below-threshold" };
  if (event.occurredAt < policy.activeFrom) return { eligible: false, reason: "waiting-period" };
  if (event.occurredAt > policy.coveredUntil) return { eligible: false, reason: "expired" };
  return { eligible: true };
}
