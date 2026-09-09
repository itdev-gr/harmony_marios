"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const LOCALES = [
  { code: "en", label: "EN" },
  { code: "el", label: "ΕΛ" },
] as const;

/** Text-only "EN / ΕΛ" toggle — no flags — that swaps locale on the current path. */
export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname() ?? "/";
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
            href={pathname}
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
