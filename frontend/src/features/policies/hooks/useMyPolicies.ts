import { useMemo } from "react";
import { findZone } from "@/lib/fund/catalog";
import { premiumFor } from "@/lib/fund/rules";
import { useFundSnapshot } from "@/lib/fund/use-fund";
import type { PolicyView } from "../types";

/** Policies sponsored by the given address, newest first, with their zone and payouts attached. */
export function useMyPolicies(address: string | null) {
  const query = useFundSnapshot();

  const policies = useMemo<PolicyView[]>(() => {
    const snapshot = query.data;
    if (!snapshot || !address) return [];

    return snapshot.policies
      .filter((policy) => policy.sponsor === address)
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((policy) => {
        const zone = findZone(snapshot.config.zones, policy.zoneId);
        return {
          policy,
          zoneName: zone?.name ?? `Zona ${policy.zoneId}`,
          zoneRegion: zone?.region ?? "",
          premium: premiumFor(policy.coverage, snapshot.config.premiumBps),
          payouts: snapshot.payouts.filter((payout) => payout.policyId === policy.id),
        };
      });
  }, [query.data, address]);

  return { policies, isLoading: query.isPending, isError: query.isError, refetch: query.refetch };
}
