/** Current Unix time in seconds, for event handlers and services. Never call it during render. */
export function nowSeconds(): number {
  return Math.floor(Date.now() / 1000);
}
