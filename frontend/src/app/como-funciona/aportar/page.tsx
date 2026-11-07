import type { Metadata } from "next";
import { FlowPage } from "@/features/flows";

export const metadata: Metadata = { title: "Cómo funciona aportar al fondo" };

export default function HowToContributePage() {
  return <FlowPage flow="contribute" />;
}
