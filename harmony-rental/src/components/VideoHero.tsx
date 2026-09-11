/**
 * A full-bleed hero with a looping muted background video and a navy scrim, for
 * pages that lead with place rather than product. Same prop shape as
 * `PageHero`, so the two are interchangeable. The video is decorative: it is
 * `aria-hidden`, carries a poster frame for the first paint and for
 * `prefers-reduced-motion`, and the copy never depends on it.
 */
export function VideoHero({
  id,
  eyebrow,
  title,
  lead,
  video,
  poster,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  video: string;
  poster: string;
}) {
  return (
    <section
      aria-labelledby={`${id}-title`}
      className="relative isolate flex min-h-[30rem] items-end overflow-hidden bg-neutral-950 md:min-h-[36rem]"
    >
      {/* Stock footage of Athens at dawn — client may swap in their own clip at
          the same path. Motion is suppressed for reduced-motion users, who get
          the poster frame underneath instead. */}
      <video
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        className="absolute inset-0 -z-10 h-full w-full object-cover motion-reduce:hidden"
      >
        <source src={video} type="video/mp4" />
      </video>
      {/* The poster carries reduced-motion and no-video-support cases. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${poster})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-neutral-950/90 via-neutral-950/70 to-neutral-950/30"
      />

      <div className="mx-auto w-full max-w-6xl px-6 pt-28 pb-16 md:pt-36 md:pb-20">
        <p className="font-display text-sm font-bold tracking-wide text-accent uppercase">
          {eyebrow}
        </p>
        <h1
          id={`${id}-title`}
          className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-white md:text-5xl lg:text-6xl"
        >
          {title}
        </h1>
        {lead && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
