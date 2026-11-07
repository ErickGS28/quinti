import { AMOUNT_DECIMALS, ASSET_CODE } from "@/config/constants";

const UNITS_PER_ASSET = 10n ** BigInt(AMOUNT_DECIMALS);
const NO_BREAK_SPACE = "\u00A0";
const AMOUNT_PATTERN = new RegExp(`^(\\d+)(?:[.,](\\d{1,${AMOUNT_DECIMALS}}))?$`);

type FormatAmountOptions = {
  /** Digits after the decimal comma, 0 to AMOUNT_DECIMALS. Defaults to 2. */
  fractionDigits?: number;
  /** Append the asset code. Defaults to true. */
  withCode?: boolean;
};

/** Converts a whole number of assets (e.g. 25) into base units. */
export function toBaseUnits(wholeAmount: number): bigint {
  return BigInt(wholeAmount) * UNITS_PER_ASSET;
}

/** Formats base units for display in Spanish style: 1.234,50 USDC. Rounds half up. */
export function formatAmount(units: bigint, options: FormatAmountOptions = {}): string {
  const { fractionDigits = 2, withCode = true } = options;
  const digits = Math.min(Math.max(fractionDigits, 0), AMOUNT_DECIMALS);
  const negative = units < 0n;
  const absolute = negative ? -units : units;

  const scale = 10n ** BigInt(AMOUNT_DECIMALS - digits);
  const rounded = (absolute + scale / 2n) / scale;
  const divisor = 10n ** BigInt(digits);

  const whole = (rounded / divisor).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const fraction = digits > 0 ? `,${(rounded % divisor).toString().padStart(digits, "0")}` : "";
  const text = `${negative ? "-" : ""}${whole}${fraction}`;

  return withCode ? `${text}${NO_BREAK_SPACE}${ASSET_CODE}` : text;
}

/**
 * Parses user input such as "12", "12,5" or "12.50" into base units.
 * Returns null for empty, negative, malformed or over-precise input.
 */
export function parseAmount(input: string): bigint | null {
  const match = AMOUNT_PATTERN.exec(input.trim());
  if (!match) return null;
  const fraction = (match[2] ?? "").padEnd(AMOUNT_DECIMALS, "0");
  return BigInt(match[1]) * UNITS_PER_ASSET + BigInt(fraction);
}

/** Formats basis points as a percentage: 2000 becomes "20 %", 1250 becomes "12,5 %". */
export function formatBasisPoints(basisPoints: number): string {
  const whole = Math.floor(basisPoints / 100);
  const remainder = basisPoints % 100;
  if (remainder === 0) return `${whole}${NO_BREAK_SPACE}%`;
  const fraction = String(remainder).padStart(2, "0").replace(/0+$/, "");
  return `${whole},${fraction}${NO_BREAK_SPACE}%`;
}
