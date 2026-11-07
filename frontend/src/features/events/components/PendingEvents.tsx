"use client";

import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import { ProgressBar } from "@/components/atoms/ProgressBar";
import { InlineNotice } from "@/components/molecules/InlineNotice";
import { describeFundError } from "@/lib/fund/errors";
import type { Attester, FundEvent } from "@/lib/fund/types";
import { eventsCopy } from "../copy";
import { useReportEvent } from "../hooks/useEventActions";

type PendingEventsProps = {
  items: Array<{ event: FundEvent; title: string }>;
  attesters: Attester[];
  quorum: number;
};

/** Step 2 of the demo: other attesters report the same event until the quorum confirms it. */
export function PendingEvents({ items, attesters, quorum }: PendingEventsProps) {
  const report = useReportEvent();
  const busyRef = report.isPending ? report.variables?.report.ref : undefined;

  return (
    <Card padding="lg">
      <h2 className="text-xl font-semibold tracking-tight">{eventsCopy.pendingTitle}</h2>

      {items.length === 0 && <p className="mt-4 text-ink-soft">{eventsCopy.pendingEmpty}</p>}

      <div className="mt-5 grid gap-6">
        {items.map(({ event, title }) => (
          <div key={event.ref}>
            <p className="font-semibold">{title}</p>
            <ProgressBar
              value={(event.approvals.length / quorum) * 100}
              tone="clay"
              label={eventsCopy.pendingProgress(event.approvals.length, quorum)}
              className="mt-3"
            />
            <p className="mt-2 text-sm text-ink-soft">{eventsCopy.pendingProgress(event.approvals.length, quorum)}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {attesters
                .filter((attester) => !event.approvals.includes(attester.id))
                .map((attester) => (
                  <Button
                    key={attester.id}
                    variant="soft"
                    loading={busyRef === event.ref && report.variables?.attesterId === attester.id}
                    disabled={report.isPending}
                    onClick={() =>
                      report.mutate({
                        attesterId: attester.id,
                        report: {
                          ref: event.ref,
                          hazard: event.hazard,
                          value: event.value,
                          occurredAt: event.occurredAt,
                          zoneIds: event.zoneIds,
                        },
                      })
                    }
                  >
                    {eventsCopy.confirmAs(attester.label)}
                  </Button>
                ))}
            </div>
          </div>
        ))}
      </div>

      {report.isError && (
        <InlineNotice tone="error" className="mt-5">
          {describeFundError(report.error)}
        </InlineNotice>
      )}
    </Card>
  );
}
