import { SegmentedControl } from "@/components/molecules/SegmentedControl";
import { formatAmount, toBaseUnits } from "@/lib/format/amount";
import { formatHazardValue, hazardName } from "@/lib/fund/catalog";
import { claimAmount, premiumFor } from "@/lib/fund/rules";
import type { FundConfig } from "@/lib/fund/types";
import { BASIS_POINTS } from "@/config/constants";
import { protectCopy } from "../copy";
import { COVERAGE_OPTIONS } from "../constants";
import type { ProtectForm } from "../types";

type CoverageStepProps = {
  form: ProtectForm;
  config: FundConfig;
  onChange: (changes: Partial<ProtectForm>) => void;
};

export function CoverageStep({ form, config, onChange }: CoverageStepProps) {
  const coverage = toBaseUnits(form.coverage);
  const segments = COVERAGE_OPTIONS.filter(
    (option) => toBaseUnits(option) >= config.minCoverage && toBaseUnits(option) <= config.maxCoverage,
  ).map((option) => ({ value: option, label: String(option) }));

  const rules = [...config.rules].sort((a, b) => a.minValue - b.minValue);

  return (
    <div className="grid gap-8">
      <div>
        <p className="mb-3 text-sm font-semibold text-ink">{protectCopy.coverageLegend} (USDC)</p>
        <SegmentedControl
          legend={protectCopy.coverageLegend}
          segments={segments}
          value={form.coverage}
          onChange={(value) => onChange({ coverage: value })}
        />
        <p className="mt-3 text-sm text-ink-soft">{protectCopy.coverageHint}</p>
      </div>

      <div className="rounded-control bg-mist p-5">
        <p className="text-sm text-ink-soft">{protectCopy.premiumLabel}</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight tabular-nums">
          {formatAmount(premiumFor(coverage, config.premiumBps))}
        </p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-ink">{protectCopy.payoutsTitle}</h3>
        <ul className="mt-3 divide-y divide-hairline rounded-control ring-1 ring-inset ring-hairline">
          {rules.map((rule) => (
            <li key={`${rule.hazard}-${rule.minValue}`} className="flex items-center justify-between gap-4 px-4 py-3.5">
              <span className="text-ink-soft">
                {hazardName(rule.hazard)} desde{" "}
                <span className="font-semibold text-ink">{formatHazardValue(rule.hazard, rule.minValue)}</span>
              </span>
              <span className="font-semibold tabular-nums text-canopy-strong">
                {formatAmount(claimAmount(coverage, rule.payoutBps, BASIS_POINTS), { fractionDigits: 0 })}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-ink-soft">{protectCopy.payoutsNote}</p>
      </div>
    </div>
  );
}
