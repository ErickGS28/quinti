import { useId, type InputHTMLAttributes } from "react";
import { classNames } from "@/lib/ui/class-names";

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  label: string;
  hint?: string;
  error?: string | null;
  /** Monospace for identifiers such as wallet addresses. */
  mono?: boolean;
};

/** Labelled input with hint and inline error, wired for screen readers. */
export function TextField({ label, hint, error, mono = false, className, ...rest }: TextFieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={classNames(
          "min-h-12 w-full rounded-control bg-mist px-4 text-base text-ink outline-none ring-1 ring-inset transition-shadow duration-200 placeholder:text-ink-faint",
          "focus-visible:ring-2 focus-visible:ring-lagoon",
          error ? "ring-ember" : "ring-hairline-strong",
          mono && "font-mono text-sm",
        )}
        {...rest}
      />
      {hint && !error && (
        <p id={hintId} className="mt-2 text-sm text-ink-soft">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-sm font-medium text-ember">
          {error}
        </p>
      )}
    </div>
  );
}
