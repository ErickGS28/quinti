"use client";

import { useState } from "react";
import { Card } from "@/components/atoms/Card";
import { Skeleton } from "@/components/atoms/Skeleton";
import { ErrorState } from "@/components/molecules/ErrorState";
import { useWallet } from "@/lib/wallet/use-wallet";
import { poolCopy } from "../copy";
import { useFundOverview } from "../hooks/useFundOverview";
import { ContributeSheet } from "./ContributeSheet";
import { PoolSummary } from "./PoolSummary";
import { ZoneList } from "./ZoneList";
import { ZoneMap } from "./ZoneMap";

/** Public view of the fund: balance, zones on a map and a way to contribute. */
export function FundOverviewPanel() {
  const { overview, isLoading, isError, refetch } = useFundOverview();
  const { address, connect } = useWallet();
  const [contributeOpen, setContributeOpen] = useState(false);

  async function handleContribute() {
    if (!address) await connect();
    setContributeOpen(true);
  }

  if (isLoading) {
    return (
      <div className="grid gap-5">
        <Skeleton className="h-64 w-full rounded-card" />
        <Skeleton className="h-96 w-full rounded-card" />
      </div>
    );
  }

  if (isError || !overview) {
    return (
      <Card>
        <ErrorState
          title={poolCopy.loadErrorTitle}
          description={poolCopy.loadErrorBody}
          retryLabel={poolCopy.retry}
          onRetry={() => void refetch()}
        />
      </Card>
    );
  }

  return (
    <div className="grid gap-5">
      <PoolSummary overview={overview} onContribute={() => void handleContribute()} />

      <Card padding="lg">
        <h2 className="mb-5 text-xl font-semibold tracking-tight">{poolCopy.mapTitle}</h2>
        <ZoneMap zones={overview.zones} />
        <div className="mt-4">
          <ZoneList zones={overview.zones} />
        </div>
      </Card>

      <ContributeSheet open={contributeOpen} donor={address} onClose={() => setContributeOpen(false)} />
    </div>
  );
}
