import { useSyncExternalStore } from "react";
import { nowSeconds } from "./now";

const TICK_INTERVAL_MS = 1_000;

const listeners = new Set<() => void>();
let currentSeconds = nowSeconds();
let timer: ReturnType<typeof setInterval> | null = null;

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  if (timer === null) {
    currentSeconds = nowSeconds();
    timer = setInterval(() => {
      currentSeconds = nowSeconds();
      listeners.forEach((notify) => notify());
    }, TICK_INTERVAL_MS);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  };
}

/** Current Unix time in seconds, refreshed every second. Returns 0 during server render. */
export function useNow(): number {
  return useSyncExternalStore(subscribe, () => currentSeconds, () => 0);
}
