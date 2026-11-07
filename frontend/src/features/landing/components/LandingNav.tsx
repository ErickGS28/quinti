import { ButtonLink } from "@/components/atoms/Button";
import { FloatingNav } from "@/components/molecules/FloatingNav";
import { ROUTES } from "@/config/constants";
import { classNames } from "@/lib/ui/class-names";
import { landingCopy } from "../copy";

const { nav, how, ways, why, faq } = landingCopy;

/** On phones only the first and last links fit next to the button. */
const LINKS = [
  { href: `#${how.id}`, label: nav.how, onPhone: true },
  { href: `#${ways.id}`, label: nav.ways, onPhone: false },
  { href: `#${why.id}`, label: nav.why, onPhone: false },
  { href: `#${faq.id}`, label: nav.faq, onPhone: true },
];

/** Floating, rounded menu. The logo lives in the header above, not here. */
export function LandingNav() {
  return (
    <FloatingNav label={nav.menuLabel} placement="top" width="wide">
      <div className="flex flex-1 items-center justify-start gap-0.5 pl-1 sm:gap-1 sm:pl-3">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={classNames(
              "min-h-11 items-center rounded-full px-3 text-sm font-semibold text-ink-soft transition-colors duration-200 hover:bg-hairline hover:text-ink sm:px-4 sm:text-[0.9375rem]",
              link.onPhone ? "flex" : "hidden md:flex",
            )}
          >
            {link.label}
          </a>
        ))}
      </div>
      <ButtonLink href={ROUTES.home} shape="pill" className="shrink-0 px-4 sm:px-6">
        {nav.cta}
      </ButtonLink>
    </FloatingNav>
  );
}
