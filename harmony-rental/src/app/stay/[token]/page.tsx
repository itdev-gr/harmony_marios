import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStay } from "@/content/stay";
import { getProperty } from "@/content/properties";
import { site } from "@/content/site";

/**
 * Token-gated guest arrival page (Task 10). Locale-free and unlisted: the
 * link is only ever handed to a guest directly (in their booking
 * confirmation), never linked from the public site or the sitemap
 * (Task 12 asserts that). Unknown or guessed tokens 404.
 */
export async function generateMetadata({
  params,
}: PageProps<"/stay/[token]">): Promise<Metadata> {
  const { token } = await params;
  const stay = getStay(token);
  const property = stay ? getProperty(stay.propertySlug) : undefined;

  return {
    title: property ? `${property.name} — Your stay | Harmony Rental` : "Harmony Rental",
    robots: { index: false, follow: false },
  };
}

export default async function StayPage({ params }: PageProps<"/stay/[token]">) {
  const { token } = await params;
  const stay = getStay(token);
  if (!stay) notFound();

  const property = getProperty(stay.propertySlug);
  if (!property) notFound();

  // wa.me wants a bare digit string (country code + number, no "+" or
  // spaces); the tel: link keeps the "+" — both derived from the same
  // site-wide contact number so there's one source of truth for it.
  const telHref = `tel:${site.contact.phone.replace(/\s+/g, "")}`;
  const waHref = `https://wa.me/${site.contact.phone.replace(/[^\d]/g, "")}`;

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 md:py-20">
      <p className="font-display text-sm font-bold tracking-wide text-brand-tint uppercase">
        Your stay
      </p>
      <h1 className="mt-3 font-display text-3xl leading-tight font-extrabold tracking-tight text-balance text-neutral-950 md:text-4xl">
        {property.name}
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-500">
        Everything you need for a smooth arrival — bookmark this page, it&rsquo;s yours for the
        length of your stay.
      </p>

      <div className="mt-10 flex flex-col gap-6">
        {stay.sections.map((section) => (
          <section
            key={section.title}
            className="rounded-2xl border border-line bg-white p-7 shadow-card"
          >
            <h2 className="font-display text-xl font-bold tracking-tight text-neutral-950">
              {section.title}
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed whitespace-pre-line text-neutral-700">
              {section.body}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-10 text-sm text-neutral-500">
        Questions before or during your stay? Call{" "}
        <a
          href={telHref}
          className="font-semibold text-brand-tint underline underline-offset-2 hover:text-link-hover"
        >
          {site.contact.phone}
        </a>{" "}
        or message us on{" "}
        <a
          href={waHref}
          className="font-semibold text-brand-tint underline underline-offset-2 hover:text-link-hover"
        >
          WhatsApp
        </a>{" "}
        any time.
      </p>
    </div>
  );
}
