const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const ADDRESS_BODY_LENGTH = 55;

/** Small deterministic generator, so the same label always yields the same address. */
function createGenerator(label: string): () => number {
  let state = 2166136261;
  for (const char of label) {
    state = Math.imul(state ^ char.charCodeAt(0), 16777619) >>> 0;
  }
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Builds a Stellar-shaped address (G + 55 base32 characters) for demo identities.
 * It has no private key and no checksum: it can never hold real funds.
 */
export function demoAddress(label: string): string {
  const next = createGenerator(label);
  let body = "";
  for (let index = 0; index < ADDRESS_BODY_LENGTH; index += 1) {
    body += BASE32_ALPHABET[Math.floor(next() * BASE32_ALPHABET.length)];
  }
  return `G${body}`;
}
