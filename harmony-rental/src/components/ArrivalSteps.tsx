import Image from "next/image";

import type { StayPhoto, StayStep } from "@/content/stay";

/**
 * The numbered arrival sequence on `/stay/[token]`, and the single-photo
 * variant used by sections that aren't a sequence.
 *
 * NOTE: `/stay` lives outside the `[locale]` tree and `src/app/stay/layout.tsx`
 * deliberately provides no `NextIntlClientProvider`, so nothing here may call
 * `useTranslations` — every string arrives through props or the stay data.
 *
 * The visual language (circled step number beside a bordered card) matches
 * the renovation process list in `src/components/RenovationSections.tsx`.
 */

/**
 * Photos are portrait phone shots of doors, lockers and panels, so they're
 * capped rather than cropped: a guest standing at the door needs to see the
 * whole frame, not a nicely composed crop of it. `width`/`height` come from
 * the data because a data-driven `src` can't be a static import, and they
 * are what keeps the page from shifting as each photo loads.
 */
export function StayFigure({ photo, priority }: { photo: StayPhoto; priority?: boolean }) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      // The first arrival photo is reliably the page's LCP element, and the
      // guest is usually on mobile data outside the building — worth the
      // eager fetch. Every later photo stays lazy.
      priority={priority}
      sizes="(min-width: 768px) 560px, 100vw"
      // Bounded on both axes so one very tall shot (the loft's entrance
      // hallway is 616×1600) doesn't push the next step a screenful away.
      // `w-auto`/`h-auto` leave the browser to scale within both caps, so
      // the aspect ratio is preserved rather than cropped.
      className="mt-4 h-auto max-h-[30rem] w-auto max-w-sm rounded-xl border border-line"
    />
  );
}

export function ArrivalSteps({ steps }: { steps: StayStep[] }) {
  return (
    <ol className="mt-5 flex flex-col gap-5">
      {steps.map((step, index) => (
        <li key={step.title} className="flex gap-4 md:gap-5">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white font-display text-sm font-bold text-brand-tint"
          >
            {index + 1}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-base font-bold tracking-tight text-neutral-950">
              {step.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed whitespace-pre-line text-neutral-700">
              {step.body}
            </p>
            {step.photo && <StayFigure photo={step.photo} priority={index === 0} />}
          </div>
        </li>
      ))}
    </ol>
  );
}
