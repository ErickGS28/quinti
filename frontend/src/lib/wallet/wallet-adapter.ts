export type WalletAccount = {
  address: string;
  network: string;
};

/**
 * What the app needs from a wallet. The prototype uses a simulated one; the Freighter
 * implementation will satisfy the same interface. Secret keys never pass through here.
 */
export interface WalletAdapter {
  /** Returns the account if the user already granted access, otherwise null. */
  restore(): Promise<WalletAccount | null>;
  connect(): Promise<WalletAccount>;
  disconnect(): Promise<void>;
}
