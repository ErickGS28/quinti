/** Asset shown next to every amount. Prototype uses a test token. */
export const ASSET_CODE = "USDC";

/** Stellar classic assets and SAC tokens use 7 decimals. Amounts live as bigint base units. */
export const AMOUNT_DECIMALS = 7;

export const NETWORK_NAME = "Testnet";

export const SECONDS_PER_DAY = 86_400;

export const BASIS_POINTS = 10_000;
export const ROUTES = {
  landing: "/",
  howToProtect: "/como-funciona/proteger",
  howToContribute: "/como-funciona/aportar",
  home: "/app",
  protect: "/app/protect",
  fund: "/app/fund",
  verifier: "/app/verifier",
} as const;

/** Ids of the landing page sections, shared by the menu, the section headings and pages that link back to them. */
export const LANDING_SECTIONS = {
  how: "como-funciona",
  ways: "participar",
  why: "por-que",
  faq: "preguntas",
} as const;
