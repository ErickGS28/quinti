import { useMemo } from "react";
import { useFundSnapshot } from "@/lib/fund/use-fund";
import { buildOverview } from "../services/build-overview";

export function useFundOverview() {
  const query = useFundSnapshot();
  const overview = useMemo(() => (query.data ? buildOverview(query.data) : null), [query.data]);
  return { overview, isLoading: query.isPending, isError: query.isError, refetch: query.refetch };
}
