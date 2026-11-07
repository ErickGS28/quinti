"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import { Ripple } from "@/components/atoms/Ripple";
import { Skeleton } from "@/components/atoms/Skeleton";
import { useWallet } from "@/lib/wallet/use-wallet";
import { walletCopy } from "../copy";

/** Shows its children only for a connected wallet; otherwise invites the user to connect. */
export function RequireWallet({ children }: { children: ReactNode }) {
  const { state, connect } = useWallet();

  if (state.status === "unknown") return <Skeleton className="h-72 w-full rounded-card" />;
  if (state.status === "connected") return <>{children}</>;

  return (
    <Card padding="lg" className="relative overflow-hidden text-center">
      <div className="relative mx-auto my-4 size-32">
        <Ripple tone="canopy" rings={3} />
        <span className="absolute inset-[38%] rounded-full bg-leaf" />
      </div>
      <h2 className="text-2xl font-semibold tracking-tight">{walletCopy.promptTitle}</h2>
      <p className="mx-auto mt-3 max-w-md text-pretty text-ink-soft">{walletCopy.promptBody}</p>
      <Button size="lg" className="mt-8" onClick={() => void connect()} loading={state.status === "connecting"}>
        {walletCopy.promptAction}
      </Button>
    </Card>
  );
}
