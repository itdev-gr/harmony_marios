import type { ReactNode } from "react";
import Image from "next/image";

/**
 * One full-width band pairing a photo with a block of copy. Rows alternate
 * down a page via `imageSide`, while mobile always stacks the photo above the
 * text. Same pattern the area guides use for their
 * attraction rows, lifted here so whole page sections can use it too.
 */
export function MediaRow({
  id,
  eyebrow,
  title,
  image,
  imageSide = "right",
  tone = "paper",
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  image: { src: string; alt: string };
  /** Which side the photo sits on at `md` and up; mobile always stacks it on top. */
  imageSide?: "left" | "right";
  tone?: "paper" | "cream";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={tone === "cream" ? "bg-pastel-cream" : "bg-white"}
    >
      <div
        className={`mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20 md:items-center md:gap-14 md:py-24 ${
          imageSide === "right" ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl border border-line bg-neutral-100 shadow-card md:w-1/2">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <p className="font-display text-sm font-bold tracking-wide text-brand-tint uppercase">
            {eyebrow}
          </p>
          <h2
            id={`${id}-title`}
            className="mt-3 font-display text-3xl leading-tight font-bold tracking-tight text-balance text-neutral-950 md:text-4xl"
          >
            {title}
          </h2>
          <div className="mt-5">{children}</div>
        </div>
      </div>
    </section>
  );
}
