import { ProgressBar } from "@/components/atoms/ProgressBar";
import { protectCopy } from "../copy";
import { TOTAL_STEPS } from "../constants";

export function StepIndicator({ step }: { step: number }) {
  const label = protectCopy.stepLabel(step, TOTAL_STEPS);
  return (
    <div>
      <p className="text-sm font-semibold text-canopy-strong">{label}</p>
      <ProgressBar value={(step / TOTAL_STEPS) * 100} tone="lagoon" label={label} className="mt-2" />
    </div>
  );
}
