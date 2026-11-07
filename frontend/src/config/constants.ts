/** Asset shown next to every amount. Prototype uses a test token. */
export const ASSET_CODE = "USDC";

/** Stellar classic assets and SAC tokens use 7 decimals. Amounts live as bigint base units. */
export const AMOUNT_DECIMALS = 7;

export const NETWORK_NAME = "Testnet";

export const SECONDS_PER_DAY = 86_400;

export const BASIS_POINTS = 10_000;

export const REPOSITORY_URL = "https://github.com/ErickGS28/quinti";

export const ROUTES = {
  landing: "/",
  home: "/app",
  protect: "/app/protect",
  fund: "/app/fund",
  verifier: "/app/verifier",
} as const;
