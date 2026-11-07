import type { Metadata } from "next";
import { ProtectWizard } from "@/features/protect";
import { RequireWallet } from "@/features/wallet-session";

export const metadata: Metadata = { title: "Proteger a alguien" };

export default function ProtectPage() {
  return (
    <RequireWallet>
      <ProtectWizard />
    </RequireWallet>
  );
}
