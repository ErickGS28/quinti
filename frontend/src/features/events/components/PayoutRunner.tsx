"use client";

import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import { InlineNotice } from "@/components/molecules/InlineNotice";
import { formatAmount } from "@/lib/format/amount";
import { describeFundError } from "@/lib/fund/errors";
import { eventsCopy } from "../copy";
import { usePayOut } from "../hooks/useEventActions";
import type { EventView } from "../types";

/** Step 3 of the demo: execute the payments of confirmed events. Anyone can do this. */
export function PayoutRunner({ views }: { views: EventView[] }) {
  const payOut = usePayOut();
  const confirmed = views.filter(({ summary }) => summary.event.confirmed && summary.event.payoutBps > 0);

  return (
    <Card padding="lg">
      <h2 className="text-xl font-semibold tracking-tight">{eventsCopy.payTitle}</h2>

      {confirmed.length === 0 && <p className="mt-4 text-ink-soft">{eventsCopy.payEmpty}</p>}

      <div className="mt-5 grid gap-5">
        {confirmed.map(({ summary, title }) => {
          const payable = summary.outcomes.flatMap(({ outcome }) => (outcome.kind === "payable" ? [outcome.amount] : []));
          const total = payable.reduce((sum, amount) => sum + amount, 0n);
          const blocked = summary.outcomes.filter(({ outcome }) => outcome.kind === "blocked").length;
          const running = payOut.isPending && payOut.variables === summary.event.ref;

          return (
            <div key={summary.event.ref} className="rounded-control bg-mist p-4">
              <p className="font-semibold">{title}</p>
              <p className="mt-1 text-sm text-ink-soft">
                {payable.length > 0
                  ? eventsCopy.payPolicies(payable.length, formatAmount(total))
                  : eventsCopy.payNothing}
                {blocked > 0 && ` · ${eventsCopy.blocked(blocked)}`}
              </p>
              {payable.length > 0 && (
                <Button
                  variant="safe"
                  className="mt-4"
                  loading={running}
                  disabled={payOut.isPending}
                  onClick={() => payOut.mutate(summary.event.ref)}
                >
                  {eventsCopy.payAction}
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {confirmed.length > 0 && <p className="mt-4 text-sm text-ink-soft">{eventsCopy.payHint}</p>}

      {payOut.isSuccess && (
        <InlineNotice tone="success" className="mt-5">
          {eventsCopy.payDone(payOut.data.length)}
        </InlineNotice>
      )}
      {payOut.isError && (
        <InlineNotice tone="error" className="mt-5">
          {describeFundError(payOut.error)}
        </InlineNotice>
      )}
    </Card>
  );
}
