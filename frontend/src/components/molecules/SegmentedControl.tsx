import { useId } from "react";
import { classNames } from "@/lib/ui/class-names";

type Segment<Value extends string | number> = {
  value: Value;
  label: string;
};

type SegmentedControlProps<Value extends string | number> = {
  legend: string;
  segments: Segment<Value>[];
  value: Value;
  onChange: (value: Value) => void;
  className?: string;
};

/** Compact single-choice control in the iOS style. Native radios underneath. */
export function SegmentedControl<Value extends string | number>({
  legend,
  segments,
  value,
  onChange,
  className,
}: SegmentedControlProps<Value>) {
  const name = useId();

  return (
    <fieldset className={className}>
      <legend className="sr-only">{legend}</legend>
      <div className="flex gap-1 rounded-control bg-hairline p-1">
        {segments.map((segment) => (
          <label key={segment.value} className="flex-1 cursor-pointer">
            <input
              type="radio"
              name={name}
              className="peer sr-only"
              checked={value === segment.value}
              onChange={() => onChange(segment.value)}
            />
            <span
              className={classNames(
                "flex min-h-11 items-center justify-center rounded-[0.625rem] px-2 text-sm font-semibold text-ink-soft transition-colors duration-200 tabular-nums",
                "peer-checked:bg-cloud peer-checked:text-ink peer-checked:shadow-card",
                "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lagoon",
              )}
            >
              {segment.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
