import { classNames } from "@/lib/ui/class-names";

type ProgressBarProps = {
  /** 0 to 100. */
  value: number;
  tone?: "lagoon" | "canopy" | "clay";
  label: string;
  className?: string;
};

const TONES = {
  lagoon: "bg-canopy",
  canopy: "bg-canopy",
  clay: "bg-clay",
};

export function ProgressBar({ value, tone = "canopy", label, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      className={classNames("h-2 overflow-hidden rounded-full bg-hairline", className)}
    >
      <div
        className={classNames("h-full rounded-full transition-[width] duration-500", TONES[tone])}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
