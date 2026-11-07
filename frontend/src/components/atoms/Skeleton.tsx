import { classNames } from "@/lib/ui/class-names";

type SkeletonProps = {
  className?: string;
};

/** Placeholder that reserves space while data loads, so the layout does not jump. */
export function Skeleton({ className }: SkeletonProps) {
  return <div aria-hidden="true" className={classNames("animate-pulse rounded-control bg-hairline", className)} />;
}
