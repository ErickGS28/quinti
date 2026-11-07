import { SECONDS_PER_DAY } from "@/config/constants";
import { demoAddress } from "@/lib/demo/demo-address";
import { DEMO_RELATIVE, DEMO_SPONSOR } from "@/lib/demo/demo-people";
import { toBaseUnits } from "@/lib/format/amount";
import { ZONES } from "./catalog";
import { DEMO_ATTESTERS } from "./demo-attesters";
import { premiumFor } from "./rules";
import type { Contribution, FundConfig, FundSnapshot, Policy } from "./types";

/** Waiting period is one minute in the demo so the full cycle fits in a pitch. */
const DEMO_WAITING_SECONDS = 60;
const PERIOD_SECONDS = 30 * SECONDS_PER_DAY;
const PREMIUM_BPS = 100;

export const FUND_CONFIG: FundConfig = {
  attesters: DEMO_ATTESTERS,
  quorum: 2,
  waitingSeconds: DEMO_WAITING_SECONDS,
  periodSeconds: PERIOD_SECONDS,
  minCoverage: toBaseUnits(25),
  maxCoverage: toBaseUnits(200),
  premiumBps: PREMIUM_BPS,
  rules: [
    { hazard: "earthquake", minValue: 50, payoutBps: 2_000 },
    { hazard: "earthquake", minValue: 65, payoutBps: 10_000 },
  ],
  zones: ZONES,
};

/** Existing members of the fund, as [zoneId, coverage in whole USDC]. Luz is added separately. */
const OTHER_MEMBERS: Array<[number, number]> = [
  [1, 100], [1, 100], [1, 50],
  [2, 100], [2, 100], [2, 50], [2, 50], [2, 25], [2, 25],
  [3, 200], [3, 100], [3, 100], [3, 50], [3, 50],
];

const LUZ_POLICY_ID = 1;

/** Builds the initial state of the demo. Policies are already active, with the pool consistent with premiums and contributions. */
export function createSeedSnapshot(now: number): FundSnapshot {
  const activeFrom = now - SECONDS_PER_DAY;
  const coveredUntil = now + PERIOD_SECONDS - SECONDS_PER_DAY;

  const luz: Policy = {
    id: LUZ_POLICY_ID,
    zoneId: 1,
    beneficiaryName: "Luz",
    coverage: toBaseUnits(200),
    sponsor: DEMO_SPONSOR.address,
    payoutTo: DEMO_RELATIVE.address,
    activeFrom,
    coveredUntil,
    createdAt: activeFrom - FUND_CONFIG.waitingSeconds,
  };

  const others: Policy[] = OTHER_MEMBERS.map(([zoneId, coverage], index) => ({
    id: LUZ_POLICY_ID + 1 + index,
    zoneId,
    beneficiaryName: `Familia ${index + 1}`,
    coverage: toBaseUnits(coverage),
    sponsor: demoAddress(`quintti-seed-sponsor-${index}`),
    payoutTo: demoAddress(`quintti-seed-payout-${index}`),
    activeFrom,
    coveredUntil,
    createdAt: activeFrom - FUND_CONFIG.waitingSeconds,
  }));

  const policies = [luz, ...others];

  const contributions: Contribution[] = [
    { donor: demoAddress("quintti-seed-donor-1"), amount: toBaseUnits(400), at: now - 3 * SECONDS_PER_DAY },
    { donor: demoAddress("quintti-seed-donor-2"), amount: toBaseUnits(250), at: now - 2 * SECONDS_PER_DAY },
  ];

  const premiums = policies.reduce((total, policy) => total + premiumFor(policy.coverage, PREMIUM_BPS), 0n);
  const donated = contributions.reduce((total, item) => total + item.amount, 0n);

  return {
    config: FUND_CONFIG,
    poolAvailable: premiums + donated,
    policies,
    events: [],
    payouts: [],
    contributions,
    nextPolicyId: policies.length + 1,
  };
}
