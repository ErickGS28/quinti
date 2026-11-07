import { classNames } from "@/lib/ui/class-names";
import { MiniScreen, VisualFrame } from "./VisualFrame";

const AMOUNTS = [10, 25, 50, 100];
const SELECTED = 25;

/** Picking how much to contribute, from a few suggested amounts. */
export function ChooseAmountVisual() {
  return (
    <VisualFrame>
      <MiniScreen>
        <p className="font-semibold text-ink-soft">¿Cuánto quieres aportar?</p>
        <div className="mt-2 flex gap-1">
          {AMOUNTS.map((value) => (
            <span
              key={value}
              className={classNames(
                "flex-1 rounded-md py-1.5 text-center font-semibold tabular-nums",
                value === SELECTED ? "bg-leaf text-on-leaf" : "bg-mist text-ink-soft",
              )}
            >
              {value}
            </span>
          ))}
        </div>
        <p className="mt-2 text-ink-soft">dólares digitales (USDC)</p>
        <div className="mt-3 rounded-full bg-leaf py-1.5 text-center font-bold text-on-leaf">Aportar</div>
      </MiniScreen>
    </VisualFrame>
  );
}
