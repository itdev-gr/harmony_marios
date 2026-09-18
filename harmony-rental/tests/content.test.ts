import { existsSync, globSync } from "node:fs";
import path from "node:path";
import { jpegSizeOf } from "./jpeg-size";
import { properties, getProperty } from "@/content/properties";
import { propertySchema } from "@/content/types";
import { site } from "@/content/site";

it("has 9 unique, schema-valid apartments", () => {
  expect(properties).toHaveLength(9);
  expect(new Set(properties.map(p => p.slug)).size).toBe(9);
  for (const p of properties) expect(() => propertySchema.parse(p)).not.toThrow();
});
it("never carries legacy junk", () => {
  const json = JSON.stringify(properties) + JSON.stringify(site);
  for (const bad of ["Vasilis Luxury", "Genius", "NA", "$", "Bathtab", "Goddess", "lorem", "Lorem"])
    expect(json).not.toContain(bad);
});
it("exposes real contact data", () => {
  expect(site.contact.email).toBe("info@harmonyrental.gr");
  expect(site.contact.phone).toBe("+30 698 881 1888");
});
it("getProperty resolves", () => {
  expect(getProperty("coastal-harmony-alimos")?.area).toBe("alimos");
});

// Listing galleries are PUBLIC — unlike /stay, which is token-gated. The
// legacy site had Wi-Fi cards sitting in two of these galleries, one of them
// as the first image and therefore the card thumbnail on /apartments.
//
// This checks the file exists and is not obviously something other than a
// photograph. It is a floor, NOT a credential detector: the worst offender
// found (a 736x470 screenshot of a Wi-Fi panel) is photo-shaped and would
// sail through. Nothing here substitutes for looking at a picture before
// adding it — see the rule in the README's images checklist.
const MIN_SHORT_EDGE = 400;
const MIN_RATIO = 0.4;
const MAX_RATIO = 2.5;

it("backs every listing photo with a real file that is at least photo-shaped", () => {
  for (const property of properties) {
    for (const src of property.images) {
      expect(src).toMatch(new RegExp(`^/images/${property.slug}/\\d{2}\\.jpg$`));

      const file = path.resolve(process.cwd(), "public", src.slice(1));
      expect(existsSync(file), `missing listing photo: ${src}`).toBe(true);

      const { width, height } = jpegSizeOf(file);
      const ratio = width / height;

      expect(Math.min(width, height), `${src} is too small (${width}x${height})`)
        .toBeGreaterThanOrEqual(MIN_SHORT_EDGE);
      expect(ratio, `${src} is not photo-shaped (${width}x${height})`)
        .toBeGreaterThan(MIN_RATIO);
      expect(ratio, `${src} is not photo-shaped (${width}x${height})`)
        .toBeLessThan(MAX_RATIO);
    }
  }
});

it("references every file in every listing gallery", () => {
  const referenced = new Set(
    properties.flatMap((property) =>
      property.images.map((src) => path.join("public", src.slice(1))),
    ),
  );

  const shipped = globSync("public/images/*/*.jpg", { cwd: process.cwd() })
    // /images/stay/** and /images/experiences/** are not listing galleries.
    .filter((file) => !file.includes("/stay/") && !file.includes("/experiences/"));

  expect(shipped.length).toBeGreaterThan(0);
  for (const file of shipped) {
    expect(referenced.has(file.split(path.sep).join("/")), `orphan listing photo: ${file}`).toBe(true);
  }
});
