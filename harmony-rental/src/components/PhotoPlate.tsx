/**
 * The calm monogram plate shown wherever a photo is missing or fails to
 * load — shared by the gallery, property cards and area guides so the
 * fallback look never drifts.
 */
export function PhotoPlate({ initial, caption }: { initial: string; caption?: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-neutral-100">
      <span aria-hidden="true" className="font-display text-6xl font-extrabold text-neutral-300">
        {initial}
      </span>
      {caption && (
        <p className="font-display text-xs font-bold tracking-wide text-neutral-400 uppercase">
          {caption}
        </p>
      )}
    </div>
  );
}
