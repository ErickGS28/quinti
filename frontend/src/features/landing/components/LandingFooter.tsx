import { BrandLogo } from "@/components/molecules/BrandLogo";
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
          <p className="mt-2 text-pretty text-ink-faint">{footer.legal}</p>
        </div>
      </div>
    </footer>
  );
}
