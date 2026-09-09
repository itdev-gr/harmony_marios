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
    <footer className="bg-neutral-950 text-white [&_:focus-visible]:outline-brand">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4 md:gap-12">
        <div className="space-y-4 md:col-span-2">
          <p className="flex items-center gap-1.5 font-display text-xl font-extrabold tracking-tight text-white">
            Harmony Rental
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand" />
          </p>
          <p className="max-w-xs text-sm leading-relaxed text-neutral-300">{tFooter("tagline")}</p>
          {socials.length > 0 && (
            <ul className="flex gap-3 pt-2">
              {socials.map(([platform, url]) => (
                <li key={platform}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={platform}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 font-display text-xs font-bold uppercase transition hover:border-brand hover:bg-brand hover:text-black"
                  >
                    {platform.slice(0, 1).toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label={tFooter("exploreHeading")}>
          <p className="font-display text-sm font-bold tracking-wide text-brand uppercase">
            {tFooter("exploreHeading")}
          </p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-display font-semibold text-neutral-300 transition hover:text-brand"
                >
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-display text-sm font-bold tracking-wide text-brand uppercase">
            {tFooter("contactHeading")}
          </p>
          <ul className="mt-5 space-y-2.5 text-sm text-neutral-300">
            <li>{contact.address}</li>
            <li>
              <a
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                className="transition hover:text-brand"
              >
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="transition hover:text-brand">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-neutral-400">
          {tFooter("legal", { year })}
        </p>
      </div>
    </footer>
  );
}
