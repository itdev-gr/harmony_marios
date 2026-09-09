import { useTranslations } from "next-intl";
import { site } from "@/content/site";
import { InquiryCta } from "./InquiryCta";

/**
 * The contact page body — a lead band plus the same inquiry form used on
 * apartment pages, mounted without a `property` so `submitInquiry` treats it
 * as a generic "Website inquiry" (no dates, no guest count required).
 */
export function ContactSections() {
  const t = useTranslations("contact");

  return (
    <>
      <section aria-labelledby="contact-title" className="bg-sea text-sand">
        <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-20 md:pt-32 md:pb-28">
          <p className="text-xs font-medium tracking-[0.18em] text-sand/60 uppercase">{t("eyebrow")}</p>
          <h1
            id="contact-title"
            className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] text-balance text-sand md:text-5xl lg:text-6xl"
          >
            {t("title")}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-sand/80 md:text-lg">{t("lead")}</p>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 md:grid-cols-[minmax(0,1fr)_320px] md:py-28">
          <div className="rounded-2xl border border-sea/10 bg-paper p-7">
            <h2 className="font-display text-2xl text-sea">{t("formTitle")}</h2>
            <InquiryCta />
          </div>

          <div className="flex flex-col gap-3 self-start rounded-2xl border border-sea/10 px-7 py-6">
            <p className="text-sm leading-relaxed text-ink/75">{site.contact.address}</p>
            <a
              href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}
              className="text-sm font-medium text-sea transition hover:text-terracotta"
            >
              {site.contact.phone}
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="text-sm font-medium text-sea transition hover:text-terracotta"
            >
              {site.contact.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
