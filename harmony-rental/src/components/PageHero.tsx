import type { ReactNode } from "react";

/**
 * The shared page-opening band every inner page uses: eyebrow, display H1,
 * lead, and an optional CTA row (children). Extracted from the near-identical
 * hero blocks that used to live in each *Sections component.
 */
export function PageHero({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby={`${id}-title`} className="bg-pastel-cream">
      <div className="mx-auto w-full max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-24">
        <p className="font-display text-sm font-bold tracking-wide text-brand-tint uppercase">
          {eyebrow}
        </p>
        <h1
          id={`${id}-title`}
          className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-neutral-950 md:text-5xl lg:text-6xl"
        >
          {title}
        </h1>
        {lead && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-500 md:text-lg">
            {lead}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
