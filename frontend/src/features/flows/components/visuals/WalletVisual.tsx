import { Wallet } from "lucide-react";
import { formatAmount, toBaseUnits } from "@/lib/format/amount";
import { MiniScreen, VisualFrame } from "./VisualFrame";

/** A wallet screen with a balance, so the idea of "an account in your phone" is concrete. */
export function WalletVisual() {
  return (
    <VisualFrame>
      <MiniScreen>
        <div className="flex items-center gap-2 font-semibold text-ink-soft">
          <Wallet className="size-4 text-canopy-strong" />
          Mi billetera
        </div>
        <p className="mt-3 text-2xl font-semibold tabular-nums text-lagoon">
          {formatAmount(toBaseUnits(25), { withCode: false })}
        </p>
        <p className="text-ink-soft">dólares digitales (USDC)</p>
        <div className="mt-3 rounded-full bg-canopy-soft px-3 py-1.5 text-center font-semibold text-canopy-deep">
          Lista para usar
        </div>
      </MiniScreen>
    </VisualFrame>
  );
}
