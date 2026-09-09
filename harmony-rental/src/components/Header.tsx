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

const navLink =
  "font-display text-sm font-semibold text-neutral-950 transition hover:text-link-hover";

export function Header() {
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const tA11y = useTranslations("a11y");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        {/* Wordmark stays one text node — the green dot is decoration, not a
            character, so the mark reads as "Harmony Rental" everywhere. */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-1.5 font-display text-xl font-extrabold tracking-tight text-neutral-950"
        >
          Harmony Rental
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand" />
        </Link>

        <nav
          aria-label={tA11y("mainNav")}
          className="hidden flex-1 items-center justify-center gap-7 md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className={navLink}>
              {tNav(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-5 md:flex">
          <LocaleSwitcher />
          <Link href="/apartments" className="btn-primary btn-sm">
            {tCommon("bookNow")}
          </Link>
        </div>

        {/* Mobile disclosure menu — plain <details>, no JS library. */}
        <details className="relative md:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-line px-4 py-2 font-display text-sm font-semibold text-neutral-950 [&::-webkit-details-marker]:hidden">
            <span aria-hidden="true" className="flex flex-col gap-1">
              <span className="h-0.5 w-4 bg-neutral-950" />
              <span className="h-0.5 w-4 bg-neutral-950" />
              <span className="h-0.5 w-4 bg-neutral-950" />
            </span>
            {tCommon("menu")}
          </summary>

          <div className="absolute right-0 z-50 mt-3 w-64 rounded-2xl border border-line bg-white p-5 shadow-card">
            <nav aria-label={tA11y("mobileNav")} className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} className={navLink}>
                  {tNav(item.key)}
                </Link>
              ))}
            </nav>

            <div className="mt-5 flex items-center justify-between border-t border-line pt-5">
              <LocaleSwitcher />
              <Link href="/apartments" className="btn-primary btn-sm">
                {tCommon("bookNow")}
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
