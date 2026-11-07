"use client";

import { MapPin } from "lucide-react";
import { Card } from "@/components/atoms/Card";
import { Ripple } from "@/components/atoms/Ripple";
import { AddressChip } from "@/components/molecules/AddressChip";
import { formatAmount } from "@/lib/format/amount";
import { formatDate } from "@/lib/format/time";
import { useNow } from "@/lib/clock/use-now";
import { policyStatus } from "@/lib/fund/rules";
import { policiesCopy } from "../copy";
import type { PolicyView } from "../types";
import { PolicyStatusBadge } from "./PolicyStatusBadge";

type PolicyCardProps = {
  view: PolicyView;
  ownAddress: string;
};

function destinationLabel(payoutTo: string, ownAddress: string): string {
  return payoutTo === ownAddress ? policiesCopy.payoutToYou : policiesCopy.payoutToRelative;
}

/** One protected person: who, where, how much, where the money goes and what happened. */
export function PolicyCard({ view, ownAddress }: PolicyCardProps) {
  const { policy, zoneName, zoneRegion, premium, payouts } = view;
  const now = useNow();
  const paidTotal = payouts.reduce((total, payout) => total + payout.amount, 0n);
  const waiting = now > 0 && policyStatus(policy, now) === "waiting";

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">{policy.beneficiaryName}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft">
              <MapPin className="size-4 shrink-0" aria-hidden="true" />
              <span>{zoneRegion ? `${zoneName}, ${zoneRegion}` : zoneName}</span>
            </p>
          </div>
          <PolicyStatusBadge policy={policy} />
        </div>

        <p className="mt-6 text-sm text-ink-soft">{policiesCopy.coverage}</p>
        <p className="text-4xl font-semibold tracking-tight tabular-nums">{formatAmount(policy.coverage, { fractionDigits: 0 })}</p>

        <dl className="mt-6 grid gap-4 border-t border-hairline pt-5 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-ink-soft">{policiesCopy.payoutTo}</dt>
            <dd className="mt-1.5 flex flex-col items-start gap-1.5">
              <span className="font-semibold">{destinationLabel(policy.payoutTo, ownAddress)}</span>
              <AddressChip address={policy.payoutTo} />
            </dd>
          </div>
          <div>
            <dt className="text-ink-soft">{policiesCopy.monthlyPremium}</dt>
            <dd className="mt-1.5 font-semibold tabular-nums">{formatAmount(premium)}</dd>
          </div>
          <div>
            <dt className="text-ink-soft">{policiesCopy.coveredUntil}</dt>
            <dd className="mt-1.5 font-semibold">{formatDate(policy.coveredUntil)}</dd>
          </div>
        </dl>

        {waiting && <p className="mt-5 rounded-control bg-clay-soft p-3 text-sm text-clay">{policiesCopy.waitingNote}</p>}
      </div>

      {paidTotal > 0n && (
        <div className="relative overflow-hidden bg-canopy-soft px-5 py-5 text-canopy-strong sm:px-6">
          <div className="absolute -right-10 top-1/2 size-40 -translate-y-1/2">
            <Ripple tone="canopy" rings={3} />
          </div>
          <p className="relative text-sm font-semibold">{policiesCopy.paidTitle}</p>
          <p className="relative mt-1 text-2xl font-semibold tabular-nums">{formatAmount(paidTotal)}</p>
          <p className="relative mt-1 text-sm">{policiesCopy.paidBody}</p>
        </div>
      )}
    </Card>
  );
}
