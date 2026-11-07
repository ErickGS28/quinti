import type { Zone } from "@/lib/fund/types";

/** Geographic window shown by the schematic map, in degrees. Covers Colombia and western Venezuela. */
export const MAP_BOUNDS = {
  west: -79,
  east: -65,
  south: 3,
  north: 12.5,
};

export type MapPoint = {
  /** Percent of the map width, 0 to 100. */
  x: number;
  /** Percent of the map height, 0 to 100. */
  y: number;
};

export type LabelPlacement = "left" | "right" | "below";

const CROWDED_DISTANCE_PERCENT = 22;

/** Plain equirectangular projection, enough for a schematic of a few dots. */
export function projectZone(zone: Zone): MapPoint {
  const { west, east, south, north } = MAP_BOUNDS;
  return {
    x: ((zone.longitude - west) / (east - west)) * 100,
    y: ((north - zone.latitude) / (north - south)) * 100,
  };
}

/** Moves a label sideways when another zone is close, so names never overlap. */
export function placeLabel(point: MapPoint, others: MapPoint[]): LabelPlacement {
  const near = others.filter(
    (other) => Math.abs(other.x - point.x) < CROWDED_DISTANCE_PERCENT && Math.abs(other.y - point.y) < CROWDED_DISTANCE_PERCENT,
  );
  if (near.length === 0) return "below";
  return near.some((other) => other.x > point.x) ? "left" : "right";
}
