import type { Metadata } from "next";
import { MyPolicies } from "@/features/policies";
import { RequireWallet } from "@/features/wallet-session";

export const metadata: Metadata = { title: "Tus protecciones" };

export default function HomePage() {
  return (
    <RequireWallet>
      <MyPolicies />
    </RequireWallet>
  );
}
