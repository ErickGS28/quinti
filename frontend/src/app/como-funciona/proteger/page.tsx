import type { Metadata } from "next";
import { FlowPage } from "@/features/flows";

export const metadata: Metadata = { title: "Cómo funciona proteger a alguien" };

export default function HowToProtectPage() {
  return <FlowPage flow="protect" />;
}
