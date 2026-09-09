import { useLocale, useTranslations } from "next-intl";
import { site } from "@/content/site";
import { Section } from "./Section";

const GREEK = /\p{Script=Greek}/u;

/**
 * The three real OTA reviews. Guest wording is content, so it stays in the
 * data layer rather than the message catalogue; on the Greek locale we show a
 * review's own Greek original when it has one. Country names are translated.
 */
export function Testimonials({ tone = "sand" }: { tone?: "sand" | "paper" }) {
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
              <figure className="flex h-full flex-col gap-6 rounded-2xl border border-mist bg-paper p-7">
                <span aria-hidden="true" className="font-display text-4xl leading-none text-terracotta/50">
                  &ldquo;
                </span>
                <blockquote className="flex-1 text-sm leading-relaxed text-ink/80">{quote}</blockquote>
                <figcaption className="border-t border-mist pt-5 text-sm">
                  <span className="font-medium text-sea">{testimonial.name}</span>
                  <span className="text-ink/50"> · {t(`countries.${testimonial.country}`)}</span>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
