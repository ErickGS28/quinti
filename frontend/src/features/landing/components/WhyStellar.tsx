import { Coins, Eye, Landmark } from "lucide-react";
import type { ReactNode } from "react";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { landingCopy } from "../copy";

const { why } = landingCopy;

const ICONS: ReactNode[] = [
  <Coins key="fees" className="size-6" aria-hidden="true" />,
  <Landmark key="ledger" className="size-6" aria-hidden="true" />,
  <Eye key="rules" className="size-6" aria-hidden="true" />,
];

export function WhyStellar() {
  return (
    <section id={why.id} className="scroll-mt-28 bg-mist">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading eyebrow={why.eyebrow} title={why.title} />
        <ul className="mt-14 grid gap-10 md:grid-cols-3">
          {why.items.map((item, index) => (
            <li key={item.title}>
              <span className="flex size-12 items-center justify-center rounded-full bg-canopy-soft text-canopy-strong">
                {ICONS[index]}
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-pretty leading-relaxed text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
