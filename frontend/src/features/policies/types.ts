import type { Payout, Policy } from "@/lib/fund/types";

/** A policy plus what the screen needs to know about it. */
export type PolicyView = {
  policy: Policy;
  zoneName: string;
  zoneRegion: string;
  premium: bigint;
  payouts: Payout[];
};
