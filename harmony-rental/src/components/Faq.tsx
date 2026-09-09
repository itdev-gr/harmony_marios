import { useTranslations } from "next-intl";
import { Section } from "./Section";

type FaqItem = { question: string; answer: string };

/** No-JS accordions: native <details>, one per question. */
export function Faq({
  items,
  tone = "paper",
  id = "faq",
}: {
  items: readonly FaqItem[];
  tone?: "sand" | "paper";
  id?: string;
}) {
  const t = useTranslations("faq");

  return (
    <Section id={id} eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} tone={tone}>
      <div className="max-w-3xl border-t border-mist">
        {items.map((item) => (
          <details key={item.question} className="group border-b border-mist">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg text-sea transition hover:text-terracotta [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                aria-hidden="true"
                className="relative h-4 w-4 shrink-0 text-terracotta before:absolute before:top-1/2 before:left-0 before:h-px before:w-4 before:-translate-y-1/2 before:bg-current after:absolute after:top-0 after:left-1/2 after:h-4 after:w-px after:-translate-x-1/2 after:bg-current after:transition-transform after:duration-300 group-open:after:scale-y-0"
              />
            </summary>
            <p className="pb-6 text-sm leading-relaxed text-ink/70">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
