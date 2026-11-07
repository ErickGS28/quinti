import { BrandMark } from "../atoms/BrandMark";
import { classNames } from "@/lib/ui/class-names";

type BrandLogoSize = "md" | "lg";

const MARK_SIZES: Record<BrandLogoSize, string> = {
  md: "size-10",
  lg: "size-14",
};

const TEXT_SIZES: Record<BrandLogoSize, string> = {
  md: "text-2xl",
  lg: "text-3xl",
};

type BrandLogoProps = {
  size?: BrandLogoSize;
  className?: string;
};

/** Mark and wordmark side by side. For the large presentation of the logo see the landing header. */
export function BrandLogo({ size = "md", className }: BrandLogoProps) {
  return (
    <span className={classNames("inline-flex items-center gap-3", className)}>
      <BrandMark className={MARK_SIZES[size]} />
      <span className={classNames("font-semibold tracking-tight text-lagoon", TEXT_SIZES[size])}>Quinti</span>
    </span>
  );
}
