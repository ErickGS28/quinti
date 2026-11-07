import type { CSSProperties } from "react";
import { flowsCopy } from "../copy";
import type { FlowStep } from "../types";
import { VISUALS } from "./visuals";

type FlowTimelineProps = {
  steps: readonly FlowStep[];
};

/**
 * Steps laid out as a timeline: horizontal and centered on wide screens, vertical on small ones.
 * Each step has a numbered node, a short title, one sentence and a mini illustration.
 */
export function FlowTimeline({ steps }: FlowTimelineProps) {
  const count = steps.length;
  const edgeInset = `${50 / count}%`;

  return (
    <div className="relative">
      {/* Horizontal line through the centers of the first and last nodes. */}
      <span
        aria-hidden="true"
        className="absolute top-5 hidden h-0.5 rounded-full bg-linear-to-r from-leaf to-canopy xl:block"
        style={{ left: edgeInset, right: edgeInset }}
      />
      {/* Vertical line for narrow screens. */}
      <span
        aria-hidden="true"
        className="absolute top-5 bottom-0 left-[19px] w-0.5 rounded-full bg-linear-to-b from-leaf to-canopy/10 xl:hidden"
      />

      <ol
        aria-label={flowsCopy.timelineLabel}
        className="relative mx-auto grid max-w-md gap-12 xl:max-w-none xl:grid-cols-[repeat(var(--steps),minmax(0,1fr))] xl:gap-6"
        style={{ "--steps": count } as CSSProperties}
      >
        {steps.map((step, index) => {
          const Visual = VISUALS[step.visual];
          return (
            <li key={step.title} className="relative pl-16 xl:flex xl:flex-col xl:items-center xl:pl-0 xl:text-center">
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 z-10 flex size-10 items-center justify-center rounded-full bg-leaf text-base font-bold text-on-leaf ring-4 ring-canvas xl:static"
              >
                {index + 1}
              </span>
              <h3 className="pt-1.5 text-lg font-semibold tracking-tight xl:mt-5 xl:pt-0">
                <span className="sr-only">{flowsCopy.stepLabel(index + 1)}: </span>
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-pretty text-ink-soft xl:max-w-64">{step.body}</p>
              <div className="mt-5 w-full xl:mt-auto xl:pt-5">
                <Visual />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
