import type { Metadata } from "next";
import { EventTimeline } from "@/features/events";
import { FundOverviewPanel, FundPageHeader } from "@/features/pool";

export const metadata: Metadata = { title: "El fondo" };

export default function FundPage() {
  return (
    <div className="grid gap-8">
      <FundPageHeader />
      <FundOverviewPanel />
      <EventTimeline />
    </div>
  );
}
