"use client";

import { Radar } from "lucide-react";
import { Card } from "@/components/atoms/Card";
import { Skeleton } from "@/components/atoms/Skeleton";
import { EmptyState } from "@/components/molecules/EmptyState";
import { ErrorState } from "@/components/molecules/ErrorState";
import { eventsCopy } from "../copy";
import { useEventViews } from "../hooks/useEventViews";
import { EventCard } from "./EventCard";

/** Public history of events and the payments they caused. */
export function EventTimeline() {
  const { views, config, isLoading, isError, refetch } = useEventViews();

  return (
    <section aria-labelledby="events-title">
      <h2 id="events-title" className="text-2xl font-semibold tracking-tight">
        {eventsCopy.timelineTitle}
      </h2>

      <div className="mt-5 grid gap-4">
        {isLoading && <Skeleton className="h-32 w-full rounded-card" />}

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

        {!isLoading && !isError && views.length === 0 && (
          <Card>
            <EmptyState
              icon={<Radar className="size-7" aria-hidden="true" />}
              title={eventsCopy.timelineEmptyTitle}
              description={eventsCopy.timelineEmptyBody}
            />
          </Card>
        )}

        {config && views.map((view) => <EventCard key={view.summary.event.ref} view={view} quorum={config.quorum} />)}
      </div>
    </section>
  );
}
