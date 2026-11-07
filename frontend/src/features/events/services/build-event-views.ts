import { describeEvent } from "@/lib/fund/catalog";
import { summarizeEvent } from "@/lib/fund/event-summary";
import type { FundSnapshot } from "@/lib/fund/types";
import type { EventView } from "../types";

/** Events newest first, each with its title and what it meant for the viewer's own policies. */
export function buildEventViews(snapshot: FundSnapshot, viewerAddress: string | null): EventView[] {
  return [...snapshot.events]
    .sort((a, b) => b.occurredAt - a.occurredAt)
    .map((event) => {
      const summary = summarizeEvent(snapshot, event);
      return {
        summary,
        title: describeEvent(event, snapshot.config.zones),
        mine: summary.outcomes
          .filter(({ policy }) => viewerAddress !== null && policy.sponsor === viewerAddress)
          .map(({ policy, outcome }) => ({ name: policy.beneficiaryName, outcome })),
      };
    });
}
