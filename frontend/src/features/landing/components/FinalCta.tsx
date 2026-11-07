import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/atoms/Button";
import { Ripple } from "@/components/atoms/Ripple";
import { ROUTES } from "@/config/constants";
import { landingCopy } from "../copy";

const { finalCta } = landingCopy;

export function FinalCta() {
  return (
    <section className="bg-mist"><div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="page-wash relative overflow-hidden rounded-sheet bg-cloud px-6 py-16 text-center shadow-card sm:px-12 sm:py-24">
        <div className="absolute left-1/2 top-1/2 size-[44rem] -translate-x-1/2 -translate-y-1/2">
          <Ripple tone="lagoon" rings={5} className="opacity-60" />
        </div>
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-ink-soft">{finalCta.body}</p>
          <ButtonLink href={ROUTES.protect} size="lg" className="mt-10">
            {finalCta.action}
            <ArrowRight className="size-5" aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </div></section>
  );
}
