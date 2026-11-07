import type { EventReport, FundEvent, Hazard, Zone } from "./types";

/** Zones of the demo: departments and states, not countries or cities. Coordinates are approximate and only place dots on a schematic map. */
export const ZONES: Zone[] = [
  { id: 1, name: "Chocó", region: "Colombia", division: "Departamento", latitude: 5.69, longitude: -76.65 },
  { id: 2, name: "Yaracuy", region: "Venezuela", division: "Estado", latitude: 10.34, longitude: -68.74 },
  { id: 3, name: "La Guaira", region: "Venezuela", division: "Estado", latitude: 10.6, longitude: -66.93 },
];

/** A simulated event the demo operator can report. Not real seismic data. */
export type Scenario = {
  id: string;
  title: string;
  summary: string;
  hazard: Hazard;
  value: number;
  zoneIds: number[];
};

export const SCENARIOS: Scenario[] = [
  {
    id: "choco-strong",
    title: "Sismo fuerte en el Chocó",
    summary: "Magnitud 6,8. Supera el umbral máximo.",
    hazard: "earthquake",
    value: 68,
    zoneIds: [1],
  },
  {
    id: "la-guaira-moderate",
    title: "Sismo moderado en La Guaira",
    summary: "Magnitud 5,4. Supera el primer umbral.",
    hazard: "earthquake",
    value: 54,
    zoneIds: [3],
  },
  {
    id: "yaracuy-light",
    title: "Sismo leve en Yaracuy",
    summary: "Magnitud 4,6. No llega al umbral de pago.",
    hazard: "earthquake",
    value: 46,
    zoneIds: [2],
  },
];

const HAZARD_NAMES: Record<Hazard, string> = {
  earthquake: "Sismo",
  "extreme-rainfall": "Lluvia extrema",
};

export function hazardName(hazard: Hazard): string {
  return HAZARD_NAMES[hazard];
}

/** Formats a measured value: earthquakes show magnitude (68 becomes "M 6,8"), rainfall shows millimetres. */
export function formatHazardValue(hazard: Hazard, value: number): string {
  if (hazard === "earthquake") return `M\u00A0${(value / 10).toFixed(1).replace(".", ",")}`;
  return `${value}\u00A0mm`;
}

export function findZone(zones: Zone[], zoneId: number): Zone | undefined {
  return zones.find((zone) => zone.id === zoneId);
}

/** One-line description of an event: "Sismo M 6,8 · Chocó". */
export function describeEvent(event: Pick<FundEvent, "hazard" | "value" | "zoneIds">, zones: Zone[]): string {
  const names = event.zoneIds.map((zoneId) => findZone(zones, zoneId)?.name ?? `Zona ${zoneId}`);
  return `${hazardName(event.hazard)} ${formatHazardValue(event.hazard, event.value)} · ${names.join(", ")}`;
}

/** Builds the report an attester would submit for a scenario. `sequence` keeps references unique. */
export function reportFromScenario(scenario: Scenario, occurredAt: number, sequence: number): EventReport {
  return {
    ref: `sim-${scenario.id}-${sequence}`,
    hazard: scenario.hazard,
    value: scenario.value,
    occurredAt,
    zoneIds: scenario.zoneIds,
  };
}
