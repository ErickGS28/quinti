import { Badge } from "@/components/atoms/Badge";
import { formatAmount } from "@/lib/format/amount";
import { poolCopy } from "../copy";
import type { ZoneOverview } from "../types";

/** Zones grouped by country, so it is clear that a zone is a department or state, not a whole country. */
function groupByCountry(zones: ZoneOverview[]): Array<[string, ZoneOverview[]]> {
  const groups = new Map<string, ZoneOverview[]>();
  for (const item of zones) {
    groups.set(item.zone.region, [...(groups.get(item.zone.region) ?? []), item]);
  }
  return [...groups.entries()];
}

export function ZoneList({ zones }: { zones: ZoneOverview[] }) {
  return (
    <div className="grid gap-6">
      {groupByCountry(zones).map(([country, items]) => (
        <section key={country} aria-label={country}>
          <h3 className="text-sm font-semibold text-canopy-strong">{country}</h3>
          <ul className="mt-1 divide-y divide-hairline">
            {items.map(({ zone, policyCount, exposure, activity }) => (
              <li key={zone.id} className="flex items-center justify-between gap-4 py-4">
                <div>
                  <p className="font-semibold">
                    {zone.name} <span className="font-normal text-ink-soft">· {zone.division}</span>
                  </p>
                  <p className="mt-0.5 text-sm text-ink-soft">{poolCopy.zoneCount(policyCount)}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="font-semibold tabular-nums">{formatAmount(exposure, { fractionDigits: 0 })}</span>
                  {activity === "pending" && <Badge tone="clay">{poolCopy.zoneEvent}</Badge>}
                  {activity === "confirmed" && <Badge tone="canopy">{poolCopy.zoneEventPaid}</Badge>}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
