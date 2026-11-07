import { HeartHandshake, Radar, Wallet } from "lucide-react";
import type { ReactNode } from "react";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { landingCopy } from "../copy";

const { how } = landingCopy;

const ICONS: ReactNode[] = [
  <HeartHandshake key="protect" className="size-6" aria-hidden="true" />,
  <Radar key="confirm" className="size-6" aria-hidden="true" />,
  <Wallet key="pay" className="size-6" aria-hidden="true" />,
];

export function HowItWorks() {
  return (
    <section id={how.id} className="scroll-mt-28 bg-mist">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading eyebrow={how.eyebrow} title={how.title} description={how.body} />
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {how.steps.map((step, index) => (
            <li key={step.title} className="rounded-card bg-cloud p-7 shadow-card">
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-full bg-canopy-soft text-canopy-deep">
                  {ICONS[index]}
                </span>
                <span className="text-4xl font-semibold tabular-nums text-leaf" aria-hidden="true">
                  {index + 1}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-3 text-pretty leading-relaxed text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
