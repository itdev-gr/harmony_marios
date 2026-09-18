# Harmony Rental

Rebuild of `harmonyrental.gr` — Next.js App Router site for a boutique
short-term-rental operator in Athens & Alimos, Greece. English/Greek,
Carento-derived design language, content-as-code with no CMS.

## Project overview

**Stack**

- [Next.js 16](https://nextjs.org) (App Router, Turbopack build), React 19
- [next-intl](https://next-intl.dev) for `en`/`el` routing and translation, with a
  `[locale]` segment (`localePrefix: "always"`, default locale `en`) — see
  `src/i18n/routing.ts`
- Tailwind CSS v4, design tokens adapted from the purchased "Carento" template
  (Urbanist font, brand green, pastel section backgrounds — see
  `src/app/globals.css`)
- Content lives in typed TypeScript modules under `src/content/` (properties,
  site copy, experiences, stay pages) plus Markdown/MDX for the journal — no
  database, no CMS. Everything is validated with [Zod](https://zod.dev)
  schemas (`src/content/types.ts`)
- `nodemailer` for the inquiry form's email delivery (`src/lib/notify.ts`),
  SMTP-configured via environment variables, console-log fallback in dev
- [Vitest](https://vitest.dev) + Testing Library for unit/component tests
  (`tests/`, 138 tests as of this pass)

**Structure**

```
harmony-rental/
├─ src/
│  ├─ app/
│  │  ├─ [locale]/            # every public page: home, about, apartments
│  │  │                       # (+[slug]), experiences (+athens/alimos),
│  │  │                       # owners (+renovation), guest-info, journal
│  │  │                       # (+[slug]), contact
│  │  ├─ stay/[token]/        # gated per-property arrival info, noindex
│  │  ├─ sitemap.ts, robots.ts
│  │  └─ globals.css          # Carento design tokens
│  ├─ components/             # Header, Footer, Hero, PropertyCard, Section,
│  │                          # CtaBand, Testimonials, Faq, Gallery, etc.
│  ├─ content/                # the site's data — see "Content editing guide"
│  │  ├─ types.ts             # Zod schemas (Property, Stay, …)
│  │  ├─ properties.ts        # the 9 apartments
│  │  ├─ site.ts              # site-wide copy: services, FAQs, testimonials,
│  │  │                       # renovation projects, contact info
│  │  ├─ experiences.ts       # Athens/Alimos area-guide content
│  │  ├─ stay.ts              # token-gated arrival instructions
│  │  └─ journal/*.mdx        # the 4 blog posts
│  ├─ i18n/                   # next-intl routing/navigation/request config
│  ├─ lib/                    # inquiry.ts (server action), notify.ts (SMTP),
│  │                          # redirects.ts (legacy 301 map), journal.ts
│  └─ messages/en.json, el.json   # all UI strings (nav, buttons, FAQs, …)
├─ tests/                     # Vitest suite, one file per page/feature area
├─ public/                    # static assets — currently just the Next.js
│                             # placeholder icons; real photos not yet added
│                             # (see "Images checklist")
└─ .env.example
```

## Getting started

From `harmony-rental/` (this directory):

```bash
npm install        # install dependencies
npm run dev         # dev server at http://localhost:3000
npm test            # run the Vitest suite (138 tests)
npm run build        # production build (Turbopack)
npm run start        # serve the production build (add -- -p <port> to pick a port)
npm run lint         # ESLint
```

`npm run build && npm test` should both be green before anything ships —
that's the whole QA bar for this project (no e2e/browser suite exists yet).

## Environment variables

Copy `.env.example` to `.env.local` for local development. All variables
configure outbound SMTP for the inquiry/booking form (`src/lib/notify.ts`):

| Variable    | Purpose                                                        |
| ----------- | ---------------------------------------------------------------- |
| `SMTP_HOST` | SMTP relay hostname                                              |
| `SMTP_PORT` | SMTP port (587 is the documented default)                        |
| `SMTP_USER` | SMTP auth username                                                |
| `SMTP_PASS` | SMTP auth password                                                |
| `MAIL_FROM` | From-header for outgoing mail, e.g. `"Harmony Rental <bookings@harmonyrental.gr>"` |

**If `SMTP_HOST` is unset** (the default in dev and in any preview deploy
without env vars configured), `sendMail()` logs the composed message to the
console instead of sending it — the inquiry form still works end-to-end (no
crash, user still sees a success state), it just doesn't deliver mail. This
is deliberate so local dev and preview deploys don't need real credentials.
Any standard SMTP relay works; the code is provider-agnostic (pick one via
the Vercel Marketplace, or use the client's existing provider).

## Content editing guide

There is no CMS — content is TypeScript/MDX committed to the repo. Everyone
editing content needs `npm test` to pass afterward (the Zod schemas and
several tests catch malformed entries).

**Apartments** — `src/content/properties.ts`, typed by `propertySchema` in
`src/content/types.ts`. To add an apartment:

1. Add a new object to the `properties` array with a unique `slug`
   (`^[a-z0-9-]+$`), `area` (`"athens" | "alimos"`), and the rest of the
   fields (`sizeSqm`/`bedrooms`/`bathrooms`/`sleeps` are nullable — use
   `null` for anything unknown, it renders as absent rather than a guess).
2. Give it real `images: ["/images/<slug>/01.jpg", …]` entries once photos
   exist (see "Images checklist" below) — the array can be empty in the
   meantime, `PropertyCard` falls back to a placeholder.
3. If it replaces a legacy WordPress listing, add the old path(s) to
   `legacyUrls` so `src/lib/redirects.ts` picks it up automatically (that
   module derives the 301 map from `properties` + journal posts + a static
   list — no separate redirect entry needed for a property/post).
4. The apartment detail page and its `generateStaticParams` are entirely
   data-driven from this array — no per-property code to write.
5. Run `npm test` — `tests/content.test.ts` and `tests/apartments.test.tsx`
   validate the schema and page rendering.

**Site-wide copy** — `src/content/site.ts`: contact info, the services list,
guest/owner FAQs, testimonials, and `renovationProjects` (currently an empty
array — the before/after portfolio on `/owners/renovation` only renders once
this has `{ before, after, caption }` entries with real image paths).

**Adding a stay token** (gated arrival-info page) — `src/content/stay.ts`,
typed as `Stay { token, propertySlug, checkInFormUrl, sections }`:

1. Generate a token the same way the existing ones were made — a random
   value, never derived from the slug:
   ```bash
   node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
   ```
2. Add a `Stay` entry with that `token`, the matching `propertySlug`, and an
   array of `{ title, body }` sections (arrival/access, Wi-Fi, heating,
   house notes, etc. — see existing entries for the pattern; check-out has a
   shared `STANDARD_CHECKOUT` section you can reuse).
3. Set `checkInFormUrl` to the property's JotForm
   (`https://form.jotform.com/Harmonyrental/<form-slug>`) — the guest
   registration that collects the passport details Greek law requires, and
   for several properties the step that releases the building access code.
   The page shows it both above and below the instructions. Use `null` only
   when the property genuinely has no working form.
4. The page at `/stay/<token>` is `noindex, nofollow` and intentionally
   never appears in the sitemap — see the Security note below for why this
   exists and what NOT to put in the repo (e.g. no door-keypad codes in
   plain text).
5. Send the guest the `/stay/<token>` URL directly; it isn't discoverable
   any other way.

**Arrival photos** — a section can carry a single `photo`, and an
`Arrival & access` section can carry `steps: { title, body, photo? }[]`
which render as a numbered walk-through (`src/components/ArrivalSteps.tsx`).
Photos live at `public/images/stay/<propertySlug>/NN.jpg`, numbered in step
order, and their `width`/`height` in the data must match the file — a test
reads the JPEG header and fails on a mismatch, because a wrong value shifts
the layout under the guest while the image loads.

> **Four of these photos show credentials.** The Wi-Fi sections for the
> Loft, Coastal Alimos, the Grand Suite and Twin Lofts 1 carry a close-up of
> a router label or a printed Wi-Fi card; the Alimos and Grand Suite ones
> also show the router's admin login. They were migrated deliberately — the
> same images are still public and indexed on the legacy WordPress site, so
> a token-gated, robots-disallowed copy is an improvement on the status quo.
> It is not a fix: files under `public/` sit at a guessable static URL
> regardless of who can reach the page, so treat these credentials as
> already leaked and rotate them (see the Security note below).
>
> Before adding any *new* photo of this kind, check the password on it has
> been rotated since. A test fails on any file in `public/images/stay/` that
> no stay entry references, so an orphan dropped in "temporarily" can't sit
> there unexplained.

**Adding a journal (blog) post** — `src/content/journal/<slug>.mdx`:

1. Create a new `.mdx` file with frontmatter (`title`, `description`, `date`
   as `yyyy-mm-dd`, `category`) followed by the Markdown body. See
   `src/lib/journal.ts` — posts are read straight off disk (via `gray-matter`),
   sorted newest-first (ties broken alphabetically), no build step needed.
2. The journal index and `/journal/[slug]` route pick it up automatically;
   `legacyUrls`-equivalent redirects for posts are generated in
   `src/lib/redirects.ts` from `getPosts()`, so an old blog URL only needs
   adding there if one existed for it.
3. `npm run build` regenerates static params; `tests/journal.test.ts` checks
   the content pipeline.

## Images checklist

**No real property/site photography exists in this repo yet** — `public/` is
currently empty (the site icon lives in code, at `src/app/icon.svg`, not
under `public/`). The client needs to supply (or commission a shoot for) the
following before launch; each slot
below is already wired into the code and will render automatically once the
file exists at that path (see the ⛔ blocker in "Open questions" below):

- **Hero**: `public/images/hero.jpg` — one golden-hour/lifestyle shot used
  on the homepage hero (see the comment in `src/components/Hero.tsx`).
- **Per-property galleries**: `public/images/<slug>/01.jpg`, `02.jpg`, … for
  each of the 9 apartments (`src/content/properties.ts` `images` array,
  referenced by `src/components/PropertyCard.tsx` and `src/components/Gallery.tsx`).
  Current listing photos are OTA-grade; these need replacing or reshooting.
- **Host portraits**: `public/images/hosts/*.jpg` for Vasilis & Evelina in
  "Your hosts" (`src/components/HostsBand.tsx`) — pending approval, see
  open question 7 below; until photos exist the band shows initials.
- **Renovation before/afters**: already wired into the code — it's driven by
  `site.renovationProjects` in `src/content/site.ts`, which is currently an
  empty array (`{ before, after, caption }[]`). Once the client supplies
  before/after photo pairs, populate that array with real
  `/images/renovation/...` paths and the `/owners/renovation` portfolio
  section will render them; no further code change should be needed.

> **Never put a photo of a credential in a listing gallery.** `property.images`
> is rendered on the public, indexed `/apartments` pages — the first entry is
> also the card thumbnail. The legacy site had Wi-Fi cards in two galleries,
> one of them in first position, which is why Twin Lofts 2 now has no listing
> photos at all. `tests/content.test.ts` enforces a floor (file exists, at
> least 400px on the short edge, photo-shaped), but that catches only the
> obvious cases: a screenshot that happens to be photo-shaped passes. Look at
> a picture before adding it.

Filenames/paths above are conventions already assumed by the code — keep to
them (`/images/<slug>/NN.jpg`, zero-padded two-digit numbering) so no path
strings need editing alongside the photo drop.

## i18n

- Locales: `en` (default) and `el`, always prefixed (`/en/...`, `/el/...`);
  `/` redirects to the default locale. Routing/navigation helpers live in
  `src/i18n/` (`routing.ts`, `navigation.ts`, `request.ts`).
- All UI strings (nav, buttons, FAQs, footer, etc.) live in
  `src/messages/en.json` and `src/messages/el.json` as parallel key trees —
  edit both together.
- Editorial/property content (apartment summaries, journal posts, stay
  sections) is currently English-only in `src/content/*` — it is not run
  through the `messages/*.json` translation layer. A Greek translation pass
  for that content is out of scope for this rebuild.
- **Parity is enforced by a test**: `tests/i18n.test.ts` asserts
  `el.json`'s key set exactly matches `en.json`'s (recursively). Adding a
  string to one without the other fails `npm test` — this is the guardrail
  against silently missing translations.

## Deployment notes

- Target platform: Vercel (Next.js's own platform; no special config beyond
  env vars — see `vercel:deploy`/`vercel:env` skills for the mechanics).
- **Set the SMTP environment variables** (`SMTP_HOST`, `SMTP_PORT`,
  `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` — see "Environment variables" above)
  in the Vercel project before or at deploy time, or the inquiry form will
  silently fall back to console-logging instead of emailing the client.
- **Domain cutover**: once `harmonyrental.gr` (or its successor domain)
  points at this deployment, the full legacy-URL 301 map in
  `src/lib/redirects.ts` activates automatically — every old WordPress path
  this rebuild has a successor for redirects permanently. No separate step
  needed; it's just `next.config.ts`'s `redirects()`.
- **`/stay/[token]` must never enter the sitemap.** It is intentionally
  excluded from `src/app/sitemap.ts` and marked `noindex, nofollow`, and
  `src/app/robots.ts` disallows the whole `/stay/` path. If either of those
  is ever touched, re-verify with `curl -s <host>/sitemap.xml | grep /stay`
  (expect no matches) and `curl -s <host>/robots.txt` (expect
  `Disallow: /stay/`) — this is a hard requirement, not a style preference;
  see the Security note below for why.
- A build-time deprecation warning currently appears for the `middleware`
  file convention (Next.js recommends renaming to `proxy`); it does not
  affect behavior or fail the build. Worth a follow-up cleanup, not urgent.

## Security note for the client

The legacy WordPress site (`harmonyrental.gr`) published Wi-Fi passwords — and, on
one property (Harmony Gazi Living), the street-door keypad code — in plain text on
public check-in pages that anyone could find and index. This rebuild does not
repeat that mistake: per-property arrival details (including Wi-Fi) now live behind
unlisted, unguessable `/stay/<token>` pages (`src/content/stay.ts`), marked
`noindex, nofollow`, and the Gazi keypad code specifically has been left out of
this codebase entirely — guests are told it is "sent via WhatsApp before arrival."

That only closes the leak going forward. The credentials that were already public
are compromised and must be treated as such:

1. **Before launch**, ask the client to noindex or delete the old WordPress
   check-in pages (`/acropolis-harmony-loft/`, `/coastal-harmony-alimos/`,
   `/harmony-athens-city-apartment/`, `/harmony-gazi-living/`,
   `/harmony-luxe-living/`, `/harmony-luxury-grand-suite/`,
   `/harmony-twin-lofts-metaxourgeio-1/`, `/harmony-twin-lofts-metaxourgeio-2/`),
   or at minimum add `noindex` to them, so they stop being discoverable while both
   sites are live.
2. **After launch**, rotate the Gazi building's keypad code and every Wi-Fi
   password listed on those legacy pages (they are all still the live credentials
   as of this writing), then update the new values in `src/content/stay.ts` so the
   gated pages stay accurate.

## Open questions for the client

Carried over from the project plan (`docs/superpowers/plans/2026-09-09-harmony-rental-redesign.md`),
with anything resolved since noted inline. Blockers marked ⛔; the rest have
sensible defaults already applied so development wasn't blocked on them.

1. ⛔ **Photography**: current listing photos are OTA-grade; hero + per-property
   galleries need supplying (or a shoot). This blocks launch, not development —
   see "Images checklist" above for exactly what's needed and where it goes.
2. Nightly/monthly **prices in €** per apartment, and OTA listing URLs
   (Airbnb/Booking) — fields exist in `propertySchema` (`otaLinks`), they
   render once provided.
3. Confirm the provisional name **"Harmony Syngrou Residence"** (ex "Vasilis
   Luxury Apartment 5") and real specs for the 3 previously uncataloged
   units (sizes/beds) — flagged in code via `provisionalName: true`.
4. Social profile URLs (Instagram/Facebook/TikTok) and whether the WhatsApp
   number for guests = the public phone.
5. Owner-service pricing: publish a % (like competitors) or keep
   inquiry-only (current default).
6. Greek AMA registration numbers per property (legally required on
   listings — only the Loft's is known); `registrationNo` is nullable and
   renders as absent until supplied.
7. Approve Vasilis & Evelina appearing by name/photo in "Your hosts" — see
   "Images checklist" for the host-portrait slot this unblocks.
8. Booking engine phase 2: if they use a channel manager (Hostaway/Smoobu/
   etc.), the inquiry form gets swapped for its widget — which one do they
   use, if any?
9. ⛔ **Twin Lofts 2 has no listing photos at all.** The only two the legacy
    site provided were close-ups of the apartment's Wi-Fi card, which cannot
    sit in a public gallery, so they were removed and the card now falls back
    to a monogram plate. Needs a normal interior shoot.
10. ⛔ **Arrival photos for both Twin Lofts.** Their legacy check-in pages
   describe a keypad, a numbered key locker, a first-floor door and a card
   slot but never showed any of them — the only usable photo on either page
   is the electrical panel. A guest arriving after dark has text only. Needs
   five phone photos per unit: building entrance, keypad, locker (marked "1"
   / "2"), the apartment door on the 1st floor, and the card slot inside.
   These cannot be borrowed from Gazi Living — that is a different building.
11. **`harmony-gazi-living`'s JotForm returns 404.** `checkInFormUrl` is
    `null` for it, so its stay page currently shows no check-in call to
    action at all. Needs a working form URL.
12. **`harmony-luxe-living`'s JotForm is the generic
    `/Harmonyrental/harmony-rental` form**, not a per-property one — left as
    found rather than guessed at. Confirm whether that is deliberate.
13. The legacy site records the **same Wi-Fi SSID
    (`VODAFONE_GigaWiFiHome_6565`) for Gazi Living and both Twin Lofts**,
    which are not the same building — so at least one was copy-pasted. Twin
    Lofts 2 is now corrected to `..._2889`, read off the photo of the
    physical card in that apartment; Gazi Living and Twin Lofts 1 still both
    claim `..._6565` on text alone and should be checked on the next visit.
14. **Street addresses** for `acropolis-harmony-loft` and both Twin Lofts
    are still `null`, so their arrival pages link a neighbourhood-level map
    pin rather than a door. The legacy "click here for address" links were
    Firebase Dynamic Links and now all 404, so nothing is recoverable from
    them. (The loft's entrance photo shows street number 80, if that helps
    the client identify it.)

**Resolved since the plan was written**: the design direction question
implied by the original "Athenian Riviera" token set (sand/sea/terracotta)
was superseded by Amendment A1 — the client supplied the purchased "Carento"
template and directed that its visual language be adopted instead. That
decision is final; the design tokens now in `src/app/globals.css` are
Carento-derived (Urbanist font, brand green `#70f46d`, pastel section
backgrounds), not the original palette.
