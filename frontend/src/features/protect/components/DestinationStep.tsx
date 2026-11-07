import { HeartHandshake, UserRound, Wallet } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { InlineNotice } from "@/components/molecules/InlineNotice";
import { OptionCardGroup, type Option } from "@/components/molecules/OptionCardGroup";
import { TextField } from "@/components/molecules/TextField";
import { DEMO_RELATIVE } from "@/lib/demo/demo-people";
import { protectCopy } from "../copy";
import type { Destination, ProtectErrors, ProtectForm } from "../types";

type DestinationStepProps = {
  form: ProtectForm;
  errors: ProtectErrors;
  onChange: (changes: Partial<ProtectForm>) => void;
};

const OPTIONS: Option<Destination>[] = [
  {
    value: "relative",
    title: protectCopy.destinationRelativeTitle,
    description: protectCopy.destinationRelativeBody,
    icon: <HeartHandshake className="size-5" aria-hidden="true" />,
  },
  {
    value: "sponsor",
    title: protectCopy.destinationSponsorTitle,
    description: protectCopy.destinationSponsorBody,
    icon: <Wallet className="size-5" aria-hidden="true" />,
  },
  {
    value: "beneficiary",
    title: protectCopy.destinationBeneficiaryTitle,
    description: protectCopy.destinationBeneficiaryBody,
    icon: <UserRound className="size-5" aria-hidden="true" />,
  },
];

export function DestinationStep({ form, errors, onChange }: DestinationStepProps) {
  const needsAddress = form.destination !== "sponsor";

  return (
    <div className="grid gap-6">
      <OptionCardGroup
        legend={protectCopy.destinationLegend}
        options={OPTIONS}
        value={form.destination}
        onChange={(destination) => onChange({ destination })}
      />

      {needsAddress && (
        <div>
          <TextField
            label={protectCopy.addressLabel}
            hint={protectCopy.addressHint}
            error={errors.address}
            mono
            spellCheck={false}
            autoComplete="off"
            placeholder="G…"
            value={form.payoutAddress}
            onChange={(event) => onChange({ payoutAddress: event.target.value })}
          />
          <Button
            variant="ghost"
            className="mt-2 -ml-3"
            onClick={() => onChange({ payoutAddress: DEMO_RELATIVE.address })}
          >
            {protectCopy.useExample(DEMO_RELATIVE.name)}
          </Button>
        </div>
      )}

      <InlineNotice tone="warning">{protectCopy.destinationWarning}</InlineNotice>
    </div>
  );
}
