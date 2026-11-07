import { Ripple } from "@/components/atoms/Ripple";
import { formatAmount } from "@/lib/format/amount";
import { classNames } from "@/lib/ui/class-names";
import { poolCopy } from "../copy";
import { placeLabel, projectZone, type LabelPlacement } from "../services/project-zone";
import type { ZoneOverview } from "../types";

const LABEL_CLASSES: Record<LabelPlacement, string> = {
  below: "left-1/2 top-full mt-2 -translate-x-1/2 items-center text-center",
  left: "right-full top-1/2 mr-3 -translate-y-1/2 items-end text-right",
  right: "left-full top-1/2 ml-3 -translate-y-1/2 items-start text-left",
};

const DOT_SIZE = { min: 14, extra: 16 };

/**
 * Schematic map of the protected zones. Dot size shows how much is covered there; a ripple
 * appears while an event is open (amber) or after it is confirmed (green).
 */
export function ZoneMap({ zones }: { zones: ZoneOverview[] }) {
  const points = zones.map((item) => projectZone(item.zone));
  const largest = zones.reduce((best, item) => (item.exposure > best ? item.exposure : best), 0n);

  return (
    <figure>
      <div
        className="relative aspect-[14/9.5] overflow-hidden rounded-card bg-lagoon-soft"
        style={{
          backgroundImage:
            "linear-gradient(var(--hairline) 1px, transparent 1px), linear-gradient(90deg, var(--hairline) 1px, transparent 1px)",
          backgroundSize: "calc(100% / 7) calc(100% / 4.75)",
        }}
      >
        {zones.map((item, index) => {
          const point = points[index];
          const others = points.filter((_, otherIndex) => otherIndex !== index);
          const ratio = largest > 0n ? Number((item.exposure * 1000n) / largest) / 1000 : 0;
          const size = DOT_SIZE.min + Math.sqrt(ratio) * DOT_SIZE.extra;
          const rippleTone = item.activity === "confirmed" ? "canopy" : "clay";

          return (
            <div
              key={item.zone.id}
              className="absolute"
              style={{ left: `${point.x}%`, top: `${point.y}%`, width: size, height: size, translate: "-50% -50%" }}
            >
              {item.activity !== "none" && (
                <div className="absolute -inset-10 sm:-inset-14">
                  <Ripple tone={rippleTone} rings={3} />
                </div>
              )}
              <span
                className={classNames(
                  "absolute inset-0 rounded-full ring-4 ring-cloud",
                  item.activity === "confirmed" ? "bg-canopy" : item.activity === "pending" ? "bg-clay" : "bg-sky",
                )}
              />
              <span className={classNames("absolute flex whitespace-nowrap flex-col", LABEL_CLASSES[placeLabel(point, others)])}>
                <span className="text-xs font-semibold text-ink sm:text-sm">{item.zone.name}</span>
                <span className="text-[0.6875rem] text-ink-soft tabular-nums sm:text-xs">
                  {formatAmount(item.exposure, { fractionDigits: 0 })}
                </span>
              </span>
            </div>
          );
        })}
      </div>
      <figcaption className="mt-3 text-sm text-ink-faint">{poolCopy.mapNote}</figcaption>
    </figure>
  );
}
