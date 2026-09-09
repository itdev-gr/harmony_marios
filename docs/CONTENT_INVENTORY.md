# CONTENT INVENTORY — harmonyrental.gr

Source: crawl of 89 URLs (2026-09-09). Text extractions: `docs/crawl-pages/` · URL list: `docs/crawl-urls.txt`

Platform: WordPress + Elementor + **"Luxus" real-estate theme** (`wp-content/themes/luxus`, plugin `luxus-core`) + WooCommerce. Host path leaked in PHP warnings: `/home/u889715421/domains/harmonyrental.gr/public_html/`.

---

## 1. Business profile

**Company name:** Harmony Rental (also written "Harmony Rentals", "HarmonyRental.gr", "Harmonyrental", "harmonyrental.gr" — inconsistent across the site).

**Positioning statements found:**
- "Welcome to Harmony Rental! Your Premier Apartment Rental Experience in Greece"
- "We can find you the perfect property & help you locate the home of your dreams." (also the site meta description and footer tagline)
- "We're premier provider of apartment rental, renovation, and tourism services in Greece, dedicated to delivering exceptional experiences for travelers and property owners alike."
- "Your Trusted Partner for Premier Apartment Rentals, Renovations, and Tours in Greece"

**Services (5, from home page "Our Popular Services" + about page):**

| Service | Description as published |
|---|---|
| **Apartment Rental** | "We offer apartments in prime locations, perfectly suited for those who want to explore Greece's rich history and vibrant culture. Enjoy comfortable stays with easy access to the best attractions." |
| **Apartment Renovation** | "Transform your property into a modern, stylish space with our professional renovation services. Our team manages every detail, ensuring quality and efficiency at every step." |
| **Tour** | "Discover Greece's hidden gems with our expert-guided tours. From historical explorations in Athens to scenic island-hopping adventures, our tours are customized to suit your preferences." |
| **Home Airbnb** (Airbnb/STR management) | "Our Home Airbnb service maximizes your property's potential. We handle everything from listing optimization and guest communication to maintenance, ensuring a seamless experience and higher returns for property owners." |
| **Boat Tour** | "Our Boat Tour service offers an unforgettable exploration of Greece's beautiful coastline and islands. Enjoy personalized itineraries, stunning views, and a unique maritime experience tailored to your preferences." |

> **Gap:** Boat Tour is promoted on the home page with a "See Details" CTA but **has no landing page anywhere in the site**. Same for "island-hopping". The `/tour/` page is Athens/Alimos land attractions only.

**Home Airbnb service sub-offerings** (`/home-airbnb/`): Property Preparation & Styling; Listing Optimization; Guest Management & Support; Maintenance & Cleaning Services; Pricing & Revenue Optimization; Compliance & Safety Assurance. Value props: Professional Expertise, Maximized Earnings, Seamless Experience, Quality Assurance.

**Renovation process (7 steps)** (`/apartment-renovation/`): Consultation & Planning → Design & Approval (incl. 3D visualisations, Greek permits) → Demolition & Preparation → Structural Work (Greek building codes) → Interior Finishing → Quality Control & Inspections → Final Touches & Handover. Stated timeline: **4–12 weeks** for a full renovation.

**Vision / Mission / Goals** (`/about-us-1/`):
- Vision: "To become Greece's leading provider of premium property services, recognized for quality, reliability, and personalized experiences in the tourism industry."
- Mission: "To provide exceptional apartment rentals, renovations, and tour services across Greece, ensuring memorable experiences and satisfaction for every client."
- Goals: "To continuously enhance our service offerings, exceed client expectations, and build long-term relationships based on trust, quality, and professionalism."
- Why Choose Us: "tailored services backed by local expertise… quality, personalized experiences, and professionalism."

**Locations served:** Athens (city centre — Metaxourgeio, Gazi/Kerameikos, Victoria/Larissis, Neos Kosmos/Syngrou-Fix area) and **Alimos** (southern coastal suburb, Kalamaki). The property search taxonomy only contains two cities: **Alimos** and **Athens**, and one type: **Apartment**. Marketing copy claims "across Greece" / "island-hopping" but no other location has content.

**Named people:** "Vasilis" and "Evelina" sign the check-in/check-out, food-tips and transportation letters ("Best Regards, Vasilis Evelina" / "Best Regards, Vasilis"). Most properties are branded "Vasilis Luxury Apartment". No real team bios exist — the About and Agents pages use placeholder "John Doe / Jane Doe, Agent".

**Pricing found on the site (very little, and none for the actual apartments):**
- **Airport transfer** (`/entry-process-facilities/transportation/`): Taxi day rate (05:00–23:30) **€48**; taxi night rate (23:30–05:00) **€63**. Van up to 7 passengers: day **€100**, night **€120**.
- **Theme demo pricing** (`/elements/pricing-table-el/`): Basic / Premium / Business all "$99 / Yearly" with "Features List Title" placeholders — **demo content, not real**.
- **Blog editorial data** (not company pricing): Athens neighbourhood 2-bed rent ranges — Plaka €1,200–1,800; Kolonaki €1,500–2,500; Koukaki €900–1,400; Glyfada €1,300–2,200. Furnished vs unfurnished 70 m² 1-bed model: furnished €950/mo rent, €1,900 deposit, 12-mo total €13,300; unfurnished €750/mo rent, €1,500 deposit, €8,000–12,000 furniture, €500 kitchenware/linens, €250 utility connection, 12-mo total €19,250–23,250.
- **Every property listing shows an empty price** — the featured-property widget renders literally "Athens, $" and the search filter shows "Price Range: $ — $" with no values. **No apartment on the site has a price.**

**Ancillary bookable products** (`/apartment-showcase/`, WooCommerce-driven): "Vasilis luxury apartment in Athens", "Vasilis luxury apartment in Alimos", **"Luggage storage – apartments"** ("Are you going to arrive earlier or need to leave later? Leave your luggage in a secure storage."), **"Extra person / Guest"** ("If someone wants to follow you and join your trip, you can change the total number of guests here"). All have "Book Now" buttons; **no prices shown**, and the block is duplicated twice on the page.

