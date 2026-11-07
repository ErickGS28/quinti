import type { ButtonHTMLAttributes } from "react";
import { Spinner } from "../Spinner";
import { buttonStyles, type ButtonShape, type ButtonSize, type ButtonVariant } from "./button-styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  fullWidth?: boolean;
  /** Shows a spinner and blocks repeated clicks while an action is running. */
  loading?: boolean;
};

export function Button({
  variant,
  size,
  shape,
  fullWidth,
  loading = false,
  className,
  disabled,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, shape, fullWidth, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}
