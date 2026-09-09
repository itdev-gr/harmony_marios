import { readFileSync } from "node:fs";
import path from "node:path";
import { stays, getStay } from "@/content/stay";
import { getProperty } from "@/content/properties";

const stayContentSource = readFileSync(
  path.resolve(process.cwd(), "src/content/stay.ts"),
  "utf8",
);

const notFound = vi.fn(() => {
  throw new Error("NEXT_NOT_FOUND");
});

vi.mock("next/navigation", () => ({
  notFound: () => notFound(),
}));

describe("stays data", () => {
  it("has 8 entries, one per legacy check-in page", () => {
    expect(stays).toHaveLength(8);
  });

  it("gives every stay a 32-character hex token", () => {
    for (const stay of stays) {
      expect(stay.token).toMatch(/^[0-9a-f]{32}$/);
    }
  });

  it("never reuses a token across stays", () => {
    const tokens = stays.map((s) => s.token);
    expect(new Set(tokens).size).toBe(tokens.length);
  });

  it("resolves every propertySlug via getProperty", () => {
    for (const stay of stays) {
      expect(getProperty(stay.propertySlug)).toBeDefined();
    }
  });

  it("gives every stay at least one section with a title and body", () => {
    for (const stay of stays) {
      expect(stay.sections.length).toBeGreaterThan(0);
      for (const section of stay.sections) {
        expect(section.title.length).toBeGreaterThan(0);
        expect(section.body.length).toBeGreaterThan(0);
      }
    }
  });

  it("finds a stay by token via getStay", () => {
    const first = stays[0];
    expect(getStay(first.token)).toEqual(first);
  });

  it("returns undefined from getStay for an unknown token", () => {
    expect(getStay("not-a-real-token")).toBeUndefined();
  });

  it("never leaks the Gazi building's legacy street-door keypad code in the exported data", () => {
    const json = JSON.stringify(stays);
    expect(json).not.toContain("8196");
  });

  // Scans the FILE SOURCE (comments included), not just the exported data —
  // a leak written into a code comment would pass the assertion above but
  // must still fail this one, since this file ships to the client and
  // contractors.
  it("never leaks the keypad code anywhere in stay.ts, comments included", () => {
    expect(stayContentSource).not.toContain("8196");
  });
});

describe("/stay/[token] route", () => {
  beforeEach(() => {
    notFound.mockClear();
  });

  it("renders the property name and every section for a real token", async () => {
    const { default: StayPage } = await import("@/app/stay/[token]/page");
    const stay = stays[0];
    const property = getProperty(stay.propertySlug)!;

    const result = await StayPage({
      params: Promise.resolve({ token: stay.token }),
      searchParams: Promise.resolve({}),
    });
    // A server component returns a React element tree; stringify to search
    // its rendered text without pulling in a DOM renderer for this route.
    const html = JSON.stringify(result);
    expect(html).toContain(property.name);
    for (const section of stay.sections) {
      expect(html).toContain(section.title);
    }
    expect(notFound).not.toHaveBeenCalled();
  });

  it("calls notFound for an unknown token", async () => {
    const { default: StayPage } = await import("@/app/stay/[token]/page");

    await expect(
      StayPage({
        params: Promise.resolve({ token: "deadbeefdeadbeefdeadbeefdeadbeef" }),
        searchParams: Promise.resolve({}),
      }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("marks the page noindex, nofollow", async () => {
    const { generateMetadata } = await import("@/app/stay/[token]/page");
    const stay = stays[0];
    const metadata = await generateMetadata({
      params: Promise.resolve({ token: stay.token }),
      searchParams: Promise.resolve({}),
    });
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });
});
