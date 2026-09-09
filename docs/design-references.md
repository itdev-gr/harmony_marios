# Design Reference Report — harmonyrental.gr Redesign

Researched September 2026. All sites below were verified live via fetch unless noted otherwise. Context: Harmony Rental (Athens/Alimos) offers ~10 short/mid-term apartments, Airbnb property management, renovation services, and Athens/boat tours. Current site is a broken WordPress "Luxus" real-estate theme (PHP warnings in output, lorem ipsum placeholder sections, real-estate-portal search filters like "status/property type" that make no sense for hospitality). Target: modern boutique hospitality/aparthotel brand with direct booking.

---

## 1. Boutique short-stay / aparthotel brands (gold standard)

### Bob W — https://bobw.co ✅ live
The strongest overall model for Harmony's guest-facing side: small-brand personality + hotel-grade booking.
- **Hero**: warm lifestyle photography (made bed, building entrance) + a personality headline ("Hello local!") + one clear CTA ("Find Accommodation"). No cluttered multi-field search — a single strong entry point.
- **Typography/voice**: conversational but professional copy with jokes baked in ("Flexible is Bob's middle name", "Smoothest check-in ever"). A named-character brand voice is very adoptable — "Harmony" can speak the same way.
- **Color**: warm, earthy neutrals with olive accent — hotel-luxury without coldness.
- **Adoptable patterns**: horizontal property-card galleries (image, location name, neighborhood blurb, "Explore" link); illustrated feature icons; an editorial "Travel Notebook" (maps directly onto Harmony's tours/local-guide content); sustainability/trust callouts.

### Locke — https://www.lockeliving.com ✅ live
The benchmark for "aparthotel as lifestyle brand."
- **Hero**: full-width photo + headline "Your kind of hotel. In cities worth knowing." with the **search/booking widget directly below the headline** (destination + dates + promo code). This hero-widget pattern is exactly what Harmony should copy.
- **Typography**: modern sans, aspirational conversational copy emphasizing flexible stay length ("as short or as long as you like") — matches Harmony's short/mid-term mix.
- **Property presentation**: city cards with thumbnails and counts → hotel grid with contextual descriptive snippets, not spec dumps.
- **Adoptable patterns**: direct-booking incentive (member discount ~10%), "What's On"/events content, 9-language selector (Harmony needs at least EN/EL).

### Sonder — https://www.sonder.com ✅ live
- **Hero**: rotating carousel of high-quality lifestyle photography with a prominent search widget; "dynamic visuals paired with quiet UX" (also cited by Mediaboom as a best-in-class example).
- **Property cards**: image, name, rating + review count, neighborhood, amenity icons, nightly rate — a complete scannable card anatomy worth copying at Harmony's scale.
- **Adoptable patterns**: curated collections ("Long Stays", "Business Travel", "Pet-Friendly") — Harmony could do "Near the sea (Alimos)", "Acropolis view", "Family stays", "Monthly stays"; editorial "Journal" with city guides.

### Numa — https://numastays.com ⚠️ live but rate-limited fetch; described from press/secondary sources
- Digital-first pitch front and center: "No keycard. No waiting." — leads with the *experience promise* (contactless check-in, digital concierge), not the inventory. Harmony should surface its own check-in/self-service story the same way.
- Lowercase wordmark, bold contemporary type, warm palette; "technology and taste in the world's greatest neighbourhoods" positioning; Trustpilot-praised booking UX.
- Runs a separate corporate/group-travel subdomain and an owner/partner portal — clean audience separation without polluting the guest homepage.

### Limehome — https://www.limehome.com/en ✅ live
- Tagline discipline: "designed to stay" carried everywhere; "100% digital from booking to check-out."
- City/property cards with editorial labels ("Top Locations", "Local Charm", "Best Rated") — a cheap way to make a small grid feel curated. Notably features **Athens** as a destination.
- Direct-booking incentive stated bluntly: "15% off every stay when you book directly" — the single most important conversion message for a small operator competing with its own Airbnb listings.

### Kasa — https://kasa.com ✅ live
- Hero: full-width penthouse photo, emotional headline ("Check in to your comfort zone"), search widget (location/dates/guests) immediately below — frictionless conversion-first entry.
- Best-in-class **dual-audience navigation**: guest links (bookings, locations) cleanly separated from partner links (property partners, corporate) — the exact problem Harmony has with rentals vs. management vs. renovation.
- Massive guest-review carousel emphasizing contactless check-in and cleanliness — social proof as a full homepage section, not a footnote.

---

## 2. Athens / Greece-relevant references

### Blueground — https://www.theblueground.com ✅ live (Athens-founded)
- Hero = search widget (location, move-in, move-out) + trust stats ("100,000+ furnished homes") + headline "Built for living, not just staying."
- Blue as a single strong brand color across buttons/UI on neutral ground — proof that one confident accent color carries a whole product.
- Clear three-audience split in the nav: guests / corporate clients / landlords ("partner with us") — the model for Harmony's rentals + management split.
- Duplicated search widget top and bottom of the homepage — zero-friction re-entry into booking.

### UPSTREET Athens — https://upstreet.io ✅ live (note: upstreet.gr has a broken cert; the working domain is upstreet.io)
The closest true comparable: a small Athens furnished-apartment brand with ~dozens of units.
- Positioning headline: "It is not about being hosted anymore. It is all about living." / "Don't Stay. Live." — lifestyle framing over listing framing.
- Minimal, photo-dominant design; three featured apartment cards with neighborhood, capacity, "From €100" pricing.
- **Neighborhood-first presentation** (Marousi, Paleo Faliro, Pagrati) — Harmony should own Alimos/Athens Riviera the same way.
- Length-of-stay discounts shown on the homepage (7+ nights up to 15% off, 14+ nights 20%) and a "Property Owners" nav item next to "Apartments" — small-scale dual-audience done simply.

### The Dolli — https://www.thedolli.com ✅ live (Grecotel boutique, Athens)
The luxury ceiling for Athens hospitality art direction.
- Full-screen **video hero of the Acropolis/Athens skyline**; headline "In the heart of Athens. Gazing at the Parthenon." — place-as-hero, golden-hour "Athenian light" photography throughout.
- Uppercase, sparse, classical sans headlines; black/white/warm-gray palette; extreme whitespace; persistent "BOOK" button in the header (the pattern to steal: booking always one click away regardless of scroll depth).
- Rotating press/award logo carousel (Condé Nast, Michelin) — Harmony's equivalent is Airbnb Superhost badge + review scores.

### The Thinking Traveller — https://www.thethinkingtraveller.com ✅ live (White Key Villas' whitekeyvillas.com now 301-redirects here; the brand was absorbed)
- Evocative seasonal hero copy ("Golden light, slower travel") over full-width photography — Mediterranean mood-setting in three words.
- Search widget (destination/dates/guests/bedrooms) plus a parallel high-touch path: "Book a call" with a villa specialist — the concierge duality Greek luxury players use.
- Thematic villa collections ("Villas on the sea", "Large family villas") instead of filter-first browsing — right model for a 10-property portfolio.

### Five Star Greece — https://www.fivestargreece.com ✅ live
- White-on-dark restrained luxury; hero tagline leads with credentials ("bespoke luxury Greek villa specialists for over twenty years").
- Deliberately **anti-grid**: "We don't list 500 villas online… we work on a consultation basis" — an extreme concierge posture; the takeaway for Harmony is the tone (small elite team, personal matchmaking) applied to tours/renovation inquiries, not to the apartment grid.
- Press-logo social proof (Vogue, FT, Harper's Bazaar); yachts/experiences as add-on services under one luxury umbrella — precedent for tours + boat tours living beside rentals.

### ❌ BlueVillas — bluevillas.com is dead (domain parked at GoDaddy). Do not use as a reference.

**What the best Greek players do**: (1) full EN/EL bilingual toggles (Elite Hosting, and legally sensible for owner-facing pages); (2) neighborhood/area storytelling as a first-class content type (UPSTREET's neighborhoods, Dolli's "Historical Athens", Thinking Traveller's destination guides); (3) concierge framing — a human you can call/WhatsApp, experiences bundled with stays; (4) golden-light Mediterranean photography as the identity, not stock interiors.

---

## 3. Multi-service presentation (guest bookings + "we manage your property" + renovation)

### GuestReady — https://www.guestready.com ✅ live
The cleanest template for Harmony's dual-audience problem.
- **Hero toggle: "I'm a property owner" / "I'm a guest"** — one switch segments the entire page. Directly adoptable.
- Owner path leads with an address-based **revenue calculator** ("how much could your property earn?") — the standard conversion device for management pitches; it appears twice on the page.
- Transparent pricing ("from 12% of rental revenue") + Trustpilot + press logos.
- Guest nav ("Book my next stay", "Find my booking") kept fully separate from owner nav (Property management / Airbnb management / Mid-term management).

### Houst — https://www.houst.com ✅ live
- Pain-point headline ("Get rid of your hosting headaches") + quantified benefit ("Earn up to 56% more").
- Staggered CTAs: soft ask first (earnings calculator) before hard ask (free consultation) — good funnel design for Harmony's management page.
- Persona tabs (Homeowners / Landlords / Multi-property / Investors); dashboard screenshots as proof of professional operations; scale stats ("11,650+ properties", "£230M+ earned for hosts"); black-on-white minimal palette with high-contrast CTAs.

### Elite Hosting (Athens) — https://elitehosting.gr ✅ live
A real Greek Airbnb-management competitor, worth studying for local conventions.
- Full **Greek/English toggle**; compliance messaging referencing the new Greek STR regulations (effective Oct 2025) — a trust signal Harmony should copy for owner pages.
- Transparent three-tier pricing (18% / 20% / 25% of reservations) with itemized inclusions — rare candor that converts.
- Guest listings offloaded to a DirectStays-powered "Our Properties" link — evidence that even local competitors separate the booking engine from the marketing site; Harmony can do better by integrating it.
- End-to-end service list (photoshoot → listing creation → guest comms → maintenance) framed as "enjoy ownership, we handle operations."

**Pattern synthesis for Harmony's four services**: lead the homepage 90% as a guest-facing boutique stay brand (that's the emotional brand-builder and the direct-booking revenue); put "Property Management" and "Renovation" as one "For Owners" nav section (GuestReady toggle or Kasa/Blueground-style partner nav), with calculator + tiered pricing + compliance trust inside. Renovation is best pitched as the *upgrade path within management* ("we renovate, furnish, list, and manage — full circle") — no reference site leads with renovation, and Harmony shouldn't either. Tours/boat tours slot into the guest side as "Experiences" (Five Star Greece's yachts, Dolli's Experiences, Bob W's Travel Notebook all prove experiences sit naturally under a hospitality brand).

---

## 4. Design gallery finds (Awwwards / curated lists)

From Awwwards' hotel-booking nominees (https://www.awwwards.com/websites/hotel-booking/) and Mediaboom's vacation-rental roundup (https://mediaboom.com/news/vacation-rental-website-design/):

1. **KUBE Saint-Tropez** — kube-hotel-saint-tropez.com (by Digidop, Awwwards nominee). Riviera luxury-hotel site: sun-drenched full-bleed photography, playful motion, strong single-property storytelling. Takeaway: seaside-resort art direction that would translate to Alimos/Athens Riviera; scroll-driven immersion instead of widget clutter.
2. **Vakantiehuis Coquelicots** — by Studio Noot (Awwwards nominee). A *single vacation rental property* site with award-level design — proof that tiny inventory can look world-class. Takeaway: intimate, personal photography and a story-first page beat portal patterns at small scale.
3. **Vander Hotel** — by .RAW (Awwwards nominee). Contemporary boutique-hotel presentation, editorial layout, confident typography. Takeaway: dark/moody boutique direction with restrained UI.
4. **Onefinestay** — https://www.onefinestay.com (Mediaboom pick). Takeaway: floating navigation that transforms into the booking system on scroll; persistent human-contact affordances (phone number in header) — the concierge cue.
5. **Plum Guide** — https://www.plumguide.com (Mediaboom pick). Takeaway: "award credibility integrated visually" — every home wears a badge of vetting; sleek decision-fast layout. Harmony's analog: a "Harmony-standard" quality mark on each apartment card.
6. **Quintess Collection** — https://quintess.com (Mediaboom pick). Takeaway: large homepage image carousel, calm teal-accent palette, simplified UX — a template for "quiet luxury with one color."

Galleries to browse during design: lapa.ninja/post/vacation/, land-book.com (filter: travel), awwwards inspiration search "hotel".

---

## 5. Booking UX patterns for small direct-booking rental sites

Standard stack at Harmony's scale (~10 units), per Lodgify/Hostaway/Smoobu ecosystems and the brand sites above:

- **Hero search widget** (destination optional at single-city scale → just **dates + guests + "Check availability"**) directly under the headline: Locke, Kasa, Blueground, UPSTREET all do this. With one city, the widget can collapse to a date-range picker, which is cleaner.
- **Per-property availability calendar + instant quote** on each apartment page, synced with Airbnb/Booking via channel manager. This is the table-stakes pattern all three builders (Lodgify, Hostaway, Smoobu) implement; Hostaway's standard practice is explicitly "build a custom-designed site and embed the booking widget" — the right architecture for a bespoke Harmony design (custom front end + embedded engine/API, not a builder template).
- **Direct-booking incentive messaging**: Limehome "15% off when you book direct", Locke member 10%, UPSTREET length-of-stay discounts (7+/14+ nights). Industry data (Lodgify) shows ~40% of bookings can go direct with a good site — put "Best price guaranteed — book direct" next to the widget.
- **Persistent booking access**: sticky header "Book" button (The Dolli), or nav that morphs into a booking bar on scroll (Onefinestay). On mobile: sticky bottom "Check availability" bar on property pages.
- **OTA links as fallback, not primary**: Sonder links out to Booking/Expedia on some cards, but every boutique brand pushes the native engine first. Harmony should show Airbnb/Booking review scores as *trust badges* while keeping the book-direct CTA primary.
- **Card anatomy standard** (Sonder/Kasa): photo carousel, name, neighborhood, sleeps/beds/baths as icons, "from €X/night", rating, one CTA. Kill the real-estate filters (status, property type, price sliders) from the current site entirely.
- **Trust cluster near the widget**: review score + count, "self check-in", "free cancellation window", host photo/phone (small-operator advantage — a real human, per Onefinestay/Five Star Greece concierge cues).

---

## Synthesis — three candidate art directions for Harmony Rental

### Direction A: "Athenian Riviera Minimal" (warm Mediterranean luxury)
- **Look**: warm off-white/sand ground, deep sea-blue or olive accent, one serif display face (headlines) + humanist sans (UI/body), generous whitespace, full-bleed golden-hour photography of Alimos seafront, Acropolis views, interiors with natural light. Uppercase sparse section labels.
- **Hero**: full-screen photo or short video of the Riviera/rooftop at dusk, three-word evocative headline ("Stay in the light" / "Live like Athens"), minimal date-picker widget beneath, sticky "Book" in header.
- **Draws from**: The Dolli (place-as-hero, whitespace, sticky BOOK), The Thinking Traveller ("golden light, slower travel" mood copy), KUBE Saint-Tropez (Riviera photography energy), Vakantiehuis Coquelicots (small-inventory intimacy), Five Star Greece (concierge tone for tours/renovation).
- **Best if**: Harmony wants to price-anchor upward and lean on sea/Acropolis photography; tours and boat tours fit this world perfectly as "Experiences."

### Direction B: "Modern Aparthotel" (clean, digital-first, conversion-led)
- **Look**: crisp white/neutral base, one bold confident accent (Blueground blue → for Harmony perhaps an Aegean teal or terracotta), geometric sans throughout (lowercase-friendly wordmark à la numa), card-grid system, illustrated feature icons, editorial labels on cards ("Local Charm", "Sea View").
- **Hero**: lifestyle interior photo + benefit headline with personality ("Hello Athens." / "Don't stay. Live." energy), dates+guests widget in the hero, "Book direct — 10% off" badge beside it, digital-first promises row (self check-in, 24/7 chat, fast Wi-Fi).
- **Draws from**: Bob W (voice, warm-modern palette, Travel Notebook→area guides), Locke/Kasa (hero widget pattern, dual-audience nav), Limehome (direct-discount bluntness, card labels), Numa (digital-first promise), Blueground (single accent color, Athens credibility).
- **Best if**: Harmony wants maximum direct-booking conversion and a scalable system look as the portfolio grows; easiest to build well.

### Direction C: "Local Host, Full Circle" (boutique-personal, service-forward hybrid)
- **Look**: warm neutrals + charcoal, mixed serif/sans editorial typography, photography that includes people (the team, guests on the boat tour, a renovation before/after), neighborhood-map motifs of Alimos/Athens.
- **Hero**: split or toggled hero — "Stay with us" (dates widget) / "Own with us" (revenue estimate CTA) — with the guest side default; below, a "full circle" strip: *we renovate → we furnish → we host → you earn / you stay*.
- **Draws from**: GuestReady (owner/guest toggle, revenue calculator), Houst (staggered CTAs, proof stats), UPSTREET (small Athens operator done gracefully, neighborhood-first), Elite Hosting (EL/EN toggle, tiered transparent pricing, Greek STR compliance messaging), Plum Guide (a "Harmony standard" quality badge across apartments and managed properties).
- **Best if**: owner acquisition (management + renovation leads) is a co-primary business goal, not a footnote — this is the only direction that gives it front-page weight without wrecking the hospitality brand.

**Recommendation**: build on **Direction B as the structural/UX skeleton** (hero widget, card system, dual-audience nav, direct-booking incentives) **dressed in Direction A's Mediterranean palette and photography**, and borrow Direction C's owner toggle + full-circle services strip for the "For Owners" section. That combination is achievable at Harmony's scale, reads instantly as boutique hospitality rather than real estate, and gives every one of the four services a natural home: apartments (hero + cards), tours/boat tours (Experiences + Journal), management + renovation (For Owners with calculator and tiered pricing).
