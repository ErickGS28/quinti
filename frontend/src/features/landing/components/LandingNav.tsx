import { FloatingNav } from "@/components/molecules/FloatingNav";
import { classNames } from "@/lib/ui/class-names";
import { landingCopy } from "../copy";

const { nav, how, ways, why, faq } = landingCopy;

/** On phones only two links fit; the rest appear from medium screens up. */
const LINKS = [
  { href: `#${how.id}`, label: nav.how, onPhone: true },
  { href: `#${ways.id}`, label: nav.ways, onPhone: false },
  { href: `#${why.id}`, label: nav.why, onPhone: false },
  { href: `#${faq.id}`, label: nav.faq, onPhone: true },
];

/** Floating, rounded menu with the section links centered. The logo lives in the hero, not here. */
export function LandingNav() {
  return (
    <FloatingNav label={nav.menuLabel} placement="top" width="fit">
      <div className="flex items-center justify-center gap-1 sm:gap-2">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={classNames(
              "min-h-11 items-center rounded-full px-4 text-sm font-semibold text-ink-soft transition-colors duration-200 hover:bg-canopy-soft hover:text-canopy-deep sm:px-5 sm:text-[0.9375rem]",
              link.onPhone ? "flex" : "hidden md:flex",
            )}
          >
            {link.label}
          </a>
        ))}
      </div>
    </FloatingNav>
  );
}
