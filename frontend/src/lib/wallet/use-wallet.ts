import { useEffect, useSyncExternalStore } from "react";
import {
  connectWallet,
  disconnectWallet,
  getWalletState,
  restoreWallet,
  subscribeToWallet,
  type WalletState,
} from "./wallet-store";

const SERVER_STATE: WalletState = { status: "unknown" };

/** Wallet session for any component. Client only: it restores the previous session on mount. */
export function useWallet() {
  const state = useSyncExternalStore(subscribeToWallet, getWalletState, () => SERVER_STATE);

  useEffect(() => {
    void restoreWallet();
  }, []);

  return {
    state,
    address: state.status === "connected" ? state.address : null,
    connect: connectWallet,
    disconnect: disconnectWallet,
  };
}
