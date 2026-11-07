"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { useFundAction } from "@/lib/fund/use-fund";
import { demoCopy } from "../copy";

/** Restores the demo data so the walkthrough can be repeated from the start. */
export function ResetDemoButton() {
  const reset = useFundAction((client) => client.reset());

  return (
    <div>
      <Button variant="soft" fullWidth loading={reset.isPending} onClick={() => reset.mutate(undefined)}>
        <RotateCcw className="size-4" aria-hidden="true" />
        {reset.isPending ? demoCopy.resetting : demoCopy.reset}
      </Button>
      <p className="mt-2 text-xs leading-relaxed text-ink-faint">{demoCopy.resetHint}</p>
    </div>
  );
}
