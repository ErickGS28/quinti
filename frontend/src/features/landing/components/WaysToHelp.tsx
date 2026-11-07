import { ArrowRight, Check, HandCoins, HeartHandshake } from "lucide-react";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ROUTES } from "@/config/constants";
import { landingCopy } from "../copy";

const { ways } = landingCopy;

type WayCardProps = {
  icon: ReactNode;
  label: string;
  title: string;
  points: readonly string[];
  action: string;
  href: string;
  highlighted?: boolean;
};

function WayCard({ icon, label, title, points, action, href, highlighted = false }: WayCardProps) {
  return (
    <Card padding="lg" className="flex flex-col">
      <span
        className={
          highlighted
            ? "flex size-12 items-center justify-center rounded-full bg-canopy-soft text-canopy-deep"
            : "flex size-12 items-center justify-center rounded-full bg-lagoon-soft text-lagoon"
        }
      >
        {icon}
      </span>
      <p className="mt-6 text-sm font-semibold text-ink-soft">{label}</p>
      <h3 className="mt-1 text-pretty text-2xl font-semibold tracking-tight">{title}</h3>
      <ul className="mt-6 grid gap-3">
        {points.map((point) => (
          <li key={point} className="flex gap-3 text-pretty leading-relaxed text-ink-soft">
            <Check className="mt-1 size-4 shrink-0 text-canopy-strong" aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>
      <ButtonLink href={href} variant={highlighted ? "primary" : "soft"} className="mt-8 self-start">
        {action}
        <ArrowRight className="size-4" aria-hidden="true" />
      </ButtonLink>
    </Card>
  );
}

/** Answers the first question of every new visitor: is this a donation or not? */
export function WaysToHelp() {
  return (
    <section id={ways.id} className="mx-auto max-w-6xl scroll-mt-28 px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading eyebrow={ways.eyebrow} title={ways.title} description={ways.body} />
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <WayCard
          highlighted
          icon={<HeartHandshake className="size-6" aria-hidden="true" />}
          label={ways.protect.label}
          title={ways.protect.title}
          points={ways.protect.points}
          action={ways.protect.action}
          href={ROUTES.protect}
        />
        <WayCard
          icon={<HandCoins className="size-6" aria-hidden="true" />}
          label={ways.contribute.label}
          title={ways.contribute.title}
          points={ways.contribute.points}
          action={ways.contribute.action}
          href={ROUTES.fund}
        />
      </div>
    </section>
  );
}
