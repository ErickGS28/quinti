import { HandCoins } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import { ProgressBar } from "@/components/atoms/ProgressBar";
import { BASIS_POINTS } from "@/config/constants";
import { formatAmount, formatBasisPoints } from "@/lib/format/amount";
import { poolCopy } from "../copy";
import type { FundOverview } from "../types";

type PoolSummaryProps = {
  overview: FundOverview;
  onContribute: () => void;
};

/** The one number that matters (what is available), and whether it is enough for the worst case. */
export function PoolSummary({ overview, onContribute }: PoolSummaryProps) {
  const full = overview.worstCaseFactorBps >= BASIS_POINTS;
  const percent = overview.worstCaseFactorBps / 100;

  return (
    <Card padding="lg">
      <p className="text-sm font-semibold text-ink-soft">{poolCopy.available}</p>
      <p className="mt-2 text-5xl font-semibold tracking-tight tabular-nums sm:text-6xl">
        {formatAmount(overview.poolAvailable)}
      </p>
      <p className="mt-3 text-ink-soft">
        {poolCopy.summary(overview.policyCount, formatAmount(overview.totalCoverage, { fractionDigits: 0 }))}
      </p>

      <div className="mt-8">
        <ProgressBar
          value={percent}
          tone={full ? "canopy" : "clay"}
          label={poolCopy.worstCaseLabel}
        />
        <p className="mt-3 text-sm text-ink-soft">
          {full ? poolCopy.worstCaseFull : poolCopy.worstCasePartial(formatBasisPoints(overview.worstCaseFactorBps))}
        </p>
      </div>

      <Button variant="soft" size="lg" className="mt-8" onClick={onContribute}>
        <HandCoins className="size-5" aria-hidden="true" />
        {poolCopy.contribute}
      </Button>
    </Card>
  );
}
