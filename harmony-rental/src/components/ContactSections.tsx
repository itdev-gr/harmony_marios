import { useTranslations } from "next-intl";
import { site } from "@/content/site";
import { InquiryCta } from "./InquiryCta";
import { PageHero } from "./PageHero";

/**
 * The contact page body — a lead band plus the same inquiry form used on
 * apartment pages, mounted without a `property` so `submitInquiry` treats it
 * as a generic "Website inquiry" (no dates, no guest count required).
 */
export function ContactSections() {
  const t = useTranslations("contact");

  return (
    <>
      <PageHero id="contact" eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-20 md:grid-cols-[minmax(0,1fr)_320px] md:py-24">
          <div className="rounded-2xl border border-line bg-white p-7 shadow-float">
            <h2 className="font-display text-2xl font-bold tracking-tight text-neutral-950">
              {t("formTitle")}
            </h2>
            <InquiryCta />
          </div>

          <div className="flex flex-col gap-3 self-start rounded-2xl border border-line bg-pastel-cream px-7 py-6">
            <p className="text-sm leading-relaxed text-neutral-700">{site.contact.address}</p>
            <a
              href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}
              className="font-display text-sm font-bold text-neutral-950 transition hover:text-link-hover"
            >
              {site.contact.phone}
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="font-display text-sm font-bold text-neutral-950 transition hover:text-link-hover"
            >
              {site.contact.email}
            </a>
            <a
              href={`https://wa.me/${site.contact.phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-sm font-bold text-neutral-950 transition hover:text-link-hover"
            >
              WhatsApp
            </a>

            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent("Vizantiou 2, Athina 117 41, Greece")}&z=16&output=embed`}
              title={t("mapTitle")}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mt-3 h-56 w-full rounded-2xl border border-line"
            />
          </div>
        </div>
      </section>
    </>
  );
}
