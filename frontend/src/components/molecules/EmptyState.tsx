import type { ReactNode } from "react";

type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-canopy-soft text-canopy-deep">
        {icon}
      </span>
      <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-pretty text-ink-soft">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
