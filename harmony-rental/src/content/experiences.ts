export type ExperienceArea = "athens" | "alimos";

export interface Experience {
  area: ExperienceArea;
  slug: string;
  name: string;
  /** A short label — kept to a small, reused set (Ancient site, Museum,
   *  Culture, Beach, Outdoors) rather than one-off per-item categories. */
  category: string;
  /** 2–3 sentences, condensed from the matching legacy tour page at
   *  docs/crawl-pages/<area>__<legacy-slug>.txt — original copy, no invented
   *  facts. */
  blurb: string;
  /** Up to 3 bullets, condensed from that page's "Highlights" section. */
  highlights: string[];
}

/**
 * The 16 legacy Athens/Alimos tour destinations (docs/crawl-pages), replacing
 * 16 thin single-purpose pages with two area guides (see task-9 brief). The
 * empty `/athens/acropolis-museum/` stub is skipped in favour of the real
 * `acropolis-museum-2` content; slugs here drop the legacy `-2` suffixes.
 * English-only, like `properties` — content data, not UI chrome.
 */
export const experiences: Experience[] = [
  // --- Athens ---
  {
    area: "athens",
    slug: "acropolis-of-athens",
    name: "Acropolis of Athens",
    category: "Ancient site",
    blurb:
      "The Acropolis is Greece's most iconic ancient site, crowned by the Parthenon, the Temple of Athena Nike and the " +
      "Erechtheion. It sits in the heart of Athens within walking distance of Plaka and the Ancient Agora, with " +
      "panoramic views over the city from the top of the hill.",
    highlights: [
      "One of the world's most recognizable UNESCO World Heritage sites",
      "Steps from Plaka and the Ancient Agora",
      "Panoramic views over Athens from the summit",
    ],
  },
  {
    area: "athens",
    slug: "parthenon",
    name: "Parthenon",
    category: "Ancient site",
    blurb:
      "Built in the 5th century BC and dedicated to Athena, the Parthenon is the centrepiece of the Acropolis and one " +
      "of the most admired examples of Doric architecture anywhere. Its towering columns and sculpted friezes sit " +
      "within the wider Acropolis complex, alongside the Erechtheion and the Temple of Athena Nike.",
    highlights: [
      "A masterpiece of Doric architecture dedicated to Athena",
      "Part of the wider Acropolis complex",
      "Sweeping views over Athens from the Sacred Hill",
    ],
  },
  {
    area: "athens",
    slug: "acropolis-museum",
    name: "Acropolis Museum",
    category: "Museum",
    blurb:
      "At the foot of the Acropolis, this modern museum houses artefacts and sculpture from the site itself, including " +
      "original pieces from the Parthenon and the Erechtheion. Its top-floor gallery mirrors the layout of the " +
      "Parthenon and opens onto a terrace with views straight up to the hill.",
    highlights: [
      "Original sculptures and friezes from the Parthenon",
      "Displays arranged to mirror their original locations on the Acropolis",
      "Rooftop terrace overlooking the Acropolis",
    ],
  },
  {
    area: "athens",
    slug: "national-archaeological-museum",
    name: "National Archaeological Museum",
    category: "Museum",
    blurb:
      "Greece's largest museum traces the country's history from the Cycladic and Mycenaean periods through to late " +
      "antiquity. Highlights include the gold Mask of Agamemnon, the Antikythera Mechanism, and celebrated sculptures " +
      "such as the Poseidon of Artemision — all a short walk from the Plaka district.",
    highlights: [
      "The Mask of Agamemnon and Mycenaean gold",
      "The Antikythera Mechanism, an ancient analog computer",
      "Sculpture and pottery spanning prehistory to late antiquity",
    ],
  },
  {
    area: "athens",
    slug: "ancient-agora-of-athens",
    name: "Ancient Agora of Athens",
    category: "Ancient site",
    blurb:
      "Once the political and commercial heart of ancient Athens, the Agora is where citizens gathered to debate " +
      "philosophy and politics. The well-preserved Temple of Hephaestus and the reconstructed Stoa of Attalos, now a " +
      "museum, sit against the backdrop of the Acropolis.",
    highlights: [
      "The Temple of Hephaestus, one of Greece's best-preserved ancient temples",
      "The Stoa of Attalos and its museum of Agora artefacts",
      "The heart of Athenian democracy, commerce and philosophy",
    ],
  },
  {
    area: "athens",
    slug: "panathenaic-stadium",
    name: "Panathenaic Stadium",
    category: "Ancient site",
    blurb:
      "Also known as Kallimarmaro, this is the only stadium in the world built entirely of marble. First constructed " +
      "in the 4th century BC and later restored for the first modern Olympic Games in 1896, it lets visitors walk the " +
      "same track ancient athletes once competed on.",
    highlights: [
      "The world's only all-marble stadium",
      "Host of the first modern Olympic Games in 1896",
      "A museum of memorabilia from the modern Olympics",
    ],
  },
  {
    area: "athens",
    slug: "odeon-of-herodes-atticus",
    name: "Odeon of Herodes Atticus",
    category: "Ancient site",
    blurb:
      "Set on the southern slope of the Acropolis, this stone theatre was built in 161 AD by Herodes Atticus in " +
      "memory of his wife. It still hosts concerts, opera and theatre today, most notably during the annual Athens " +
      "and Epidaurus Festival.",
    highlights: [
      "A 2nd-century stone theatre still in active use",
      "Home to the Athens and Epidaurus Festival",
      "Set directly beneath the Acropolis",
    ],
  },
  {
    area: "athens",
    slug: "benaki-museum",
    name: "Benaki Museum",
    category: "Museum",
    blurb:
      "Housed in a neoclassical mansion in central Athens, the Benaki Museum spans Greek history from antiquity and " +
      "Byzantium through to the modern era. Its collection of pottery, jewellery and icons is complemented by " +
      "rotating exhibitions, workshops and cultural events.",
    highlights: [
      "Greek art and artefacts from antiquity to the modern era",
      "Housed in a neoclassical mansion near Syntagma Square",
      "Rotating exhibitions and cultural events",
    ],
  },
  // --- Alimos ---
  {
    area: "alimos",
    slug: "cine-alimos",
    name: "Cine Alimos",
    category: "Culture",
    blurb:
      "An open-air cinema on the Alimos seafront, where films play under the stars to the sound of the waves. " +
      "Comfortable seating and a snack bar serving Greek treats make it an easy pairing with a day at the nearby " +
      "beach.",
    highlights: [
      "Open-air screenings by the Aegean",
      "Steps from Alimos Beach",
      "A snack bar with Greek and classic cinema treats",
    ],
  },
  {
    area: "alimos",
    slug: "phaleron-war-cemetery",
    name: "Phaleron War Cemetery",
    category: "Culture",
    blurb:
      "A quiet, beautifully kept memorial in Alimos honouring soldiers who lost their lives in the Second World War, " +
      "maintained by the Commonwealth War Graves Commission. Landscaped gardens make it a place for reflection, an " +
      "easy pairing with a walk along the nearby Alimos beachfront.",
    highlights: [
      "Maintained by the Commonwealth War Graves Commission",
      "Landscaped gardens for quiet reflection",
      "Close to the Alimos beachfront",
    ],
  },
  {
    area: "alimos",
    slug: "wetpark-alimos",
    name: "Wetpark Alimos",
    category: "Outdoors",
    blurb:
      "A family-friendly water park on the Alimos coastline, with slides, wave pools and a lazy river alongside " +
      "quieter kids' play zones. Sunbeds, umbrellas and on-site dining make it easy to spend a full day, and it's an " +
      "easy pairing with nearby Alimos Beach.",
    highlights: [
      "Water slides, wave pools and a lazy river",
      "Dedicated play zones for younger children",
      "Lifeguards and on-site dining throughout the park",
    ],
  },
  {
    area: "alimos",
    slug: "thalia-gallery",
    name: "Thalia Gallery",
    category: "Culture",
    blurb:
      "A contemporary art gallery in Alimos showing rotating exhibitions from Greek and international artists, " +
      "across painting, sculpture and multimedia. It also hosts artist talks and hands-on workshops, with a café on " +
      "site for a break between galleries.",
    highlights: [
      "Rotating exhibitions from emerging and established artists",
      "Artist talks and interactive workshops",
      "An on-site café and nearby beach access",
    ],
  },
  {
    area: "alimos",
    slug: "kalamaki-beach",
    name: "Kalamaki Beach",
    category: "Beach",
    blurb:
      "A golden-sand beach on the Alimos coast with clear, calm water, sunbeds and a run of beach bars and tavernas " +
      "right along the shore. Paddleboarding, jet-skiing and windsurfing are all on offer for anyone after more than " +
      "a swim.",
    highlights: [
      "Golden sand and clear, calm water",
      "Paddleboarding, jet-skiing and windsurfing",
      "Beach bars and tavernas along the shore",
    ],
  },
  {
    area: "alimos",
    slug: "hymettus",
    name: "Hymettus",
    category: "Outdoors",
    blurb:
      "The Hymettus mountain range rises just inland from Alimos, with waymarked hiking trails through forest and " +
      "rocky terrain for all fitness levels. Viewpoints along the way look out over the Alimos coastline, the Aegean " +
      "and the city of Athens beyond.",
    highlights: [
      "Waymarked hiking trails for every fitness level",
      "Panoramic viewpoints over Alimos and Athens",
      "Traces of ancient quarries along the way",
    ],
  },
  {
    area: "alimos",
    slug: "kinetta-beach",
    name: "Kinetta Beach",
    category: "Beach",
    blurb:
      "A quieter stretch of golden sand near Alimos, with sunbeds, umbrellas and beachfront cafés serving fresh " +
      "seafood and local dishes. It's an easy base for paddleboarding, snorkelling or simply spending the day by the " +
      "water.",
    highlights: [
      "Golden sand and clear, calm water",
      "Beachfront cafés serving fresh seafood",
      "Paddleboarding and snorkelling on site",
    ],
  },
  {
    area: "alimos",
    slug: "asteras-beach",
    name: "Asteras Beach",
    category: "Beach",
    blurb:
      "A stylish stretch of the Alimos coast with sunbeds, beach lounges and bars for a more polished beach day. " +
      "Water sports including jet-skiing, paddleboarding and snorkelling are all available, with lifeguards and " +
      "family-friendly amenities throughout.",
    highlights: [
      "Stylish beach lounges and bars",
      "Jet-skiing, paddleboarding and snorkelling",
      "Family-friendly, with lifeguards on duty",
    ],
  },
];

export const getExperiencesByArea = (area: ExperienceArea) =>
  experiences.filter((experience) => experience.area === area);
