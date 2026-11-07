import { SectionHeading } from "@/components/molecules/SectionHeading";
import { classNames } from "@/lib/ui/class-names";
import { landingCopy } from "../copy";

const { story } = landingCopy;

export function StorySection() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <SectionHeading eyebrow={story.eyebrow} title={story.title} description={story.body} />
          <div>
            <ol className="relative grid gap-8 border-l-2 border-canopy/30 pl-8">
              {story.timeline.map((step, index) => {
                const last = index === story.timeline.length - 1;
                return (
                  <li key={step.when} className="relative">
                    <span
                      aria-hidden="true"
                      className={classNames(
                        "absolute -left-[2.6rem] top-1 size-5 rounded-full ring-4 ring-cloud",
                        last ? "bg-canopy" : "border-2 border-canopy bg-cloud",
                      )}
                    />
                    <p className="text-sm font-semibold text-canopy-strong">{step.when}</p>
                    <p className="mt-1 text-pretty text-lg leading-relaxed">{step.what}</p>
                  </li>
                );
              })}
            </ol>
            <p className="mt-8 text-sm text-ink-faint">{story.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
