import { Check } from "lucide-react";
import { formatAmount, toBaseUnits } from "@/lib/format/amount";
import { MiniScreen, VisualFrame } from "./VisualFrame";

/** The receipt of a payment that has just arrived in a wallet. */
export function PayoutVisual() {
  return (
    <VisualFrame>
      <MiniScreen className="text-center">
        <span className="mx-auto flex size-10 items-center justify-center rounded-full bg-canopy text-on-canopy">
          <Check className="size-5" />
        </span>
        <p className="mt-2 font-semibold text-ink-soft">Pago recibido</p>
        <p className="text-2xl font-semibold tabular-nums text-canopy-strong">
          +{formatAmount(toBaseUnits(200), { withCode: false })}
        </p>
        <p className="text-ink-soft">USDC · Billetera de Marta</p>
      </MiniScreen>
    </VisualFrame>
  );
}
