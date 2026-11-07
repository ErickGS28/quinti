import { ROUTES } from "@/config/constants";
import type { Flow, FlowId } from "./types";

const WALLET_STEP = {
  title: "Abres tu billetera",
  body: "Una billetera es una app en tu celular donde guardas dólares digitales. Desde ahí haces tus pagos.",
  visual: "wallet",
} as const;

export const flowsCopy = {
  back: "Volver a participar",
  stepLabel: (number: number) => `Paso ${number}`,
  timelineLabel: "Pasos del proceso",
  scrollTop: "Volver arriba",
} as const;

export const FLOWS: Record<FlowId, Flow> = {
  protect: {
    id: "protect",
    eyebrow: "Protección",
    title: "Así funciona protegerte a ti o a tu familia.",
    intro: "Cinco pasos, desde la cuota hasta el apoyo. No necesitas saber de tecnología: solo una billetera en tu celular.",
    steps: [
      WALLET_STEP,
      {
        title: "Eliges quién queda protegido",
        body: "Escribes tu nombre, o el de tu familiar, la zona donde vive y cuánto quieres cubrir.",
        visual: "choose-person",
      },
      {
        title: "Pagas la cuota del mes",
        body: "Es una cantidad pequeña. Tu cuota se une a la de muchas personas en un fondo común.",
        visual: "move-money",
      },
      {
        title: "Ocurre un desastre",
        body: "Si un sismo golpea la zona protegida, verificadores confirman con datos públicos que de verdad ocurrió.",
        visual: "disaster",
      },
      {
        title: "El dinero llega solo",
        body: "El fondo envía el pago a la billetera que elegiste. Sin formularios y en minutos.",
        visual: "payout",
      },
    ],
    note: "Tú decides a qué billetera llega el pago: la tuya, la de tu familiar o la de alguien de confianza fuera de la zona afectada.",
    cta: { label: "Proteger a los míos", href: ROUTES.protect },
    other: { prompt: "¿Prefieres ayudar sin cobertura?", label: "Ver cómo funciona aportar", href: ROUTES.howToContribute },
  },
  contribute: {
    id: "contribute",
    eyebrow: "Aportar al fondo",
    title: "Así funciona aportar al fondo.",
    intro: "Cuatro pasos. Es una donación voluntaria: ayudas a que el fondo pueda pagar a más familias.",
    steps: [
      WALLET_STEP,
      {
        title: "Eliges cuánto aportar",
        body: "Puedes aportar el monto que quieras, una sola vez. No hay cuota ni compromiso.",
        visual: "choose-amount",
      },
      {
        title: "Tu aporte entra al fondo",
        body: "El dinero se suma al fondo común. Su saldo es público: cualquiera puede verlo.",
        visual: "pool",
      },
      {
        title: "El fondo ayuda cuando hace falta",
        body: "Cuando un desastre se confirma, el fondo paga a las familias protegidas en esa zona. Tu aporte ayuda a que alcance para todas.",
        visual: "spread",
      },
    ],
    note: "Aportar no da cobertura a nadie en particular. Si quieres que una persona concreta quede cubierta, protégela.",
    cta: { label: "Aportar al fondo", href: ROUTES.fund },
    other: { prompt: "¿Quieres cubrir a alguien en concreto?", label: "Ver cómo funciona proteger", href: ROUTES.howToProtect },
  },
};
