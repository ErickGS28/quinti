import type { FundSnapshot } from "../types";

export const SNAPSHOT_STORAGE_KEY = "quintti.demo.snapshot.v3";

/** The part of the Web Storage API the mock needs. Lets tests use an in-memory store. */
export type KeyValueStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

const BIGINT_TAG = "$bigint";

function replacer(_key: string, value: unknown): unknown {
  return typeof value === "bigint" ? { [BIGINT_TAG]: value.toString() } : value;
}

function reviver(_key: string, value: unknown): unknown {
  if (value && typeof value === "object" && BIGINT_TAG in value) {
    return BigInt((value as Record<string, string>)[BIGINT_TAG]);
  }
  return value;
}

/** Reads the saved snapshot, or null when there is none or it cannot be parsed. */
export function loadSnapshot(storage: KeyValueStorage): FundSnapshot | null {
  const raw = storage.getItem(SNAPSHOT_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw, reviver) as FundSnapshot;
  } catch {
    return null;
  }
}

export function saveSnapshot(storage: KeyValueStorage, snapshot: FundSnapshot): void {
  storage.setItem(SNAPSHOT_STORAGE_KEY, JSON.stringify(snapshot, replacer));
}

export function clearSnapshot(storage: KeyValueStorage): void {
  storage.removeItem(SNAPSHOT_STORAGE_KEY);
}
