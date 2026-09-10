import { routing } from "@/i18n/routing";

export const BASE_URL = "https://harmonyrental.gr";

/**
 * Path for a locale-free route in a given locale, mirroring
 * `routing.localePrefix: "as-needed"`: the default locale (Greek) is
 * unprefixed (`/`, `/apartments`), every other locale is prefixed
 * (`/en`, `/en/apartments`).
 */
export function localizedPath(locale: string, path: string): string {
  if (locale === routing.defaultLocale) return path || "/";
  return `/${locale}${path}`;
}

/** Absolute URL for a locale-free route in a given locale. */
export function localizedUrl(locale: string, path: string): string {
  return `${BASE_URL}${localizedPath(locale, path)}`;
}

/**
 * `el`/`en` URLs (plus canonical + x-default) for a locale-free path, e.g.
 * `languageAlternates("/apartments", "el")` or `languageAlternates("", "en")`
 * for the homepage. Used by every indexable page's `generateMetadata` to
 * populate `alternates` — the /stay/:token route is excluded on purpose
 * (see its own `robots: { index: false }`) and never calls this helper.
 */
export function languageAlternates(path: string, locale: string) {
  const urlFor = (l: string) => localizedUrl(l, path);

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, urlFor(l)]),
  ) as Record<(typeof routing.locales)[number], string>;

  return {
    canonical: urlFor(locale),
    languages: {
      ...languages,
      "x-default": urlFor(routing.defaultLocale),
    },
  };
}
