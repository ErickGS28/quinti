import { redirect } from "next/navigation";
import { LANDING_SECTIONS, ROUTES } from "@/config/constants";

/** There is no index of guides: send visitors to the section of the landing page that links to them. */
export default function HowItWorksIndex() {
  redirect(`${ROUTES.landing}#${LANDING_SECTIONS.ways}`);
}
