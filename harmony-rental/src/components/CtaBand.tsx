import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/** Closing "planning a stay?" band, shared by the home and about pages. */
export function CtaBand({ id = "cta" }: { id?: string }) {
  const t = useTranslations("home.cta");

  return (
    <section aria-labelledby={`${id}-title`} className="bg-sand">
      <div className="mx-auto w-full max-w-6xl px-6 pb-24 md:pb-32">
        <div className="flex flex-col gap-8 rounded-2xl bg-terracotta px-8 py-14 text-paper md:flex-row md:items-center md:justify-between md:px-14">
          <div className="max-w-xl">
            <h2 id={`${id}-title`} className="font-display text-3xl text-paper md:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-paper/85">{t("body")}</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-medium text-terracotta transition hover:bg-sand"
          >
            {t("action")}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
