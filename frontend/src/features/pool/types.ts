import type { Zone } from "@/lib/fund/types";

export type ZoneActivity = "none" | "pending" | "confirmed";

export type ZoneOverview = {
  zone: Zone;
  policyCount: number;
  exposure: bigint;
  activity: ZoneActivity;
};

export type FundOverview = {
  poolAvailable: bigint;
  /** Money already promised to confirmed events and not yet paid out. Not part of `poolAvailable`. */
  reserved: bigint;
  policyCount: number;
  totalCoverage: bigint;
  zones: ZoneOverview[];
  /** Share of each payout the pool could afford if the worst plausible event hit its most exposed zone. */
  worstCaseFactorBps: number;
};
