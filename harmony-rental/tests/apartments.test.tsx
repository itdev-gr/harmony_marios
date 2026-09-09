import { render, screen, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import type { ReactElement } from "react";
import en from "@/messages/en.json";
import el from "@/messages/el.json";
import { properties, getProperty } from "@/content/properties";
import { ApartmentsList } from "@/components/ApartmentsList";
import { ApartmentDetail } from "@/components/ApartmentDetail";

// next/image needs the Next image pipeline in a real render; in jsdom we only
// care that the gallery renders *something* for each photo slot.
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

// The detail page module is imported for its slug guard only; next-intl's
// server helpers need a request context we do not have here.
vi.mock("next-intl/server", () => ({
  setRequestLocale: vi.fn(),
  getTranslations: vi.fn(),
}));

function renderWithIntl(
  ui: ReactElement,
  locale: string = "en",
  messages: AbstractIntlMessages = en,
) {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {ui}
    </NextIntlClientProvider>,
  );
}

const alimos = getProperty("coastal-harmony-alimos")!;
const withRegistration = getProperty("acropolis-harmony-loft")!;

describe("Apartments list", () => {
  it("heads the page with the apartments title", () => {
    renderWithIntl(<ApartmentsList />);
    expect(
      screen.getByRole("heading", { level: 1, name: en.apartments.title }),
    ).toBeInTheDocument();
  });

  it("renders a card for all nine apartments when unfiltered", () => {
    renderWithIntl(<ApartmentsList />);
    expect(screen.getAllByRole("article")).toHaveLength(properties.length);
    expect(screen.getAllByRole("article")).toHaveLength(9);
  });

  it("shows only the Alimos apartments for ?area=alimos", () => {
    renderWithIntl(<ApartmentsList area="alimos" />);
    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(1);
    expect(within(cards[0]).getByText(alimos.neighborhood)).toBeInTheDocument();
  });

  it("shows only the Athens apartments for ?area=athens", () => {
    renderWithIntl(<ApartmentsList area="athens" />);
    expect(screen.getAllByRole("article")).toHaveLength(8);
    expect(screen.queryByText(alimos.name)).not.toBeInTheDocument();
  });

  it("ignores an area value that is not one of ours", () => {
    renderWithIntl(<ApartmentsList area="mykonos" />);
    expect(screen.getAllByRole("article")).toHaveLength(9);
  });

  it("keeps apartments whose capacity is not known yet when filtering by guests", () => {
    renderWithIntl(<ApartmentsList guests="5" />);
    // sleeps 8 and 10 clear the bar; the five unknowns are never hidden by a
    // filter, only the four-sleeper is dropped.
    expect(screen.getAllByRole("article")).toHaveLength(7);
    expect(screen.queryByText(alimos.name)).not.toBeInTheDocument();
    expect(screen.getByText("Harmony Athens City Apartment")).toBeInTheDocument();
  });

  it("ignores a guests value that is not a number", () => {
    renderWithIntl(<ApartmentsList guests="lots" />);
    expect(screen.getAllByRole("article")).toHaveLength(9);
  });

  it("offers area tabs as links that keep the other filters", () => {
    renderWithIntl(<ApartmentsList guests="4" from="2026-10-01" to="2026-10-05" />);
    const athens = screen.getByRole("link", { name: en.apartments.filters.athens });
    expect(athens).toHaveAttribute(
      "href",
      "/en/apartments?area=athens&guests=4&from=2026-10-01&to=2026-10-05",
    );
    expect(screen.getByRole("link", { name: en.apartments.filters.all })).toHaveAttribute(
      "href",
      "/en/apartments?guests=4&from=2026-10-01&to=2026-10-05",
    );
  });

  it("filters guests with a no-JS GET form that carries the other params", () => {
    const { container } = renderWithIntl(
      <ApartmentsList area="athens" guests="4" from="2026-10-01" />,
    );
    const form = container.querySelector("form");
    expect(form).toHaveAttribute("action", "/en/apartments");
    expect(form).toHaveAttribute("method", "get");
    expect(form?.querySelector('select[name="guests"]')).toHaveValue("4");
    expect(form?.querySelector('input[type="hidden"][name="area"]')).toHaveValue("athens");
    expect(form?.querySelector('input[type="hidden"][name="from"]')).toHaveValue("2026-10-01");
    expect(form?.querySelector('input[type="hidden"][name="to"]')).not.toBeInTheDocument();
  });

  it("carries the requested dates into each apartment link", () => {
    renderWithIntl(<ApartmentsList area="alimos" from="2026-10-01" to="2026-10-05" guests="2" />);
    expect(screen.getByRole("link", { name: /View apartment/ })).toHaveAttribute(
      "href",
      "/en/apartments/coastal-harmony-alimos?from=2026-10-01&to=2026-10-05&guests=2",
    );
  });

  it("says so, kindly, when nothing matches", () => {
    renderWithIntl(<ApartmentsList area="alimos" guests="8" />);
    expect(screen.queryAllByRole("article")).toHaveLength(0);
    expect(screen.getByText(en.apartments.empty)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: en.apartments.filters.clear })).toHaveAttribute(
      "href",
      "/en/apartments",
    );
  });

  it("renders in Greek on the el locale", () => {
    renderWithIntl(<ApartmentsList />, "el", el);
    expect(
      screen.getByRole("heading", { level: 1, name: el.apartments.title }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: el.apartments.filters.alimos })).toBeInTheDocument();
  });

  it("carries none of the legacy real-estate template filters", () => {
    const { container } = renderWithIntl(<ApartmentsList />);
    const text = container.textContent ?? "";
    expect(text).not.toContain("$");
    expect(text).not.toMatch(/\bNA\b/);
    expect(text).not.toMatch(/price|status|property type/i);
    // Two filters only — area tabs plus guests. No stray selects.
    expect(container.querySelectorAll("select")).toHaveLength(1);
  });
});

