import { checkEligibility, claimAmount, type IneligibleReason } from "./rules";
import type { FundEvent, FundSnapshot, Payout, Policy } from "./types";

export type PolicyOutcome =
  | { kind: "paid"; payout: Payout }
  | { kind: "payable"; amount: bigint }
  | { kind: "blocked"; reason: IneligibleReason };

export type EventSummary = {
  event: FundEvent;
  outcomes: Array<{ policy: Policy; outcome: PolicyOutcome }>;
  payableCount: number;
  paidTotal: bigint;
};

/**
 * What an event means for every policy that could be touched by it: already paid,
 * still payable, or blocked and why. Policies in other zones are left out.
 */
export function summarizeEvent(snapshot: FundSnapshot, event: FundEvent): EventSummary {
  const outcomes = snapshot.policies
    .filter((policy) => event.zoneIds.includes(policy.zoneId))
    .map((policy) => {
      const payout = snapshot.payouts.find((item) => item.eventRef === event.ref && item.policyId === policy.id);
      if (payout) return { policy, outcome: { kind: "paid", payout } as PolicyOutcome };

      const eligibility = checkEligibility(policy, event, false);
      if (eligibility.eligible) {
        const amount = claimAmount(policy.coverage, event.payoutBps, event.factorBps);
        return { policy, outcome: { kind: "payable", amount } as PolicyOutcome };
      }
      return { policy, outcome: { kind: "blocked", reason: eligibility.reason } as PolicyOutcome };
    });

  return {
    event,
    outcomes,
    payableCount: outcomes.filter(({ outcome }) => outcome.kind === "payable").length,
    paidTotal: snapshot.payouts
      .filter((payout) => payout.eventRef === event.ref)
      .reduce((total, payout) => total + payout.amount, 0n),
  };
}
