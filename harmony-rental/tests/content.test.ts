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
