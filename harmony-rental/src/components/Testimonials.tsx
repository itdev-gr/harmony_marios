import { useLocale, useTranslations } from "next-intl";
import { site } from "@/content/site";
import { Section } from "./Section";

const GREEK = /\p{Script=Greek}/u;

/**
 * The three real OTA reviews. Guest wording is content, so it stays in the
 * data layer rather than the message catalogue; on the Greek locale we show a
 * review's own Greek original when it has one. Country names are translated.
 */
const FLAGS: Record<string, string> = { Slovakia: "🇸🇰", Poland: "🇵🇱", France: "🇫🇷" };

export function Testimonials({
  tone = "blue",
}: {
  tone?: "sand" | "paper" | "green" | "blue";
}) {
  const t = useTranslations("testimonials");
  const locale = useLocale();

  return (
    <Section id="testimonials" eyebrow={t("eyebrow")} title={t("title")} tone={tone}>
      <ul className="grid gap-6 md:grid-cols-3">
        {site.testimonials.map((testimonial) => {
          const quote =
            locale === "el" && testimonial.original && GREEK.test(testimonial.original)
              ? testimonial.original
              : testimonial.text;

          return (
            <li key={testimonial.name} className="h-full">
              <figure className="flex h-full flex-col gap-5 rounded-2xl border border-line bg-white p-7">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-pastel-green font-display text-3xl leading-none font-extrabold text-brand-tint"
                >
                  &ldquo;
                </span>
                <blockquote className="flex-1 text-sm leading-relaxed text-neutral-700">
                  {quote}
                </blockquote>
                <figcaption className="border-t border-line pt-5 text-sm">
                  <span className="font-display font-bold text-neutral-950">{testimonial.name}</span>
                  <span className="text-neutral-500">
                    {" "}· <span aria-hidden="true">{FLAGS[testimonial.country] ?? ""}</span>{" "}
                    {t(`countries.${testimonial.country}`)}
                  </span>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
