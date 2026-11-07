import { BrandLogo } from "@/components/molecules/BrandLogo";
import { REPOSITORY_URL } from "@/config/constants";
import { landingCopy } from "../copy";

const { footer } = landingCopy;

export function LandingFooter() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div>
          <BrandLogo />
          <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-ink-soft">{footer.origin}</p>
        </div>
        <div className="max-w-sm text-sm text-ink-soft md:text-right">
          <p>{footer.credit}</p>
          <a
            href={REPOSITORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-11 items-center font-semibold text-lagoon underline-offset-4 hover:underline"
          >
            {footer.repository}
          </a>
          <p className="mt-2 text-pretty text-ink-faint">{footer.legal}</p>
        </div>
      </div>
    </footer>
  );
}
