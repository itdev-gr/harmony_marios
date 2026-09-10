/** The site's primary navigation, shared by Header and Footer so the two
 *  can never drift apart. Keys resolve through the `nav.*` messages. */
export const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/apartments", key: "apartments" },
  { href: "/experiences", key: "experiences" },
  { href: "/owners", key: "owners" },
  { href: "/journal", key: "journal" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;
