import { AlertTriangle, CircleCheck, Info } from "lucide-react";
import type { ReactNode } from "react";
import { classNames } from "@/lib/ui/class-names";

type NoticeTone = "info" | "success" | "warning" | "error";

const TONES: Record<NoticeTone, { box: string; Icon: typeof Info }> = {
  info: { box: "bg-lagoon-soft text-lagoon-strong", Icon: Info },
  success: { box: "bg-canopy-soft text-canopy-strong", Icon: CircleCheck },
  warning: { box: "bg-clay-soft text-clay", Icon: AlertTriangle },
  error: { box: "bg-ember-soft text-ember", Icon: AlertTriangle },
};

type InlineNoticeProps = {
  tone?: NoticeTone;
  title?: string;
  children: ReactNode;
  className?: string;
};

/** Short message placed next to what it explains. Errors announce themselves to screen readers. */
export function InlineNotice({ tone = "info", title, children, className }: InlineNoticeProps) {
  const { box, Icon } = TONES[tone];
  return (
    <div
      role={tone === "error" ? "alert" : "note"}
      className={classNames("flex gap-3 rounded-control p-4 text-sm leading-relaxed", box, className)}
    >
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <div>
        {title && <p className="font-semibold">{title}</p>}
        <div className={title ? "mt-0.5" : undefined}>{children}</div>
      </div>
    </div>
  );
}
