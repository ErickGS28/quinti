export type Destination = "sponsor" | "relative" | "beneficiary";

export type ProtectForm = {
  name: string;
  zoneId: number | null;
  /** Coverage in whole units of the asset, as picked from the options. */
  coverage: number;
  destination: Destination;
  payoutAddress: string;
};

export type ProtectStep = 1 | 2 | 3;

export type ProtectErrors = Partial<Record<"name" | "zone" | "address", string>>;
