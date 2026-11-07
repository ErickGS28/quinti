import type { CSSProperties } from "react";
import { classNames } from "@/lib/ui/class-names";

type RippleProps = {
  tone?: "lagoon" | "canopy" | "clay";
  rings?: number;
  className?: string;
};

const RING_SPACING_SECONDS = 1.35;

const TONE_CLASSES = {
  lagoon: "text-sky",
  canopy: "text-canopy",
  clay: "text-clay",
};

/**
 * Brand signature: concentric rings that spread from a point, like a seismic wave,
 * a ripple on water or a hovering wing. Fills its positioned parent. Decorative only.
 */
export function Ripple({ tone = "lagoon", rings = 4, className }: RippleProps) {
  return (
    <span
      aria-hidden="true"
      className={classNames("pointer-events-none absolute inset-0", TONE_CLASSES[tone], className)}
    >
      {Array.from({ length: rings }, (_, index) => (
        <span
          key={index}
          className="ripple-ring absolute inset-0 animate-ripple rounded-full border border-current opacity-0"
          style={
            {
              animationDelay: `${index * RING_SPACING_SECONDS}s`,
              "--ring-scale": (index + 1) / rings,
            } as CSSProperties
          }
        />
      ))}
    </span>
  );
}
