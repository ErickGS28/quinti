import { NETWORK_NAME } from "@/config/constants";
import { DEMO_SPONSOR } from "@/lib/demo/demo-people";
import type { WalletAccount, WalletAdapter } from "./wallet-adapter";

const SESSION_KEY = "quintti.demo.wallet.v1";
const CONNECT_LATENCY_MS = 700;

const demoAccount: WalletAccount = { address: DEMO_SPONSOR.address, network: NETWORK_NAME };

/** Simulated wallet that "connects" to the demo sponsor. Holds no keys and signs nothing. */
export function createMockWalletAdapter(storage: Pick<Storage, "getItem" | "setItem" | "removeItem">): WalletAdapter {
  return {
    async restore() {
      return storage.getItem(SESSION_KEY) === "connected" ? demoAccount : null;
    },
    async connect() {
      await new Promise((resolve) => setTimeout(resolve, CONNECT_LATENCY_MS));
      storage.setItem(SESSION_KEY, "connected");
      return demoAccount;
    },
    async disconnect() {
      storage.removeItem(SESSION_KEY);
    },
  };
}
