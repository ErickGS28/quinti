import { CircleCheck, Hourglass } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import type { FundEvent } from "@/lib/fund/types";
import { eventsCopy } from "../copy";

export function EventStatusBadge({ event, quorum }: { event: FundEvent; quorum: number }) {
  if (!event.confirmed) {
    return (
      <Badge tone="clay">
        <Hourglass className="size-3.5" aria-hidden="true" />
        {eventsCopy.statusPending(event.approvals.length, quorum)}
      </Badge>
    );
  }
  return (
    <Badge tone={event.payoutBps === 0 ? "neutral" : "canopy"}>
      <CircleCheck className="size-3.5" aria-hidden="true" />
      {event.payoutBps === 0 ? eventsCopy.statusNoPayout : eventsCopy.statusConfirmed}
    </Badge>
  );
}
