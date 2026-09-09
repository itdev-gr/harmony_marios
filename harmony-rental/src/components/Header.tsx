"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

// Short labels only in the nav — never the SEO-title-length menu items from
// the old site (legacy bug #29).
const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/apartments", key: "apartments" },
  { href: "/experiences", key: "experiences" },
  { href: "/owners", key: "owners" },
  { href: "/journal", key: "journal" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const tA11y = useTranslations("a11y");

  return (
    <header className="sticky top-0 z-40 border-b border-mist bg-sand/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="font-display text-xl tracking-tight text-sea">
          Harmony Rental
        </Link>

        <nav aria-label={tA11y("mainNav")} className="hidden items-center gap-8 text-sm font-medium md:flex">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="text-ink/80 transition hover:text-terracotta">
              {tNav(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <LocaleSwitcher />
          <Link
            href="/apartments"
            className="rounded-full bg-terracotta px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-terracotta/90"
          >
            {tCommon("bookNow")}
          </Link>
        </div>

        {/* Mobile disclosure menu — plain <details>, no JS library. */}
        <details className="relative md:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-mist px-4 py-2 text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
            <span aria-hidden="true" className="flex flex-col gap-1">
              <span className="h-0.5 w-4 bg-ink" />
              <span className="h-0.5 w-4 bg-ink" />
              <span className="h-0.5 w-4 bg-ink" />
            </span>
            {tCommon("menu")}
          </summary>

          <div className="absolute right-0 z-50 mt-3 w-64 rounded-2xl border border-mist bg-paper p-5 shadow-lg">
            <nav aria-label={tA11y("mobileNav")} className="flex flex-col gap-3 text-sm font-medium">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} className="text-ink/80 transition hover:text-terracotta">
                  {tNav(item.key)}
                </Link>
              ))}
            </nav>

            <div className="mt-5 flex items-center justify-between border-t border-mist pt-5">
              <LocaleSwitcher />
              <Link
                href="/apartments"
                className="rounded-full bg-terracotta px-4 py-2 text-sm font-medium text-paper transition hover:bg-terracotta/90"
              >
                {tCommon("bookNow")}
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
