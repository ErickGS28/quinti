"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Ripple } from "@/components/atoms/Ripple";
import { InlineNotice } from "@/components/molecules/InlineNotice";
import { TextField } from "@/components/molecules/TextField";
import { Sheet } from "@/components/organisms/Sheet";
import { formatAmount, parseAmount, toBaseUnits } from "@/lib/format/amount";
import { describeFundError } from "@/lib/fund/errors";
import { useFundAction } from "@/lib/fund/use-fund";
import { classNames } from "@/lib/ui/class-names";
import { poolCopy } from "../copy";

const PRESET_AMOUNTS = [10, 25, 50, 100];

type ContributeSheetProps = {
  open: boolean;
  donor: string | null;
  onClose: () => void;
};

type Contribution = { donor: string; amount: bigint };

/** Lets anyone add funds to the pool without buying coverage. */
export function ContributeSheet({ open, donor, onClose }: ContributeSheetProps) {
  const [text, setText] = useState("");
  const [showError, setShowError] = useState(false);
  const contribute = useFundAction((client, input: Contribution) => client.contribute(input.donor, input.amount));

  const amount = parseAmount(text);
  const invalid = amount === null || amount <= 0n;

  function submit() {
    if (invalid || !donor) {
      setShowError(true);
      return;
    }
    contribute.mutate({ donor, amount });
  }

  function close() {
    contribute.reset();
    setText("");
    setShowError(false);
    onClose();
  }

  return (
    <Sheet
      open={open}
      onClose={close}
      dismissible={!contribute.isPending}
      closeLabel={poolCopy.close}
      title={contribute.isSuccess ? poolCopy.successTitle : poolCopy.sheetTitle}
      description={contribute.isSuccess ? undefined : poolCopy.sheetBody}
    >
      {contribute.isSuccess && amount ? (
        <div className="text-center">
          <div className="relative mx-auto size-28">
            <Ripple tone="canopy" rings={3} />
            <span className="absolute inset-[30%] flex items-center justify-center rounded-full bg-canopy text-on-canopy">
              <Check className="size-7" aria-hidden="true" />
            </span>
          </div>
          <p className="mt-4 text-ink-soft">{poolCopy.successBody(formatAmount(amount))}</p>
          <Button size="lg" fullWidth className="mt-8" onClick={close}>
            {poolCopy.successAction}
          </Button>
        </div>
      ) : (
        <div className="grid gap-5">
          <fieldset>
            <legend className="sr-only">{poolCopy.presetsLegend}</legend>
            <div className="flex gap-2">
              {PRESET_AMOUNTS.map((preset) => {
                const selected = amount === toBaseUnits(preset);
                return (
                  <button
                    key={preset}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      setText(String(preset));
                      setShowError(false);
                    }}
                    className={classNames(
                      "min-h-11 flex-1 cursor-pointer rounded-control text-sm font-semibold tabular-nums transition-colors duration-200",
                      selected ? "bg-leaf text-on-leaf" : "bg-canopy-soft text-canopy-deep hover:bg-canopy-soft/60",
                    )}
                  >
                    {preset}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <TextField
            label={poolCopy.amountLabel}
            hint={poolCopy.amountHint}
            error={showError && invalid ? poolCopy.amountError : null}
            inputMode="decimal"
            autoComplete="off"
            placeholder="0,00"
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              setShowError(false);
            }}
          />

          {contribute.isError && <InlineNotice tone="error">{describeFundError(contribute.error)}</InlineNotice>}

          <Button size="lg" fullWidth loading={contribute.isPending} onClick={submit}>
            {poolCopy.confirm}
          </Button>
        </div>
      )}
    </Sheet>
  );
}
