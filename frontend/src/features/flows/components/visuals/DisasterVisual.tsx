import { Check } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { Ripple } from "@/components/atoms/Ripple";
import { MiniScreen, VisualFrame } from "./VisualFrame";

/** A seismic wave spreading from the affected zone, with the event marked as confirmed. */
export function DisasterVisual() {
  return (
    <VisualFrame>
      <MiniScreen className="flex flex-col items-center text-center">
        <div className="relative size-14">
          <div className="absolute -inset-3">
            <Ripple tone="clay" rings={3} />
          </div>
          <span className="absolute inset-[32%] rounded-full bg-clay" />
        </div>
        <p className="mt-3 font-semibold">Sismo M 6,8 · Chocó</p>
        <Badge tone="canopy" className="mt-2">
          <Check className="size-3" />
          Confirmado
        </Badge>
      </MiniScreen>
    </VisualFrame>
  );
}
