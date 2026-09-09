import { routing } from "@/i18n/routing";

export const BASE_URL = "https://harmonyrental.gr";

/**
 * `en`/`el` URLs (plus canonical + x-default) for a locale-free path, e.g.
 * `languageAlternates("/apartments", "el")` or `languageAlternates("", "en")`
 * for the homepage. Used by every indexable page's `generateMetadata` to
 * populate `alternates` — the /stay/:token route is excluded on purpose
 * (see its own `robots: { index: false }`) and never calls this helper.
 */
export function languageAlternates(path: string, locale: string) {
  const urlFor = (l: string) => `${BASE_URL}/${l}${path}`;

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
