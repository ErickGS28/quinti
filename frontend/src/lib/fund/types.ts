/**
 * Domain types of the fund. They mirror `docs/03-contract-design.md` so the mock client
 * can be replaced by the generated contract bindings without touching the UI.
 * Timestamps are Unix seconds. Amounts are bigint base units.
 */

export type Hazard = "earthquake" | "extreme-rainfall";

export type Zone = {
  id: number;
  name: string;
  /** Country the zone belongs to. */
  region: string;
  /** Kind of administrative division the zone is: department, state, and so on. */
  division: string;
  latitude: number;
  longitude: number;
};

/** If the measured value is >= minValue, payoutBps of the coverage is paid. Earthquake value = magnitude x 10. */
export type PayoutRule = {
  hazard: Hazard;
  minValue: number;
  payoutBps: number;
};

/** A trusted account allowed to report events (MVP, see decision 0003). */
export type Attester = {
  id: string;
  label: string;
  address: string;
};

export type FundConfig = {
  attesters: Attester[];
  quorum: number;
  waitingSeconds: number;
  periodSeconds: number;
  minCoverage: bigint;
  maxCoverage: bigint;
  premiumBps: number;
  rules: PayoutRule[];
  zones: Zone[];
};

export type Policy = {
  id: number;
  zoneId: number;
  beneficiaryName: string;
  coverage: bigint;
  sponsor: string;
  /** The only address that can ever receive this policy's payout. Fixed at enrollment. */
  payoutTo: string;
  activeFrom: number;
  coveredUntil: number;
  createdAt: number;
};

export type FundEvent = {
  /** Public reference of the event (a USGS id in production). */
  ref: string;
  hazard: Hazard;
  value: number;
  occurredAt: number;
  zoneIds: number[];
  /** Ids of the attesters that reported this exact event. */
  approvals: string[];
  confirmed: boolean;
  /** Share of the coverage that the rules pay for this event. Set on confirmation. */
  payoutBps: number;
  /** Share of that payout the pool can afford (10000 = fully funded). Set on confirmation. */
  factorBps: number;
};

export type EventReport = {
  ref: string;
  hazard: Hazard;
  value: number;
  occurredAt: number;
  zoneIds: number[];
};

export type Payout = {
  eventRef: string;
  policyId: number;
  amount: bigint;
  paidAt: number;
};

export type Contribution = {
  donor: string;
  amount: bigint;
  at: number;
};

/** Everything the UI reads. The mock client keeps it as immutable snapshots. */
export type FundSnapshot = {
  config: FundConfig;
  poolAvailable: bigint;
  policies: Policy[];
  events: FundEvent[];
  payouts: Payout[];
  contributions: Contribution[];
  nextPolicyId: number;
};

export type EnrollInput = {
  sponsor: string;
  beneficiaryName: string;
  zoneId: number;
  coverage: bigint;
  payoutTo: string;
};

export type ReportEventInput = {
  attesterId: string;
  report: EventReport;
};
