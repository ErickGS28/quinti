import { useState } from "react";
import { FIRST_STEP, INITIAL_FORM, LAST_STEP } from "../constants";
import { validateStep } from "../services/validate-step";
import type { ProtectErrors, ProtectForm, ProtectStep } from "../types";

/** Wizard state: current step, field values and the errors of the step the user tried to leave. */
export function useProtectForm() {
  const [form, setForm] = useState<ProtectForm>(INITIAL_FORM);
  const [step, setStep] = useState<ProtectStep>(FIRST_STEP);
  const [errors, setErrors] = useState<ProtectErrors>({});

  function update(changes: Partial<ProtectForm>) {
    setForm((current) => ({ ...current, ...changes }));
    setErrors({});
  }

  /** Moves forward when the step is valid. Returns true when the user reached the end of the wizard. */
  function advance(): boolean {
    const found = validateStep(step, form);
    setErrors(found);
    if (Object.keys(found).length > 0) return false;
    if (step === LAST_STEP) return true;
    setStep((step + 1) as ProtectStep);
    return false;
  }

  function goBack() {
    setErrors({});
    if (step > FIRST_STEP) setStep((step - 1) as ProtectStep);
  }

  function restart() {
    setForm(INITIAL_FORM);
    setStep(FIRST_STEP);
    setErrors({});
  }

  return { form, step, errors, update, advance, goBack, restart };
}
