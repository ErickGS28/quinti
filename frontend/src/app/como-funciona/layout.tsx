import { PageWash } from "@/components/atoms/PageWash";
import { ScrollToTop } from "@/components/organisms/ScrollToTop";
import { ROUTES } from "@/config/constants";
import { LandingFooter, LandingNav } from "@/features/landing";

export default function HowItWorksLayout({ children }: LayoutProps<"/como-funciona">) {
  return (
    <div className="relative isolate">
      <PageWash />
      <LandingNav homeHref={ROUTES.landing} />
      {children}
      <LandingFooter />
      <ScrollToTop label="Volver arriba" />
    </div>
  );
}
