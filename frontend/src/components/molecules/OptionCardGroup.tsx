import { useId, type ReactNode } from "react";
import { classNames } from "@/lib/ui/class-names";

export type Option<Value extends string | number> = {
  value: Value;
  title: string;
  description?: string;
  /** Short text on the right, such as a figure. */
  meta?: string;
  icon?: ReactNode;
};

type OptionCardGroupProps<Value extends string | number> = {
  legend: string;
  options: Option<Value>[];
  value: Value | null;
  onChange: (value: Value) => void;
  className?: string;
};

/** Radio group shown as tappable cards. Native radios keep keyboard and screen reader behavior. */
export function OptionCardGroup<Value extends string | number>({
  legend,
  options,
  value,
  onChange,
  className,
}: OptionCardGroupProps<Value>) {
  const name = useId();

  return (
    <fieldset className={className}>
      <legend className="sr-only">{legend}</legend>
      <div className="grid gap-3">
        {options.map((option) => (
          <label key={option.value} className="block cursor-pointer">
            <input
              type="radio"
              name={name}
              className="peer sr-only"
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span
              className={classNames(
                "flex items-center gap-4 rounded-control bg-cloud p-4 ring-1 ring-inset ring-hairline-strong transition-colors duration-200",
                "hover:bg-mist peer-checked:bg-canopy-soft peer-checked:ring-2 peer-checked:ring-canopy",
                "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lagoon",
              )}
            >
              {option.icon && (
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-canopy-soft text-canopy-deep">
                  {option.icon}
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-ink">{option.title}</span>
                {option.description && <span className="mt-0.5 block text-sm text-ink-soft">{option.description}</span>}
              </span>
              {option.meta && <span className="shrink-0 text-sm font-semibold text-ink-soft">{option.meta}</span>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
