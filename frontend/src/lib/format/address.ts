const ADDRESS_FORMAT = /^G[A-Z2-7]{55}$/;

/** Shortens a Stellar address for display: GABC…WXYZ. */
export function shortenAddress(address: string): string {
  if (address.length <= 12) return address;
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

/**
 * Checks the public-key format only (G + 55 base32 characters).
 * It does not verify the checksum. Replace with the SDK's StrKey check once the SDK is integrated.
 */
export function isAddressFormatValid(address: string): boolean {
  return ADDRESS_FORMAT.test(address);
}
