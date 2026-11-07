import type { ProtectForm, ProtectStep } from "./types";

export const TOTAL_STEPS = 3;

/** Coverage choices in whole units of the asset. The fund's min and max still apply on enrollment. */
export const COVERAGE_OPTIONS = [25, 50, 100, 200];

export const MIN_NAME_LENGTH = 2;

export const INITIAL_FORM: ProtectForm = {
  name: "",
  zoneId: null,
  coverage: 100,
  destination: "relative",
  payoutAddress: "",
};

export const FIRST_STEP: ProtectStep = 1;
export const LAST_STEP: ProtectStep = 3;
