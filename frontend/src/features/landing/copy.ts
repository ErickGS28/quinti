import { LANDING_SECTIONS } from "@/config/constants";

export const landingCopy = {
  nav: {
    how: "Cómo funciona",
    ways: "Participar",
    why: "Por qué Stellar",
    faq: "Preguntas",
    menuLabel: "Secciones",
    scrollTop: "Volver arriba",
  },

  hero: {
    accent: ["Protección", "Solidaridad", "Reconstrucción"],
    body: "Cuando el desastre golpea, ninguna familia debería levantarse sola. Quintti reúne a una comunidad para que cada familia reciba apoyo en minutos y pueda empezar a reconstruir.",
    primary: "Proteger a los míos",
    secondary: "Ver cómo funciona",
  },

  problem: {
    eyebrow: "Después del desastre",
    title: "El tiempo es lo primero que se pierde.",
    body: "Cuando un sismo o una inundación golpea una comunidad, las primeras semanas deciden qué tan difícil será reconstruir. Y es justo cuando la ayuda llega tarde, o no llega.",
    items: [
      {
        title: "Semanas esperando un papel",
        body: "Formularios, peritajes y aprobaciones. La familia necesita dinero esta semana, no el próximo mes.",
      },
      {
        title: "Quienes más lo necesitan, sin respaldo",
        body: "Un seguro tradicional es caro y exige documentos que muchas familias no tienen.",
      },
      {
        title: "Dinero que no se puede usar",
        body: "Si el banco del pueblo cae o no hay cajeros, el saldo existe pero no sirve de nada.",
      },
      {
        title: "La familia lejana, con las manos atadas",
        body: "Quien vive en otro país solo puede enviar una remesa cuando el desastre ya ocurrió.",
      },
    ],
  },

  rebuild: {
    eyebrow: "Para volver a empezar",
    title: "Un pago que devuelve a la familia el control de su recuperación.",
    body: "El dinero llega directo a la billetera que elegiste, sin intermediarios. Cada familia decide qué necesita primero.",
    items: [
      {
        title: "Un techo",
        body: "Alquilar un lugar temporal o asegurar lo básico del hogar mientras se repara.",
      },
      {
        title: "Comida y agua",
        body: "Cubrir lo esencial los primeros días, cuando los mercados y la ayuda aún no llegan.",
      },
      {
        title: "Salud y transporte",
        body: "Medicinas, consultas y la posibilidad de moverse para reencontrar a los suyos o volver al trabajo.",
      },
      {
        title: "Reparar y reabrir",
        body: "Arreglar la casa o reabrir el pequeño negocio que sostiene a la familia.",
      },
    ],
    note: "Quintti complementa la ayuda de emergencia; no la reemplaza.",
  },

  how: {
    id: LANDING_SECTIONS.how,
    eyebrow: "Cómo funciona",
    title: "Protección en tres pasos.",
    body: "Quintti reúne las cuotas de muchas personas en un fondo común. Cuando un desastre se confirma, el fondo paga a quienes estaban protegidos en esa zona. Las reglas son públicas y se aplican igual para todos.",
    steps: [
      {
        title: "Eliges quién queda protegido",
        body: "Puedes ser tú, si vives en la zona, o un familiar al que respaldas desde lejos. Indicas su nombre, su zona y el monto de cobertura, y pagas una cuota mensual pequeña.",
      },
      {
        title: "Un desastre se confirma",
        body: "Verificadores revisan datos públicos, como la magnitud de un sismo. Cuando suficientes coinciden, el evento queda confirmado.",
      },
      {
        title: "El pago llega solo",
        body: "El fondo paga el monto acordado a la billetera que elegiste. Sin formularios y sin esperas.",
      },
    ],
  },

  ways: {
    id: LANDING_SECTIONS.ways,
    eyebrow: "Cómo participar",
    title: "Dos formas de ayudar. No son lo mismo.",
    body: "Puedes protegerte a ti o a un familiar, o aportar al fondo. La diferencia es si alguien queda cubierto.",
    howItWorks: "¿Cómo funciona?",
    protect: {
      label: "Protección",
      title: "Pagas una cuota y quien nombres queda cubierto: tú o tu familia.",
      points: [
        "Pagas una cuota mensual pequeña",
        "Si un desastre se confirma en la zona, la persona protegida recibe un pago automático",
        "Tú eliges a qué billetera llega el dinero",
      ],
      action: "Proteger a los míos",
    },
    contribute: {
      label: "Aportar al fondo",
      title: "Haces una donación voluntaria.",
      points: [
        "Sin cuota ni compromiso",
        "Ayuda a que el fondo pueda pagar a más familias",
        "No da cobertura a nadie en particular",
      ],
      action: "Ver el fondo",
    },
  },

  solidarity: {
    eyebrow: "Solidaridad latinoamericana",
    title: "Tú te proteges. La región entera te respalda.",
    body: "Las cuotas de todos se reúnen en un mismo fondo. Como los desastres casi nunca golpean todas las zonas a la vez, lo que aportan quienes hoy están a salvo respalda a quienes hoy lo necesitan. Y mañana puede ser al revés.",
    points: [
      {
        title: "Tú eliges quién queda protegido",
        body: "Tu cuota compra cobertura para la persona que nombras: tú mismo si vives en la zona, o un familiar. Esa persona recibe el pago si su zona es golpeada.",
      },
      {
        title: "Ayuda mutua, como una cooperativa",
        body: "Todos aportan y quien sufre un desastre recibe el respaldo del conjunto. Así una cuota pequeña sostiene un pago importante.",
      },
      {
        title: "Cada zona cuenta",
        body: "Los pagos se calculan por zona (un departamento o un estado). Solo reciben quienes estaban protegidos donde ocurrió el evento.",
      },
    ],
  },

  story: {
    eyebrow: "Un ejemplo",
    title: "Luz vive en Quibdó. Su hijo Andrés vive lejos.",
    body: "Andrés no puede estar allí cuando la tierra tiembla. Pero sí puede asegurarse de que su mamá no empiece de cero. Paga 2 USDC al mes y deja el cobro a nombre de su tía Marta, en otra ciudad.",
    timeline: [
      { when: "Cada mes", what: "Andrés paga la cuota desde el exterior. Cuesta menos que un café." },
      { when: "Día del sismo", what: "Los datos públicos confirman magnitud 6,8 en el Chocó." },
      { when: "Pocos minutos después", what: "El fondo envía 200 USDC a la billetera de Marta. Nadie llenó un formulario." },
    ],
    note: "Ejemplo ilustrativo.",
  },

  why: {
    id: LANDING_SECTIONS.why,
    eyebrow: "Por qué Stellar",
    title: "Una red hecha para mover dinero.",
    items: [
      {
        title: "Cuotas de pocos dólares",
        body: "Las comisiones son mínimas, así que una cuota pequeña no se la comen los costos.",
      },
      {
        title: "El dinero vive en el registro público",
        body: "No depende de un banco local. Si la infraestructura falla, el saldo sigue ahí.",
      },
      {
        title: "Reglas que todos pueden ver",
        body: "El pago lo ejecuta un contrato público y auditable. No hay un administrador que mueva el fondo.",
      },
    ],
  },

  faq: {
    id: LANDING_SECTIONS.faq,
    eyebrow: "Preguntas frecuentes",
    title: "Lo que suelen preguntar.",
    items: [
      {
        question: "¿Puedo protegerme a mí mismo?",
        answer:
          "Sí, y es la forma más directa. Si vives en una de las zonas, te inscribes con tu nombre, eliges tu zona y la billetera donde quieres recibir el pago. También puedes proteger a un familiar, aunque estés lejos.",
      },
      {
        question: "¿Proteger es una donación?",
        answer:
          "No. Pagas una cuota y la persona protegida queda cubierta: si un desastre se confirma en su zona, recibe un pago. Si prefieres donar sin recibir cobertura, puedes aportar al fondo.",
      },
      {
        question: "¿Mi cuota ayuda a personas de otros países?",
        answer:
          "Tu cuota protege a la persona que eliges, viva donde viva. Todas las cuotas se reúnen en un fondo mutuo: como los desastres rara vez golpean todas las zonas a la vez, compartirlo permite pagar más con cuotas más pequeñas, y la persona que proteges también recibe el respaldo del resto.",
      },
      {
        question: "¿Las zonas son países o ciudades?",
        answer:
          "Son departamentos o estados, como Chocó en Colombia o La Guaira en Venezuela. El pago depende de lo que ocurra en la zona de cada persona protegida.",
      },
      {
        question: "¿Qué desastres cubre?",
        answer:
          "Empezamos con sismos, medidos por su magnitud en cada zona. Iremos sumando otras amenazas, como las lluvias extremas.",
      },
      {
        question: "¿Cuánto puede recibir la persona protegida?",
        answer:
          "Hasta el monto de cobertura que elijas. Lo que se paga depende de la fuerza del evento: por ejemplo, un sismo desde magnitud 5,0 paga el 20 % de la cobertura y uno desde 6,5 paga el 100 %.",
      },
      {
        question: "¿Quién confirma que ocurrió un desastre?",
        answer:
          "Un grupo de verificadores revisa datos públicos, como los de los servicios sismológicos. Cuando suficientes verificadores coinciden, el evento queda confirmado y se habilitan los pagos.",
      },
      {
        question: "¿Qué es el periodo de espera?",
        answer:
          "Es el tiempo entre la inscripción y el inicio de la cobertura. Evita que alguien se inscriba cuando el desastre ya ocurrió.",
      },
      {
        question: "¿Qué pasa si el fondo no alcanza?",
        answer:
          "El pago se reduce en la misma proporción para todos. El fondo nunca promete más de lo que tiene y su saldo es público.",
      },
      {
        question: "¿Puedo proteger a alguien que vive en otro país?",
        answer:
          "Sí. Quien paga puede estar en cualquier lugar. El dinero llega a la billetera que elijas, que puede ser la de otro familiar fuera de la zona afectada.",
      },
      {
        question: "¿Necesito saber de criptomonedas?",
        answer:
          "Necesitas una billetera Stellar. Los pagos se hacen en dólares digitales (USDC). Convertirlos a moneda local depende de los servicios de cambio disponibles en tu país.",
      },
      {
        question: "¿Quintti es un seguro?",
        answer:
          "Quintti es un fondo comunitario de ayuda mutua con pagos definidos por reglas públicas. No es una póliza de seguro regulada.",
      },
    ],
  },

  finalCta: {
    title: "Que una mala noticia no signifique empezar de cero.",
    body: "Protégete hoy, a ti y a quienes más quieres. Si un desastre los alcanza, el apoyo ya estará en camino.",
    action: "Proteger a los míos",
  },

  footer: {
    origin: "Quintti viene de qínti, colibrí en quechua: pequeño, veloz y directo.",
    credit: "Construido sobre la red Stellar",
    legal: "Quintti es un fondo comunitario de ayuda mutua. No es una póliza de seguro regulada.",
  },
} as const;