describe("Apartment detail", () => {
  it("shows the name, neighbourhood and the facts the inventory holds", () => {
    renderWithIntl(<ApartmentDetail property={alimos} />);
    expect(screen.getByRole("heading", { level: 1, name: alimos.name })).toBeInTheDocument();
    expect(screen.getAllByText(alimos.neighborhood).length).toBeGreaterThan(0);
    expect(screen.getByText("62 m²")).toBeInTheDocument();
    expect(screen.getByText(en.apartments.detail.facts.bathrooms)).toBeInTheDocument();
  });

  it("lists the amenities, bed setup and distances", () => {
    renderWithIntl(<ApartmentDetail property={alimos} />);
    expect(screen.getByText("Washing machine")).toBeInTheDocument();
    expect(screen.getByText("Bedroom: 1 extra-large double")).toBeInTheDocument();
    expect(screen.getByText("Edem Beach")).toBeInTheDocument();
    expect(screen.getByText("800 m")).toBeInTheDocument();
  });

  it("never prints the legacy NA, $ or empty-value artefacts", () => {
    const { container } = renderWithIntl(<ApartmentDetail property={alimos} />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/\bNA\b/);
    expect(text).not.toContain("$");
    expect(text).not.toMatch(/null|undefined|NaN/);
  });

  it("omits the sections an apartment has no data for", () => {
    const bare = getProperty("harmony-athens-city-apartment")!;
    const { container } = renderWithIntl(<ApartmentDetail property={bare} />);
    const text = container.textContent ?? "";
    expect(text).not.toContain(en.apartments.detail.amenities);
    expect(text).not.toContain(en.apartments.detail.beds);
    expect(text).not.toContain(en.apartments.detail.distances);
    expect(text).not.toMatch(/\bNA\b/);
    // The booking slot is never conditional.
    expect(container.querySelector("#book")).toBeInTheDocument();
  });

  it("keeps a provisional name unremarkable to visitors", () => {
    const provisional = getProperty("harmony-syngrou-residence")!;
    const { container } = renderWithIntl(<ApartmentDetail property={provisional} />);
    expect(container.textContent ?? "").not.toMatch(/provisional/i);
  });

  it("prints the AMA registration number only where there is one", () => {
    renderWithIntl(<ApartmentDetail property={withRegistration} />);
    expect(screen.getByText(/00002966980/)).toBeInTheDocument();
  });

  it("has no registration small print when the number is unknown", () => {
    const { container } = renderWithIntl(<ApartmentDetail property={alimos} />);
    expect(container.textContent ?? "").not.toMatch(/AMA/);
  });

  it("links the neighbourhood out to Google Maps rather than embedding one", () => {
    const { container } = renderWithIntl(<ApartmentDetail property={alimos} />);
    expect(screen.getByRole("link", { name: en.apartments.detail.map })).toHaveAttribute(
      "href",
      `https://maps.google.com/?q=${encodeURIComponent(`${alimos.neighborhood}, Athens`)}`,
    );
    expect(container.querySelector("iframe")).not.toBeInTheDocument();
  });

  it("shows no OTA badges while no listing URLs are known", () => {
    const { container } = renderWithIntl(<ApartmentDetail property={alimos} />);
    expect(container.textContent ?? "").not.toMatch(/Airbnb|Booking\.com/);
  });

  it("shows the OTA badges when the inventory has the links", () => {
    renderWithIntl(
      <ApartmentDetail
        property={{
          ...alimos,
          otaLinks: { airbnb: "https://airbnb.com/rooms/1", booking: null },
        }}
      />,
    );
    const badge = screen.getByRole("link", {
      name: en.apartments.detail.alsoOn.replace("{platform}", "Airbnb"),
    });
    expect(badge).toHaveAttribute("href", "https://airbnb.com/rooms/1");
    expect(badge).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("holds a booking slot with the inquiry form, pre-addressed to this apartment", () => {
    const { container } = renderWithIntl(<ApartmentDetail property={alimos} />);
    const book = container.querySelector("#book");
    expect(book).toBeInTheDocument();
    const scope = within(book as HTMLElement);
    expect(scope.getByLabelText(en.inquiry.name)).toBeInTheDocument();
    expect(scope.getByLabelText(en.inquiry.email)).toBeInTheDocument();
    expect(scope.getByLabelText(en.inquiry.from)).toBeInTheDocument();
    expect(scope.getByLabelText(en.inquiry.to)).toBeInTheDocument();
    expect(scope.getByLabelText(en.inquiry.guests)).toBeInTheDocument();
    expect(scope.getByRole("button", { name: en.inquiry.submit })).toBeInTheDocument();
    const propertySlugInput = (book as HTMLElement).querySelector(
      'input[type="hidden"][name="propertySlug"]',
    );
    expect(propertySlugInput).toHaveValue(alimos.slug);
  });

  it("offers a mobile sticky bar that jumps to the booking slot", () => {
    renderWithIntl(<ApartmentDetail property={alimos} />);
    expect(screen.getByRole("link", { name: en.common.requestToBook })).toHaveAttribute(
      "href",
      "#book",
    );
  });

  it("shows the photo when the inventory has one", () => {
    renderWithIntl(<ApartmentDetail property={alimos} />);
    expect(screen.getByRole("img", { name: /Coastal Harmony Alimos/ })).toHaveAttribute(
      "src",
      "/images/coastal-harmony-alimos/01.jpg",
    );
  });

  it("falls back to a monogram plate when there are no photos yet", () => {
    const { container } = renderWithIntl(
      <ApartmentDetail property={{ ...alimos, images: [] }} />,
    );
    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(screen.getByText(en.apartments.detail.photosSoon)).toBeInTheDocument();
  });

  it("renders in Greek on the el locale", () => {
    renderWithIntl(<ApartmentDetail property={alimos} />, "el", el);
    expect(screen.getByText(el.apartments.detail.about)).toBeInTheDocument();
    expect(screen.getByText("62 τ.μ.")).toBeInTheDocument();
  });
});

describe("Apartment detail route", () => {
  it("pre-renders every apartment", async () => {
    const { generateStaticParams } = await import("@/app/[locale]/apartments/[slug]/page");
    expect(generateStaticParams()).toEqual(properties.map((p) => ({ slug: p.slug })));
  });

  it("404s on a slug we do not host", async () => {
    const page = (await import("@/app/[locale]/apartments/[slug]/page")).default as unknown as (
      props: { params: Promise<{ locale: string; slug: string }> },
    ) => Promise<unknown>;

    await expect(
      page({ params: Promise.resolve({ locale: "en", slug: "villa-that-never-was" }) }),
    ).rejects.toThrow();
  });
});
