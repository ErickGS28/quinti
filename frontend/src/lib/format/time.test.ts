import { describe, expect, it } from "vitest";
import { describeDuration, formatCountdown, formatRelativeTime } from "./time";

describe("formatCountdown", () => {
  it("shows minutes and seconds under an hour", () => {
    expect(formatCountdown(42)).toBe("0:42");
    expect(formatCountdown(125)).toBe("2:05");
  });

  it("shows hours and days for longer spans and never goes negative", () => {
    expect(formatCountdown(3_900)).toBe("1 h 5 min");
    expect(formatCountdown(29 * 86_400)).toBe("29 d");
    expect(formatCountdown(-10)).toBe("0:00");
  });
});

describe("describeDuration", () => {
  it("uses the largest whole unit with correct plurals", () => {
    expect(describeDuration(60)).toBe("1 minuto");
    expect(describeDuration(300)).toBe("5 minutos");
    expect(describeDuration(7_200)).toBe("2 horas");
    expect(describeDuration(14 * 86_400)).toBe("14 días");
  });
});

describe("formatRelativeTime", () => {
  it("describes elapsed time in Spanish", () => {
    expect(formatRelativeTime(1_000, 1_010)).toBe("hace un momento");
    expect(formatRelativeTime(1_000, 1_000 + 180)).toBe("hace 3 min");
    expect(formatRelativeTime(1_000, 1_000 + 7_200)).toBe("hace 2 h");
  });
});
