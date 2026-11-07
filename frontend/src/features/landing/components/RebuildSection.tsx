import { Hammer, House, Stethoscope, Utensils } from "lucide-react";
import type { ReactNode } from "react";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { landingCopy } from "../copy";

const { rebuild } = landingCopy;

const ICONS: ReactNode[] = [
  <House key="home" className="size-6" aria-hidden="true" />,
  <Utensils key="food" className="size-6" aria-hidden="true" />,
  <Stethoscope key="health" className="size-6" aria-hidden="true" />,
  <Hammer key="repair" className="size-6" aria-hidden="true" />,
];

/** What the money is for: the first things a family needs to start rebuilding. */
export function RebuildSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading eyebrow={rebuild.eyebrow} title={rebuild.title} description={rebuild.body} />
      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {rebuild.items.map((item, index) => (
          <li key={item.title} className="rounded-card bg-canopy-soft p-6">
            <span className="flex size-12 items-center justify-center rounded-full bg-leaf text-on-leaf">{ICONS[index]}</span>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-2 text-pretty leading-relaxed text-ink-soft">{item.body}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-ink-faint">{rebuild.note}</p>
    </section>
  );
}
