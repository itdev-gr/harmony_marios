# Harmony Rental — Full Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild harmonyrental.gr from a broken real-estate WordPress theme into a modern boutique short-stay hospitality site (apartments + owner services + experiences) with a direct "request to book" flow, bilingual EN/EL, deployed on Vercel.

**Architecture:** Next.js (App Router) static-first marketing site with typed local content data (no CMS in v1), `next-intl` locale routing (`/en`, `/el`), one server action for booking inquiries (SMTP, provider-agnostic), token-gated guest check-in pages, and a 301 redirect map covering every legacy URL.

**Tech Stack:** Next.js 16 (App Router, TypeScript), Tailwind CSS v4, next-intl, zod, nodemailer (SMTP env-driven), MDX for blog, Vitest + React Testing Library, Vercel.

**Source-of-truth documents (read before implementing content tasks):**
- `docs/CONTENT_INVENTORY.md` — every fact about the business, contact data, all 10 legacy listings (with the dedup mapping), services copy, tour content, blog posts, and the full red-flag list.
- `docs/design-references.md` — the researched art direction. This plan implements the recommended hybrid: **Direction B skeleton (modern aparthotel UX) + Direction A skin (Athenian Riviera Mediterranean palette/photography) + Direction C owner toggle**.
- `docs/crawl-pages/*.txt` — raw text of every legacy page (for migrating copy verbatim where noted).

## Global Constraints

