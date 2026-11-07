"use client";

import { Card } from "@/components/atoms/Card";
import { Skeleton } from "@/components/atoms/Skeleton";
import { ErrorState } from "@/components/molecules/ErrorState";
import { eventsCopy } from "../copy";
import { useEventViews } from "../hooks/useEventViews";
import { PayoutRunner } from "./PayoutRunner";
import { PendingEvents } from "./PendingEvents";
import { ScenarioReporter } from "./ScenarioReporter";

/** Where trusted attesters register events, confirm them and release the payouts. */
export function VerifierConsole() {
  const { views, config, isLoading, isError, refetch } = useEventViews();

  const pending = views
    .filter(({ summary }) => !summary.event.confirmed)
    .map(({ summary, title }) => ({ event: summary.event, title }));

  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-tight">{eventsCopy.consoleTitle}</h1>
      <p className="mt-2 max-w-xl text-pretty text-lg text-ink-soft">{eventsCopy.consoleSubtitle}</p>

      <div className="mt-8 grid gap-5">
        {isLoading && <Skeleton className="h-80 w-full rounded-card" />}

        {isError && (
          <Card>
            <ErrorState
              title={eventsCopy.loadErrorTitle}
              description={eventsCopy.loadErrorBody}
              retryLabel={eventsCopy.retry}
              onRetry={() => void refetch()}
            />
          </Card>
        )}

        {config && (
          <>
            <ScenarioReporter firstAttester={config.attesters[0]} eventCount={views.length} />
            <PendingEvents items={pending} attesters={config.attesters} quorum={config.quorum} />
            <PayoutRunner views={views} />
          </>
        )}
      </div>
    </div>
  );
}
