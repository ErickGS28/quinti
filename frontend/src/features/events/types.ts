import type { EventSummary } from "@/lib/fund/event-summary";

export type EventView = {
  summary: EventSummary;
  title: string;
  /** Outcomes for the policies of the connected wallet only. */
  mine: Array<{ name: string; outcome: EventSummary["outcomes"][number]["outcome"] }>;
};
