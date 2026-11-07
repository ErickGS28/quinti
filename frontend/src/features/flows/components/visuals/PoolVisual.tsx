import { Users } from "lucide-react";
import { Ripple } from "@/components/atoms/Ripple";
import { formatAmount, toBaseUnits } from "@/lib/format/amount";
import { VisualFrame } from "./VisualFrame";

/** The common fund receiving a contribution. */
export function PoolVisual() {
  return (
    <VisualFrame>
      <div className="flex flex-col items-center">
        <div className="relative size-24">
          <div className="absolute -inset-4">
            <Ripple tone="canopy" rings={3} />
          </div>
          <span className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-cloud shadow-card ring-1 ring-hairline">
            <Users className="size-5 text-canopy-strong" />
            <span className="mt-1 text-xs font-semibold">Fondo común</span>
          </span>
        </div>
        <span className="mt-4 rounded-full bg-leaf px-2.5 py-1 text-xs font-bold text-on-leaf tabular-nums">
          +{formatAmount(toBaseUnits(25))}
        </span>
      </div>
    </VisualFrame>
  );
}
