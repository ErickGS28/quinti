import type { ReactNode } from "react";
import { classNames } from "@/lib/ui/class-names";

/** Soft tile that holds one mini illustration. Decorative: the step text carries the meaning. */
export function VisualFrame({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="mx-auto flex min-h-48 w-full max-w-64 items-center justify-center rounded-card bg-mist p-4 ring-1 ring-hairline"
    >
      {children}
    </div>
  );
}

/** A phone-like screen inside the tile. */
export function MiniScreen({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={classNames("w-full rounded-2xl bg-cloud p-3 text-xs shadow-card", className)}>{children}</div>;
}
