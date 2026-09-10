// Relative imports (not the "@/..." alias): this module is loaded directly
// by next.config.ts, whose transpilation step doesn't apply tsconfig path
// aliases the way the app's own webpack/Turbopack build does.
import { properties } from "../content/properties";
import { getPosts } from "./journal";

/**
 * A local structural stand-in for Next's own (non-public) `Redirect` type
 * from `next/dist/lib/load-custom-routes`. Every field here is required by
 * `NextConfig["redirects"]`'s return type and the rest of that type's
 * fields are optional, so this is structurally assignable to it without
 * reaching into Next's internals — avoids coupling this module's build to
 * an undocumented file path that could move across Next versions.
 */
type Redirect = { source: string; destination: string; permanent: boolean };

/**
 * 301 (permanent) redirect map from the legacy harmonyrental.gr WordPress
 * site to the rebuilt app, consumed by `next.config.ts`'s `redirects()`.
 * Kept as plain data in its own module so it can be unit tested against the
 * full crawl (docs/crawl-urls.txt) without booting Next.
 *
 * `source` paths never need an explicit trailing-slash variant — Next
 * normalizes trailing slashes before matching custom routes.
 */
const STATIC_REDIRECTS: Redirect[] = [
  { source: "/about-us-1", destination: "/en/about", permanent: true },
  { source: "/about-us-2", destination: "/en/about", permanent: true },
  { source: "/contact-us-1", destination: "/en/contact", permanent: true },
  { source: "/apartment-rental", destination: "/en/apartments", permanent: true },
  { source: "/properties", destination: "/en/apartments", permanent: true },
  { source: "/property", destination: "/en/apartments", permanent: true },
  { source: "/apartment-renovation", destination: "/en/owners/renovation", permanent: true },
  { source: "/home-airbnb", destination: "/en/owners", permanent: true },
  { source: "/tour", destination: "/en/experiences", permanent: true },
  { source: "/athens", destination: "/en/experiences/athens", permanent: true },
  { source: "/athens/:slug", destination: "/en/experiences/athens", permanent: true },
  { source: "/alimos", destination: "/en/experiences/alimos", permanent: true },
  { source: "/alimos/:slug", destination: "/en/experiences/alimos", permanent: true },
  { source: "/entry-process-facilities/:path*", destination: "/en/guest-info", permanent: true },
  { source: "/ways-to-go", destination: "/en/guest-info", permanent: true },
  { source: "/blog", destination: "/en/journal", permanent: true },
  { source: "/apartment-showcase", destination: "/en/apartments", permanent: true },
  // Slug variants exposed by the interim harmony-rental.vercel.app deployment
  { source: "/apartment-5", destination: "/en/apartments", permanent: true },
  { source: "/property/vasilis-luxury-apartment-4-in-athens", destination: "/en/apartments/harmony-luxe-living", permanent: true },
  { source: "/property/vasilis-luxury-apartment-alimos", destination: "/en/apartments/coastal-harmony-alimos", permanent: true },
  // theme junk (Elementor/Luxus demo content, WooCommerce shop scaffolding,
  // agent/agency chrome the old site never used for real) -> home.
  { source: "/elements/:path*", destination: "/en", permanent: true },
  { source: "/home-agency", destination: "/en", permanent: true },
  { source: "/home-agent", destination: "/en", permanent: true },
  { source: "/home-full-map", destination: "/en", permanent: true },
  { source: "/home-half-map", destination: "/en", permanent: true },
  { source: "/home-slider", destination: "/en", permanent: true },
  { source: "/luxus_content_block/:path*", destination: "/en", permanent: true },
  { source: "/shop", destination: "/en", permanent: true },
  { source: "/shop-2", destination: "/en", permanent: true },
  { source: "/cart", destination: "/en", permanent: true },
  { source: "/cart-2", destination: "/en", permanent: true },
  { source: "/checkout", destination: "/en", permanent: true },
  { source: "/checkout-2", destination: "/en", permanent: true },
  { source: "/my-account", destination: "/en", permanent: true },
  { source: "/my-account-2", destination: "/en", permanent: true },
  { source: "/signup", destination: "/en", permanent: true },
  { source: "/agents", destination: "/en", permanent: true },
  { source: "/agencies", destination: "/en", permanent: true },
  { source: "/category/:path*", destination: "/en", permanent: true },
];

/**
 * The 8 legacy "check-in instructions" pages — bare slugs that happen to
 * match a property's name (e.g. /harmony-gazi-living/). They are NOT
 * apartment listing pages and must never resolve to a /stay/:token page;
 * the closest equivalent in the new site is the general guest-info guide.
 *
 * Three of these bare slugs (harmony-athens-city-apartment,
 * harmony-twin-lofts-metaxourgeio-1/-2) also appear verbatim in the
 * matching property's `legacyUrls` in content data — that's just how the
 * content was recorded, not a signal to route them to /apartments/:slug.
 * `apartmentRedirects` below only reads `/property/<slug>` legacy URLs, so
 * there's no conflict between the two redirect sources.
 */
const CHECK_IN_REDIRECTS: Redirect[] = [
  "/acropolis-harmony-loft",
  "/coastal-harmony-alimos",
  "/harmony-athens-city-apartment",
  "/harmony-gazi-living",
  "/harmony-luxe-living",
  "/harmony-luxury-grand-suite",
  "/harmony-twin-lofts-metaxourgeio-1",
  "/harmony-twin-lofts-metaxourgeio-2",
].map((source): Redirect => ({ source, destination: "/en/guest-info", permanent: true }));

/** Every `/property/<legacy-slug>` URL -> its new `/en/apartments/<slug>` page. */
function apartmentRedirects(): Redirect[] {
  return properties.flatMap((property) =>
    property.legacyUrls
      .filter((url) => url.startsWith("/property/"))
      .map((url): Redirect => ({
        source: url.replace(/\/+$/, ""),
        destination: `/en/apartments/${property.slug}`,
        permanent: true,
      })),
  );
}

/** Every legacy blog post slug -> the matching journal post, same slug. */
function journalRedirects(): Redirect[] {
  return getPosts().map((post): Redirect => ({
    source: `/${post.slug}`,
    destination: `/en/journal/${post.slug}`,
    permanent: true,
  }));
}

export function redirects(): Redirect[] {
  return [...STATIC_REDIRECTS, ...CHECK_IN_REDIRECTS, ...apartmentRedirects(), ...journalRedirects()];
}
