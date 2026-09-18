/**
 * Per-property arrival instructions for the token-gated `/stay/[token]` pages
 * (Task 10). Migrated from the legacy WordPress check-in pages
 * (`docs/crawl-pages/*.txt`) and rewritten from "pasted email" tone into
 * titled sections.
 *
 * Tokens are the secret: each was generated once with
 * `node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"`
 * and hardcoded here. They are never derived from the property slug, so
 * guessing a slug does not reveal a token.
 *
 * SECURITY: the legacy Gazi Living page published its street-door keypad
 * code in plain text. That code is intentionally NOT reproduced anywhere in
 * this repo — see the "Arrival & access" section for that property, and the
 * "Security note for the client" in the project README.
 *
 * SECURITY (Wi-Fi photos): four of the arrival photos are close-ups of
 * router labels and printed Wi-Fi cards. They carry the network password,
 * and the Alimos and Grand Suite ones also show the router's admin login.
 * Migrating them was the client's call, made knowingly: the same photos are
 * still public and indexed on the legacy WordPress site, so a token-gated,
 * robots-disallowed copy is a strict improvement on the status quo rather
 * than a new exposure.
 *
 * It is not a fix, though. Files under `public/` are served at a guessable
 * static URL whether or not the page linking them is gated, so these
 * credentials should be treated as already leaked — rotating every Wi-Fi
 * and router password remains the real remedy, and is tracked in the
 * README's security note.
 */

/** A single wayfinding photo. Dimensions are the real file dimensions —
 *  `next/image` needs them up front because a data-driven `src` can't be a
 *  static import, and the set mixes portrait phone shots with wide ones. */
