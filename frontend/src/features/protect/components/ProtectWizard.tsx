"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import { Skeleton } from "@/components/atoms/Skeleton";
import { ErrorState } from "@/components/molecules/ErrorState";
import { findZone } from "@/lib/fund/catalog";
import { useFundSnapshot } from "@/lib/fund/use-fund";
import { useWallet } from "@/lib/wallet/use-wallet";
import { protectCopy } from "../copy";
import { FIRST_STEP, LAST_STEP } from "../constants";
import { useProtectForm } from "../hooks/useProtectForm";
import { CoverageStep } from "./CoverageStep";
import { DestinationStep } from "./DestinationStep";
import { PersonStep } from "./PersonStep";
import { ProtectIntro } from "./ProtectIntro";
import { ReviewSheet } from "./ReviewSheet";
import { StepIndicator } from "./StepIndicator";

const STEP_TITLES = {
  1: protectCopy.personTitle,
  2: protectCopy.coverageTitle,
  3: protectCopy.destinationTitle,
} as const;

/** Three short steps, then a confirmation sheet. Requires a connected wallet. */
export function ProtectWizard() {
  const { address } = useWallet();
  const snapshot = useFundSnapshot();
  const { form, step, errors, update, advance, goBack, restart } = useProtectForm();
  const [reviewOpen, setReviewOpen] = useState(false);

  if (snapshot.isPending) return <Skeleton className="h-96 w-full rounded-card" />;

  if (snapshot.isError) {
    return (
      <Card>
        <ErrorState
          title={protectCopy.loadErrorTitle}
          description={protectCopy.loadErrorBody}
          retryLabel={protectCopy.retry}
          onRetry={() => void snapshot.refetch()}
        />
      </Card>
    );
  }

  const { config } = snapshot.data;
  const zone = form.zoneId === null ? undefined : findZone(config.zones, form.zoneId);

  function handleContinue() {
    if (advance()) setReviewOpen(true);
  }

  function handleFinished() {
    setReviewOpen(false);
    restart();
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-tight">{protectCopy.title}</h1>
      <p className="mt-2 max-w-xl text-pretty text-lg text-ink-soft">{protectCopy.subtitle}</p>

      <ProtectIntro />

      <Card padding="lg" className="mt-6">
        <StepIndicator step={step} />
        <h2 className="mt-6 text-2xl font-semibold tracking-tight">{STEP_TITLES[step]}</h2>

        <div className="mt-6">
          {step === 1 && <PersonStep form={form} errors={errors} zones={config.zones} onChange={update} />}
          {step === 2 && <CoverageStep form={form} config={config} onChange={update} />}
          {step === 3 && <DestinationStep form={form} errors={errors} onChange={update} />}
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          {step > FIRST_STEP ? (
            <Button variant="ghost" onClick={goBack}>
              {protectCopy.back}
            </Button>
          ) : (
            <span />
          )}
          <Button size="lg" onClick={handleContinue}>
            {step === LAST_STEP ? protectCopy.review : protectCopy.next}
          </Button>
        </div>
      </Card>

      {address && (
        <ReviewSheet
          open={reviewOpen}
          form={form}
          config={config}
          zoneName={zone?.name ?? ""}
          sponsorAddress={address}
          onClose={() => setReviewOpen(false)}
          onFinished={handleFinished}
        />
      )}
    </div>
  );
}
