import { describe, expect, it } from "vitest";
import { FLOWS } from "./copy";
import { VISUALS } from "./components/visuals";

describe("flow guides", () => {
  it("only reference illustrations that exist", () => {
    for (const flow of Object.values(FLOWS)) {
      for (const step of flow.steps) {
        expect(VISUALS[step.visual], `${flow.id}: ${step.title}`).toBeDefined();
      }
    }
  });

  it("keep their id in sync with the key they are stored under", () => {
    for (const [key, flow] of Object.entries(FLOWS)) {
      expect(flow.id).toBe(key);
    }
  });

  it("link to each other and to a destination", () => {
    for (const flow of Object.values(FLOWS)) {
      expect(flow.cta.href.startsWith("/")).toBe(true);
      expect(flow.other.href.startsWith("/como-funciona/")).toBe(true);
    }
    expect(FLOWS.protect.other.href).not.toBe(FLOWS.contribute.other.href);
  });
});
