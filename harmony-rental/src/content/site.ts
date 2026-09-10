export const site = {
  contact: {
    phone: "+30 698 881 1888",
    email: "info@harmonyrental.gr",
    address: "Vizantiou 2, Athina 117 41, Greece",
  },
  services: [
    {
      slug: "apartment-rental",
      title: "Apartment Rental",
      description:
        "We offer apartments in prime locations, perfectly suited for those who want to explore Greece's rich " +
        "history and vibrant culture. Enjoy comfortable stays with easy access to the best attractions.",
    },
    {
      slug: "apartment-renovation",
      title: "Apartment Renovation",
      description:
        "Transform your property into a modern, stylish space with our professional renovation services. Our " +
        "team manages every detail, ensuring quality and efficiency at every step.",
    },
    {
      slug: "tour",
      title: "Tour",
      description:
        "Discover Greece's hidden gems with our expert-guided tours. From historical explorations in Athens to " +
        "scenic island-hopping adventures, our tours are customized to suit your preferences.",
    },
    {
      slug: "home-airbnb",
      title: "Home Airbnb",
      description:
        "Our Home Airbnb service maximizes your property's potential. We handle everything from listing " +
        "optimization and guest communication to maintenance, ensuring a seamless experience and higher returns " +
        "for property owners.",
    },
    {
      slug: "boat-tour",
      title: "Boat Tour",
      description:
        "Our Boat Tour service offers an unforgettable exploration of Greece's beautiful coastline and islands. " +
        "Enjoy personalized itineraries, stunning views, and a unique maritime experience tailored to your " +
        "preferences.",
    },
  ],
  faqs: {
    guest: [
      {
        question: "How do I book an apartment?",
        answer:
          "Booking is easy! Simply browse our listings, select your preferred property, and fill out the " +
          "booking form with your details. Our team will confirm availability and finalize your reservation.",
      },
      {
        question: "Can I customize my tour itinerary?",
        answer:
          "Absolutely! We offer personalized tour services, allowing you to customize your itinerary based on " +
          "your interests and schedule.",
      },
      {
        question: "What is included in the Airbnb management service?",
        answer:
          "Our Airbnb management covers everything from preparing your property to managing guest " +
          "communication, check-ins, and maintenance, ensuring a seamless experience for both you and your " +
          "guests.",
      },
      {
        question: "How do I start a renovation project with Harmony Rental?",
        answer:
          "Contact us for a consultation where we'll discuss your needs, budget, and timeline. Our team will " +
          "create a tailored renovation plan and manage the project from start to finish.",
      },
      {
        question: "What types of boats are available for rental?",
        answer:
          "We offer a variety of boats, including yachts, sailboats, and speedboats. Choose the option that " +
          "best fits your preference and enjoy an unforgettable maritime experience.",
      },
      {
        question: "Are there any discounts for long-term stays?",
        answer:
          "Yes, we provide special rates for long-term rentals. Reach out to our team for more details and to " +
          "customize your booking.",
      },
    ],
    renovation: [
      {
        question: "How long does the apartment renovation process take?",
        answer:
          "The timeline varies based on the scope of work, but typically, a full renovation takes 4-12 weeks. " +
          "We provide a detailed schedule during the planning phase to keep you informed.",
      },
      {
        question: "Do I need to move out during the renovation?",
        answer:
          "It depends on the extent of the renovation. For major projects involving structural changes, it's " +
          "advisable to relocate temporarily. We'll discuss options during the consultation to minimize " +
          "inconvenience.",
      },
      {
        question: "Can I customize the design according to my preferences?",
        answer:
          "Absolutely! We prioritize your vision and preferences. Our team will work closely with you, offering " +
          "design proposals and 3D visualizations to ensure the final result matches your expectations.",
      },
      {
        question: "Do you handle permits and approvals for the renovation?",
        answer:
          "Yes, we manage all required permits and approvals. Our team ensures that every aspect of the " +
          "renovation complies with Greek building regulations and standards, providing you with a hassle-free " +
          "experience.",
      },
      {
        question: "What is the cost of an apartment renovation?",
        answer:
          "The cost varies depending on the scope and materials used. We provide a transparent, detailed quote " +
          "after the initial consultation, ensuring you have a clear understanding of expenses before work " +
          "begins.",
      },
    ],
  },
  // The 6 Home Airbnb sub-services, kept close to the legacy /home-airbnb/
  // copy (inventory §1). English-only, like `services` above — this is
  // reused verbatim content, not UI chrome, so it isn't run through the
  // messages catalogue.
  ownerServices: [
    {
      slug: "prep-styling",
      title: "Property Preparation & Styling",
      description:
        "We help prepare your home to meet Airbnb standards by offering professional cleaning, interior " +
        "styling, and furnishing services. Our team ensures that your space is both comfortable and visually " +
        "appealing to attract more guests.",
    },
    {
      slug: "listing-optimization",
      title: "Listing Optimization",
      description:
        "Our experts create and optimize your Airbnb listing to enhance visibility. We handle everything from " +
        "professional photography to detailed descriptions, highlighting your property's best features to make " +
        "it stand out.",
    },
    {
      slug: "guest-management",
      title: "Guest Management & Support",
      description:
        "Harmony Rental provides end-to-end guest management, including communication, check-in, and check-out " +
        "processes. We handle guest inquiries and requests promptly, ensuring a seamless and pleasant experience " +
        "for your visitors.",
    },
    {
      slug: "maintenance-cleaning",
      title: "Maintenance & Cleaning Services",
      description:
        "We manage routine maintenance and thorough cleaning between stays, ensuring your property is always in " +
        "pristine condition for guests. Our team is on call for any urgent repairs or maintenance needs, giving " +
        "you peace of mind.",
    },
    {
      slug: "pricing-revenue",
      title: "Pricing & Revenue Optimization",
      description:
        "Our team conducts market analysis to set competitive rates, maximizing your revenue potential. We " +
        "adjust pricing based on demand, seasonality, and local events to keep your property profitable year-round.",
    },
    {
      slug: "compliance-safety",
      title: "Compliance & Safety Assurance",
      description:
        "We ensure your property meets all local regulations and safety standards. Our team conducts safety " +
        "checks and helps manage necessary permits, ensuring that your Airbnb listing operates legally and safely.",
    },
  ],

  // "Why Harmony" value props for owners, from the same legacy page.
  ownerValueProps: [
    {
      slug: "expertise",
      title: "Professional Expertise",
      description:
        "Our experienced team provides top-tier property management services, ensuring high guest satisfaction " +
        "and positive reviews.",
    },
    {
      slug: "earnings",
      title: "Maximized Earnings",
      description:
        "With our market analysis and dynamic pricing strategies, we help you achieve the best return on your " +
        "investment.",
    },
    {
      slug: "experience",
      title: "Seamless Experience",
      description:
        "From listing creation to guest check-out, we handle every aspect of your Airbnb management, saving you " +
        "time and effort.",
    },
    {
      slug: "quality",
      title: "Quality Assurance",
      description:
        "We prioritize the quality and safety of your property, maintaining high standards to enhance your " +
        "guests' experience.",
    },
  ],

  // The 7-step renovation process from /apartment-renovation/ — inventory
  // calls this "the strongest, most original page on the site"; copy kept
  // close to verbatim.
  renovationProcess: [
    {
      step: 1,
      title: "Consultation & Planning",
      description:
        "We begin with a detailed consultation to understand your needs, vision, and budget. Our team then " +
        "creates a personalized renovation plan, outlining materials, layout, and estimated timelines.",
    },
    {
      step: 2,
      title: "Design & Approval",
      description:
        "Our experts develop design proposals, including 3D visualizations, to illustrate the final look. " +
        "After approval, we secure any necessary permits and approvals, ensuring everything meets Greek " +
        "regulations and client expectations.",
    },
    {
      step: 3,
      title: "Demolition & Preparation",
      description:
        "We safely demolish and remove existing fixtures, walls, or floors as needed, preparing the space for " +
        "renovation. Our team manages waste disposal efficiently, minimizing disruption to your environment.",
    },
    {
      step: 4,
      title: "Structural Work",
      description:
        "We handle structural changes, including modifications to walls, ceilings, flooring, electrical, and " +
        "plumbing systems. All work is performed according to Greek building codes, ensuring safety and " +
        "compliance throughout the process.",
    },
    {
      step: 5,
      title: "Interior Finishing",
      description:
        "Our team installs new flooring, tiles, cabinetry, and fixtures per the approved design. We complete " +
        "painting, lighting installation, and any decorative elements, creating a cohesive and modern interior.",
    },
    {
      step: 6,
      title: "Quality Control & Inspections",
      description:
        "Each phase undergoes thorough quality checks to meet our high standards. We also conduct comprehensive " +
        "inspections, guaranteeing that all renovation aspects align with safety and quality regulations.",
    },
    {
      step: 7,
      title: "Final Touches & Handover",
      description:
        "We finalize the renovation with detailed cleaning, furniture setup (if included), and finishing " +
        "touches. The fully renovated apartment is then handed over, ready for immediate use and enjoyment.",
    },
  ],

  // Before/after case studies for the renovation portfolio section. The
  // legacy site had a bare, uncaptioned gallery under this heading with no
  // real project content (inventory §4 #40) — empty here until the client
  // supplies real pairs (image paths + a short caption per project); the
  // section renders nothing while this stays empty.
  renovationProjects: [] as { before: string; after: string; caption: string }[],

  testimonials: [
    {
      name: "Miroslava",
      country: "Slovakia",
      text:
        "We really liked that we had the subway, many bistros, a minimarket, restaurants and bars right under " +
        "the accommodation. We appreciated the three showers and the big sofa and common area in the apartment, " +
        "where you can spend time together. It was a very nice place.",
      original: null,
    },
    {
      name: "Irena",
      country: "Poland",
      text:
        "A large, spacious apartment right next to the metro. If having a place in the city center matters to " +
        "you, this is a good choice — you step out of the building and you're at the metro.",
      original:
        "Duży przestronny apartament, tuż przy metro. Jeśli komuś zależy na mieszkaniu w Centrum miasta to jest " +
        "to dobry wybór. Wychodzisz z klatki i wchodzisz do metro.",
    },
    {
      name: "Jean-Yves",
      country: "France",
      text:
        "The location, with the metro right at the foot of the building, the two restaurants close to the " +
        "apartment, and the two bathrooms and toilets, are ideal for a group — plus the owner's quick response " +
        "in bringing enough extra beds.",
      original:
        "Η τοποθεσία, ο υπόγειος σιδηρόδρομος στους πρόποδες του κτηρίου, τα 2 εστιατόρια κοντά στο διαμέρισμα, " +
        "τα 2 μπάνια και οι τουαλέτες είναι ιδανικά για πολλούς, η ανταπόκριση του ιδιοκτήτη για να φέρει αρκετά " +
        "επιπλέον κρεβάτια.",
    },
  ],
};
