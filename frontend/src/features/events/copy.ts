import type { IneligibleReason } from "@/lib/fund/rules";

export const eventsCopy = {
  timelineTitle: "Eventos",
  timelineEmptyTitle: "Todavía no hay eventos",
  timelineEmptyBody: "Cuando los verificadores confirmen un desastre, aparecerá aquí con los pagos que provoque.",
  loadErrorTitle: "No pudimos cargar los eventos",
  loadErrorBody: "Revisa tu conexión e inténtalo de nuevo.",
  retry: "Reintentar",

  statusPending: (approvals: number, quorum: number) => `Verificando · ${approvals} de ${quorum}`,
  statusConfirmed: "Confirmado",
  statusNoPayout: "Confirmado · sin pago",
  payoutShare: (share: string) => `Pago: ${share} de la cobertura`,
  fundingShare: (share: string) => `El fondo cubre el ${share} de ese pago`,
  paidTotal: (amount: string) => `Pagado: ${amount}`,
  payableCount: (count: number) => `${count} ${count === 1 ? "pago por ejecutar" : "pagos por ejecutar"}`,
  yourPolicies: "Tus protecciones",
  outcomePaid: (amount: string) => `Recibió ${amount}`,
  outcomePayable: (amount: string) => `Recibirá ${amount}`,

  reasons: {
    "not-confirmed": "Esperando confirmación",
    "already-paid": "Ya pagada",
    "outside-zone": "Fuera de la zona",
    "below-threshold": "El evento no alcanzó el umbral de pago",
    "waiting-period": "No cubierta: estaba en periodo de espera",
    expired: "No cubierta: la cuota estaba vencida",
  } satisfies Record<IneligibleReason, string>,

  consoleTitle: "Verificadores",
  consoleSubtitle:
    "Los verificadores registran los desastres detectados en fuentes públicas. Cuando suficientes coinciden, el evento se confirma y se habilitan los pagos.",

  reportTitle: "1. Registrar un evento",
  reportLegend: "Evento detectado",
  reportAction: "Registrar como Verificador 1",
  pendingTitle: "2. Confirmar entre verificadores",
  pendingEmpty: "No hay eventos esperando confirmación.",
  pendingProgress: (approvals: number, quorum: number) => `${approvals} de ${quorum} verificadores`,
  confirmAs: (label: string) => `Confirmar como ${label}`,
  payTitle: "3. Ejecutar los pagos",
  payEmpty: "Cuando un evento se confirme, podrás ejecutar sus pagos aquí.",
  payAction: "Ejecutar pagos",
  payHint: "Cualquiera puede ejecutarlos: el dinero solo llega a la billetera fijada en cada protección.",
  payPolicies: (count: number, total: string) => `${count} ${count === 1 ? "protección" : "protecciones"} · ${total}`,
  payNothing: "Nada por pagar en este evento.",
  payDone: (count: number) => `Se enviaron ${count} ${count === 1 ? "pago" : "pagos"}.`,
  blocked: (count: number) => `${count} no ${count === 1 ? "cubierta" : "cubiertas"}`,
} as const;
