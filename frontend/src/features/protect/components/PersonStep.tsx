import { MapPin } from "lucide-react";
import { OptionCardGroup, type Option } from "@/components/molecules/OptionCardGroup";
import { TextField } from "@/components/molecules/TextField";
import type { Zone } from "@/lib/fund/types";
import { protectCopy } from "../copy";
import type { ProtectErrors, ProtectForm } from "../types";

type PersonStepProps = {
  form: ProtectForm;
  errors: ProtectErrors;
  zones: Zone[];
  onChange: (changes: Partial<ProtectForm>) => void;
};

export function PersonStep({ form, errors, zones, onChange }: PersonStepProps) {
  const zoneOptions: Option<number>[] = zones.map((zone) => ({
    value: zone.id,
    title: zone.name,
    description: `${zone.division} · ${zone.region}`,
    icon: <MapPin className="size-5" aria-hidden="true" />,
  }));

  return (
    <div className="grid gap-8">
      <TextField
        label={protectCopy.nameLabel}
        placeholder={protectCopy.namePlaceholder}
        autoComplete="off"
        value={form.name}
        error={errors.name}
        onChange={(event) => onChange({ name: event.target.value })}
      />
      <div>
        <p className="mb-1 text-sm font-semibold text-ink">{protectCopy.zoneLegend}</p>
        <p className="mb-3 text-sm text-ink-soft">{protectCopy.zoneHint}</p>
        <OptionCardGroup
          legend={protectCopy.zoneLegend}
          options={zoneOptions}
          value={form.zoneId}
          onChange={(zoneId) => onChange({ zoneId })}
        />
        {errors.zone && (
          <p role="alert" className="mt-3 text-sm font-medium text-ember">
            {errors.zone}
          </p>
        )}
      </div>
    </div>
  );
}
