import { House, Users } from "lucide-react";
import { VisualFrame } from "./VisualFrame";

const FAMILIES = [200, 100, 50];

/** The fund paying several protected families at once. */
export function SpreadVisual() {
  return (
    <VisualFrame>
      <div className="flex w-full flex-col items-center">
        <span className="flex items-center gap-1.5 rounded-full bg-cloud px-3 py-1.5 text-xs font-semibold shadow-card ring-1 ring-hairline">
          <Users className="size-4 text-canopy-strong" />
          Fondo común
        </span>
        <span className="h-4 w-px bg-canopy/50" />
        <div className="grid w-full grid-cols-3 gap-2">
          {FAMILIES.map((amount) => (
            <div key={amount} className="flex flex-col items-center gap-1">
              <span className="flex size-9 items-center justify-center rounded-full bg-canopy-soft text-canopy-deep">
                <House className="size-4" />
              </span>
              <span className="text-[0.6875rem] font-bold text-canopy-strong tabular-nums">+{amount}</span>
            </div>
          ))}
        </div>
      </div>
    </VisualFrame>
  );
}
