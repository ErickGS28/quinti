/** Typed failures of the fund. They mirror the contract's `#[contracterror]` list. */
export type FundErrorCode =
  | "wallet-not-connected"
  | "invalid-params"
  | "invalid-amount"
  | "coverage-out-of-range"
  | "not-attester"
  | "event-mismatch"
  | "already-approved"
  | "event-already-confirmed"
  | "event-not-found"
  | "event-not-confirmed";

export class FundError extends Error {
  readonly code: FundErrorCode;

  constructor(code: FundErrorCode) {
    super(code);
    this.name = "FundError";
    this.code = code;
  }
}

const MESSAGES: Record<FundErrorCode, string> = {
  "wallet-not-connected": "Conecta tu billetera para continuar.",
  "invalid-params": "Revisa los datos: hay algo que no es válido.",
  "invalid-amount": "Ingresa un monto mayor que cero.",
  "coverage-out-of-range": "La cobertura está fuera del rango permitido.",
  "not-attester": "Esta cuenta no es un verificador autorizado.",
  "event-mismatch": "Los datos no coinciden con el evento ya reportado.",
  "already-approved": "Este verificador ya confirmó el evento.",
  "event-already-confirmed": "El evento ya está confirmado.",
  "event-not-found": "No encontramos ese evento.",
  "event-not-confirmed": "El evento todavía no tiene suficientes confirmaciones.",
};

const FALLBACK_MESSAGE = "Algo salió mal. Inténtalo de nuevo.";

/** Turns any thrown value into a message that is safe and readable for the user. */
export function describeFundError(error: unknown): string {
  if (error instanceof FundError) return MESSAGES[error.code];
  return FALLBACK_MESSAGE;
}
