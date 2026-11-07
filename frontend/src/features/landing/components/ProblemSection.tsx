import { Globe, Timer, Unplug, UserX } from "lucide-react";
import type { ReactNode } from "react";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { landingCopy } from "../copy";

const { problem } = landingCopy;

const ICONS: ReactNode[] = [
  <Timer key="timer" className="size-6" aria-hidden="true" />,
  <UserX key="excluded" className="size-6" aria-hidden="true" />,
  <Unplug key="unplug" className="size-6" aria-hidden="true" />,
  <Globe key="globe" className="size-6" aria-hidden="true" />,
];

export function ProblemSection() {
  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading eyebrow={problem.eyebrow} title={problem.title} description={problem.body} />
        <ul className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {problem.items.map((item, index) => (
            <li key={item.title} className="flex gap-5">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-clay-soft text-clay">
                {ICONS[index]}
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-pretty leading-relaxed text-ink-soft">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
