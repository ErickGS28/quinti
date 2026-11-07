"use client";

import { Plus, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import { Skeleton } from "@/components/atoms/Skeleton";
import { EmptyState } from "@/components/molecules/EmptyState";
import { ErrorState } from "@/components/molecules/ErrorState";
import { ROUTES } from "@/config/constants";
import { useWallet } from "@/lib/wallet/use-wallet";
import { policiesCopy } from "../copy";
import { useMyPolicies } from "../hooks/useMyPolicies";
import { PolicyCard } from "./PolicyCard";

/** Home of the app: the people the connected wallet protects. */
export function MyPolicies() {
  const { address } = useWallet();
  const { policies, isLoading, isError, refetch } = useMyPolicies(address);

  return (
    <section aria-labelledby="my-policies-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 id="my-policies-title" className="text-4xl font-semibold tracking-tight">
            {policiesCopy.title}
          </h1>
          <p className="mt-2 max-w-xl text-pretty text-lg text-ink-soft">{policiesCopy.subtitle}</p>
        </div>
        <ButtonLink href={ROUTES.protect}>
          <Plus className="size-4" aria-hidden="true" />
          {policiesCopy.protectAction}
        </ButtonLink>
      </div>

      <div className="mt-8 grid gap-5">
        {isLoading && <Skeleton className="h-72 w-full rounded-card" />}

        {isError && (
          <Card>
            <ErrorState
              title={policiesCopy.loadErrorTitle}
              description={policiesCopy.loadErrorBody}
              retryLabel={policiesCopy.retry}
              onRetry={() => void refetch()}
            />
          </Card>
        )}

        {!isLoading && !isError && policies.length === 0 && (
          <Card>
            <EmptyState
              icon={<ShieldCheck className="size-7" aria-hidden="true" />}
              title={policiesCopy.emptyTitle}
              description={policiesCopy.emptyBody}
              action={<ButtonLink href={ROUTES.protect}>{policiesCopy.protectAction}</ButtonLink>}
            />
          </Card>
        )}

        {address &&
          policies.map((view) => <PolicyCard key={view.policy.id} view={view} ownAddress={address} />)}
      </div>
    </section>
  );
}
