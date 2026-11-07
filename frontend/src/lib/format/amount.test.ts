import { describe, expect, it } from "vitest";
import { formatAmount, formatBasisPoints, parseAmount, toBaseUnits } from "./amount";

describe("formatAmount", () => {
  it("formats whole amounts with Spanish separators and the asset code", () => {
    expect(formatAmount(toBaseUnits(1234))).toBe("1.234,00\u00A0USDC");
  });

  it("rounds half up to the requested fraction digits", () => {
    expect(formatAmount(12_345_000n, { withCode: false })).toBe("1,23");
    expect(formatAmount(12_350_000n, { withCode: false })).toBe("1,24");
  });

  it("supports zero fraction digits and negative values", () => {
    expect(formatAmount(toBaseUnits(200), { fractionDigits: 0, withCode: false })).toBe("200");
    expect(formatAmount(-toBaseUnits(5), { withCode: false })).toBe("-5,00");
  });
});

describe("parseAmount", () => {
  it("accepts comma and dot decimals", () => {
    expect(parseAmount("12,5")).toBe(125_000_000n);
    expect(parseAmount("12.50")).toBe(125_000_000n);
    expect(parseAmount(" 7 ")).toBe(70_000_000n);
  });

  it("rejects empty, negative, malformed and over-precise input", () => {
    for (const input of ["", "-3", "abc", "1,2,3", "1.12345678"]) {
      expect(parseAmount(input)).toBeNull();
    }
  });

  it("round-trips through formatAmount", () => {
    expect(formatAmount(parseAmount("40,25") ?? 0n, { withCode: false })).toBe("40,25");
  });
});

describe("formatBasisPoints", () => {
  it("formats whole and fractional percentages", () => {
    expect(formatBasisPoints(2000)).toBe("20\u00A0%");
    expect(formatBasisPoints(1250)).toBe("12,5\u00A0%");
    expect(formatBasisPoints(10_000)).toBe("100\u00A0%");
  });
});
