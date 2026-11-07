import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { ButtonLink } from "@/components/atoms/Button";
import { ROUTES } from "@/config/constants";
import { landingCopy } from "../copy";
import { HeroVisual } from "./HeroVisual";

const { hero, how } = landingCopy;

export function Hero() {
  return (
    <section className="overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div>
          <Badge tone="canopy">{hero.badge}</Badge>
          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft sm:text-xl">{hero.body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={ROUTES.protect} size="lg">
              {hero.primary}
              <ArrowRight className="size-5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={`#${how.id}`} size="lg" variant="soft">
              {hero.secondary}
            </ButtonLink>
          </div>
          <p className="mt-6 max-w-md text-sm text-ink-faint">{hero.assurance}</p>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}