**FAQ (home + apartment-rental, 6 Q&As):** How do I book an apartment?; Can I customize my tour itinerary?; What is included in the Airbnb management service?; How do I start a renovation project?; What types of boats are available for rental? ("yachts, sailboats, and speedboats"); Are there any discounts for long-term stays? ("Yes, we provide special rates for long-term rentals.").

**Renovation FAQ (5 Q&As):** duration; do I need to move out; can I customize the design; do you handle permits; what is the cost ("transparent, detailed quote after the initial consultation").

---

## 2. Contact info (exactly as found)

**Real (site footer, contact page, header block):**
- Phone: **`+306988811888`** (appears 85×, footer + `/contact-us-1/`)
- Email: **`info@harmonyrental.gr`** (appears 95×, footer, contact page, every property agent card)
- Office address: **`Vizantiou 2, Athina 117 41, Greece.`**
- Copyright: `© 2024 Harmony Rental. All Rights Reserved. Developed by IT DEV` (footer-01 demo block says `© 2024 HarmonyRental … Developed by IT-DEV`)
- Social icons in live footer: **Instagram, Facebook-f, Tiktok** (3 only)
- Newsletter: "Subscribe Our Newsletter — Join our email subscription now to get updates and notifications." (email field + Send)
- WhatsApp: referenced as the primary guest channel on every check-in page ("Whatsapp", "contact us via WhatsApp 1 hour before your check-in time") — **no number is printed**, it is a link.

**Placeholder / demo contact data still live on the site (must be purged):**
- `info@yourdomain.com` — appears **8×**, in `/home-agent/` and in the Luxus content blocks `header-01`, `footer-01`
- `+1 123 456 7890` (header-01), `+123 456 7890` and `+123 456 7899` (footer-01)
- `(123) 789-7390` and address **`5th Avenue, 3rd Floor New York, NY 1980`** on `/home-agent/`
- Demo social set on `/home-agent/` and footer-01: Facebook-f, Instagram, Twitter, Pinterest-p, Youtube; header-01 adds Linkedin-in

**Other identifiers found:**
- Property registration number on Acropolis Harmony Loft: **`00002966980`**
- Hosting account leaked in error messages: `u889715421`

---

## 3. Property portfolio

### 3a. Catalogue listings — the `/property/` custom post type (10 items)

