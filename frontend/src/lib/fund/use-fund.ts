import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFundClient } from "./get-fund-client";
import type { FundClient } from "./fund-client";

export const fundKeys = {
  snapshot: ["fund", "snapshot"] as const,
};

/** Reads the full fund state. Features derive what they need from it. */
export function useFundSnapshot() {
  return useQuery({
    queryKey: fundKeys.snapshot,
    queryFn: () => getFundClient().getSnapshot(),
  });
}

/**
 * Runs a write action against the fund, then refreshes the snapshot.
 * Components never touch the client directly; they call the mutation returned here.
 */
export function useFundAction<Input, Output>(action: (client: FundClient, input: Input) => Promise<Output>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: Input) => action(getFundClient(), input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: fundKeys.snapshot }),
  });
}
