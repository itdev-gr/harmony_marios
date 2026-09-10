import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { properties } from "@/content/properties";
import { getPosts } from "@/lib/journal";

import { BASE_URL } from "@/lib/seo";

/**
 * Every locale-prefixed page in the app, excluding the gated `/stay/:token`
 * route (never indexed — see robots.ts). Locale-free paths here; each is
 * emitted under every locale below.
 */
const STATIC_PATHS = [
  "",
  "/apartments",
  "/experiences",
  "/experiences/athens",
  "/experiences/alimos",
  "/owners",
  "/owners/renovation",
  "/guest-info",
  "/journal",
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...STATIC_PATHS,
    ...properties.map((property) => `/apartments/${property.slug}`),
    ...getPosts().map((post) => `/journal/${post.slug}`),
  ];

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${BASE_URL}/${locale}${path}`,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${BASE_URL}/${l}${path}`]),
        ),
      },
    })),
  );
}