| # | Name | City | Size | Beds | Baths | Parking | Listed | Key amenities | Notes |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **Coastal Harmony Alimos** (`/property/coastal-harmony-alimos/`) | Alimos — *20 Vasilissis Amalias, Alimos, Athens, 17455, Greece* | 62 m² | 1 | NA (desc says 1) | NA | 18 Dec 2024 | Air Conditioning, Airport shuttle, Balcony, Bathtab, Family rooms, Free Wifi, Private Bathroom, Shower; extra: Sitting Room | Description **entirely in Greek**, copy-pasted from Booking.com incl. "Genius discount / συνδεθείτε" boilerplate. 800 m to Edem Beach, 1.4 km Flisvos Beach, 1.7 km Kalamaki Beach, 3.3 km Flisvos Marina, 37 km ATH airport. Couples rating 8.9. |
| 2 | **Harmony Luxury Grand Suite** (`/property/harmony-luxury-grand-suite/`) | Athens — *54 Βίκτωρος Οὑγκώ, Αθήνα* | 102 m² | 3 (desc: 3 bedrooms, 3 bathrooms) | 2 | NA | 18 Dec 2024 | Air Conditioning, Airport shuttle, Balcony, Family rooms, Free Wifi, Non-smoking rooms, Shower | Greek Booking.com text. 800 m Larissa Metro, 600 m National Theatre, 900 m Omonia Sq., 30 km ATH. **Card says 2 baths, description says 3.** |
| 3 | **Acropolis Harmony Loft** (`/property/acropolis-harmony-loft/`) | Athens | **NA (missing)** | 3 | 2 | NA | 16 Dec 2024 | Air Conditioning, Flat-screen TV, Free Wifi, Kitchen, Washing machine | "10 guests · 3 bedrooms · 4 beds · 2 bathrooms". "Hosted by Harmony Rental, 2 years of experience as a host". Reg. no. **00002966980**. Airbnb-scraped text ("1 hour drive to this national park: National Park Parnitha"). |
| 4 | **Harmony Gazi Living** (`/property/harmony-gazi-living/`) | Athens | 39 m² | NA (desc: 1) | NA (desc: 1) | NA | 2 Dec 2024 | Air Conditioning, Airport shuttle, Balcony, Family rooms, Free parking, Free Wifi, **Goddess**, Heating, Lift, Shower | Greek Booking.com text. 700 m Kerameikos Metro, 900 m Gazi–Technopolis, 1.7 km National Theatre, 34 km ATH. Reception speaks Greek & English. **Its own "Related Properties" block lists itself.** |
| 5 | **Vasilis Luxury Apartment 6** (`/property/vasilis-luxury-apartment-6/`) — *Featured* | Athens | 39 m² | NA (desc: 2 bedrooms + sofa bed) | NA | NA | 2 Nov 2024 | Balcony, Free Wifi, Kitchen, Parking, Washing machine | English text. Bedroom 1: 1 double; Bedroom 2: 1 single; Living room: 1 sofa bed. 700 m Kerameikos Metro, 900 m Gazi–Technopolis, 34 km ATH. **This is the same flat as #4 Harmony Gazi Living** (identical distances) — duplicate listing under two brands. |
| 6 | **Vasilis Luxury Apartment 5** (`/property/vasilis-luxury-aparment-5/` — *slug typo "aparment"*) | Athens | 110 m² | NA (desc: "1 single bed") | NA | NA | 2 Nov 2024 | Air Conditioning, Balcony, Flat-screen TV, Free Wifi | English. 400 m Syngrou/Fix Metro, 1.1 km Acropolis Museum, 32 km ATH. "harmonyrental.gr rated the quality of this property 4 out of 5". **110 m² with 1 single bed is implausible.** |
| 7 | **Vasilis Luxury Apartment 4** (`/property/vasilis-luxury-apartment-4/`) | Athens | 50 m² | 3 | NA | NA | 2 Nov 2024 | Air Conditioning, Balcony, Free Wifi, Heating, Parking | **Description is verbatim the Greek text of "Harmony luxe living" (#8)** — wrong content pasted in. |
| 8 | **Harmony luxe living** (`/property/harmony-luxe-living/`) | Athens | 56 m² | 3 (desc: 1 bedroom) | NA | NA | 2 Nov 2024 | Air Conditioning, Free Wifi, Heating, Parking | Greek Booking.com text. 2.3 km Filopappou Hill, 2.5 km Syngrou/Fix Metro, 1.8 km Neos Kosmos Metro, 2.8 km Acropolis Museum, 34 km ATH. |
| 9 | **Vasilis Luxury Apartment Alimos** (`/property/vasilis-luxury-apartment-in-alimos/`) | Alimos | 62 m² | 1 | NA | NA | 9 Oct 2024 | Air Conditioning, Balcony, Family rooms, Flat-screen TV, Free Wifi, Parking, Private Bathroom, Transfer from/to the airport; extra: Bedroom (1 extra-large double), Living room (2 sofa beds) | English version of the *same* Booking.com listing as #1 Coastal Harmony Alimos — same 800 m Edem, 1.4 km Flisvos, 1.7 km Kalamaki, 3.3 km Flisvos Marina, 37 km ATH. Text still calls it "Vasilis luxury apartment (2)". **Duplicate of #1.** |
| 10 | **Vasilis Luxury Apartment** (`/property/vasilis-luxury-apartment/`) | Athens — *"Athens Greece, Athens, Greece"* | 102 m² | 3 | 2 (desc: 3) | 1 | 7 Oct 2024 | Air Conditioning, Airport shuttle, Balcony, Family rooms, Flat-screen TV, Free Wifi, Non-smoking rooms, Parking, Private Bathroom, Terrace, View; extra: Bedroom 1 (1 full bed), Bedroom 2 (1 bunk + 1 sofa bed), Bedroom 3 (1 queen), Living room (3 sofa beds) | English Booking.com text. 7-min walk National Theatre, 0.6 mi Omonia Sq., 10-min walk Larissis Metro, 19 mi ATH, paid airport shuttle, indoor play area. Description is **truncated mid-word**: "Guests say the description and photos for this property are acc". **Same flat as #2 Harmony Luxury Grand Suite.** |

**Effective distinct inventory: roughly 5–6 real apartments, listed 10 times under two naming systems** ("Vasilis Luxury Apartment N" = old/raw Booking.com names; "Harmony …" = new brand names). Pairs: #1≡#9 (Alimos), #2≡#10 (Victoria/Larissis 102 m²), #4≡#5 (Gazi 39 m²), #7 carries #8's text.

**Every listing has:** empty price, `NA` for most numeric fields, an "Agent" card showing `Harmony Rental / info@harmonyrental.gr / View Profile / Send Message`, a Property Map, a Related Properties carousel, an empty Reviews section, and a right rail with "Featured Properties → Vasilis Luxury Apartment 6 — Athens, $" and a **Mortgage Calculator** (irrelevant for a short-stay rental business).

### 3b. Guest check-in pages (WordPress pages, outside the property catalogue) — 8

These are operational guest-instruction pages, each with: welcome, WhatsApp link, "click here for address", locker/entrance instructions, power-card activation, Wi-Fi details, water-heater instructions, and a "CLICK HERE TO FINISH CHECK-IN" form link.

| Page | Property | Distinctive content |
|---|---|---|
| `/acropolis-harmony-loft/` | Acropolis Harmony Loft | Middle locker; 4th floor; security lock; magnetic card behind door; **Wi-Fi `VODAFONE_GigaWiFiHome_7739` / password `4qD8T724BF5jR27A`**; panel switch "Θ" = water heater, "K" = kitchen |
| `/coastal-harmony-alimos/` | Coastal Harmony Alimos | Elevated ground floor, right side; locker right of main entrance; **Wi-Fi `COSMOTE-836366` / `e3926p6ngann636u997e`**; heat-pump remote instructions (22–25 °C heat, 24–27 °C cool) |
| `/harmony-athens-city-apartment/` | **Harmony Athens City Apartment** | Near-identical to Acropolis Harmony Loft page (4th floor, middle locker). **This property is NOT in the catalogue.** No Wi-Fi block. |
| `/harmony-gazi-living/` | Harmony Gazi Living | Keypad code **`8196#`** at street door (published!); 2nd-floor locker; **Wi-Fi `VODAFONE_GigaWiFiHome_6565` / `7mQ5ATeba5mL7mt2`** |
| `/harmony-luxe-living/` | Harmony Luxe Living | Top locker on left metal railing; 4th floor, turn right; door number **blank**; **Wi-Fi `VODAFONE_GigaBiiHome_6565` / `7mQ5ATeba5mL7mt2`**; solar water heater |
| `/harmony-luxury-grand-suite/` | Harmony Luxury Grand Suite | Door unlocked **remotely by staff via WhatsApp**; 6th floor; lift limit 3 people; 6-digit digital lock code sent via WhatsApp; timer-controlled water heater; **Wi-Fi `COSMOTE-414147` / `g2rrx82ra3ket8ek`** |
| `/harmony-twin-lofts-metaxourgeio-1/` | **Harmony Twin Lofts Metaxourgeio 1** | Keypad + bottom locker (number blank); 1st floor, **right** apartment; **Wi-Fi `VODAFONE_GigaWiFiHome_6565` / `7mQ5ATeba5mL7mt2`**; solar water heater. **Not in catalogue.** Page also mistakenly renders the full property grid at the bottom. |
| `/harmony-twin-lofts-metaxourgeio-2/` | **Harmony Twin Lofts Metaxourgeio 2** | Same building, 1st floor, **left** apartment; **Wi-Fi `VODAFONE_GigaWiFiHome_6565` / `7yTn746695Mtb545`**. **Not in catalogue.** |

> **Three properties (Harmony Athens City Apartment, Twin Lofts Metaxourgeio 1 & 2) exist operationally but are invisible in the catalogue** — no listing, no photos, no discoverability.

### 3c. Amenity taxonomy (as configured in the search filter)

Air Conditioning · Airport shuttle · Balcony · **Bathtab** (typo → Bathtub) · Family rooms · Flat-screen TV · Free parking · Free Wifi · **Goddess** (nonsense term, likely a mangled "Γκάζι"/Gas) · Heating · Kitchen · Lift · Non-smoking rooms · Parking · Private Bathroom · Shower · Terrace · Transfer from/to the airport · View · Washing machine.

Both "Parking" and "Free parking" exist as separate options; "Bathtab" and "Goddess" are visible on every page carrying the search widget (~15 pages).

---

## 4. Site structure

### A. Real content pages — keep and rebuild (≈ 42)

**Core / marketing**
- `/` — Home ("Home - Default")
- `/about-us-1/` — the real About page
- `/contact-us-1/` — the real Contact page
- `/apartment-rental/` — Apartment Rentals service
- `/apartment-renovation/` — Renovation service
- `/home-airbnb/` — Airbnb management service
- `/tour/` — Athens + Alimos tour list
- `/properties/` — main property browse page
- `/apartment-showcase/` — bookable services (WooCommerce)
- `/blog/` — blog index

**Location hubs**
- `/athens/` — "Our Appartments in Athens" (*typo "Appartments"*) — 6 listings + Athens tour list
- `/alimos/` — "Our Appartments in Alimos" — 2 listings + Alimos tour list

**Property listings (10)** — `/property/` archive + the 10 detail URLs in §3a

**Guest check-in pages (8)** — the URLs in §3b

**Entry Process & Facilities (4)**
- `/entry-process-facilities/` — **empty stub, breadcrumb only**
- `/entry-process-facilities/check-in-check-out/` — real content
- `/entry-process-facilities/transportation/` — real content (transfer pricing)
- `/entry-process-facilities/tips-for-food/` — real content (restaurant recommendations)

**Tour destination pages (16 real + 1 empty)**
- Athens: `acropolis-of-athens`, `parthenon-2`, `acropolis-museum-2`, `national-archaeological-museum`, `ancient-agora-of-athens`, `panathenaic-stadium`, `odeon-of-herodes-atticus`, `benaki-museum`
- Alimos: `cine-alimos`, `phaleron-war-cemetery`, `wetpark-alimos`, `thalia-gallery`, `kalamaki-beach`, `hymettus`, `kinetta-beach`, `asteras-beach`
- `/athens/acropolis-museum/` — **empty duplicate stub** (real page is `acropolis-museum-2`)

**Blog posts (4)** + `/category/uncategorized/`

### B. Theme demo / leftover pages — DELETE (≈ 30) 🚩

**Alternate homepage demos shipped with the Luxus theme (6):**
- `/home-agency/` — "The easy way to Find Your Dream Home!" · property categories Family House / Town House / Condo / Modern Villa / Farm House all showing **"0 Properties"** · "Buy a New Home / Sell a Home / Rent a Home" with **lorem ipsum** · John Doe / Jane Doe agents · empty stat counters
- `/home-agent/` — 🚩 **"Hi, My Name Is Layla — I'm Your Realtor."** with "over 25 years of experience", full lorem ipsum, New York address and `info@yourdomain.com`
- `/home-full-map/` — "Explore Best Cities" listing **New York City, London, Toronto, Paris, Sydney, Bangkok — 0 Properties each**, lorem ipsum testimonials
- `/home-half-map/` — map listing variant
- `/home-slider/` — same "Best Cities" 0-property block, nothing else
- (the live `/` is the "Home – Default" variant)

**Elementor widget showcase pages (9):**
`/elements/`, `/elements/agent-agency/` ("Sorry, No agents found"), `/elements/blog-el/`, `/elements/info-box-el/` (all lorem ipsum), `/elements/miscellaneous-el/` (John Doe CEO / Jane Doe SRES / John Doe CRE), `/elements/pricing-table-el/` ($99 plans, "Features List Title"), `/elements/property-el/`, `/elements/testimonials-el/` (all lorem ipsum), `/elements/text-with-image-el/` ("I am Seller / I am Buyer / I am Realtor" lorem ipsum)

**Luxus content-block CPT exposed publicly (5):**
`/luxus_content_block/`, `/luxus_content_block/header-01/`, `/luxus_content_block/footer-01/`, `/luxus_content_block/footer-02/`, `/luxus_content_block/elementor-15737/` — these are header/footer fragments that should never be crawlable; they contain the fake `info@yourdomain.com` / `+123 456 7890` data and a menu listing "Home – Default Copy, Home – Slider Copy, Home – Agency Copy, Home – Agent Copy, Home – Full Map Copy, Home – Half Map…"

**WooCommerce leftovers (8):** `/shop/`, `/shop-2/`, `/cart/`, `/cart-2/`, `/checkout/`, `/checkout-2/`, `/my-account/`, `/my-account-2/` — several render the raw shortcode text `[woocommerce_cart]`, `[woocommerce_checkout]`, `[woocommerce_my_account]` on the front end.

**Real-estate-agency features that don't apply (3):** `/agents/` ("OOPS! NOTHING FOUND. Sorry, Agents not found."), `/agencies/` ("Sorry, Agencies not found."), `/signup/` (**"Welcome to Luxes"** — theme name leaked; registration form with roles Agent / Agency / Subscriber).

**Orphan/empty (2):** `/about-us-2/` (pure lorem ipsum, see below), `/ways-to-go/` (title "Travel Options in Greece" — **breadcrumb only, zero content**).

### C. Duplicate / conflicting URL pairs 🚩

| Pair | Status |
|---|---|
| `/about-us-1/` vs `/about-us-2/` | `-1` is the real one; `-2` is 100 % theme demo lorem ipsum but is titled "About Us" and is more SEO-plausible. Menu points to one of them. |
| `/coastal-harmony-alimos/` vs `/property/coastal-harmony-alimos/` | Same name, different content (check-in guide vs listing) — keyword cannibalisation on 6 slug pairs total |
| `/acropolis-harmony-loft/` vs `/property/acropolis-harmony-loft/` | same |
| `/harmony-gazi-living/`, `/harmony-luxe-living/`, `/harmony-luxury-grand-suite/` vs `/property/…` | same |
| `/athens/acropolis-museum/` vs `/athens/acropolis-museum-2/` | `-2` is real, `-1` is an empty stub still indexed |
| `/athens/parthenon-2/` | "-2" suffix in a live URL — an earlier version was deleted |
| `/cart/` vs `/cart-2/` · `/checkout/` vs `/checkout-2/` · `/shop/` vs `/shop-2/` · `/my-account/` vs `/my-account-2/` | 4 duplicate WooCommerce page pairs |
| `/properties/` vs `/property/` vs `/apartment-rental/` vs `/home-full-map/` vs `/home-half-map/` vs `/elements/property-el/` | **six URLs all rendering the same property grid** |
| Content duplication: Coastal Harmony Alimos ≡ Vasilis Luxury Apartment Alimos; Harmony Luxury Grand Suite ≡ Vasilis Luxury Apartment; Harmony Gazi Living ≡ Vasilis Luxury Apartment 6 | listed twice each |

---

## 5. Content sections per key page

### `/` — Home ("Home - Default")
1. Hero: "Welcome to Harmony Rental! / Your Premier Apartment Rental Experience in Greece / We can find you the perfect property & help you locate the home of your dreams."
2. **Advanced search widget** (Status: Alimos/Athens; Type: Apartment; City: Alimos/Athens; Price Range $ – $; 20 amenity checkboxes) — **preceded by 3 raw PHP `Warning: Undefined array key` messages printed on screen**
3. Icon row: Apartment Rental / Apartment Renovation / Tour / Home Airbnb / Boat Tours — **each icon preceded by 2 more PHP warnings; the row is rendered twice** (10 more warnings), and the label changes from "Boat Tours" to "Boat Tour" between the two
4. "Popular Listings — Feature Properties" — 6 property cards + "Explore All Properties"
5. "About Us — Your Trusted Partner for Premier Apartment Rentals, Renovations, and Tours in Greece" — full company paragraph
6. 🚩 Two lorem-ipsum promo cards, **rendered twice**: "It's Easier to Register — Proin ut ligula vel nunc egestas porttitor…" / "Get Your Listings Promoted — Lectus magna fringilla urna porttitor…"
7. "Services — Our Popular Services" — 5 service cards with "See Details" (intro paragraph is **copy-pasted from the Feature Properties section**, so it talks about filtering apartments)
8. "Frequently asked questions" — 6 Q&As
9. "Testimonials — Clients Feedback" — heading blurb is **lorem ipsum** ("Viverra tellus in hac habitasse…"), but the 3 reviews are real, in **English, Polish and Greek**, with country labels in **Greek** (Σλοβακία, Πολωνία, Γαλλία): Miroslava (Slovakia), Irena (Poland), Jean-Yves (France)
10. "Get in Touch with Us" CTA → Contact Us
11. "News & Blog — Latest New Feeds" (blurb **lorem ipsum**) — 3 of 4 posts + "View All Blogs"
12. Footer: newsletter, tagline, Instagram/Facebook/Tiktok, General Info (About Us, Our Properties), Quick Links (Blog/News, Contact Us), Contacts, © 2024, Terms & Condition, User Login modal (Username/Password/Lost your password?/Sign Up)

### `/about-us-1/` — real About
"We Are Harmony Rental" intro · **Airbnb Services** + **Contact Us Now** CTAs · Our Vision / Our Goals / Our Mission · "About Our Agency" (same paragraph as home) · 🚩 rotating marquee "Find Your Dream Home · Buy, Rent, and Sell Homes · Free, Fair & Direct Listing" (theme demo, wrong business model) · "Why Choose Us" · 🚩 **broken stat counters: "0 Apartment", "1000+ Apartment Renovation", "1000 Home Airbnb", "1000+ Tour"** · "Meet Our Team" → **John Doe / Jane Doe / John Doe / Jane Doe, all "Agent"** · Testimonials (real 3) · "Our Partners" (lorem ipsum, no logos)

### `/about-us-2/` — 🚩 100 % theme demo
"Our Aim Is To Provide The Best For Everyone" (lorem ipsum) · Experience / Reliability / Best Services (lorem ipsum) · 🚩 **"We are Luxus. Over 25+ years experience in real estate… Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"** — the theme's own name published on the client site · Meet The Team (John/Jane Doe ×4) · Clients Feedback (John/Jane Doe ×4, lorem ipsum)

### `/properties/` — Browse Our Properties
Advanced search (top) · sort control (Default Order / Featured / Price Low→"Hight" *typo* / Price High→Low / Date New→Old / Date Old→New) · **all 10 property cards** · sidebar: second "Advance Search" widget (duplicated) · "Featured Properties → Vasilis Luxury Apartment 6 — Athens, $" · **Mortgage Calculator**

### `/apartment-rental/`
Hero "Apartment Rentals in Greece / Stay with Harmony Rental" + Contact Us · "Apartment List — Our All Apartment" (*grammar*) with 6 cards + "Explore All Apartment" (*grammar*) · the same 6-item FAQ as home. **No unique rental-service content** — it is the home page's listing grid plus the home page's FAQ.

### `/apartment-renovation/`
Hero "Renovate Your Apartment With Harmonyrental" + Contact Us · "Our Renovation Process" (7 detailed steps) · "Some of our completed Apartment Renovation Work" — **heading with no visible project content in the extraction (gallery only, no captions/case studies)** · 5-item renovation FAQ. This is the **strongest, most original page on the site**.

### `/home-airbnb/`
Hero "Home Airbnb Services by Harmony Rental" + Contact Us · "Our Home Airbnb Services Include" (6 items) · "Why Choose Harmony Rental for Your Home Airbnb Needs?" (4 items) · "Ready to Elevate Your Airbnb Hosting? — Join Us". Clean page, no lorem ipsum. **Not linked from the main service icon row consistently.**

### `/tour/`
"Tour List — Athens Tour List" (8 entries, each: name / category / Details) · "Alimos Tour List" (8 entries). Pure link index, no intro copy, no pricing, no booking, no duration/inclusions.

### Tour destination pages (16)
Common pattern: H1 "<Name> of <City>" → H2 "<Name> Tour" → 1–3 descriptive paragraphs → "Tour List in Athens/Alimos" sidebar of sibling links → Testimonials (the same 3 real reviews with the lorem-ipsum heading) → CTA "Explore iconic destinations with expert insights / BOOK YOUR ADVENTURE" (all 16 have this).
**Inconsistent depth:**
- Full template (Highlights + Itineraries + Local Facility): only **Acropolis of Athens**
- Itineraries + Local Facility: Parthenon, Acropolis Museum-2, National Archaeological Museum, Ancient Agora, Panathenaic Stadium
- Itineraries only: Odeon of Herodes Atticus, Benaki Museum, Kalamaki Beach, Hymettus, Thalia Gallery
- Description only, no itinerary at all: **Cine Alimos, Phaleron War Cemetery, Wetpark Alimos, Kinetta Beach, Asteras Beach**
- Empty stub: `/athens/acropolis-museum/`
None state a price, duration, group size, or have a real booking mechanism — "BOOK YOUR ADVENTURE" is the only CTA.

### `/entry-process-facilities/` and children
- Parent: **empty** (breadcrumb only) though it is a top-level nav item with 3 children
- `check-in-check-out`: personal-letter format ("Dear Guest, I hope this message finds you well"). Passport number required per Greek Government regulation; asks for check-in/out times + flight number. **Check-in 3:00 PM – 1:00 AM, self-check-in after 3:00 PM; check-out by 11:00 AM.** Requirements listed as "1)passport photo 2) phone number 3) email". Check-out instructions: leave keys on the table (not in the door), turn off lights and A/C. Signed "Vasilis Evelina". 🚩 Content is duplicated — the same 3 bullets appear twice in a row.
- `transportation`: airport-transfer partner, taxi/van rates (see §1), "reply to this message with your preferred option". Signed "Vasilis".
- `tips-for-food`: restaurant list — **BARBADIMOS** (traditional Greek, 12-14 Mitropoleos St), **Athinaikon** (34 Mitropoleos St), **FOUAR** (Thai restaurant inside an art gallery, 6 Christopoulou St), **360 Cocktail Bar** (2 Ifestou St, Monastiraki), **Vintage** wine bar (66 Mitropoleos St), **L'Amiral** (all-day restaurant bar, Panos 6, Plaka), and LOUKOUMADES at 21 Aiolou St. Signed "Vasilis". 🚩 Written as an email ("Hello Dear," / "Here some suggestions for the evening") with typos ("Restaurent", "adress").

### Property detail template
H1 · location line · publish date · "Property Description" · "For Athens/Alimos" badge · description · Type / Build / Size / Lot Size (mostly `NA`) · Property Amenities · Additional Features (bed configuration) · Property Map · Related Properties (2 cards) · Reviews (empty, with "Leave a review" form) · agent card (Harmony Rental / info@harmonyrental.gr) · "Send Message" · sidebar Featured Properties.

---

## 6. Blog

4 posts, all published **6 October 2025**, all authored "Harmony Rental", all filed under **"Uncategorized"** (the only category on the site), zero comments.

| # | Title (H1) | URL slug | SEO title | Topic & structure |
|---|---|---|---|---|
| 1 | Athens Rental Market 2024 Guide | `navigating-athens-rental-market-2024-insiders-guide` | "Athens Rental Market 2024: Insider Tips for Renters" | Why Athens rents are high (short-term rentals / Golden Visa foreign investment / post-crisis construction halt — as a comparison table), best months to search, negotiation tactics, Greek-language search keywords (χρυσή ευκαιρία, ενοικιαζόμενα σπίτια από ιδιώτες). Cites Global Property Guide, Bank of Greece. TOC + 4 FAQs. |
| 2 | Renting in Athens: Step-by-Step Guide | `how-to-secure-rental-apartment-athens-guide` | "How to Rent in Athens: A Step-by-Step Guide (2025)" | 6-step process (contact/viewing → expressing interest → documents → agreement review → deposit + first rent → key handover), AFM number, μισθωτήριο lease, κοινόχρηστα, scam avoidance. TOC + 4 FAQs. |
| 3 | Athens Renters Guide – Best Neighborhoods | `renters-guide-athens-best-neighborhoods` | "Athens Apartments for Rent: A Renter's Guide to Neighborhoods" | Neighbourhood comparison table (Plaka, Kolonaki, Koukaki, Glyfada with rents/transport/amenities score/lifestyle) + renter-profile table (Safety-conscious → Kolonaki/Kifisia; Budget-savvy → Kypseli/Pagrati; Families → Glyfada/Kifisia; Expats → Kolonaki/Koukaki/Glyfada); cost of living; expat life. TOC + 4 FAQs. |
| 4 | Furnished vs Unfurnished: Athens Cost Analysis | `furnished-vs-unfurnished-apartments-athens-cost-analysis` | "Furnished vs Unfurnished Athens Cost: A 12-Month Analysis" | 12-month cost table for a 70 m² 1-bed (see §1), what "furnished" means in Greece, cost of furnishing, pros/cons, stay-duration decision matrix. Cites NomadLease.com, Expat Law. TOC + 5 FAQs. |

**Observations:** These 4 posts are by far the best-written, best-structured content on the site (proper TOC, data tables, external citations, FAQ blocks, internal links to "/properties"). They were clearly produced ~a year after the rest of the site and by a different hand. Titles are inconsistent between H1 and `<title>`. Everything is "Uncategorized" — no taxonomy. The blog index shows 4 posts; the home page shows only 3. Posts are dated 2025 but two of them are titled "2024".

---

## 7. Languages

**Mixed and uncontrolled — no language switcher, no hreflang, no localised URL structure.** The site is nominally English but leaks Greek in several places:

- **UI, navigation, all service/marketing/tour/blog copy:** English
- **Fully Greek property descriptions (4 listings):** Coastal Harmony Alimos, Harmony Luxury Grand Suite, Harmony Gazi Living, Harmony luxe living, Vasilis Luxury Apartment 4 — long paragraphs of Booking.com Greek text ("Ίσως δικαιούστε έκπτωση Genius…", "Το κατάλυμα προσφέρει θέα στην πόλη…")
- **Greek meta descriptions** for those pages, which is what would show in Google results for an English page
- **Greek addresses inside English cards:** `54 Βίκτωρος Οὑγκώ, Αθήνα`
- **Greek country labels on English testimonials:** Σλοβακία, Πολωνία, Γαλλία
- **Polish testimonial** left untranslated ("Duży przestronny apartament, tuż przy metro…")
- **Greek keywords embedded in English blog posts:** φθηνα ενοικιαζομενα σπιτια αθήνα, χρυση ευκαιρια σπιτια αθηνα, μισθωτήριο, κοινόχρηστα, ΔΕΗ, ΕΥΔΑΠ
- **Greek/Latin transliteration mix:** "thermosifonas", switch "Θ", "LUKOUMADES"

The same apartment exists twice — once with a Greek description and once with an English one — because they were imported separately rather than translated.

---

## 8. Problems & red flags (redesign pitch material)

### Critical / trust-damaging
1. **🔴 Guest security data is published on the public internet.** Six pages expose live Wi-Fi SSIDs and passwords, and `/harmony-gazi-living/` publishes the **building street-door keypad code `8196#`**. Anyone can Google these. These pages must be gated behind a token/booking-ID.
2. **🔴 Raw PHP `Warning:` messages render on the home page** — 16 of them, printing the full server path `/home/u889715421/domains/harmonyrental.gr/public_html/wp-content/plugins/luxus-core/…advance-search.php on line 492`. This is the first thing a visitor and Google see. It also discloses the hosting account ID.
3. **🔴 `<title>` of the home page is "Home - Default - harmonyrental.gr"** — the theme's demo page name, never renamed.
4. **🔴 A fictional American realtor is live on the site.** `/home-agent/` — "Hi, My Name Is Layla — I'm Your Realtor. I have over 25 years of experience…", with `(123) 789-7390`, `info@yourdomain.com`, "5th Avenue, 3rd Floor New York, NY 1980".
5. **🔴 The theme's brand name is published as the client's:** "**We are Luxus.** Over 25+ years experience in real estate…" (`/about-us-2/`) and "**Welcome to Luxes**" (`/signup/`).

### Placeholder / lorem ipsum still live
6. Lorem ipsum appears on **at least 12 pages**, including the **home page** (two promo cards rendered twice, the testimonials heading, the blog-section heading) and the **real About page** ("Our Partners" section).
7. **"John Doe / Jane Doe, Agent"** team members on `/about-us-1/` (the real About), `/about-us-2/`, `/home-agency/`, `/home-agent/`, `/elements/miscellaneous-el/` — 4–8 fake people per page.
8. `info@yourdomain.com`, `+123 456 7890`, `+123 456 7899`, `+1 123 456 7890` still resolve in the exposed content blocks.
9. **Broken stat counters** on About: "**0** Apartment", "1000+ Apartment Renovation", "1000 Home Airbnb", "1000+ Tour" — the headline metric reads zero, the rest are obvious fabrications.
10. **"0 Properties" city tiles for New York City, London, Toronto, Paris, Sydney, Bangkok** (`/home-full-map/`, `/home-slider/`) and "0 Properties" for Family House / Town House / Condo / Modern Villa / Farm House (`/home-agency/`).
11. `$99 / Yearly` pricing tables with "Features List Title" ×8 (`/elements/pricing-table-el/`).

### Wrong business model baked into the theme
12. The whole site is built on a **property-sales** theme. Live artefacts that contradict a short-stay rental business: **Mortgage Calculator** in the sidebar of every listing page; "Buy, Rent, and Sell Homes" / "Free, Fair & Direct Listing" marquee on the real About page; "I am Seller / I am Buyer / I am Realtor"; "Buy a New Home / Sell a Home"; "Properties Listed / Properties Sold / Realtor Awards" counters; `/signup/` offering **Agent / Agency** account roles; `/agents/` and `/agencies/` pages that say "Sorry, Agents not found."
13. **Prices are missing everywhere.** Every listing shows `$` with no number; the search filter is a `$ – $` range with no bounds; currency is **USD ($)** for a Greek business quoting **EUR (€)** in its blog and transfer prices.
14. **No real booking engine.** "Book Now", "BOOK YOUR ADVENTURE", "Send Message" and a contact form are the only paths. No availability calendar, no rates, no instant booking.

### Data quality in the catalogue
15. **10 listings representing ~5–6 real apartments** — every Alimos/Victoria/Gazi flat is listed twice under a "Vasilis" name and a "Harmony" name.
16. **Vasilis Luxury Apartment 4 carries Harmony luxe living's description** (wrong property text).
17. **Harmony Gazi Living's "Related Properties" block lists itself.**
18. Bedroom/bathroom/parking fields are `NA` on most listings; Acropolis Harmony Loft has **no size at all**; card data contradicts description data (Grand Suite: 2 baths on the card, 3 in the text); "110 m² · 1 single bed" (Apt 5).
19. **Descriptions are unedited scrapes.** Booking.com's "Genius discount / sign in" upsell, "Reliable info: Guests say the description and photos…", "distances calculated using OpenStreetMap©", and an Airbnb-style "2 years of experience as a host / 1 hour drive to this national park" all appear as the client's own copy. One description is **truncated mid-word**: "…are acc".
20. **Three operating properties are not in the catalogue at all** (Harmony Athens City Apartment, Twin Lofts Metaxourgeio 1 & 2) — they have check-in pages but no listing.
21. Amenity taxonomy contains **"Bathtab"** and **"Goddess"**, plus redundant Parking/Free parking.

### SEO / IA
22. **25 of 89 pages have the site name duplicated in the title** — e.g. "About Us - harmonyrental.gr - harmonyrental.gr", "Acropolis of Athens Tours - harmonyrental.gr - harmonyrental.gr". Wasted title real estate on every one.
23. **Six URLs render the same property grid** (`/properties/`, `/property/`, `/apartment-rental/`, `/home-full-map/`, `/home-half-map/`, `/elements/property-el/`) — heavy internal cannibalisation.
24. **Six slug collisions** between check-in pages at `/slug/` and listings at `/property/slug/` competing for the same brand terms.
25. **`-1` / `-2` suffixes in live URLs**: `about-us-1`, `about-us-2`, `contact-us-1`, `parthenon-2`, `acropolis-museum-2`, `cart-2`, `checkout-2`, `shop-2`, `my-account-2`.
26. **Empty pages that are indexed:** `/entry-process-facilities/` (a top-level nav item!), `/ways-to-go/`, `/athens/acropolis-museum/`, `/shop/`, `/shop-2/`, `/checkout/`.
27. **Raw shortcodes rendered as text:** `[woocommerce_cart]`, `[woocommerce_checkout]`, `[woocommerce_my_account]`.
28. **The `luxus_content_block` CPT is publicly crawlable** — header/footer fragments indexed as pages, complete with the fake contact data and a menu of "Home – Default Copy / Home – Slider Copy / Home – Agency Copy…" internal working titles.
29. **Navigation labels are full SEO titles**, not menu labels: the main menu reads "Apartment Rentals in Greece – Harmony Rental", "Athens Rentals – HarmonyRental.gr", "Alimos Properties – harmonyrental.gr", "Food Tips for Your Stay – Harmony Rental". The site name appears in 5 of 13 menu items. The mobile and desktop menus are also both dumped into the DOM (nav renders twice).
30. **Single blog category "Uncategorized"** for all 4 posts; no tags, no author page, no publish cadence (all 4 posts same day).
31. **Missing meta description** on `/category/uncategorized/`.
32. Content-vs-title mismatches: `/home-slider/` is titled "Home Amenities", `/elements/property-el/` is titled "Property Amenities" but shows property grids, `/blog/` H1 is "Blog" but title is "Explore Our Blog".

### Copy quality
33. Typos and grammar throughout: "Our **Appartments** in Athens/Alimos" (both location hubs), "Our All Apartment", "Explore All Apartment", "Price (Low to **Hight**)", "**Restaurent**", "**adress**", "**Bathtab**", "**Check-In Requirment's**", "vasilis-luxury-**aparment**-5" (slug), "Home Airbnb**s**"/"Boat Tour**s**" singular/plural drift, stray backtick "…to receive the correct code.**`**".
34. **Section intros are copy-pasted.** The paragraph "Explore our exclusive range of apartments available across Athens…Filter by location, amenities, and budget" appears under **Feature Properties, Our Popular Services, and Our All Apartment** — including under the Services block, where it makes no sense.
35. **Duplicated blocks within pages:** the service icon row (home, ×2), the promo cards (home, ×2), the apartment services block (`/apartment-showcase/`, ×2), the advanced search widget (`/properties/`, ×2), the check-out bullet list (×2).
36. **Guest-facing pages are pasted emails**, not web copy: "Dear Guest, I hope this message finds you well", "Hello Dear," "Best Regards, Vasilis Evelina", "please reply to this message".
37. **Two competing brand naming systems** in the customer-facing catalogue ("Vasilis Luxury Apartment 4/5/6" vs "Harmony Gazi Living / Luxe Living / Grand Suite") — the legacy names are the ones marked "Featured" and shown in the sidebar of every page.
38. Blank fields left inline in guest instructions: "find door number **[blank]**", "marked with the number **[blank]**".
39. **Zero real reviews on any listing** despite 3 genuine multilingual testimonials existing elsewhere on the site — and those 3 are always introduced by a lorem-ipsum heading.
40. **Renovation portfolio has no case studies** — "Some of our completed Apartment Renovation Work" is a headline over an uncaptioned gallery, with no before/after, no project names, no scope, no budget.

### Quick wins to lead the pitch with
Delete ~30 demo pages; kill the Wi-Fi/keypad exposure; fix the home page PHP warnings and the "Home - Default" title; deduplicate the 10 listings down to the real inventory and add the 3 missing properties; translate/rewrite the 5 Greek Booking.com descriptions; add prices in EUR and a real booking flow; replace John Doe/Layla with the actual Vasilis & Evelina story; consolidate the six property-grid URLs into one; and build a proper Boat Tour page for the service that is advertised but doesn't exist.