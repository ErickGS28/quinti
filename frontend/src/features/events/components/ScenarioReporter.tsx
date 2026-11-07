"use client";

import { Activity } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import { InlineNotice } from "@/components/molecules/InlineNotice";
import { OptionCardGroup, type Option } from "@/components/molecules/OptionCardGroup";
import { nowSeconds } from "@/lib/clock/now";
import { reportFromScenario, SCENARIOS } from "@/lib/fund/catalog";
import { describeFundError } from "@/lib/fund/errors";
import type { Attester } from "@/lib/fund/types";
import { eventsCopy } from "../copy";
import { useReportEvent } from "../hooks/useEventActions";

const SCENARIO_OPTIONS: Option<string>[] = SCENARIOS.map((scenario) => ({
  value: scenario.id,
  title: scenario.title,
  description: scenario.summary,
  icon: <Activity className="size-5" aria-hidden="true" />,
}));

type ScenarioReporterProps = {
  firstAttester: Attester;
  /** Used to give every simulated event a unique reference. */
  eventCount: number;
};

/** Step 1 of the demo: the first attester reports a simulated event. */
export function ScenarioReporter({ firstAttester, eventCount }: ScenarioReporterProps) {
  const [scenarioId, setScenarioId] = useState<string>(SCENARIOS[0].id);
  const report = useReportEvent();

  function submit() {
    const scenario = SCENARIOS.find((item) => item.id === scenarioId);
    if (!scenario) return;
    report.mutate({
      attesterId: firstAttester.id,
      report: reportFromScenario(scenario, nowSeconds(), eventCount + 1),
    });
  }

  return (
    <Card padding="lg">
      <h2 className="text-xl font-semibold tracking-tight">{eventsCopy.reportTitle}</h2>
      <OptionCardGroup
        legend={eventsCopy.reportLegend}
        options={SCENARIO_OPTIONS}
        value={scenarioId}
        onChange={setScenarioId}
        className="mt-5"
      />
      {report.isError && (
        <InlineNotice tone="error" className="mt-4">
          {describeFundError(report.error)}
        </InlineNotice>
      )}
      <Button size="lg" className="mt-6" loading={report.isPending} onClick={submit}>
        {eventsCopy.reportAction}
      </Button>
    </Card>
  );
}
