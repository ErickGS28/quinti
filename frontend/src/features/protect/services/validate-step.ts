import { isAddressFormatValid } from "@/lib/format/address";
import { protectCopy } from "../copy";
import { MIN_NAME_LENGTH } from "../constants";
import type { ProtectErrors, ProtectForm, ProtectStep } from "../types";

/** Checks the fields of one step. An empty result means the user can continue. */
export function validateStep(step: ProtectStep, form: ProtectForm): ProtectErrors {
  const errors: ProtectErrors = {};

  if (step === 1) {
    if (form.name.trim().length < MIN_NAME_LENGTH) errors.name = protectCopy.nameError;
    if (form.zoneId === null) errors.zone = protectCopy.zoneError;
  }

  if (step === 3 && form.destination !== "sponsor" && !isAddressFormatValid(form.payoutAddress.trim())) {
    errors.address = protectCopy.addressError;
  }

  return errors;
}

/** Address that will receive the payout, given the form and the sponsor's own address. */
export function resolvePayoutAddress(form: ProtectForm, sponsorAddress: string): string {
  return form.destination === "sponsor" ? sponsorAddress : form.payoutAddress.trim();
}
