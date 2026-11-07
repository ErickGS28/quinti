"use client";

import { Button } from "@/components/atoms/Button";
import { Skeleton } from "@/components/atoms/Skeleton";
import { AddressChip } from "@/components/molecules/AddressChip";
import { useWallet } from "@/lib/wallet/use-wallet";
import { walletCopy } from "../copy";

/** Connect button that turns into the connected account with a way out. */
export function ConnectWalletButton() {
  const { state, connect, disconnect } = useWallet();

  if (state.status === "unknown") return <Skeleton className="h-11 w-40" />;

  if (state.status === "connected") {
    return (
      <div className="flex items-center gap-1">
        <AddressChip address={state.address} />
        <Button variant="ghost" onClick={() => void disconnect()} aria-label={walletCopy.disconnectLabel}>
          {walletCopy.disconnect}
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={() => void connect()} loading={state.status === "connecting"}>
      {walletCopy.connect}
    </Button>
  );
}
