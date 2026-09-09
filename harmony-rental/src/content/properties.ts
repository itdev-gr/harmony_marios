import { Property } from "./types";

export const properties: Property[] = [
  {
    slug: "coastal-harmony-alimos",
    name: "Coastal Harmony Alimos",
    provisionalName: false,
    area: "alimos",
    neighborhood: "Alimos – Kalamaki",
    sizeSqm: 62,
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 4,
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
  {
    slug: "harmony-luxury-grand-suite",
    name: "Harmony Luxury Grand Suite",
    provisionalName: false,
    area: "athens",
    neighborhood: "Victoria – Larissis",
    sizeSqm: 102,
    bedrooms: 3,
    bathrooms: 2,
    sleeps: 8,
    summary:
      "A spacious three-bedroom apartment near Larissis Station, ideal for a large group visiting Athens together. " +
      "It's an eight-minute walk from the National Theatre and Omonia Square, with the metro close by for easy trips " +
      "around the city. Air conditioning, a balcony and free Wi-Fi are included throughout.",
    amenities: ["Air conditioning", "Airport shuttle", "Balcony", "Family rooms", "Free Wi-Fi", "Non-smoking rooms", "Shower"],
    bedSetup: [
      "Bedroom 1: 1 full bed",
      "Bedroom 2: 1 bunk bed and 1 sofa bed",
      "Bedroom 3: 1 queen bed",
      "Living room: 3 sofa beds",
    ],
    distances: [
      { label: "Larissis Metro Station", value: "800 m" },
      { label: "National Theatre", value: "600 m" },
      { label: "Omonia Square", value: "900 m" },
      { label: "Athens Airport", value: "30 km" },
    ],
    registrationNo: null,
    otaLinks: { airbnb: null, booking: null },
    images: ["/images/harmony-luxury-grand-suite/01.jpg"],
    legacyUrls: ["/property/harmony-luxury-grand-suite/", "/property/vasilis-luxury-apartment/"],
  },
  {
    slug: "acropolis-harmony-loft",
    name: "Acropolis Harmony Loft",
    provisionalName: false,
    area: "athens",
    neighborhood: "Athens Center",
    sizeSqm: null,
    bedrooms: 3,
    bathrooms: 2,
    sleeps: 10,
    summary:
      "A three-bedroom loft in central Athens with four beds across its bedrooms, comfortably sleeping up to ten guests. " +
      "The apartment has a full kitchen, washing machine, flat-screen TV, air conditioning and free Wi-Fi, making it a " +
      "practical base for families or groups travelling together.",
    amenities: ["Air conditioning", "Flat-screen TV", "Free Wi-Fi", "Kitchen", "Washing machine"],
    bedSetup: ["4 beds across 3 bedrooms"],
    distances: [],
    registrationNo: "00002966980",
    otaLinks: { airbnb: null, booking: null },
    images: ["/images/acropolis-harmony-loft/01.jpg"],
    legacyUrls: ["/property/acropolis-harmony-loft/"],
  },
  {
    slug: "harmony-gazi-living",
    name: "Harmony Gazi Living",
    provisionalName: false,
    area: "athens",
    neighborhood: "Gazi – Kerameikos",
    sizeSqm: 39,
    bedrooms: 2,
    bathrooms: null,
    sleeps: 4,
    summary:
      "A two-bedroom apartment in the lively Gazi–Kerameikos district, a seven-minute walk from Kerameikos metro and " +
      "close to the bars and restaurants around Technopolis. It comes with a balcony, lift access, air conditioning, " +
      "heating and free parking — a comfortable base for exploring this part of Athens.",
    amenities: [
      "Air conditioning",
      "Airport shuttle",
      "Balcony",
      "Elevator",
      "Family rooms",
      "Free parking",
      "Free Wi-Fi",
      "Heating",
      "Kitchen",
      "Washing machine",
    ],
    bedSetup: ["Bedroom 1: 1 double bed", "Bedroom 2: 1 single bed", "Living room: 1 sofa bed"],
    distances: [
      { label: "Kerameikos Metro Station", value: "700 m" },
      { label: "Gazi – Technopolis", value: "900 m" },
      { label: "National Theatre", value: "1.7 km" },
      { label: "Athens Airport", value: "34 km" },
    ],
    registrationNo: null,
    otaLinks: { airbnb: null, booking: null },
    images: ["/images/harmony-gazi-living/01.jpg"],
    legacyUrls: ["/property/harmony-gazi-living/", "/property/vasilis-luxury-apartment-6/"],
  },
  {
    slug: "harmony-syngrou-residence",
    name: "Harmony Syngrou Residence",
    provisionalName: true,
    area: "athens",
    neighborhood: "Syngrou – Fix",
    sizeSqm: 110,
    bedrooms: null,
    bathrooms: null,
    sleeps: null,
    summary:
      "A generous 110 sqm apartment near Syngrou-Fix, a five-minute walk from the metro and close to the Acropolis " +
      "Museum. The apartment has air conditioning, a balcony, a flat-screen TV and free Wi-Fi throughout. Room " +
      "configuration is being finalized with the owner — get in touch for exact sleeping capacity.",
    amenities: ["Air conditioning", "Balcony", "Flat-screen TV", "Free Wi-Fi"],
    bedSetup: [],
    distances: [
      { label: "Syngrou – Fix Metro Station", value: "400 m" },
      { label: "Acropolis Museum", value: "1.1 km" },
      { label: "Athens Airport", value: "32 km" },
    ],
    registrationNo: null,
    otaLinks: { airbnb: null, booking: null },
    images: ["/images/harmony-syngrou-residence/01.jpg"],
    legacyUrls: ["/property/vasilis-luxury-aparment-5/"],
  },
  {
    slug: "harmony-luxe-living",
    name: "Harmony Luxe Living",
    provisionalName: false,
    area: "athens",
    neighborhood: "Neos Kosmos",
    sizeSqm: 56,
    bedrooms: 3,
    bathrooms: null,
    sleeps: null,
    summary:
      "A three-bedroom apartment in Neos Kosmos, within easy reach of Filopappou Hill and the Acropolis Museum, with " +
      "both Syngrou-Fix and Neos Kosmos metro stations nearby. Air conditioning, heating, a balcony, parking and free " +
      "Wi-Fi are all included, making it a practical choice for longer Athens stays.",
    amenities: ["Air conditioning", "Balcony", "Free Wi-Fi", "Heating", "Parking"],
    bedSetup: [],
    distances: [
      { label: "Filopappou Hill", value: "2.3 km" },
      { label: "Syngrou – Fix Metro Station", value: "2.5 km" },
      { label: "Neos Kosmos Metro Station", value: "1.8 km" },
      { label: "Acropolis Museum", value: "2.8 km" },
      { label: "Athens Airport", value: "34 km" },
    ],
    registrationNo: null,
    otaLinks: { airbnb: null, booking: null },
    images: ["/images/harmony-luxe-living/01.jpg"],
    legacyUrls: ["/property/harmony-luxe-living/", "/property/vasilis-luxury-apartment-4/"],
  },
  {
    slug: "harmony-athens-city-apartment",
    name: "Harmony Athens City Apartment",
    provisionalName: false,
    area: "athens",
    neighborhood: "Central Athens",
    sizeSqm: null,
    bedrooms: null,
    bathrooms: null,
    sleeps: null,
    summary:
      "A self-catering apartment in central Athens, part of the Harmony Rental portfolio alongside our other city-centre " +
      "apartments. Full size, layout and sleeping capacity are being finalized with the owner — contact our team for " +
      "the latest details and availability.",
    amenities: [],
    bedSetup: [],
    distances: [],
    registrationNo: null,
    otaLinks: { airbnb: null, booking: null },
    images: ["/images/harmony-athens-city-apartment/01.jpg"],
    legacyUrls: ["/harmony-athens-city-apartment/"],
  },
  {
    slug: "harmony-twin-lofts-metaxourgeio-1",
    name: "Harmony Twin Lofts Metaxourgeio 1",
    provisionalName: false,
    area: "athens",
    neighborhood: "Metaxourgeio",
    sizeSqm: null,
    bedrooms: null,
    bathrooms: null,
    sleeps: null,
    summary:
      "The right-hand apartment on the first floor of a twin-loft building in Metaxourgeio, one of Athens's up-and-coming " +
      "creative neighbourhoods. It shares its building and floor with its sister apartment, Harmony Twin Lofts " +
      "Metaxourgeio 2. Full size and layout details are being finalized — contact our team to confirm availability.",
    amenities: [],
    bedSetup: [],
    distances: [],
    registrationNo: null,
    otaLinks: { airbnb: null, booking: null },
    images: ["/images/harmony-twin-lofts-metaxourgeio-1/01.jpg"],
    legacyUrls: ["/harmony-twin-lofts-metaxourgeio-1/"],
  },
  {
    slug: "harmony-twin-lofts-metaxourgeio-2",
    name: "Harmony Twin Lofts Metaxourgeio 2",
    provisionalName: false,
    area: "athens",
    neighborhood: "Metaxourgeio",
    sizeSqm: null,
    bedrooms: null,
    bathrooms: null,
    sleeps: null,
    summary:
      "The left-hand apartment on the first floor of a twin-loft building in Metaxourgeio, one of Athens's up-and-coming " +
      "creative neighbourhoods. It shares its building and floor with its sister apartment, Harmony Twin Lofts " +
      "Metaxourgeio 1. Full size and layout details are being finalized — contact our team to confirm availability.",
    amenities: [],
    bedSetup: [],
    distances: [],
    registrationNo: null,
    otaLinks: { airbnb: null, booking: null },
    images: ["/images/harmony-twin-lofts-metaxourgeio-2/01.jpg"],
    legacyUrls: ["/harmony-twin-lofts-metaxourgeio-2/"],
  },
];

export const getProperty = (slug: string) => properties.find(p => p.slug === slug);
