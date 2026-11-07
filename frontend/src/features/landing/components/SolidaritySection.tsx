import { SectionHeading } from "@/components/molecules/SectionHeading";
import { landingCopy } from "../copy";

const { solidarity } = landingCopy;

/** Decorative network: many territories, one shared fund. Positions are percentages of the box. */
const NODES = [
  { x: 50, y: 50, size: 22, tone: "fill-canopy" },
  { x: 18, y: 28, size: 11, tone: "fill-leaf" },
  { x: 82, y: 24, size: 12, tone: "fill-sky" },
  { x: 24, y: 78, size: 12, tone: "fill-sky" },
  { x: 78, y: 74, size: 11, tone: "fill-leaf" },
  { x: 50, y: 12, size: 8, tone: "fill-mint" },
  { x: 92, y: 52, size: 8, tone: "fill-mint" },
  { x: 8, y: 54, size: 8, tone: "fill-mint" },
];

function NetworkIllustration() {
  const [center, ...others] = NODES;
  return (
    <svg viewBox="0 0 100 90" className="h-auto w-full" aria-hidden="true">
      {others.map((node) => (
        <line
          key={`${node.x}-${node.y}`}
          x1={center.x}
          y1={center.y * 0.9}
          x2={node.x}
          y2={node.y * 0.9}
          className="stroke-canopy/40"
          strokeWidth="0.5"
        />
      ))}
      {others.map((node) => (
        <circle key={`halo-${node.x}-${node.y}`} cx={node.x} cy={node.y * 0.9} r={node.size * 0.75} className="fill-canopy/10" />
      ))}
      {NODES.map((node) => (
        <circle key={`${node.x}-${node.y}`} cx={node.x} cy={node.y * 0.9} r={node.size / 2} className={node.tone} />
      ))}
    </svg>
  );
}

export function SolidaritySection() {
  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading eyebrow={solidarity.eyebrow} title={solidarity.title} description={solidarity.body} />
            <ul className="mt-10 grid gap-6">
              {solidarity.points.map((point) => (
                <li key={point.title} className="flex gap-4">
                  <span aria-hidden="true" className="mt-2 size-2.5 shrink-0 rounded-full bg-canopy" />
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{point.title}</h3>
                    <p className="mt-1 text-pretty leading-relaxed text-ink-soft">{point.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-sheet bg-cloud p-8 shadow-card">
            <NetworkIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
