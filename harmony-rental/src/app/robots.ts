import type { MetadataRoute } from "next";

import { BASE_URL } from "@/lib/seo";

/**
 * `/stay/:token` is a per-guest, token-gated page (see src/app/stay) —
 * never something search engines should crawl or index.
 *
 * `/images/stay/` holds that page's arrival photos: building entrances, key
 * lockers, apartment doors and electrical panels. Files under `public/` are
 * served at a static URL regardless of who can reach the page linking them,
 * so at minimum they must stay out of the index — the legacy WordPress site
 * had exactly these photos crawlable on public pages.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/stay/", "/images/stay/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
