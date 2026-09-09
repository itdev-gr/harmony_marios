import { useTranslations } from "next-intl";
import { site } from "@/content/site";

/**
 * Replaces the legacy "John Doe / Jane Doe, Agent" team grid with the two
 * people who actually host.
 */
export function HostsBand() {
  const t = useTranslations("hosts");
  const initials = t("title")
    .split("&")
    .map((part) => part.trim().charAt(0));

  return (
    <section aria-labelledby="hosts-title" className="bg-sea text-sand">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 md:grid-cols-[auto_1fr] md:items-center md:gap-16 md:py-24">
        {/* client to approve host names/photos */}
        {/* Portrait slot: /images/hosts/*.jpg — initials plate until photos exist. */}
        <div aria-hidden="true" className="flex -space-x-4">
          {initials.map((initial) => (
            <span
              key={initial}
              className="flex h-24 w-24 items-center justify-center rounded-full border border-sand/25 bg-sand/10 font-display text-3xl text-sand backdrop-blur md:h-28 md:w-28 md:text-4xl"
            >
              {initial}
            </span>
          ))}
        </div>

        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.18em] text-sand/60 uppercase">{t("eyebrow")}</p>
          <h2 id="hosts-title" className="mt-4 font-display text-3xl text-sand md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-sand/80">{t("body")}</p>
          <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-sand/60">
            <span>{t("note")}</span>
            <span aria-hidden="true">·</span>
            <a href={`mailto:${site.contact.email}`} className="underline underline-offset-4 transition hover:text-sand">
              {site.contact.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
