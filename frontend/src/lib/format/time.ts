import { SECONDS_PER_DAY } from "@/config/constants";

const SECONDS_PER_HOUR = 3_600;
const SECONDS_PER_MINUTE = 60;
const JUST_NOW_THRESHOLD_SECONDS = 45;

const dateFormatter = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

/** Formats a remaining time: "0:42", "3 h 5 min" or "29 d". */
export function formatCountdown(totalSeconds: number): string {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  if (seconds >= SECONDS_PER_DAY) return `${Math.floor(seconds / SECONDS_PER_DAY)} d`;
  if (seconds >= SECONDS_PER_HOUR) {
    const hours = Math.floor(seconds / SECONDS_PER_HOUR);
    const minutes = Math.floor((seconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
    return `${hours} h ${minutes} min`;
  }
  const minutes = Math.floor(seconds / SECONDS_PER_MINUTE);
  return `${minutes}:${String(seconds % SECONDS_PER_MINUTE).padStart(2, "0")}`;
}

/** Formats how long ago something happened: "hace 3 min". Both arguments are Unix seconds. */
export function formatRelativeTime(timestamp: number, now: number): string {
  const elapsed = Math.max(0, now - timestamp);
  if (elapsed < JUST_NOW_THRESHOLD_SECONDS) return "hace un momento";
  if (elapsed < SECONDS_PER_HOUR) return `hace ${Math.round(elapsed / SECONDS_PER_MINUTE)} min`;
  if (elapsed < SECONDS_PER_DAY) return `hace ${Math.floor(elapsed / SECONDS_PER_HOUR)} h`;
  return `hace ${Math.floor(elapsed / SECONDS_PER_DAY)} d`;
}

/** Formats a Unix timestamp in seconds as "6 nov 2026". */
export function formatDate(timestamp: number): string {
  return dateFormatter.format(new Date(timestamp * 1000));
}

/** Describes a length of time in words: "1 minuto", "2 horas", "14 días". Rounds to the largest whole unit. */
export function describeDuration(totalSeconds: number): string {
  const seconds = Math.max(0, Math.round(totalSeconds));
  if (seconds >= SECONDS_PER_DAY) {
    const days = Math.round(seconds / SECONDS_PER_DAY);
    return days === 1 ? "1 día" : `${days} días`;
  }
  if (seconds >= SECONDS_PER_HOUR) {
    const hours = Math.round(seconds / SECONDS_PER_HOUR);
    return hours === 1 ? "1 hora" : `${hours} horas`;
  }
  const minutes = Math.max(1, Math.round(seconds / SECONDS_PER_MINUTE));
  return minutes === 1 ? "1 minuto" : `${minutes} minutos`;
}
