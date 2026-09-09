"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/content/site";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/apartments", key: "apartments" },
  { href: "/experiences", key: "experiences" },
  { href: "/owners", key: "owners" },
  { href: "/journal", key: "journal" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

type SocialPlatform = "instagram" | "facebook" | "tiktok" | "linkedin" | "youtube";

// site.contact doesn't declare `socials` yet (Task 2's data has none), but the
// shape is allowed to grow — read it defensively so icons appear automatically
// once a platform gets a real URL, without requiring a Footer redeploy.
type ContactWithSocials = typeof site.contact & {
  socials?: Partial<Record<SocialPlatform, string | null>>;
};
const contact = site.contact as ContactWithSocials;

export function Footer() {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const year = new Date().getFullYear();

  const socials = Object.entries(contact.socials ?? {}).filter(
    (entry): entry is [SocialPlatform, string] => Boolean(entry[1]),
  );

  return (
    <footer className="bg-sea text-sand">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
        <div className="space-y-4">
          <p className="font-display text-xl">Harmony Rental</p>
          <p className="max-w-xs text-sm text-sand/80">{tFooter("tagline")}</p>
          {socials.length > 0 && (
            <ul className="flex gap-3 pt-2">
              {socials.map(([platform, url]) => (
                <li key={platform}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={platform}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-sand/30 text-xs uppercase transition hover:border-sand hover:bg-sand/10"
                  >
                    {platform.slice(0, 1).toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label={tFooter("exploreHeading")}>
          <p className="text-sm font-semibold tracking-wide text-sand/60 uppercase">
            {tFooter("exploreHeading")}
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sand/85 transition hover:text-sand">
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold tracking-wide text-sand/60 uppercase">
            {tFooter("contactHeading")}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-sand/85">
            <li>{contact.address}</li>
            <li>
              <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="transition hover:text-sand">
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="transition hover:text-sand">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sand/15">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-sand/60">{tFooter("legal", { year })}</p>
      </div>
    </footer>
  );
}
