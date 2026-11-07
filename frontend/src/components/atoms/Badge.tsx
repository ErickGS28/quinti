import type { ReactNode } from "react";
import { classNames } from "@/lib/ui/class-names";

export type BadgeTone = "neutral" | "lagoon" | "canopy" | "clay" | "ember";

const TONES: Record<BadgeTone, string> = {
  neutral: "bg-hairline text-ink-soft",
  lagoon: "bg-lagoon-soft text-lagoon-strong",
  canopy: "bg-canopy-soft text-canopy-strong",
  clay: "bg-clay-soft text-clay",
  ember: "bg-ember-soft text-ember",
};

type BadgeProps = {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
};

/** Small status label. Always pairs color with text, never color alone. */
export function Badge({ tone = "neutral", children, className }: BadgeProps) {
  return (
    <span
      className={classNames(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold leading-none",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
