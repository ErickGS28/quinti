import type { FundClient } from "./fund-client";
import { createMockFundClient } from "./mock/mock-fund-client";

let client: FundClient | null = null;

/**
 * Returns the single fund client of the app. Browser only: it reads local storage.
 * This is the one place to swap the mock for the contract-backed client.
 */
export function getFundClient(): FundClient {
  if (client === null) {
    client = createMockFundClient({ storage: window.localStorage });
  }
  return client;
}
