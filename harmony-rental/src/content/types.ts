import { z } from "zod";

export const propertySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  provisionalName: z.boolean().default(false),
  area: z.enum(["athens", "alimos"]),
  neighborhood: z.string(), // e.g. "Gazi – Kerameikos"
  sizeSqm: z.number().nullable(),
  bedrooms: z.number().nullable(),
  bathrooms: z.number().nullable(),
  sleeps: z.number().nullable(),
  summary: z.string().min(80), // rewritten EN copy, no OTA scrapes
  amenities: z.array(z.string()),
  bedSetup: z.array(z.string()),
  distances: z.array(z.object({ label: z.string(), value: z.string() })),
  registrationNo: z.string().nullable(), // Greek AMA
  otaLinks: z.object({ airbnb: z.string().url().nullable(), booking: z.string().url().nullable() }),
  images: z.array(z.string()), // /images/<slug>/NN.jpg — client to supply
  legacyUrls: z.array(z.string()), // old paths that 301 here (Task 12 consumes)
});

export type Property = z.infer<typeof propertySchema>;
