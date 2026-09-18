import type { ReactNode } from "react";
import Image from "next/image";

/**
 * The shared page-opening band every inner page uses.
 *
 * Without `media` it is a plain copy band on pastel ground. With `media` it
 * becomes a two-column split — copy left, photo right — which is the layout
 * the wide breakpoints actually need: at 1500px the copy alone caps out at
 * `max-w-2xl` inside a `max-w-6xl` shell and leaves roughly 40% of the row
 * empty, so the page opens on a hole. The photo fills that column instead of
 * the caps being widened, because a 1100px line length is unreadable.
 */
export function PageHero({
  id,
  eyebrow,
  title,
  lead,
  media,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  /** Photo for the right-hand column; omit for the plain copy band. */
  media?: { src: string; alt: string };
  /** Optional CTA row under the lead. */
  children?: ReactNode;
}) {
  const copy = (
    <div>
      <p className="font-display text-sm font-bold tracking-wide text-brand-tint uppercase">
        {eyebrow}
      </p>
      <h1
        id={`${id}-title`}
        className={`mt-4 font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-neutral-950 md:text-5xl ${
          media ? "lg:text-[3.25rem]" : "max-w-3xl lg:text-6xl"
        }`}
      >
        {title}
      </h1>
      {lead && (
        <p
          className={`mt-6 text-base leading-relaxed text-neutral-500 md:text-lg ${
            media ? "" : "max-w-2xl"
          }`}
        >
          {lead}
        </p>
      )}
      {children}
    </div>
  );

  return (
    <section aria-labelledby={`${id}-title`} className="bg-pastel-cream">
      <div className="mx-auto w-full max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-24">
        {media ? (
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:gap-16">
            {copy}
            {/* Decorative: the copy never depends on it, so it carries an
                empty alt only when the caller has nothing meaningful to say.
                `priority` because this is the page's largest paint. */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line shadow-card lg:aspect-[5/4]">
              <Image
                src={media.src}
                alt={media.alt}
                fill
                priority
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        ) : (
          copy
        )}
      </div>
    </section>
  );
}
