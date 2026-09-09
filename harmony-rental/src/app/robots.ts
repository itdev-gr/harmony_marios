import type { MetadataRoute } from "next";

const BASE_URL = "https://harmonyrental.gr";

/**
 * `/stay/:token` is a per-guest, token-gated page (see src/app/stay) —
 * never something search engines should crawl or index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/stay/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
