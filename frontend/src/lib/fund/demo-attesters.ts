import { demoAddress } from "@/lib/demo/demo-address";
import type { Attester } from "./types";

/** Trusted accounts of the demo fund. Real attesters are fixed when the contract is initialized. */
export const DEMO_ATTESTERS: Attester[] = [
  { id: "attester-1", label: "Verificador 1", address: demoAddress("quintti-demo-attester-1") },
  { id: "attester-2", label: "Verificador 2", address: demoAddress("quintti-demo-attester-2") },
  { id: "attester-3", label: "Verificador 3", address: demoAddress("quintti-demo-attester-3") },
];
