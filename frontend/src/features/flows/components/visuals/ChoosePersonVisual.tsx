import { MapPin } from "lucide-react";
import { classNames } from "@/lib/ui/class-names";
import { MiniScreen, VisualFrame } from "./VisualFrame";

const COVERAGE_OPTIONS = [25, 50, 100, 200];
const SELECTED = 100;

/** The form where you name the person, pick their zone and choose the coverage. */
export function ChoosePersonVisual() {
  return (
    <VisualFrame>
      <MiniScreen>
        <p className="font-semibold text-ink-soft">¿A quién proteges?</p>
        <div className="mt-1.5 rounded-lg bg-mist px-2.5 py-1.5 font-semibold">Luz</div>
        <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-canopy-soft px-2.5 py-1.5 font-semibold text-canopy-deep">
          <MapPin className="size-3.5" />
          Chocó · Colombia
        </div>
        <p className="mt-2 font-semibold text-ink-soft">Cobertura</p>
        <div className="mt-1 flex gap-1">
          {COVERAGE_OPTIONS.map((value) => (
            <span
              key={value}
              className={classNames(
                "flex-1 rounded-md py-1 text-center font-semibold tabular-nums",
                value === SELECTED ? "bg-leaf text-on-leaf" : "bg-mist text-ink-soft",
              )}
            >
              {value}
            </span>
          ))}
        </div>
      </MiniScreen>
    </VisualFrame>
  );
}
