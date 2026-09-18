import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStay } from "@/content/stay";
import { getProperty } from "@/content/properties";
import { site } from "@/content/site";
import { ArrivalSteps, StayFigure } from "@/components/ArrivalSteps";

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

/**
 * Link out to the property's JotForm guest-registration form — the passport
 * details Greek law requires before arrival, and for some properties the
 * gate that releases the building access code.
 *
 * `tone` only varies the framing copy: the same call to action appears once
 * before the instructions and once after them.
 */
function CheckInCta({ href, tone }: { href: string; tone: "lead" | "repeat" }) {
  return (
    <div className="mt-8 rounded-2xl border border-line bg-pastel-cream p-6">
      <p className="text-sm leading-relaxed text-neutral-700">
        {tone === "lead"
          ? "Please complete your check-in form before you arrive — it covers the passport details Greek law requires, and for some apartments it's what releases the building access code."
          : "Haven't filled in your check-in form yet? It only takes a minute, and we need it before you arrive."}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 font-display text-sm font-bold text-white transition hover:bg-brand-dark"
      >
        Complete your check-in
      </a>
    </div>
  );
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

  // Same fallback chain as the public listing page (see ApartmentDetail):
  // a confirmed street address when we have one, otherwise a
  // neighbourhood-level pin. The legacy check-in pages linked Google Maps
  // short links, but those were Firebase Dynamic Links and now all 404.
  const mapQuery = property.address ?? `${property.neighborhood}, Athens, Greece`;
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

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

      {/* The check-in form sits above the instructions on purpose: for
          several properties the building access code is only released once
          the guest has submitted it, so it can't be left to the bottom of
          the page. It is repeated at the end for anyone who reads through
          first. */}
      {stay.checkInFormUrl && (
        <CheckInCta href={stay.checkInFormUrl} tone="lead" />
      )}

      <p className="mt-8 text-sm text-neutral-500">
        Getting here?{" "}
        <a
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-tint underline underline-offset-2 hover:text-link-hover"
        >
          Open directions in Google Maps
        </a>
        .
      </p>

      <div className="mt-8 flex flex-col gap-6">
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
            {section.photo && <StayFigure photo={section.photo} />}
            {section.steps && <ArrivalSteps steps={section.steps} />}
          </section>
        ))}
      </div>

      {stay.checkInFormUrl && (
        <CheckInCta href={stay.checkInFormUrl} tone="repeat" />
      )}

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
