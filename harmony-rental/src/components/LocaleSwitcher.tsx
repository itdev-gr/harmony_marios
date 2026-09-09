"use client";

import { Suspense } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link, usePathname } from "@/i18n/navigation";

const LOCALES = [
  { code: "en", label: "EN" },
  { code: "el", label: "ΕΛ" },
] as const;

/**
 * Text-only "EN / ΕΛ" toggle — no flags — that swaps locale on the current
 * path, preserving the query string (e.g. `/apartments?area=alimos` stays
 * `?area=alimos` after switching locale). Reading it needs `useSearchParams`,
 * which Next requires to sit behind a `Suspense` boundary; the fallback
 * renders the same toggle without the query string rather than nothing, so
 * there's no flash of a missing control.
 */
export function LocaleSwitcher() {
  const pathname = usePathname() ?? "/";

  return (
    <Suspense fallback={<LocaleLinks href={pathname} />}>
      <LocaleSwitcherWithQuery />
    </Suspense>
  );
}

function LocaleSwitcherWithQuery() {
  const pathname = usePathname() ?? "/";
  // `useSearchParams` can come back null outside a router context (e.g. a
  // component test that renders `LocaleSwitcher` without the app router) —
  // fall back to no query string rather than throwing.
  const searchParams = useSearchParams();
  const query = searchParams?.toString() ?? "";
  const href = query ? `${pathname}?${query}` : pathname;

  return <LocaleLinks href={href} />;
}

function LocaleLinks({ href }: { href: string }) {
  const locale = useLocale();
  const tA11y = useTranslations("a11y");

  return (
    <div
      aria-label={tA11y("language")}
      className="flex items-center gap-1 font-display text-sm font-semibold tracking-wide"
    >
      {LOCALES.map(({ code, label }, index) => (
        <span key={code} className="flex items-center gap-1">
          {index > 0 && (
            <span aria-hidden="true" className="text-neutral-300">
              /
            </span>
          )}
          <Link
            href={href}
            locale={code}
            aria-current={locale === code ? "true" : undefined}
            className={
              locale === code
                ? "text-neutral-950"
                : "text-neutral-500 transition hover:text-link-hover"
            }
          >
            {label}
          </Link>
        </span>
      ))}
    </div>
  );
}
