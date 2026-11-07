import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/atoms/Button";
import { LANDING_SECTIONS, ROUTES } from "@/config/constants";
import { FLOWS, flowsCopy } from "../copy";
import type { FlowId } from "../types";
import { FlowTimeline } from "./FlowTimeline";

/** Explainer for one way of helping: what it is, then the process as a visual timeline. */
export function FlowPage({ flow }: { flow: FlowId }) {
  const content = FLOWS[flow];

  return (
    <main className="mx-auto max-w-7xl px-5 pt-14 pb-24 sm:px-8 sm:pt-20">
      <header className="mx-auto max-w-2xl text-center">
        <Link
          href={`${ROUTES.landing}#${LANDING_SECTIONS.ways}`}
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-ink-soft transition-colors duration-200 hover:bg-canopy-soft hover:text-canopy-deep"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {flowsCopy.back}
        </Link>
        <p className="mt-6 text-sm font-semibold tracking-wide text-canopy-strong">{content.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{content.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-pretty text-ink-soft">{content.intro}</p>
      </header>

      <div className="mt-16">
        <FlowTimeline steps={content.steps} />
      </div>

      <section className="mx-auto mt-20 max-w-2xl rounded-sheet bg-canopy-soft p-8 text-center sm:p-10">
        <p className="text-lg leading-relaxed text-pretty text-canopy-deep">{content.note}</p>
        <ButtonLink href={content.cta.href} size="lg" shape="pill" className="mt-8">
          {content.cta.label}
          <ArrowRight className="size-5" aria-hidden="true" />
        </ButtonLink>
        <p className="mt-6 text-sm text-ink-soft">
          {content.other.prompt}{" "}
          <Link href={content.other.href} className="font-semibold text-lagoon underline underline-offset-4">
            {content.other.label}
          </Link>
        </p>
      </section>
    </main>
  );
}
