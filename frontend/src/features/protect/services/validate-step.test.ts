import { describe, expect, it } from "vitest";
import { DEMO_RELATIVE, DEMO_SPONSOR } from "@/lib/demo/demo-people";
import { INITIAL_FORM } from "../constants";
import type { ProtectForm } from "../types";
import { resolvePayoutAddress, validateStep } from "./validate-step";

const filled: ProtectForm = { ...INITIAL_FORM, name: "Luz", zoneId: 1, payoutAddress: DEMO_RELATIVE.address };

describe("validateStep", () => {
  it("requires a name and a zone on the first step", () => {
    expect(Object.keys(validateStep(1, INITIAL_FORM)).sort()).toEqual(["name", "zone"]);
    expect(validateStep(1, filled)).toEqual({});
  });

  it("always lets the coverage step pass", () => {
    expect(validateStep(2, INITIAL_FORM)).toEqual({});
  });

  it("requires a well-formed address unless the sponsor receives the money", () => {
    expect(validateStep(3, { ...filled, payoutAddress: "nope" })).toHaveProperty("address");
    expect(validateStep(3, filled)).toEqual({});
    expect(validateStep(3, { ...filled, destination: "sponsor", payoutAddress: "" })).toEqual({});
  });
});

describe("resolvePayoutAddress", () => {
  it("uses the sponsor wallet or the trimmed typed address", () => {
    expect(resolvePayoutAddress({ ...filled, destination: "sponsor" }, DEMO_SPONSOR.address)).toBe(DEMO_SPONSOR.address);
    expect(resolvePayoutAddress({ ...filled, payoutAddress: `  ${DEMO_RELATIVE.address} ` }, DEMO_SPONSOR.address)).toBe(
      DEMO_RELATIVE.address,
    );
  });
});
