"use client";

import { Clock, ShieldCheck, ShieldOff } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { useNow } from "@/lib/clock/use-now";
import { formatCountdown } from "@/lib/format/time";
import { policyStatus } from "@/lib/fund/rules";
import type { Policy } from "@/lib/fund/types";
import { policiesCopy } from "../copy";

/** Status of a policy right now. The waiting period counts down live. */
export function PolicyStatusBadge({ policy }: { policy: Policy }) {
  const now = useNow();
  if (now === 0) return null;

  const status = policyStatus(policy, now);

  if (status === "waiting") {
    return (
      <Badge tone="clay">
        <Clock className="size-3.5" aria-hidden="true" />
        {policiesCopy.statusWaiting} · <span className="tabular-nums">{formatCountdown(policy.activeFrom - now)}</span>
      </Badge>
    );
  }
  if (status === "expired") {
    return (
      <Badge tone="ember">
        <ShieldOff className="size-3.5" aria-hidden="true" />
        {policiesCopy.statusExpired}
      </Badge>
    );
  }
  return (
    <Badge tone="canopy">
      <ShieldCheck className="size-3.5" aria-hidden="true" />
      {policiesCopy.statusActive}
    </Badge>
  );
}
