import type { EnrollInput, FundEvent, FundSnapshot, Payout, Policy, ReportEventInput } from "./types";

/**
 * Everything the UI needs from the fund. The prototype implements it with a local mock;
 * the real implementation will call the Soroban contract through the generated bindings,
 * simulating before signing and polling to a final status.
 */
export interface FundClient {
  getSnapshot(): Promise<FundSnapshot>;
  /** Creates a policy and charges the first premium. */
  enroll(input: EnrollInput): Promise<Policy>;
  /** Adds funds to the pool without buying coverage. */
  contribute(donor: string, amount: bigint): Promise<void>;
  /** Registers or supports an event. It is confirmed when the quorum is reached. */
  reportEvent(input: ReportEventInput): Promise<FundEvent>;
  /** Pays every eligible policy of a confirmed event. Anyone may call it; money only goes to each policy's fixed address. */
  payOut(eventRef: string): Promise<Payout[]>;
  /** Restores the demo to its initial state. */
  reset(): Promise<void>;
}
