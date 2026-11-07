import { BASIS_POINTS } from "@/config/constants";
import { computeFactorBps, estimateLiability, poolFree, reservedTotal } from "@/lib/fund/rules";
import type { FundSnapshot } from "@/lib/fund/types";
import type { FundOverview, ZoneActivity } from "../types";

function activityOf(snapshot: FundSnapshot, zoneId: number): ZoneActivity {
  const events = snapshot.events.filter((event) => event.zoneIds.includes(zoneId));
  if (events.some((event) => event.confirmed)) return "confirmed";
  if (events.length > 0) return "pending";
  return "none";
}

/** Reduces the snapshot to the figures the fund screen shows. */
export function buildOverview(snapshot: FundSnapshot): FundOverview {
  const { config, policies } = snapshot;
  const poolAvailable = poolFree(snapshot.poolAvailable, snapshot.events);
  const reserved = reservedTotal(snapshot.events);
  const maxPayoutBps = config.rules.reduce((best, rule) => Math.max(best, rule.payoutBps), 0);

  const zones = config.zones.map((zone) => {
    const inZone = policies.filter((policy) => policy.zoneId === zone.id);
    return {
      zone,
      policyCount: inZone.length,
      exposure: inZone.reduce((total, policy) => total + policy.coverage, 0n),
      activity: activityOf(snapshot, zone.id),
    };
  });

  const worstLiability = config.zones.reduce((worst, zone) => {
    const liability = estimateLiability(policies, [zone.id], maxPayoutBps);
    return liability > worst ? liability : worst;
  }, 0n);

  return {
    poolAvailable,
    reserved,
    policyCount: policies.length,
    totalCoverage: policies.reduce((total, policy) => total + policy.coverage, 0n),
    zones,
    worstCaseFactorBps: maxPayoutBps === 0 ? BASIS_POINTS : computeFactorBps(poolAvailable, worstLiability),
  };
}
