export type FlowId = "protect" | "contribute";

/** Which mini illustration accompanies a step. */
export type VisualId =
  | "wallet"
  | "choose-person"
  | "move-money"
  | "disaster"
  | "payout"
  | "choose-amount"
  | "pool"
  | "spread";

export type FlowStep = {
  title: string;
  body: string;
  visual: VisualId;
};

export type Flow = {
  id: FlowId;
  eyebrow: string;
  title: string;
  intro: string;
  steps: readonly FlowStep[];
  note: string;
  cta: { label: string; href: string };
  other: { prompt: string; label: string; href: string };
};
