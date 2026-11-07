import { Check, CalendarClock } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { BrandMark } from "@/components/atoms/BrandMark";
import { Ripple } from "@/components/atoms/Ripple";
import { formatAmount, toBaseUnits } from "@/lib/format/amount";
import { landingCopy } from "../copy";

const { hero } = landingCopy;

/**
 * Hero illustration: the large Quinti logo at the center of spreading rings, with a premium
 * and a payout floating around it. Static sample data, so it renders the same on server and client.
 */
export function HeroVisual() {
  return (
    <div className="group relative mx-auto w-full max-w-md pb-40 pt-6">
      <div className="relative mx-auto aspect-square w-[68%]">
        <div className="absolute -inset-[22%]" aria-hidden="true">
          <Ripple tone="canopy" rings={5} />
        </div>
        <div className="absolute -inset-[6%]" aria-hidden="true">
          <Ripple tone="lagoon" rings={3} />
        </div>
        <BrandMark className="relative size-full" />
      </div>

      <div className="mt-5 text-center">
        <p className="text-5xl font-semibold tracking-tight text-lagoon">Quinti</p>
        <p className="mt-2 text-base text-ink-soft">{hero.tagline}</p>
        <p className="mt-0.5 text-sm text-ink-faint">{hero.origin}</p>
      </div>

      <div
        aria-hidden="true"
        className="absolute left-0 top-2 flex items-center gap-3 rounded-card bg-cloud px-4 py-3 shadow-float motion-safe:animate-rise"
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-canopy-soft text-canopy-deep">
          <CalendarClock className="size-4" />
        </span>
        <span>
          <span className="block text-xs text-ink-soft">{hero.premiumLabel}</span>
          <span className="block text-sm font-semibold tabular-nums">{formatAmount(toBaseUnits(2))}</span>
          <span className="block text-xs text-ink-soft">{hero.premiumFrom}</span>
        </span>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 rounded-card bg-cloud p-5 shadow-float motion-safe:animate-rise [animation-delay:150ms]"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold">{hero.event}</span>
          <Badge tone="canopy">
            <Check className="size-3.5" />
            {hero.confirmed}
          </Badge>
        </div>
        <div className="mt-3 flex items-end justify-between gap-3">
          <p className="text-3xl font-semibold tracking-tight text-canopy-strong tabular-nums">
            +{formatAmount(toBaseUnits(200))}
          </p>
          <p className="pb-1 text-right text-xs text-ink-soft">
            {hero.paymentTo}
            <br />
            {hero.paymentTime}
          </p>
        </div>
      </div>
    </div>
  );
}
