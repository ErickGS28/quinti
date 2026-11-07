import Link from "next/link";
import type { ComponentProps } from "react";
import { buttonStyles, type ButtonShape, type ButtonSize, type ButtonVariant } from "./button-styles";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  fullWidth?: boolean;
};

export function ButtonLink({ variant, size, shape, fullWidth, className, ...rest }: ButtonLinkProps) {
  return <Link className={buttonStyles({ variant, size, shape, fullWidth, className })} {...rest} />;
}
