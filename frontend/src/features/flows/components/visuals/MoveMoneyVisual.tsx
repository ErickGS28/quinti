import { ArrowRight, Users, Wallet } from "lucide-react";
import type { ReactNode } from "react";
import { formatAmount, toBaseUnits } from "@/lib/format/amount";
import { VisualFrame } from "./VisualFrame";

function Place({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex w-16 flex-col items-center gap-1.5">
      <span className="flex size-12 items-center justify-center rounded-full bg-cloud text-lagoon shadow-card">{icon}</span>
      <span className="text-center text-[0.6875rem] leading-tight font-semibold text-ink-soft">{label}</span>
    </div>
  );
}

/** Money travelling from your wallet to the shared fund. */
export function MoveMoneyVisual() {
  return (
    <VisualFrame>
      <div className="flex w-full items-center justify-between gap-1">
        <Place icon={<Wallet className="size-5" />} label="Tu billetera" />
        <div className="flex flex-1 flex-col items-center gap-1">
          <span className="rounded-full bg-leaf px-2 py-1 text-[0.6875rem] font-bold whitespace-nowrap text-on-leaf tabular-nums">
            {formatAmount(toBaseUnits(1))}
          </span>
          <ArrowRight className="size-5 text-canopy-strong" />
        </div>
        <Place icon={<Users className="size-5" />} label="Fondo común" />
      </div>
    </VisualFrame>
  );
}