export type StayPhoto = {
  /** `/images/stay/<propertySlug>/NN.jpg` */
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** One numbered step in an arrival sequence, optionally illustrated. */
export type StayStep = {
  title: string;
  body: string;
  photo?: StayPhoto;
};

export type StaySection = {
  title: string;
  /** Always present and non-empty: the section reads as prose on its own,
   *  with `steps` (when set) elaborating underneath. */
  body: string;
  /** A single illustrative photo for sections that aren't a sequence. */
  photo?: StayPhoto;
  /** An ordered, numbered sequence — used for arrival wayfinding. */
  steps?: StayStep[];
};

export type Stay = {
  token: string;
  propertySlug: string;
  /**
   * The property's JotForm guest-registration form — where the guest files
   * the passport details Greek law requires before arrival. For several
   * properties the access code is only released once this is submitted, so
   * the page has to surface it prominently rather than bury it.
   *
   * `null` where the legacy site has no working form (Gazi Living's returns
   * 404); the page then omits the call to action rather than linking to a
   * dead end. See the README's open-questions list.
   */
  checkInFormUrl: string | null;
  sections: StaySection[];
};

const STANDARD_CHECKOUT: StaySection = {
  title: "Check-out",
  body: "Check-out is by 11:00. Please leave the keys on the table (not in the door), and turn off the lights, air conditioning and water heater before you go.",
};

export const stays: Stay[] = [
  {
    token: "8c272e6ea9dfa112d6581e1fc92f2116",
    propertySlug: "acropolis-harmony-loft",
    checkInFormUrl: "https://form.jotform.com/Harmonyrental/acropolis-harmony-loft",
    sections: [
      {
        title: "Arrival & access",
        body: "Five steps from the street to the front door. Message us on WhatsApp an hour before you arrive and we'll send you the locker code.",
        steps: [
          {
            title: "The building entrance",
            body: "This is the main entrance to the building. The key lockers are mounted on the wall just inside.",
            photo: {
              src: "/images/stay/acropolis-harmony-loft/01.jpg",
              alt: "Glass double doors at the main entrance of the building, seen from the pavement",
              width: 1200,
              height: 1600,
            },
          },
          {
            title: "Your key locker",
            body: "Yours is the middle locker. Enter the code we sent you on WhatsApp and take out the key — the magnetic card for the electricity is attached to it.",
            photo: {
              src: "/images/stay/acropolis-harmony-loft/02.jpg",
              alt: "Two white key lockboxes mounted on the entrance wall, the upper one with a combination dial",
              width: 1200,
              height: 1600,
            },
          },
          {
            title: "Up to the fourth floor",
            body: "Take the lift or the stairs to the 4th floor. Your apartment is the dark brown door with the welcome mat in front of it.",
            photo: {
              src: "/images/stay/acropolis-harmony-loft/03.jpg",
              alt: "Dark brown apartment door on the fourth-floor landing with a welcome mat in front of it",
              width: 1200,
              height: 1600,
            },
          },
          {
            title: "Unlocking the door",
            body: "The door has a security lock. Insert the key with the top side facing upward, as in the photo, and turn.",
            photo: {
              src: "/images/stay/acropolis-harmony-loft/04.jpg",
              alt: "Close-up of a key inserted in the apartment door's security lock, top side facing upward",
              width: 1200,
              height: 1600,
            },
          },
          {
            title: "Switching the power on",
            body: "Once you're inside, place the magnetic card in the holder behind the door to switch the electricity on. The power stays on only while the card is in place, so leave it there for the rest of your stay.",
            photo: {
              src: "/images/stay/acropolis-harmony-loft/05.jpg",
              alt: "Inside of the apartment entrance door, with the magnetic card holder on the wall to the left",
              width: 616,
              height: 1600,
            },
          },
        ],
      },
      {
        title: "Wi-Fi",
        body: "Network: VODAFONE_GigaWiFiHome_7739\nPassword: 4qD8T724BF5jR27A\n\nYou can also scan the QR code on the card in the apartment to connect straight away.",
        photo: {
          src: "/images/stay/acropolis-harmony-loft/07.jpg",
          alt: "The printed Wi-Fi card in the apartment, showing the network name, password and a QR code",
          width: 1600,
          height: 438,
        },
      },
      {
        title: "Heating & hot water",
        body: "The electrical panel is inside the apartment. Switch \"Θ\" controls the water heater — turn it on and allow about 30 minutes for the water to heat, then turn it off again before you shower. Never shower with the switch on; it's a shock risk.\n\nSwitch \"K\" controls the kitchen appliances. Please make sure it's off whenever you're not using them.",
        photo: {
          src: "/images/stay/acropolis-harmony-loft/06.jpg",
          alt: "The apartment's electrical panel, with the water heater and kitchen switches marked by hand underneath",
          width: 1200,
          height: 1600,
        },
      },
      {
        title: "House notes",
        body: "Your safety is our priority — if anything isn't working as expected, message us on WhatsApp any time.",
      },
      STANDARD_CHECKOUT,
    ],
  },
  {
    token: "9416755770f92df99b68ada85e5ed840",
    propertySlug: "coastal-harmony-alimos",
    checkInFormUrl: "https://form.jotform.com/Harmonyrental/coastal-harmony-alimos",
    sections: [
      {
        title: "Arrival & access",
        body: "The apartment is on the elevated ground floor, on the right side of the building as you face it. Message us on WhatsApp an hour before your check-in and we'll send you the locker code.",
        steps: [
          {
            title: "Finding the building",
            body: "Vasilissis Amalias 20 — a low white apartment block set back behind a garden.",
            photo: {
              src: "/images/stay/coastal-harmony-alimos/01.jpg",
              alt: "Exterior of the apartment building at Vasilissis Amalias 20, with balconies and a front garden",
              width: 1208,
              height: 1600,
            },
          },
          {
            title: "Your key locker",
            body: "The locker is on the right-hand side, near the main entrance, as you go up the stairs. Its code is sent to you on WhatsApp an hour before check-in.",
          },
          {
            title: "Your apartment door",
            body: "Enter the main building and walk up the stairs. The first door on the right — the wooden one in the photo — is yours.",
            photo: {
              src: "/images/stay/coastal-harmony-alimos/02.jpg",
              alt: "Wooden apartment door, the first on the right at the top of the entrance stairs",
              width: 738,
              height: 1600,
            },
          },
          {
            title: "Switching the power on",
            body: "Just inside the door, on the right-hand side, insert the magnetic key into the slot to switch the electricity on. Leave it in place for the whole of your stay so the power stays on.",
            photo: {
              src: "/images/stay/coastal-harmony-alimos/03.jpg",
              alt: "The magnetic key card inserted into the wall slot beside the door, with the keys hanging from it",
              width: 538,
              height: 694,
            },
          },
        ],
      },
      {
        title: "Wi-Fi",
        body: "Network: COSMOTE-836366\nPassword: e3926p6ngann636u997e\n\nThe same details are printed on the label on the underside of the router, along with a QR code you can scan to connect.",
        photo: {
          src: "/images/stay/coastal-harmony-alimos/06.jpg",
          alt: "Label on the underside of the router showing the Wi-Fi network name, key and a QR code",
          width: 1290,
          height: 1117,
        },
      },
      {
        title: "Heating & hot water",
        body: "Hot water and climate control are on two separate controls — the electrical panel for the water heater, and a wall remote for the heat pump.",
        steps: [
          {
            title: "Hot water",
            body: "The water heater switch is labelled \"Θ\" on the electrical panel. Turn it on for 30–40 minutes to heat the water, then switch it off again before you shower — the water stays hot for a good while afterwards.",
            photo: {
              src: "/images/stay/coastal-harmony-alimos/04.jpg",
              alt: "The apartment's electrical panel with rows of circuit breakers, including the water heater switch",
              width: 900,
              height: 1600,
            },
          },
          {
            title: "Heating & cooling",
            body: "The apartment has a heat pump for both heating and cooling. Press ON/OFF to start it, MODE to switch between heating and cooling, and the arrows or the dial to set the temperature. We suggest 22–25°C for heating and 24–27°C for cooling.",
            photo: {
              src: "/images/stay/coastal-harmony-alimos/05.jpg",
              alt: "Wall-mounted heat pump control panel showing the set temperature, with mode and fan buttons",
              width: 1290,
              height: 1206,
            },
          },
        ],
      },
      {
        title: "House notes",
        body: "If you have any trouble along the way, message us on WhatsApp and we'll help right away.",
      },
      STANDARD_CHECKOUT,
    ],
  },
  {
    token: "9616cd2cbf68dee0e86ca16049302d4e",
    propertySlug: "harmony-athens-city-apartment",
    checkInFormUrl: "https://form.jotform.com/Harmonyrental/harmony-athens-city-apartment",
    sections: [
      {
        title: "Arrival & access",
        body: "Your key is in the middle locker at the building's main entrance — message us on WhatsApp an hour before you arrive and we'll send the code.\n\nTake the lift or stairs to the 4th floor. The apartment door has a security lock; insert the key with the top side facing upward to unlock it.\n\nOnce inside, place the magnetic card behind the door to switch the electricity on. The power stays on only while the card is in place, so leave it there for the rest of your stay.",
      },
      {
        title: "Wi-Fi",
        body: "Your host will send the Wi-Fi network name and password in your arrival message before check-in — see your arrival message.",
      },
      {
        title: "Heating & hot water",
        body: "The electrical panel is inside the apartment. Switch \"Θ\" controls the water heater — turn it on and allow about 30 minutes for the water to heat, then turn it off again before you shower. Never shower with the switch on; it's a shock risk.\n\nSwitch \"K\" controls the kitchen appliances. Please make sure it's off whenever you're not using them.",
      },
      {
        title: "House notes",
        body: "Your safety is our priority — if anything isn't working as expected, message us on WhatsApp any time.",
      },
      STANDARD_CHECKOUT,
    ],
  },
  {
    token: "6483187c693f19271380282352107f2c",
    propertySlug: "harmony-gazi-living",
    // The legacy JotForm for this property returns 404 — see the type's
    // comment and the README's open questions.
    checkInFormUrl: null,
    sections: [
      {
        title: "Arrival & access",
        body: "At the building's main entrance, on the left side, you'll find a keypad. The door code is sent to you via WhatsApp before you arrive — we don't publish it here.\n\nOnce inside, take the lift or stairs to the 2nd floor, where you'll find a locker on the right-hand side. Message us on WhatsApp an hour before your check-in for the locker code; your keys are inside, next to the locker.\n\nJust inside the apartment, on the left-hand side, insert the magnetic card into the slot to switch the electricity on — leave it in place for the power to stay on.",
      },
      {
        title: "Wi-Fi",
        body: "Network: VODAFONE_GigaWiFiHome_6565\nPassword: 7mQ5ATeba5mL7mt2",
      },
      {
        title: "Heating & hot water",
        body: "The water heater switch is on the electrical panel, labelled \"Water Heater.\" Turn it on and allow 30–40 minutes for the water to heat, then switch it off again before you shower — always turn it off before showering. If you need hot water again later, just repeat the process.",
      },
      {
        title: "House notes",
        body: "Reception can help in Greek or English. If anything isn't working as expected, message us on WhatsApp any time.",
      },
      STANDARD_CHECKOUT,
    ],
  },
  {
    token: "9168b0dd29e0d93bbb94452d586c3639",
    propertySlug: "harmony-luxe-living",
    // ⚠ Points at a generic Harmony Rental form, not a per-property one —
    // flagged for the client rather than guessed at. README, open questions.
    checkInFormUrl: "https://form.jotform.com/Harmonyrental/harmony-rental",
    sections: [
      {
        title: "Arrival & access",
        body: "Your key is in the top locker, on the left metal railing as you enter the building and head up the stairs — message us on WhatsApp an hour before your check-in for the code.\n\nTake the lift or stairs to the 4th floor and turn right. Your apartment is door number 28.\n\nJust inside, on the right-hand side, insert your magnetic card into the energy slot to switch the electricity on.",
      },
      {
        title: "Wi-Fi",
        body: "Network: VODAFONE_GigaBiiHome_6565\nPassword: 7mQ5ATeba5mL7mt2\n\nThe router is in the living room — if you lose the connection, unplug it for 10 seconds and plug it back in.",
      },
      {
        title: "Heating & hot water",
        body: "Next to the bathroom you'll find the electrical panel. Lift the top-left switch and allow 30–40 minutes for the water to heat, then turn it off again — always switch it off before showering. The apartment also has a solar water heater, so hot water is normally available without using this switch at all.",
      },
      {
        title: "House notes",
        body: "Message us on WhatsApp any time if you need a hand with anything.",
      },
      STANDARD_CHECKOUT,
    ],
  },
  {
    token: "ed09a80552995d7871ccf114da1c441a",
    propertySlug: "harmony-luxury-grand-suite",
    checkInFormUrl: "https://form.jotform.com/Harmonyrental/harmony-luxury-grand-suite",
    sections: [
      {
        title: "Arrival & access",
        body: "There's no key locker here — we unlock the street door for you remotely, and the apartment itself has a digital lock.",
        steps: [
          {
            title: "The street door",
            body: "Message us on WhatsApp when you reach the main door and we'll unlock it remotely for you.",
            photo: {
              src: "/images/stay/harmony-luxury-grand-suite/01.jpg",
              alt: "The building's street-level entrance between two shopfronts, with the street number above the door",
              width: 1320,
              height: 1583,
            },
          },
          {
            title: "Up to the sixth floor",
            body: "Take the lift or the stairs to the 6th floor. Please note the lift has a weight limit of 3 people — overloading it can leave you stuck between floors.",
          },
          {
            title: "The digital lock",
            body: "As you step out of the lift, your door is on the left. Enter the 6-digit code we send you on WhatsApp an hour before check-in, then press the bell icon at the bottom right of the keypad. The door unlocks.\n\nThis code is only needed for your first entry.",
            photo: {
              src: "/images/stay/harmony-luxury-grand-suite/02.jpg",
              alt: "Illuminated digital keypad lock on the apartment door, with the bell icon at the bottom right",
              width: 925,
              height: 1600,
            },
          },
          {
            title: "Your keys",
            body: "Once you're inside, take the keys from the magnetic holder by the door and use them to lock and unlock the door for the rest of your stay. Always lock up with the key when you go out, even briefly.",
            photo: {
              src: "/images/stay/harmony-luxury-grand-suite/03.jpg",
              alt: "Keys hanging from the magnetic card holder mounted on the wall just inside the apartment door",
              width: 947,
              height: 1374,
            },
          },
        ],
      },
      {
        title: "Wi-Fi",
        body: "Network: COSMOTE-414147\nPassword: g2rrx82ra3ket8ek\n\nThe same details are printed on the router's label, along with a QR code you can scan to connect.",
        photo: {
          src: "/images/stay/harmony-luxury-grand-suite/05.jpg",
          alt: "Label on the router showing the Wi-Fi network name, key and a QR code",
          width: 1295,
          height: 1061,
        },
      },
      {
        title: "Heating & hot water",
        body: "The water heater switch is in the hallway between the two rooms, next to the apartment's electrical panel, on the left-hand side. Press it and allow 30–40 minutes for the water to heat. It's controlled by a timer and switches itself off, so there's no need to turn it off manually.",
        photo: {
          src: "/images/stay/harmony-luxury-grand-suite/04.jpg",
          alt: "Wall switch for the water heater in the hallway, with its indicator light on",
          width: 924,
          height: 1600,
        },
      },
      {
        title: "House notes",
        body: "Always use your key to lock the door when you leave the apartment, even for a short time, for extra security.",
      },
      STANDARD_CHECKOUT,
    ],
  },
  {
    token: "b2b5e2ba476054aefd401b0b3a7b7301",
    propertySlug: "harmony-twin-lofts-metaxourgeio-1",
    checkInFormUrl: "https://form.jotform.com/Harmonyrental/harmony-twin-lofts-metaxourgeio",
    sections: [
      {
        title: "Arrival & access",
        body: "Please complete the check-in form first — the keypad code for the building is released once you've submitted it.",
        steps: [
          {
            title: "The building keypad",
            body: "At the building's main entrance, on the left side, you'll find a keypad. Enter the access code you receive after completing the check-in form.",
          },
          {
            title: "Your key locker",
            body: "Collect your keys from the bottom locker, marked \"1\". Message us on WhatsApp an hour before your check-in for the locker code.",
          },
          {
            title: "Up to the first floor",
            body: "Take the stairs to the 1st floor. Your apartment is on the right-hand side, marked \"1\" — it's the right-hand one of the two apartments on this floor.",
          },
          {
            title: "Switching the power on",
            body: "Just inside the door, on the right-hand side, insert the magnetic key card into the slot to switch the electricity on. The power stays on only while the card remains in the slot.",
          },
        ],
      },
      {
        title: "Wi-Fi",
        body: "Network: VODAFONE_GigaWiFiHome_6565\nPassword: 7mQ5ATeba5mL7mt2\n\nYou can also scan the QR code on the card in the apartment to connect straight away.",
        photo: {
          src: "/images/stay/harmony-twin-lofts-metaxourgeio-1/02.jpg",
          alt: "The printed Wi-Fi card in the apartment, showing the network name, password and a QR code",
          width: 736,
          height: 192,
        },
      },
      {
        title: "Heating & hot water",
        body: "The apartment has a solar water heater, so hot water is normally available without doing anything. If you ever need to cut the power, you can lower the main breaker on the electrical panel — please don't adjust any other switches unless we've asked you to.",
        photo: {
          src: "/images/stay/harmony-twin-lofts-metaxourgeio-1/01.jpg",
          alt: "The apartment's electrical panel with three rows of circuit breakers behind a hinged cover",
          width: 1200,
          height: 1600,
        },
      },
      {
        title: "House notes",
        body: "In an emergency, contact us straightaway via WhatsApp.",
      },
      STANDARD_CHECKOUT,
    ],
  },
  {
    token: "d74fe605c5d73310d70e3c141cf0fa82",
    propertySlug: "harmony-twin-lofts-metaxourgeio-2",
    checkInFormUrl: "https://form.jotform.com/Harmonyrental/harmony-twin-lofts-metaxourgeio-2",
    sections: [
      {
        title: "Arrival & access",
        body: "At the building's main entrance, on the left side, you'll find a keypad — your access code is sent once you complete the check-in form.\n\nEnter the code on the keypad and collect your keys from the bottom locker, marked \"2\" — message us on WhatsApp an hour before your check-in for the locker code.\n\nTake the stairs to the 1st floor. Your apartment is on the left-hand side, marked \"2\" — it's the left-hand one of the two apartments on this floor.\n\nJust inside the door, on the left-hand side, insert the magnetic key card into the slot to switch the electricity on. The power stays on only while the card remains in the slot.",
      },
      {
        title: "Wi-Fi",
        body: "Network: VODAFONE_GigaWiFiHome_6565\nPassword: 7yTn746695Mtb545",
      },
      {
        title: "Heating & hot water",
        body: "The apartment has a solar water heater, so hot water is normally available without doing anything. If you ever need to cut the power, you can lower the main breaker on the electrical panel — please don't adjust any other switches unless we've asked you to.",
      },
      {
        title: "House notes",
        body: "In an emergency, contact us straightaway via WhatsApp.",
      },
      STANDARD_CHECKOUT,
    ],
  },
];

export const getStay = (token: string): Stay | undefined =>
  stays.find((s) => s.token === token);
