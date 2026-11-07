import { HeartHandshake, Radar, ShieldCheck, Waves } from "lucide-react";
import { BrandLogo } from "@/components/molecules/BrandLogo";
import { AppShell, type NavItem } from "@/components/templates/AppShell";
import { ROUTES } from "@/config/constants";
import { ConnectWalletButton } from "@/features/wallet-session";

const NAV_ITEMS: NavItem[] = [
  { href: ROUTES.home, label: "Inicio", icon: <ShieldCheck />, exact: true },
  { href: ROUTES.protect, label: "Proteger", icon: <HeartHandshake /> },
  { href: ROUTES.fund, label: "Fondo", icon: <Waves /> },
  { href: ROUTES.verifier, label: "Verificadores", icon: <Radar /> },
];

export default function AppLayout({ children }: LayoutProps<"/app">) {
  return (
    <AppShell
      brand={<BrandLogo size="lg" />}
      brandLabel="Quintti, ir a la página principal"
      homeHref={ROUTES.landing}
      navItems={NAV_ITEMS}
      navLabel="Navegación principal"
      scrollTopLabel="Volver arriba"
      headerAction={<ConnectWalletButton />}
    >
      {children}
    </AppShell>
  );
}
