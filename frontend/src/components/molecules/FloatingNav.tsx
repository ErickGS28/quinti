import type { ReactNode } from "react";
import { classNames } from "@/lib/ui/class-names";

type FloatingNavProps = {
  label: string;
  children: ReactNode;
  /** "top" sticks under the header; "bottom" floats above the screen edge on phones. */
  placement: "top" | "bottom";
  /** Upper limit of the bar on wide screens. It never exceeds 80% of the width. */
  width?: "compact" | "wide";
  className?: string;
};

const WIDTHS = {
  compact: "sm:w-[min(75%,64rem)]",
  wide: "sm:w-[min(80%,72rem)]",
};

/**
 * Rounded navigation bar that floats at 80% of the width instead of spanning the screen.
 * It only provides the surface; the items come from the caller.
 */
export function FloatingNav({ label, children, placement, width = "compact", className }: FloatingNavProps) {
  return (
    <div
      className={classNames(
        "pointer-events-none z-30 flex justify-center px-4",
        placement === "top" ? "sticky top-4" : "fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))]",
        className,
      )}
    >
      <nav
        aria-label={label}
        className={classNames(
          "pointer-events-auto flex w-[min(92%,26rem)] items-center gap-1 rounded-full bg-veil p-1.5 shadow-float backdrop-blur-xl",
          WIDTHS[width],
        )}
      >
        {children}
      </nav>
    </div>
  );
}
