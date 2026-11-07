"use client";

import { Card } from "@/components/atoms/Card";
import { BASIS_POINTS } from "@/config/constants";
import { useNow } from "@/lib/clock/use-now";
import { formatAmount, formatBasisPoints } from "@/lib/format/amount";
import { formatRelativeTime } from "@/lib/format/time";
import { eventsCopy } from "../copy";
import type { EventView } from "../types";
import { EventStatusBadge } from "./EventStatusBadge";

function outcomeText(outcome: EventView["mine"][number]["outcome"]): string {
  if (outcome.kind === "paid") return eventsCopy.outcomePaid(formatAmount(outcome.payout.amount));
  if (outcome.kind === "payable") return eventsCopy.outcomePayable(formatAmount(outcome.amount));
  return eventsCopy.reasons[outcome.reason];
}

/** One event: what happened, whether it is confirmed, what it paid and what it meant for the viewer. */
export function EventCard({ view, quorum }: { view: EventView; quorum: number }) {
  const now = useNow();
  const { event, paidTotal, payableCount } = view.summary;

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{view.title}</h3>
          {now > 0 && <p className="mt-1 text-sm text-ink-soft">{formatRelativeTime(event.occurredAt, now)}</p>}
        </div>
        <EventStatusBadge event={event} quorum={quorum} />
      </div>

      {event.confirmed && event.payoutBps > 0 && (
        <ul className="mt-4 grid gap-1.5 text-sm text-ink-soft">
          <li>{eventsCopy.payoutShare(formatBasisPoints(event.payoutBps))}</li>
          {event.factorBps < BASIS_POINTS && <li>{eventsCopy.fundingShare(formatBasisPoints(event.factorBps))}</li>}
          {paidTotal > 0n && <li className="font-semibold text-canopy-strong">{eventsCopy.paidTotal(formatAmount(paidTotal))}</li>}
          {payableCount > 0 && <li className="font-semibold text-clay">{eventsCopy.payableCount(payableCount)}</li>}
        </ul>
      )}

      {view.mine.length > 0 && (
        <div className="mt-5 border-t border-hairline pt-4">
          <p className="text-sm font-semibold">{eventsCopy.yourPolicies}</p>
          <ul className="mt-2 grid gap-2">
            {view.mine.map(({ name, outcome }) => (
              <li key={name} className="flex items-center justify-between gap-4 text-sm">
                <span>{name}</span>
                <span className={outcome.kind === "paid" ? "font-semibold text-canopy-strong" : "text-right text-ink-soft"}>
                  {outcomeText(outcome)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
