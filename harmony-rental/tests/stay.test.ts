import { existsSync, globSync, readFileSync } from "node:fs";
import path from "node:path";
import { jpegSize } from "./jpeg-size";
import { stays, getStay } from "@/content/stay";
import { getProperty } from "@/content/properties";


const stayContentSource = readFileSync(
  path.resolve(process.cwd(), "src/content/stay.ts"),
  "utf8",
);

// The legacy Gazi building's leaked door code — built from parts so the
// digits never appear verbatim anywhere in this repo (it ships to the
// client and contractors), even inside the assertion that checks for them.
const legacyDoorCode = ["81", "96"].join("");

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

  it("points every check-in form at JotForm, or at nothing", () => {
    for (const stay of stays) {
      if (stay.checkInFormUrl === null) continue;
      expect(stay.checkInFormUrl).toMatch(/^https:\/\/form\.jotform\.com\/Harmonyrental\//);
    }
  });

  it("gives every arrival step a title and body", () => {
    for (const stay of stays) {
      for (const section of stay.sections) {
        for (const step of section.steps ?? []) {
          expect(step.title.length).toBeGreaterThan(0);
          expect(step.body.length).toBeGreaterThan(0);
        }
      }
    }
  });

  // Every referenced photo must exist on disk with the dimensions recorded
  // in the data — a wrong width/height is invisible in tests that only read
  // the data, but shifts the layout under the guest as the image loads.
  it("backs every arrival photo with a real file of the recorded size", () => {
    for (const stay of stays) {
      for (const section of stay.sections) {
        const photos = [
          section.photo,
          ...(section.steps ?? []).map((step) => step.photo),
        ].filter((photo) => photo !== undefined);

        for (const photo of photos) {
          expect(photo.src).toMatch(
            new RegExp(`^/images/stay/${stay.propertySlug}/\\d{2}\\.jpg$`),
          );
          expect(photo.alt.length).toBeGreaterThan(0);

          const file = path.resolve(process.cwd(), "public", photo.src.slice(1));
          expect(existsSync(file), `missing photo: ${photo.src}`).toBe(true);

          const { width, height } = jpegSize(readFileSync(file));
          expect({ src: photo.src, width, height }).toEqual({
            src: photo.src,
            width: photo.width,
            height: photo.height,
          });
        }
      }
    }
  });

  // Every file in the folder must be wired to a stay entry. An orphan is
  // either dead weight or — given that four of these photos are router and
  // Wi-Fi-card close-ups (see the security note in stay.ts) — a credential
  // shot someone dropped in and forgot about, sitting at a public static
  // URL with nothing pointing at it to explain why.
  it("references every file in the arrival photo folder", () => {
    const shipped = globSync("public/images/stay/*/*.jpg", { cwd: process.cwd() });
    expect(shipped.length).toBeGreaterThan(0);

    const referenced = new Set(
      stays.flatMap((stay) =>
        stay.sections.flatMap((section) =>
          [section.photo, ...(section.steps ?? []).map((step) => step.photo)]
            .filter((photo) => photo !== undefined)
            .map((photo) => path.join("public", photo.src.slice(1))),
        ),
      ),
    );

    for (const file of shipped) {
      expect(referenced.has(file.split(path.sep).join("/"))).toBe(true);
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
    expect(json).not.toContain(legacyDoorCode);
  });

  // Scans the FILE SOURCE (comments included), not just the exported data —
  // a leak written into a code comment would pass the assertion above but
  // must still fail this one, since this file ships to the client and
  // contractors.
  it("never leaks the keypad code anywhere in stay.ts, comments included", () => {
    expect(stayContentSource).not.toContain(legacyDoorCode);
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
