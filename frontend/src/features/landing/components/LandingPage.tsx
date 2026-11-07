import { ScrollToTop } from "@/components/organisms/ScrollToTop";
import { landingCopy } from "../copy";
import { FaqSection } from "./FaqSection";
import { FinalCta } from "./FinalCta";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { LandingFooter } from "./LandingFooter";
import { LandingNav } from "./LandingNav";
import { ProblemSection } from "./ProblemSection";
import { RebuildSection } from "./RebuildSection";
import { SolidaritySection } from "./SolidaritySection";
import { StorySection } from "./StorySection";
import { WaysToHelp } from "./WaysToHelp";
import { WhyStellar } from "./WhyStellar";

/** Presentation page: menu on top, hero right below it. Fully static apart from the scroll button. */
export function LandingPage() {
  return (
    <div className="relative isolate">
      <div aria-hidden="true" className="page-wash pointer-events-none absolute inset-x-0 top-0 -z-10 h-[56rem]" />
      <LandingNav />
      <main>
        <Hero />
        <ProblemSection />
        <RebuildSection />
        <HowItWorks />
        <WaysToHelp />
        <SolidaritySection />
        <StorySection />
        <WhyStellar />
        <FaqSection />
        <FinalCta />
      </main>
      <LandingFooter />
      <ScrollToTop label={landingCopy.nav.scrollTop} />
    </div>
  );
}
