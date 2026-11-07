import { useMemo } from "react";
import { useFundSnapshot } from "@/lib/fund/use-fund";
import { useWallet } from "@/lib/wallet/use-wallet";
import { buildEventViews } from "../services/build-event-views";

export function useEventViews() {
  const query = useFundSnapshot();
  const { address } = useWallet();
  const views = useMemo(() => (query.data ? buildEventViews(query.data, address) : []), [query.data, address]);

  return {
    views,
    config: query.data?.config ?? null,
    isLoading: query.isPending,
    isError: query.isError,
    refetch: query.refetch,
  };
}
