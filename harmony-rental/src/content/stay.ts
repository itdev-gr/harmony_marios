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
 */
export type StaySection = { title: string; body: string };

export type Stay = {
  token: string;
  propertySlug: string;
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
    sections: [
      {
        title: "Arrival & access",
        body: "Your key is in the middle locker at the building's main entrance — message us on WhatsApp an hour before you arrive and we'll send the code.\n\nInside the building, take the lift or stairs to the 4th floor. The apartment door has a security lock; insert the key with the top side facing upward to unlock it.\n\nOnce you're inside, place the magnetic card behind the door to switch the electricity on. The power stays on only while the card is in place, so leave it there for the rest of your stay.",
      },
      {
        title: "Wi-Fi",
        body: "Network: VODAFONE_GigaWiFiHome_7739\nPassword: 4qD8T724BF5jR27A",
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
    token: "9416755770f92df99b68ada85e5ed840",
    propertySlug: "coastal-harmony-alimos",
    sections: [
      {
        title: "Arrival & access",
        body: "The apartment is on the elevated ground floor, on the right side of the building as you face it.\n\nYour key is in the locker on the right, near the main entrance, as you go up the stairs — the code is sent by WhatsApp an hour before your check-in.\n\nOnce inside the main building, go up the stairs; your apartment is the first door on the right.\n\nJust inside the door, on the right-hand side, insert the magnetic key into the slot to switch the electricity on — leave it in place for the power to stay on throughout your stay.",
      },
      {
        title: "Wi-Fi",
        body: "Network: COSMOTE-836366\nPassword: e3926p6ngann636u997e",
      },
      {
        title: "Heating & hot water",
        body: "The water heater switch is marked \"Θ\" on the electrical panel. Turn it on for 30–40 minutes to heat the water, then switch it off again before you shower.\n\nFor air conditioning and heating, the apartment has a heat pump with a remote control: press ON/OFF to start it, MODE to switch between heating and cooling, and the arrows or dial to set the temperature. We suggest 22–25°C for heating and 24–27°C for cooling.",
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
    sections: [
      {
        title: "Arrival & access",
        body: "Message us on WhatsApp when you arrive at the main door and we'll unlock it remotely for you.\n\nTake the lift or stairs to the 6th floor — please note the lift has a weight limit of 3 people.\n\nOn the 6th floor, your door is on the left as you exit the lift. It has a digital lock: enter the 6-digit code we send you via WhatsApp an hour before your check-in, then press the bell icon at the bottom right of the keypad to unlock it. This code is only needed for your first entry — after that, use the keys from the inside magnetic lock to lock and unlock the door.",
      },
      {
        title: "Wi-Fi",
        body: "Network: COSMOTE-414147\nPassword: g2rrx82ra3ket8ek",
      },
      {
        title: "Heating & hot water",
        body: "The water heater switch is in the hallway between the two rooms, next to the apartment's electrical panel, on the left-hand side. Press it and allow 30–40 minutes for the water to heat. It's controlled by a timer and switches itself off, so there's no need to turn it off manually.",
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
    sections: [
      {
        title: "Arrival & access",
        body: "At the building's main entrance, on the left side, you'll find a keypad — your access code is sent once you complete the check-in form.\n\nEnter the code on the keypad and collect your keys from the bottom locker, marked \"1\" — message us on WhatsApp an hour before your check-in for the locker code.\n\nTake the stairs to the 1st floor. Your apartment is on the right-hand side, marked \"1\" — it's the right-hand one of the two apartments on this floor.\n\nJust inside the door, on the right-hand side, insert the magnetic key card into the slot to switch the electricity on. The power stays on only while the card remains in the slot.",
      },
      {
        title: "Wi-Fi",
        body: "Network: VODAFONE_GigaWiFiHome_6565\nPassword: 7mQ5ATeba5mL7mt2",
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
  {
    token: "d74fe605c5d73310d70e3c141cf0fa82",
    propertySlug: "harmony-twin-lofts-metaxourgeio-2",
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
