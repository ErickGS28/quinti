import { createMockWalletAdapter } from "./mock-wallet-adapter";
import type { WalletAdapter } from "./wallet-adapter";

export type WalletState =
  | { status: "unknown" }
  | { status: "disconnected" }
  | { status: "connecting" }
  | { status: "connected"; address: string; network: string };

const listeners = new Set<() => void>();
let state: WalletState = { status: "unknown" };
let adapter: WalletAdapter | null = null;
let restoreStarted = false;

function setState(next: WalletState): void {
  state = next;
  listeners.forEach((notify) => notify());
}

/** Lazily created so it only runs in the browser. This is where Freighter replaces the mock. */
function getAdapter(): WalletAdapter {
  if (adapter === null) adapter = createMockWalletAdapter(window.localStorage);
  return adapter;
}

export function subscribeToWallet(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getWalletState(): WalletState {
  return state;
}

/** Checks once whether the user already granted access in a previous visit. */
export async function restoreWallet(): Promise<void> {
  if (restoreStarted) return;
  restoreStarted = true;
  const account = await getAdapter().restore();
  setState(account ? { status: "connected", ...account } : { status: "disconnected" });
}

export async function connectWallet(): Promise<void> {
  setState({ status: "connecting" });
  try {
    const account = await getAdapter().connect();
    setState({ status: "connected", ...account });
  } catch {
    setState({ status: "disconnected" });
  }
}

export async function disconnectWallet(): Promise<void> {
  await getAdapter().disconnect();
  setState({ status: "disconnected" });
}
