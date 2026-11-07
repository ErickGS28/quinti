"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { classNames } from "@/lib/ui/class-names";
import { FloatingNav } from "../molecules/FloatingNav";
import { ScrollToTop } from "../organisms/ScrollToTop";

export type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
  /** Match the path exactly. Use it for the root item so it is not active on every child page. */
  exact?: boolean;
};

type AppShellProps = {
  /** Large logo shown at the top of the page. */
  brand: ReactNode;
  brandLabel: string;
  homeHref: string;
  navItems: NavItem[];
  navLabel: string;
  scrollTopLabel: string;
  /** Right side of the header, for example the wallet button. */
  headerAction: ReactNode;
  children: ReactNode;
};

function isActive(pathname: string, item: NavItem): boolean {
  if (pathname === item.href) return true;
  return !item.exact && pathname.startsWith(`${item.href}/`);
}

/**
 * Layout of the app: the logo and account sit in the header, and navigation floats in a
 * rounded bar (under the header on large screens, above the bottom edge on phones).
 * It knows nothing about the product; navigation and slots come from the page.
 */
export function AppShell({ brand, brandLabel, homeHref, navItems, navLabel, scrollTopLabel, headerAction, children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-dvh">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 pb-5 pt-6 sm:px-8 sm:pb-6 sm:pt-8">
        <Link href={homeHref} aria-label={brandLabel} className="rounded-control">
          {brand}
        </Link>
        {headerAction}
      </header>

      <FloatingNav label={navLabel} placement="top" className="max-sm:hidden">
        {navItems.map((item) => {
          const active = isActive(pathname, item);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={classNames(
                "flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full px-4 text-[0.9375rem] font-semibold transition-colors duration-200",
                active ? "bg-leaf text-on-leaf" : "text-ink-soft hover:bg-hairline hover:text-ink",
              )}
            >
              <span className="[&>svg]:size-5" aria-hidden="true">
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </FloatingNav>

      <main className="mx-auto w-full max-w-4xl px-4 pb-32 pt-8 sm:px-8 sm:pb-16 sm:pt-10">{children}</main>

      <FloatingNav label={navLabel} placement="bottom" className="sm:hidden">
        {navItems.map((item) => {
          const active = isActive(pathname, item);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={classNames(
                "flex min-h-13 flex-1 flex-col items-center justify-center gap-0.5 rounded-full px-1 text-[0.6875rem] font-semibold transition-colors duration-200",
                active ? "bg-leaf text-on-leaf" : "text-ink-soft",
              )}
            >
              <span className="[&>svg]:size-5" aria-hidden="true">
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </FloatingNav>

      <ScrollToTop label={scrollTopLabel} className="bottom-28 left-4 sm:bottom-6 sm:left-6" />
    </div>
  );
}
