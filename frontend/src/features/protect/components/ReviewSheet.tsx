"use client";

import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { Button, ButtonLink } from "@/components/atoms/Button";
import { Ripple } from "@/components/atoms/Ripple";
import { AddressChip } from "@/components/molecules/AddressChip";
import { InlineNotice } from "@/components/molecules/InlineNotice";
import { Sheet } from "@/components/organisms/Sheet";
import { ROUTES } from "@/config/constants";
import { formatAmount, toBaseUnits } from "@/lib/format/amount";
import { describeDuration } from "@/lib/format/time";
import { describeFundError } from "@/lib/fund/errors";
import { premiumFor } from "@/lib/fund/rules";
import type { EnrollInput, FundConfig } from "@/lib/fund/types";
import { useFundAction } from "@/lib/fund/use-fund";
import { protectCopy } from "../copy";
import { resolvePayoutAddress } from "../services/validate-step";
import type { ProtectForm } from "../types";

type ReviewSheetProps = {
  open: boolean;
  form: ProtectForm;
  config: FundConfig;
  zoneName: string;
  sponsorAddress: string;
  onClose: () => void;
  /** Called after a successful enrollment once the user dismisses the confirmation. */
  onFinished: () => void;
};

function SummaryRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="text-right font-semibold">{children}</dd>
    </div>
  );
}

/** Last look before paying. Shows the exact consequences, then the result of the enrollment. */
export function ReviewSheet({ open, form, config, zoneName, sponsorAddress, onClose, onFinished }: ReviewSheetProps) {
  const enroll = useFundAction((client, input: EnrollInput) => client.enroll(input));

  const coverage = toBaseUnits(form.coverage);
  const payoutTo = resolvePayoutAddress(form, sponsorAddress);
  const name = form.name.trim();

  function submit() {
    if (form.zoneId === null) return;
    enroll.mutate({
      sponsor: sponsorAddress,
      beneficiaryName: name,
      zoneId: form.zoneId,
      coverage,
      payoutTo,
    });
  }

  function close() {
    const finished = enroll.isSuccess;
    enroll.reset();
    if (finished) onFinished();
    else onClose();
  }

  return (
    <Sheet
      open={open}
      onClose={close}
      dismissible={!enroll.isPending}
      closeLabel={protectCopy.close}
      title={enroll.isSuccess ? protectCopy.successTitle(name) : protectCopy.sheetTitle}
      description={enroll.isSuccess ? undefined : protectCopy.sheetBody}
    >
      {enroll.isSuccess ? (
        <div className="text-center">
          <div className="relative mx-auto size-28">
            <Ripple tone="canopy" rings={3} />
            <span className="absolute inset-[30%] flex items-center justify-center rounded-full bg-canopy text-on-canopy">
              <Check className="size-7" aria-hidden="true" />
            </span>
          </div>
          <p className="mx-auto mt-4 max-w-sm text-pretty text-ink-soft">{protectCopy.successBody}</p>
          <ButtonLink href={ROUTES.home} size="lg" className="mt-8" fullWidth onClick={close}>
            {protectCopy.successAction}
          </ButtonLink>
        </div>
      ) : (
        <div>
          <dl className="divide-y divide-hairline">
            <SummaryRow label={protectCopy.summaryPerson}>{name}</SummaryRow>
            <SummaryRow label={protectCopy.summaryZone}>{zoneName}</SummaryRow>
            <SummaryRow label={protectCopy.summaryCoverage}>
              <span className="tabular-nums">{formatAmount(coverage, { fractionDigits: 0 })}</span>
            </SummaryRow>
            <SummaryRow label={protectCopy.summaryDestination}>
              <span className="flex flex-col items-end gap-1">
                {form.destination === "sponsor" ? protectCopy.destinationYou : protectCopy.destinationOther}
                <AddressChip address={payoutTo} />
              </span>
            </SummaryRow>
            <SummaryRow label={protectCopy.summaryPremium}>
              <span className="tabular-nums">{formatAmount(premiumFor(coverage, config.premiumBps))}</span>
            </SummaryRow>
            <SummaryRow label={protectCopy.summaryWaiting}>{describeDuration(config.waitingSeconds)}</SummaryRow>
          </dl>

          <p className="mt-4 text-sm text-ink-soft">{protectCopy.summaryLocked}</p>

          {enroll.isError && (
            <InlineNotice tone="error" className="mt-5">
              {describeFundError(enroll.error)}
            </InlineNotice>
          )}

          <Button size="lg" fullWidth className="mt-6" loading={enroll.isPending} onClick={submit}>
            {protectCopy.confirm}
          </Button>
        </div>
      )}
    </Sheet>
  );
}
