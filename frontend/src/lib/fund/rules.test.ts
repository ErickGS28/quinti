import { describe, expect, it } from "vitest";
import { toBaseUnits } from "@/lib/format/amount";
import {
  checkEligibility,
  claimAmount,
  computeFactorBps,
  estimateLiability,
  payoutBpsFor,
  policyStatus,
  premiumFor,
} from "./rules";
import { FUND_CONFIG } from "./seed";
import type { FundEvent, Policy } from "./types";

const NOW = 1_000_000;

function makePolicy(overrides: Partial<Policy> = {}): Policy {
  return {
    id: 1,
    zoneId: 1,
    beneficiaryName: "Luz",
    coverage: toBaseUnits(200),
    sponsor: "sponsor",
    payoutTo: "payout",
    activeFrom: NOW - 100,
    coveredUntil: NOW + 100_000,
    createdAt: NOW - 200,
    ...overrides,
  };
}

function makeEvent(overrides: Partial<FundEvent> = {}): FundEvent {
  return {
    ref: "event-1",
    hazard: "earthquake",
    value: 68,
    occurredAt: NOW,
    zoneIds: [1],
    approvals: ["a", "b"],
    confirmed: true,
    payoutBps: 10_000,
    factorBps: 10_000,
    ...overrides,
  };
}

describe("premiumFor and payoutBpsFor", () => {
  it("charges premiumBps of the coverage", () => {
    expect(premiumFor(toBaseUnits(200), 100)).toBe(toBaseUnits(2));
  });

  it("picks the highest rule the value reaches, or 0 below every threshold", () => {
    const { rules } = FUND_CONFIG;
    expect(payoutBpsFor("earthquake", 46, rules)).toBe(0);
    expect(payoutBpsFor("earthquake", 54, rules)).toBe(2_000);
    expect(payoutBpsFor("earthquake", 68, rules)).toBe(10_000);
    expect(payoutBpsFor("extreme-rainfall", 500, rules)).toBe(0);
  });
});

describe("pro-rata factor and claim amount", () => {
  it("is 100% when the pool covers the liability", () => {
    const policies = [makePolicy(), makePolicy({ id: 2, coverage: toBaseUnits(100) })];
    const liability = estimateLiability(policies, [1], 10_000);
    expect(liability).toBe(toBaseUnits(300));
    expect(computeFactorBps(toBaseUnits(500), liability)).toBe(10_000);
  });

  it("shrinks proportionally when the pool is short", () => {
    expect(computeFactorBps(toBaseUnits(150), toBaseUnits(300))).toBe(5_000);
  });

  it("pays coverage x payout share x funding share", () => {
    expect(claimAmount(toBaseUnits(200), 10_000, 5_000)).toBe(toBaseUnits(100));
    expect(claimAmount(toBaseUnits(200), 2_000, 10_000)).toBe(toBaseUnits(40));
  });

  it("never owes anything when nothing is exposed", () => {
    expect(computeFactorBps(toBaseUnits(10), 0n)).toBe(10_000);
  });
});

describe("policyStatus", () => {
  it("moves from waiting to active to expired", () => {
    const policy = makePolicy({ activeFrom: NOW + 60, coveredUntil: NOW + 600 });
    expect(policyStatus(policy, NOW)).toBe("waiting");
    expect(policyStatus(policy, NOW + 60)).toBe("active");
    expect(policyStatus(policy, NOW + 601)).toBe("expired");
  });
});

describe("checkEligibility", () => {
  it("accepts an active policy in an affected zone", () => {
    expect(checkEligibility(makePolicy(), makeEvent(), false)).toEqual({ eligible: true });
  });

  it.each([
    ["unconfirmed event", makePolicy(), makeEvent({ confirmed: false }), false, "not-confirmed"],
    ["already paid", makePolicy(), makeEvent(), true, "already-paid"],
    ["other zone", makePolicy({ zoneId: 2 }), makeEvent(), false, "outside-zone"],
    ["below threshold", makePolicy(), makeEvent({ payoutBps: 0 }), false, "below-threshold"],
    ["waiting period", makePolicy({ activeFrom: NOW + 60 }), makeEvent(), false, "waiting-period"],
    ["expired cover", makePolicy({ coveredUntil: NOW - 1 }), makeEvent(), false, "expired"],
  ] as const)("rejects %s", (_label, policy, event, alreadyPaid, reason) => {
    expect(checkEligibility(policy, event, alreadyPaid)).toEqual({ eligible: false, reason });
  });
});
