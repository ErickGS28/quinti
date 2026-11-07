import type { Metadata } from "next";
import { ResetDemoButton } from "@/features/demo-mode";
import { VerifierConsole } from "@/features/events";

export const metadata: Metadata = { title: "Consola de verificadores" };

export default function VerifierPage() {
  return (
    <div className="grid gap-10">
      <VerifierConsole />
      <div className="max-w-xs">
        <ResetDemoButton />
      </div>
    </div>
  );
}
