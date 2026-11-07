import { useFundAction } from "@/lib/fund/use-fund";
import type { ReportEventInput } from "@/lib/fund/types";

/** An attester reports a new event or supports one that is already open. */
export function useReportEvent() {
  return useFundAction((client, input: ReportEventInput) => client.reportEvent(input));
}

/** Pays every eligible policy of a confirmed event. */
export function usePayOut() {
  return useFundAction((client, eventRef: string) => client.payOut(eventRef));
}