- All prices in **EUR (€)**, never `$`. No price is invented: fields without a confirmed value render nothing (never "NA", never `$`).
- Locales: `en` (default) and `el`. Every UI string goes through next-intl messages; no hardcoded visible strings in components.
- **No real-estate artifacts**: no mortgage calculator, no agents/agencies, no buy/sell language, no "Status" filter anywhere.
- Contact data (only these, everywhere): phone `+30 698 881 1888`, email `info@harmonyrental.gr`, address `Vizantiou 2, Athina 117 41, Greece`, socials Instagram / Facebook / TikTok (URLs to be provided by client — render icons only when URL present).
- Brand name is exactly **"Harmony Rental"** in copy; domain shown as `harmonyrental.gr`.
- Guest check-in content (Wi-Fi passwords, door instructions) must ONLY exist under `/stay/[token]` with `robots: noindex`, unguessable tokens, and must NOT appear in the sitemap. Never republish the building keypad code — see ops note in Task 10.
- Design tokens (defined once in Task 1, used everywhere): sand `#F7F4EF`, paper `#FFFFFF`, ink `#211F1C`, sea `#123F4A` (primary), terracotta `#C0684A` (accent), mist `#E4EDEE`. Display font **Fraunces**, body font **Inter** (via `next/font/google`).
- Node 24, npm. Commit after every task (Conventional Commits).
- Every page exports `generateMetadata` with a unique title of the form `<Page> — Harmony Rental` (never repeat the site name twice — legacy bug #22).

## File Structure (locked in)

```
harmony-rental/
  next.config.ts                  # redirects map (Task 12)
  src/
    i18n/{routing.ts,request.ts}  # next-intl config (Task 3)
    messages/{en.json,el.json}    # UI strings (Task 3, extended by later tasks)
    content/
      types.ts                    # zod schemas + TS types (Task 2)
      properties.ts               # 9 real apartments, deduped (Task 2)
      site.ts                     # contact, socials, services, FAQs, testimonials (Task 2)
      experiences.ts              # Athens/Alimos guide data + boat tours (Task 9)
      stay.ts                     # token-gated check-in data (Task 10)
      journal/*.mdx               # 4 migrated blog posts (Task 11)
    app/[locale]/
      layout.tsx  page.tsx        # shell + home (Tasks 4, 5)
      apartments/{page.tsx,[slug]/page.tsx}          # Task 6
      owners/{page.tsx,renovation/page.tsx}          # Task 8
      experiences/{page.tsx,athens/page.tsx,alimos/page.tsx}  # Task 9
      guest-info/page.tsx                            # Task 10
      journal/{page.tsx,[slug]/page.tsx}             # Task 11
      about/page.tsx  contact/page.tsx               # Tasks 5, 8
    app/stay/[token]/page.tsx     # gated, locale-free (Task 10)
    app/{sitemap.ts,robots.ts}    # Task 12
    components/                   # Header, Footer, PropertyCard, Section, InquiryForm…
    lib/{inquiry.ts,notify.ts}    # server action + SMTP (Task 7)
  tests/                          # mirrors src/
```

Content decisions locked in (from `docs/CONTENT_INVENTORY.md`):
- **9 apartments, one listing each.** Legacy duplicates collapse: `vasilis-luxury-apartment-in-alimos`→`coastal-harmony-alimos`, `vasilis-luxury-apartment`→`harmony-luxury-grand-suite`, `vasilis-luxury-apartment-6`→`harmony-gazi-living`, `vasilis-luxury-apartment-4` (carried wrong text) →`harmony-luxe-living`. `vasilis-luxury-aparment-5` gets brand name `harmony-syngrou-residence` (**provisional — confirm with client**). Add the 3 uncataloged units: `harmony-athens-city-apartment`, `harmony-twin-lofts-metaxourgeio-1`, `-2`.
- **16 thin tour pages consolidate into 2 rich area guides** (`/experiences/athens`, `/experiences/alimos`) + a Boat Tours section on `/experiences` (the service is advertised on the legacy home but has no page — bug fixed here).
- Booking model v1: per-apartment **"Request to book"** inquiry (dates/guests/message → email to client) + optional OTA deep links per property. A channel-manager widget (Hostaway/Smoobu) can replace the form later — the CTA component takes the form as a child, so the swap is one component.

---

### Task 1: Scaffold, design tokens, test infrastructure

**Files:**
- Create: project via `create-next-app` in repo root, `src/app/globals.css`, `vitest.config.ts`, `tests/setup.ts`, `src/app/fonts.ts`
- Test: `tests/smoke.test.tsx`

**Interfaces:**
- Produces: Tailwind theme tokens `sand, paper, ink, sea, terracotta, mist`; CSS vars `--font-display`, `--font-body`; test commands `npm test`.

- [ ] **Step 1: Scaffold**

```bash
cd "/Users/marios/Desktop/Projects/harmony rentals"
npx create-next-app@latest harmony-rental --ts --app --src-dir --tailwind --eslint --no-import-alias --use-npm --yes
cd harmony-rental && git init && git add -A && git commit -m "chore: scaffold next.js app"
npm i next-intl zod nodemailer && npm i -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom @types/nodemailer
```

- [ ] **Step 2: Design tokens + fonts**

`src/app/fonts.ts`:
```ts
import { Fraunces, Inter } from "next/font/google";
export const display = Fraunces({ subsets: ["latin"], variable: "--font-display" });
export const body = Inter({ subsets: ["latin", "greek"], variable: "--font-body" });
```

Replace `src/app/globals.css` with:
```css
@import "tailwindcss";
@theme {
  --color-sand: #f7f4ef;
  --color-paper: #ffffff;
  --color-ink: #211f1c;
  --color-sea: #123f4a;
  --color-terracotta: #c0684a;
  --color-mist: #e4edee;
  --font-display: var(--font-display);
  --font-body: var(--font-body);
}
body { @apply bg-sand text-ink font-body antialiased; }
h1, h2, h3 { @apply font-display text-sea; }
```

- [ ] **Step 3: Vitest config**

`vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", setupFiles: ["./tests/setup.ts"], globals: true },
});
```
`tests/setup.ts`: `import "@testing-library/jest-dom/vitest";`
Add to `package.json` scripts: `"test": "vitest run"`.

- [ ] **Step 4: Write smoke test** — `tests/smoke.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
it("renders", () => {
  render(<h1>Harmony Rental</h1>);
  expect(screen.getByText("Harmony Rental")).toBeInTheDocument();
});
```

- [ ] **Step 5: Run `npm test`** — Expected: PASS. Run `npm run build` — Expected: success.
- [ ] **Step 6: Commit** — `git add -A && git commit -m "chore: design tokens, fonts, vitest"`

---

### Task 2: Content layer — schemas and real data

**Files:**
- Create: `src/content/types.ts`, `src/content/properties.ts`, `src/content/site.ts`
- Test: `tests/content.test.ts`

**Interfaces:**
- Produces: `Property` type & `properties: Property[]` (9 items); `site` object `{ contact, services, faqs, testimonials }`; helper `getProperty(slug: string): Property | undefined`.

- [ ] **Step 1: Write failing test** — `tests/content.test.ts`:
```ts
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
```

- [ ] **Step 2: Run it** — `npm test` — Expected: FAIL (modules missing).

- [ ] **Step 3: Implement** — `src/content/types.ts`:
```ts
import { z } from "zod";
export const propertySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  provisionalName: z.boolean().default(false),
  area: z.enum(["athens", "alimos"]),
  neighborhood: z.string(),               // e.g. "Gazi – Kerameikos"
  sizeSqm: z.number().nullable(),
  bedrooms: z.number().nullable(),
  bathrooms: z.number().nullable(),
  sleeps: z.number().nullable(),
  summary: z.string().min(80),            // rewritten EN copy, no OTA scrapes
  amenities: z.array(z.string()),
  bedSetup: z.array(z.string()),
  distances: z.array(z.object({ label: z.string(), value: z.string() })),
  registrationNo: z.string().nullable(),  // Greek AMA
  otaLinks: z.object({ airbnb: z.string().url().nullable(), booking: z.string().url().nullable() }),
  images: z.array(z.string()),            // /images/<slug>/NN.jpg — client to supply
  legacyUrls: z.array(z.string()),        // old paths that 301 here (Task 12 consumes)
});
export type Property = z.infer<typeof propertySchema>;
```

`src/content/properties.ts` — all 9 entries. Facts come from `docs/CONTENT_INVENTORY.md` §3a/§3b; **summaries are rewritten** (2–4 sentences, guest-benefit voice — never copy the Booking.com Greek scrapes). One full worked example; write the remaining 8 the same way with their own facts:
```ts
import { Property } from "./types";
export const properties: Property[] = [
  {
    slug: "coastal-harmony-alimos",
    name: "Coastal Harmony Alimos",
    provisionalName: false,
    area: "alimos",
    neighborhood: "Alimos – Kalamaki",
    sizeSqm: 62, bedrooms: 1, bathrooms: 1, sleeps: 4,
    summary:
      "A bright one-bedroom apartment on the Athens Riviera, an eight-minute walk from Edem Beach. " +
      "Full kitchen, washing machine, balcony over the garden, and fast Wi-Fi — with the tram into " +
      "central Athens nearby and Flisvos Marina up the coast.",
    amenities: ["Air conditioning", "Balcony", "Free Wi-Fi", "Kitchen", "Washing machine", "Airport transfer on request"],
    bedSetup: ["Bedroom: 1 extra-large double", "Living room: 2 sofa beds"],
    distances: [
      { label: "Edem Beach", value: "800 m" },
      { label: "Kalamaki Beach", value: "1.7 km" },
      { label: "Flisvos Marina", value: "3.3 km" },
      { label: "Athens Airport", value: "37 km" },
    ],
    registrationNo: null,
    otaLinks: { airbnb: null, booking: null },
    images: ["/images/coastal-harmony-alimos/01.jpg"],
    legacyUrls: ["/property/coastal-harmony-alimos/", "/property/vasilis-luxury-apartment-in-alimos/"],
  },
  // …remaining 8, same shape, facts per inventory:
  // harmony-luxury-grand-suite  (102 m², 3BR, Victoria/Larissis; legacy also /property/vasilis-luxury-apartment/)
  // acropolis-harmony-loft      (3BR/2BA, sleeps 10, registrationNo "00002966980")
  // harmony-gazi-living         (39 m², Gazi–Kerameikos; legacy also /property/vasilis-luxury-apartment-6/)
  // harmony-syngrou-residence   (110 m², Syngrou–Fix; provisionalName: true; legacy /property/vasilis-luxury-aparment-5/)
  // harmony-luxe-living         (56 m², Neos Kosmos; legacy also /property/vasilis-luxury-apartment-4/)
  // harmony-athens-city-apartment, harmony-twin-lofts-metaxourgeio-1, -2  (no legacy listing; size/beds null until client confirms)
];
export const getProperty = (slug: string) => properties.find(p => p.slug === slug);
```

`src/content/site.ts` — contact (Global Constraints values), the 5 services (rentals, renovation, tours, airbnb management, boat tours) with the descriptions from inventory §1 (they are original copy — keep, fix grammar), the 6 guest FAQs + 5 renovation FAQs (§1), and the 3 real testimonials (Miroslava/Slovakia, Irena/Poland, Jean-Yves/France — translate the Polish one to English, keep original in a `original` field).

- [ ] **Step 4: Run `npm test`** — Expected: PASS.
- [ ] **Step 5: Commit** — `git commit -am "feat: typed content layer with deduped real inventory"`

---

### Task 3: i18n routing (EN/EL)

**Files:**
- Create: `src/i18n/routing.ts`, `src/i18n/request.ts`, `src/middleware.ts`, `src/messages/en.json`, `src/messages/el.json`
- Modify: move `src/app/page.tsx`+`layout.tsx` under `src/app/[locale]/`
- Test: `tests/i18n.test.ts`

**Interfaces:**
- Produces: locales `["en","el"]`, default `en`, localePrefix `always`; message namespaces `nav`, `common`, `home`, `footer`; components use `useTranslations`/`getTranslations`.

- [ ] **Step 1: Failing test** — `tests/i18n.test.ts`:
```ts
import en from "@/messages/en.json";
import el from "@/messages/el.json";
const keys = (o: object, p = ""): string[] =>
  Object.entries(o).flatMap(([k, v]) => typeof v === "object" ? keys(v, `${p}${k}.`) : [`${p}${k}`]);
it("el mirrors en exactly", () => expect(keys(el).sort()).toEqual(keys(en).sort()));
it("has nav keys", () => expect(keys(en)).toEqual(expect.arrayContaining(["nav.apartments", "nav.owners", "common.bookNow"])));
```
- [ ] **Step 2: Run** — FAIL.
- [ ] **Step 3: Implement** per next-intl App Router docs (`createNavigation` in `routing.ts`, plugin in `next.config.ts`, `NextIntlClientProvider` in the locale layout). Seed messages:
```json
{ "nav": { "home": "Home", "apartments": "Apartments", "experiences": "Experiences",
    "owners": "For owners", "journal": "Journal", "about": "About", "contact": "Contact" },
  "common": { "bookNow": "Book now", "requestToBook": "Request to book", "checkAvailability": "Check availability",
    "from": "from", "perNight": "/ night", "viewApartment": "View apartment" },
  "home": { "heroTitle": "Stay in harmony with Athens.",
    "heroSubtitle": "Boutique apartments in the city centre and on the Athens Riviera — with local hosts, self check-in, and the best price when you book direct." },
  "footer": { "tagline": "Apartments, experiences and property care in Athens & Alimos." } }
```
`el.json` — full Greek translations of the same keys (e.g. `nav.apartments`: "Διαμερίσματα", `nav.owners`: "Για ιδιοκτήτες", `common.requestToBook`: "Αίτημα κράτησης", `home.heroTitle`: "Μείνετε σε αρμονία με την Αθήνα."). Translate every key — the test enforces parity.
- [ ] **Step 4: Run `npm test` and `npm run build`** — PASS; `/` redirects to `/en`.
- [ ] **Step 5: Commit** — `git commit -am "feat: en/el locale routing"`

---

### Task 4: App shell — header and footer

**Files:**
- Create: `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/components/LocaleSwitcher.tsx`
- Modify: `src/app/[locale]/layout.tsx`
- Test: `tests/shell.test.tsx`

**Interfaces:**
- Consumes: `site.contact` (Task 2), messages (Task 3), `Link` from `src/i18n/routing`.
- Produces: `<Header/>` (sticky, logo wordmark "Harmony Rental", nav from `nav.*` keys, terracotta "Book now" button linking `/apartments`, `<LocaleSwitcher/>` EN/ΕΛ text toggle — **no flags**), `<Footer/>` (contact block, nav, socials-when-present, `© {year} Harmony Rental`).

- [ ] **Step 1: Failing test** — render `Header` and `Footer` inside `NextIntlClientProvider` with `en` messages; assert nav link "Apartments" `href="/apartments"`, button "Book now", footer shows `info@harmonyrental.gr` and no string "Developed by".
- [ ] **Step 2: Run** — FAIL.
- [ ] **Step 3: Implement.** Header: `sticky top-0 z-40 bg-sand/90 backdrop-blur border-b border-mist`; short labels only (legacy bug #29 — never SEO-title menu items); mobile: `<details>`-based disclosure menu (no JS lib). Footer: 3 columns on `bg-sea text-sand`.
- [ ] **Step 4: Run** — PASS. **Step 5: Commit** `feat: app shell`.

---

### Task 5: Home page + About page

**Files:**
- Create: `src/app/[locale]/page.tsx`, `src/app/[locale]/about/page.tsx`, `src/components/{Hero,Section,PropertyCard,ServiceRow,Testimonials,Faq}.tsx`
- Modify: `src/messages/{en,el}.json` (add `about.*`, `services.*`, `faq.*` strings)
- Test: `tests/home.test.tsx`

**Interfaces:**
- Consumes: `properties`, `site` (Task 2), messages (Task 3).
- Produces: `PropertyCard({ property, locale })` — photo, name, neighborhood chip, `sleeps · bedrooms · m²` icon row (renders only non-null fields), CTA `common.viewApartment` → `/apartments/[slug]`. Reused by Tasks 6 and 9.

Home layout (Direction B skeleton, Direction A skin — see `docs/design-references.md` §Synthesis):
1. **Hero**: full-bleed photo (`/images/hero.jpg`, client to supply riviera/golden-hour shot; sea-tinted gradient overlay), `home.heroTitle` in Fraunces 56–72px, subtitle, inline mini-form (arrival/departure `date` inputs + guests `select`) that submits GET → `/apartments?from&to&guests`, and a "Book direct — best price" pill.
2. **Featured apartments**: 3 `PropertyCard`s + "All apartments →".
3. **Services strip** (5 items from `site.services`, icon + 1-liner): Apartments / Renovation / Tours / Airbnb management / Boat tours — management+renovation link to `/owners`, tours+boat to `/experiences`.
4. **"Your hosts" band**: replaces fake "John Doe" team — short Vasilis & Evelina intro (2 sentences, from the check-in letters' voice; **client to approve photo/names**).
5. **Testimonials** (the 3 real ones, country names in the active locale).
6. **FAQ** (6 guest FAQs, `<details>` accordions).
7. **CTA band**: "Planning a stay in Athens?" → `/contact`.

About page: mission/vision/goals + "Why choose us" copy from inventory §1 (real copy, grammar-fixed), hosts band, testimonials. **No stat counters** (legacy bug #9), no partners section.

- [ ] **Step 1: Failing test** — render home (mock `next/image`): asserts hero title, exactly 3 property cards, no occurrence of "$", "Realtor", "Dream Home".
- [ ] **Step 2: Run** — FAIL. **Step 3: Implement.** **Step 4: Run + `npm run build`** — PASS.
- [ ] **Step 5: Commit** `feat: home and about pages`.

---

### Task 6: Apartments — list and detail pages

**Files:**
- Create: `src/app/[locale]/apartments/page.tsx`, `src/app/[locale]/apartments/[slug]/page.tsx`, `src/components/{Gallery,StickyBookBar}.tsx`
- Test: `tests/apartments.test.tsx`

**Interfaces:**
- Consumes: `properties`, `getProperty`, `PropertyCard` (Task 5).
- Produces: `generateStaticParams` over all 9 slugs; detail page renders `<InquiryCta property={p}>` slot — Task 7 fills it. Query params `from,to,guests` (from hero form) pre-fill the inquiry form via searchParams pass-through.

List page: heading "Apartments in Athens & Alimos", **two filters only** — area tabs (All / Athens / Alimos) via `?area=` searchParam and guests `select`. No price sliders, no status/type dropdowns (legacy bug #12).

Detail page: gallery (grid of images, first spans 2 cols), name + neighborhood, fact row (m² / bedrooms / bathrooms / sleeps — only non-null), summary, amenities checklist (2-col), bed setup, distances table, registration number when present (small print, Greek AMA compliance), map link (`https://maps.google.com/?q=` + neighborhood — no embedded map in v1), OTA links as small "Also on Airbnb / Booking.com" badges when present, and `StickyBookBar` (mobile fixed-bottom "Request to book" → scrolls to form).

- [ ] **Step 1: Failing test** — list renders 9 cards, `?area=alimos` renders only Alimos ones; detail for `coastal-harmony-alimos` shows "62", "Edem Beach", and no "NA".
- [ ] **Step 2: Run** — FAIL. **Step 3: Implement.** **Step 4: Run** — PASS.
- [ ] **Step 5: Commit** `feat: apartments list and detail`.

---

### Task 7: Booking inquiry — server action + email

**Files:**
- Create: `src/lib/notify.ts`, `src/lib/inquiry.ts`, `src/components/InquiryCta.tsx`, `.env.example`
- Modify: `src/app/[locale]/apartments/[slug]/page.tsx` (mount form), `src/app/[locale]/contact/page.tsx` (create — same form, no property)
- Test: `tests/inquiry.test.ts`

**Interfaces:**
- Consumes: `Property` type.
- Produces: `submitInquiry(prevState, formData): Promise<{ ok: boolean; error?: string }>` server action; `sendMail({ subject, text }): Promise<void>` in `notify.ts`.

- [ ] **Step 1: Failing test** — `tests/inquiry.test.ts`: mock `@/lib/notify`; `submitInquiry` with valid FormData (name, email, dates, guests, propertySlug) resolves `{ok:true}` and `sendMail` was called with subject containing the property name; invalid email → `{ok:false}`; honeypot field `website` filled → `{ok:true}` (silent drop) and `sendMail` NOT called.
- [ ] **Step 2: Run** — FAIL.
- [ ] **Step 3: Implement.** `notify.ts`:
```ts
import nodemailer from "nodemailer";
export async function sendMail(opts: { subject: string; text: string; replyTo?: string }) {
  const t = nodemailer.createTransport({
    host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT ?? 587),
    auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
  });
  await t.sendMail({ from: process.env.MAIL_FROM, to: "info@harmonyrental.gr", ...opts });
}
```
`inquiry.ts`: `"use server"`; zod-validate fields (`name` min 2, `email` email, `from`/`to` ISO dates with `to > from`, `guests` 1–12, `message` optional, `website` honeypot must be empty), compose plain-text email, call `sendMail`, return state. `InquiryCta.tsx`: client component with `useActionState`, labeled inputs, terracotta submit, success state "Thank you — we reply within a few hours." All strings via `useTranslations("inquiry")` — add EN+EL keys.
`.env.example`: `SMTP_HOST= SMTP_PORT=587 SMTP_USER= SMTP_PASS= MAIL_FROM="Harmony Rental <bookings@harmonyrental.gr>"`. At deploy time choose the SMTP provider through the Vercel Marketplace flow (`vercel:marketplace` skill) — code stays provider-agnostic.
- [ ] **Step 4: Run** — PASS. **Step 5: Commit** `feat: booking inquiry flow`.

---

### Task 8: For Owners — management + renovation

**Files:**
- Create: `src/app/[locale]/owners/page.tsx`, `src/app/[locale]/owners/renovation/page.tsx`
- Modify: messages (add `owners.*`)
- Test: `tests/owners.test.tsx`

**Interfaces:**
- Consumes: `site.services`, renovation FAQs (Task 2), `InquiryCta` (Task 7, without property — subject "Owner inquiry").

`/owners` (GuestReady/Houst pattern, see design refs §3): hero "Own a property in Athens? We renovate, furnish, list and host it — full circle." · the 6 Home-Airbnb sub-services from inventory §1 as a 3×2 grid · "Why Harmony" 4 value props · **compliance trust block** (Greek STR registration/AMA handling — one paragraph, EL-first audience) · full-circle strip `Renovate → Furnish → List → Host → Earn` · owner inquiry form. **No public percentage pricing** (client hasn't published rates; form asks instead).
`/owners/renovation`: the real 7-step process + 4–12 week timeline + 5 renovation FAQs (all from inventory — strongest legacy content, keep nearly verbatim) + "portfolio" placeholder section rendering client-supplied before/after image pairs from `src/content/site.ts` (`renovationProjects: []` — empty array renders nothing).

- [ ] **Step 1: Failing test** — `/owners` shows all 6 sub-services and no word "commission"; renovation page shows "Consultation & Planning" and "4–12".
- [ ] **Step 2: Run** — FAIL. **Step 3: Implement.** **Step 4: Run** — PASS. **Step 5: Commit** `feat: owner pages`.

---

### Task 9: Experiences — area guides + boat tours

**Files:**
- Create: `src/content/experiences.ts`, `src/app/[locale]/experiences/{page.tsx,athens/page.tsx,alimos/page.tsx}`
- Test: `tests/experiences.test.ts`

**Interfaces:**
- Consumes: `PropertyCard` (cross-sell), tour texts from `docs/crawl-pages/athens__*.txt` and `alimos__*.txt`.
- Produces: `experiences: { area: "athens"|"alimos"; slug; name; category; blurb; highlights: string[] }[]` (16 items, blurbs condensed to 2–3 sentences from the legacy pages — original copy, safe to reuse).

`/experiences`: intro + **Boat Tours section** (copy from inventory §1 service description + FAQ "yachts, sailboats, and speedboats"; CTA → contact form with subject "Boat tour") + guided tours pitch + two area cards → guides.
Area guides: hero, then each experience as an alternating text/image row grouped by category, closing with "Stay nearby" (3 `PropertyCard`s of that area) — this replaces 16 thin URLs with 2 strong pages (IA decision, see header).

- [ ] **Step 1: Failing test** — `experiences` has 16 entries, 8 per area; `/experiences/athens` renders "Acropolis"; `/experiences` renders "Boat".
- [ ] **Step 2: Run** — FAIL. **Step 3: Implement.** **Step 4: Run** — PASS. **Step 5: Commit** `feat: experiences`.

---

### Task 10: Guest info + token-gated check-in pages

**Files:**
- Create: `src/content/stay.ts`, `src/app/stay/[token]/page.tsx`, `src/app/[locale]/guest-info/page.tsx`
- Test: `tests/stay.test.ts`

**Interfaces:**
- Consumes: check-in content from `docs/crawl-pages/` (the 8 legacy check-in pages, inventory §3b).
- Produces: `stays: { token: string; propertySlug: string; sections: { title: string; body: string }[] }[]`; tokens generated with `crypto.randomBytes(16).toString("hex")` at authoring time (hardcoded strings in the data file — they are the secret).

`/guest-info` (public, indexed): generic check-in/check-out policy (15:00–01:00 in / 11:00 out), what guests must send (passport photo, phone, email — Greek regulation note), airport transfer table (€48/€63 taxi, €100/€120 van), and the food tips rewritten as a proper "Where to eat" list (BARBADIMOS, Athinaikon, FOUAR, 360 Cocktail Bar, Vintage, L'Amiral, loukoumades at 21 Aiolou). **No Wi-Fi passwords, no door instructions here.**
`/stay/[token]` (locale-free, `dynamic = "force-static"` off — render per token): property-specific arrival instructions, Wi-Fi, appliance notes, migrated from legacy pages and rewritten from "pasted email" tone to structured sections. `export const metadata = { robots: { index: false, follow: false } }`. 404 for unknown tokens. Excluded from sitemap (Task 12 asserts this).

- [ ] **Step 1: Failing test** — every token is 32 hex chars and unique; every `propertySlug` resolves via `getProperty`; rendering an unknown token calls `notFound`.
- [ ] **Step 2: Run** — FAIL. **Step 3: Implement.** **Step 4: Run** — PASS.
- [ ] **Step 5: OPS NOTE for the client (put in README):** the legacy site published Wi-Fi passwords and the Gazi building keypad code `8196#` publicly. After launch: rotate the keypad code and all Wi-Fi passwords, then update `stay.ts`. Until launch, ask the client to noindex/delete those WordPress pages.
- [ ] **Step 6: Commit** `feat: guest info and gated check-in`.

---

### Task 11: Journal — MDX blog migration

**Files:**
- Create: `src/content/journal/*.mdx` (4 posts), `src/app/[locale]/journal/{page.tsx,[slug]/page.tsx}`, `src/lib/journal.ts`
- Test: `tests/journal.test.ts`

**Interfaces:**
- Produces: `getPosts(): { slug; title; description; date; body }[]` reading MDX frontmatter via `next-mdx-remote` style or `@next/mdx`; slugs preserved from legacy (`navigating-athens-rental-market-2024-insiders-guide`, `how-to-secure-rental-apartment-athens-guide`, `renters-guide-athens-best-neighborhoods`, `furnished-vs-unfurnished-apartments-athens-cost-analysis`).

Migrate the 4 posts' text from `docs/crawl-pages/` (they are the best legacy content — keep tables and FAQs, drop the WordPress cruft, keep original publish date 2025-10-06 in frontmatter, category `renting-in-athens` instead of "Uncategorized"). English only in v1 (posts target international renters).

- [ ] **Step 1: Failing test** — `getPosts()` returns 4 posts with the exact legacy slugs; each body length > 3000 chars.
- [ ] **Step 2: Run** — FAIL. **Step 3: Implement.** **Step 4: Run + build** — PASS. **Step 5: Commit** `feat: journal`.

---

### Task 12: SEO — metadata, sitemap, robots, legacy 301 map

**Files:**
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`
- Modify: `next.config.ts` (redirects), every page's `generateMetadata` (verify)
- Test: `tests/seo.test.ts`

**Interfaces:**
- Consumes: `properties[].legacyUrls`, journal slugs, experience slugs.
- Produces: `redirects()` array in `next.config.ts`.

Redirect map (all `permanent: true`, add trailing-slash variants are normalized by Next):
```ts
// static
{ source: "/about-us-1", destination: "/en/about" }, { source: "/about-us-2", destination: "/en/about" },
{ source: "/contact-us-1", destination: "/en/contact" },
{ source: "/apartment-rental", destination: "/en/apartments" },
{ source: "/properties", destination: "/en/apartments" }, { source: "/property", destination: "/en/apartments" },
{ source: "/apartment-renovation", destination: "/en/owners/renovation" },
{ source: "/home-airbnb", destination: "/en/owners" },
{ source: "/tour", destination: "/en/experiences" },
{ source: "/athens", destination: "/en/experiences/athens" }, { source: "/athens/:slug", destination: "/en/experiences/athens" },
{ source: "/alimos", destination: "/en/experiences/alimos" }, { source: "/alimos/:slug", destination: "/en/experiences/alimos" },
{ source: "/entry-process-facilities/:path*", destination: "/en/guest-info" },
{ source: "/ways-to-go", destination: "/en/guest-info" },
{ source: "/blog", destination: "/en/journal" },
{ source: "/apartment-showcase", destination: "/en/apartments" },
// generated: every properties[].legacyUrls entry -> /en/apartments/<slug>
// generated: 4 blog slugs -> /en/journal/<slug>
// legacy check-in pages -> guest-info (do NOT map to /stay tokens):
//   /acropolis-harmony-loft, /coastal-harmony-alimos, /harmony-athens-city-apartment,
//   /harmony-gazi-living, /harmony-luxe-living, /harmony-luxury-grand-suite,
//   /harmony-twin-lofts-metaxourgeio-1, /harmony-twin-lofts-metaxourgeio-2 -> /en/guest-info
// theme junk -> home: /elements/:path*, /home-agency, /home-agent, /home-full-map, /home-half-map,
//   /home-slider, /luxus_content_block/:path*, /shop, /shop-2, /cart, /cart-2, /checkout, /checkout-2,
//   /my-account, /my-account-2, /signup, /agents, /agencies, /category/:path* -> /en
```
`sitemap.ts`: all locale pages + apartments + journal + experiences; **must not include `/stay/*`**. `robots.ts`: allow all, `disallow: ["/stay/"]`, sitemap URL.

- [ ] **Step 1: Failing test** — import `redirects` (export it as a named const from a small `src/lib/redirects.ts` used by `next.config.ts`): every legacy URL from `docs/crawl-urls.txt`'s path list resolves to some redirect rule (write the assertion against a copied fixture `tests/fixtures/legacy-paths.json` generated from that file); sitemap contains `/en/apartments/coastal-harmony-alimos` and nothing matching `/stay/`.
- [ ] **Step 2: Run** — FAIL. **Step 3: Implement.** **Step 4: Run** — PASS. **Step 5: Commit** `feat: seo, sitemap, legacy redirect map`.

---

### Task 13: QA pass + preview deploy

**Files:**
- Create: `README.md` (env setup, content-editing guide for the client/agency, the OPS security note from Task 10, image checklist)

- [ ] **Step 1:** `npm test && npm run build` — all green.
- [ ] **Step 2:** `npm run dev`; manually verify: `/` → `/en`, EL switcher on every page, inquiry form validation errors, mobile nav, sticky book bar on a property page, one legacy URL redirect (`curl -I localhost:3000/home-agent` → 308/301 chain to `/en`).
- [ ] **Step 3:** Deploy preview: `vercel` (use the `vercel:deploy` skill; set SMTP env vars first via `vercel env`).
- [ ] **Step 4:** Commit `docs: readme` and send the preview URL + open-questions list to the client.

---

## Open questions for the client (blockers marked ⛔, rest have defaults)

1. ⛔ **Photography**: current listing photos are OTA-grade; hero + per-property galleries need supplying (or a shoot). Placeholders block launch, not development.
2. Nightly/monthly **prices in €** per apartment, and OTA listing URLs (Airbnb/Booking) — fields exist, render when provided.
3. Confirm the provisional name **"Harmony Syngrou Residence"** (ex "Vasilis Luxury Apartment 5") and real specs for the 3 previously uncataloged units (sizes/beds).
4. Social profile URLs (Instagram/Facebook/TikTok) and whether the WhatsApp number for guests = the public phone.
5. Owner-service pricing: publish a % (like competitors) or keep inquiry-only (current default).
6. Greek AMA registration numbers per property (legally required on listings — only the Loft's is known).
7. Approve Vasilis & Evelina appearing by name/photo in "Your hosts".
8. Booking engine phase 2: if they use a channel manager (Hostaway/Smoobu/etc.), we swap the inquiry form for its widget — which one do they use, if any?

## Self-review notes

- Every legacy real-content page maps to a task: home/about (5), listings (2, 6), services (8), tours (9), check-in + facilities (10), blog (11); every legacy URL 301s (12). Demo/junk pages intentionally have no successor.
- Types used across tasks are defined in Task 2 (`Property`, `site`) and Task 9/10/11 for their own data; `InquiryCta` defined in Task 7 is consumed in Tasks 6 and 8 with the same signature.
- No invented facts: all copy sources are cited to `docs/CONTENT_INVENTORY.md` sections; unknowns are nullable and render as absent.

---

## Amendment A1 (2026-09-09, user-directed): Adopt Carento design language

The user supplied the purchased "Carento" Next.js template (car rental, Bootstrap 5, Urbanist font) and directed that its DESIGN be adopted, adapted to our content/categories. Decision: keep this plan's architecture (Next 16 + Tailwind v4 + next-intl + content layer + tests) and transplant Carento's visual language onto it. Reference copy of the template lives at the session scratchpad `carento/carento_v2.0.0_Unzip-First/1.carento_nextjs_template/` (source of truth for look: `public/assets/css/main.css` tokens + `components/sections/*.tsx` layouts + Figma in the zip).

Superseded: the "Athenian Riviera" token set (sand/sea/terracotta) as the PRIMARY look. New global tokens (Carento): font Urbanist (latin) with Inter fallback for Greek; neutrals #000→#fff scale (`neutral-100 #f2f4f6`, `neutral-200 #e4e6e8`, `neutral-500 #737373`, `neutral-900 #313131`, `neutral-950 #1e1e1e`); brand green `#70f46d` (hover `#5edd5b`, dark tint `#2d4a2c`, link hover `#235922`); pastel section backgrounds (`#fff0ec`, `#d8f4db`, `#e3f0ff`, `#f6f3fc`, `#fcfcf3`); border `#dde1de`; warning `#ffc700`. Component language: white cards radius ~16px with `#dde1de` borders, pill buttons (black or brand green with black text), specs row with icon+label separated by dividers, hero with large rounded media panel + floating search card, black footer with newsletter row, pastel category tiles.

New tasks inserted after Task 7 (renumbering avoided — letter suffixes):
- **Task 7A — Carento reskin, global + existing pages**: swap fonts/tokens in globals.css & fonts.ts; restyle Header (white bar, pill CTA), Footer (black, columns + newsletter row), Hero (search card style), PropertyCard (car-card anatomy adapted to apartments), Section/CtaBand/Testimonials/Faq/ServiceRow, apartments list+detail, contact, about. Copy needed decorative/icon assets from the template's `public/assets/imgs` into `harmony-rental/public/carento/` (selective, no demo photos of cars). All existing tests must stay green (assertions are content-based, not style-based).
- Tasks 8–11 proceed as planned but styled in the Carento language (their dispatches carry the new token/component notes).
