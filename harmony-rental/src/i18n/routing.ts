import { defineRouting } from "next-intl/routing";

/**
 * Greek is the default and lives at the bare domain (`/`, `/apartments`);
 * English is prefixed (`/en`, `/en/apartments`). `as-needed` makes next-intl
 * redirect any `/el/...` URL to its unprefixed form.
 */
export const routing = defineRouting({
  locales: ["el", "en"],
  defaultLocale: "el",
  localePrefix: "as-needed",
});
