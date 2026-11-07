import Link from "next/link";
import { ROUTES } from "@/config/constants";
import { protectCopy } from "../copy";

/** Plain-language explanation shown before the form, for people who have never used Quinti. */
export function ProtectIntro() {
  return (
    <section aria-labelledby="protect-intro-title" className="mt-8 rounded-card bg-mist p-6 sm:p-7">
      <h2 id="protect-intro-title" className="text-sm font-semibold text-canopy-strong">
        {protectCopy.introTitle}
      </h2>
      <ol className="mt-4 grid gap-3">
        {protectCopy.introSteps.map((text, index) => (
          <li key={text} className="flex gap-3.5">
            <span
              aria-hidden="true"
              className="flex size-6 shrink-0 items-center justify-center rounded-full bg-leaf text-xs font-semibold text-on-leaf"
            >
              {index + 1}
            </span>
            <span className="text-pretty text-ink-soft">{text}</span>
          </li>
        ))}
      </ol>
      <p className="mt-5 border-t border-hairline pt-4 text-sm text-ink-soft">
        {protectCopy.introNote}{" "}
        <Link href={ROUTES.fund} className="font-semibold text-lagoon underline underline-offset-4">
          {protectCopy.introNoteLink}
        </Link>
        .
      </p>
    </section>
  );
}
