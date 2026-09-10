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
  tone?: "sand" | "paper" | "green" | "blue";
  id?: string;
}) {
  const t = useTranslations("faq");

  return (
    <Section
      id={id}
      eyebrow={t("eyebrow")}
      title={t("title")}
      lead={t("lead")}
      tone={tone}
      align="center"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-line bg-white px-6 open:shadow-card"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-bold tracking-tight text-neutral-950 transition hover:text-link-hover [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                aria-hidden="true"
                className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pastel-green text-brand-tint before:absolute before:top-1/2 before:left-1/2 before:h-px before:w-3.5 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-current after:absolute after:top-1/2 after:left-1/2 after:h-3.5 after:w-px after:-translate-x-1/2 after:-translate-y-1/2 after:bg-current after:transition-transform after:duration-300 group-open:after:scale-y-0"
              />
            </summary>
            <p className="pb-6 text-sm leading-relaxed text-neutral-500">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
