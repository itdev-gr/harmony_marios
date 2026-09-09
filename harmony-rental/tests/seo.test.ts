import { redirects } from "@/lib/redirects";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import legacyPaths from "./fixtures/legacy-paths.json";

/**
 * Minimal matcher for the subset of Next.js redirect `source` syntax this
 * project actually uses: literal paths, a single dynamic segment
 * (`/prefix/:name`, one segment, no nesting) and a zero-or-more trailing
 * wildcard (`/prefix/:name*`, matches the prefix itself or any nested path).
 * See node_modules/next/dist/docs/.../redirects.md for the real semantics
 * this mirrors.
 */
function sourceToRegex(source: string): RegExp {
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const wildcard = source.match(/^(.*)\/:[A-Za-z0-9_]+\*$/);
  if (wildcard) {
    const prefix = escape(wildcard[1]);
    return new RegExp(`^${prefix}(?:/.*)?$`);
  }

  const singleSegment = source.match(/^(.*)\/:[A-Za-z0-9_]+$/);
  if (singleSegment) {
    const prefix = escape(singleSegment[1]);
    return new RegExp(`^${prefix}/[^/]+$`);
  }

  return new RegExp(`^${escape(source)}$`);
}

function normalize(path: string): string {
  if (path === "/") return path;
  return path.replace(/\/+$/, "");
}

function matches(path: string, rules: ReturnType<typeof redirects>): boolean {
  const normalized = normalize(path);
  return rules.some((rule) => sourceToRegex(rule.source).test(normalized));
}

describe("legacy redirect map", () => {
  const rules = redirects();

  it("has fixture paths derived from the crawl (root excluded)", () => {
    expect(legacyPaths.length).toBeGreaterThan(80);
    expect(legacyPaths).not.toContain("/");
  });

  it("matches every legacy path from docs/crawl-urls.txt to some redirect rule", () => {
    const unmatched = legacyPaths.filter((path) => !matches(path, rules));
    expect(unmatched).toEqual([]);
  });

  it("treats trailing-slash and non-trailing-slash legacy paths the same", () => {
    expect(matches("/about-us-1", rules)).toBe(true);
    expect(matches("/about-us-1/", rules)).toBe(true);
  });

  it("never redirects a legacy check-in slug to a /stay/:token page", () => {
    const checkInSlugs = [
      "/acropolis-harmony-loft",
      "/coastal-harmony-alimos",
      "/harmony-athens-city-apartment",
      "/harmony-gazi-living",
      "/harmony-luxe-living",
      "/harmony-luxury-grand-suite",
      "/harmony-twin-lofts-metaxourgeio-1",
      "/harmony-twin-lofts-metaxourgeio-2",
    ];

    for (const slug of checkInSlugs) {
      const rule = rules.find((r) => sourceToRegex(r.source).test(slug));
      expect(rule?.destination).toBe("/en/guest-info");
    }
  });

  it("never points any redirect destination at /stay", () => {
    for (const rule of rules) {
      expect(rule.destination.startsWith("/stay")).toBe(false);
    }
  });

  it("maps specific apartment legacy URLs to their new slugs", () => {
    expect(matches("/property/vasilis-luxury-apartment-6/", rules)).toBe(true);
    const rule = rules.find((r) => sourceToRegex(r.source).test("/property/vasilis-luxury-apartment-6"));
    expect(rule?.destination).toBe("/en/apartments/harmony-gazi-living");
  });

  it("has no redirect loops: no destination is itself matched by any source", () => {
    for (const rule of rules) {
      const loop = rules.find((other) => sourceToRegex(other.source).test(normalize(rule.destination)));
      expect(loop).toBeUndefined();
    }
  });

  it("marks every redirect permanent", () => {
    for (const rule of rules) {
      expect(rule.permanent).toBe(true);
    }
  });
});

describe("sitemap", () => {
  const entries = sitemap();

  it("includes both locale variants of an apartment page", () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://harmonyrental.gr/en/apartments/coastal-harmony-alimos");
    expect(urls).toContain("https://harmonyrental.gr/el/apartments/coastal-harmony-alimos");
  });

  it("never includes anything under /stay", () => {
    expect(entries.some((e) => e.url.includes("/stay"))).toBe(false);
  });

  it("includes all 9 apartments and 4 journal posts for both locales", () => {
    const urls = entries.map((e) => e.url);
    const enApartments = urls.filter((u) => /^https:\/\/harmonyrental\.gr\/en\/apartments\/[^/]+$/.test(u));
    const enJournal = urls.filter((u) => /^https:\/\/harmonyrental\.gr\/en\/journal\/[^/]+$/.test(u));
    expect(enApartments).toHaveLength(9);
    expect(enJournal).toHaveLength(4);
  });
});

describe("robots", () => {
  it("disallows /stay/ and points at the sitemap", () => {
    const result = robots();
    const rule = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    const disallow = Array.isArray(rule.disallow) ? rule.disallow : [rule.disallow];
    expect(disallow).toContain("/stay/");
    expect(result.sitemap).toBe("https://harmonyrental.gr/sitemap.xml");
  });
});
