import { render, screen, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import type { ReactElement } from "react";
import en from "@/messages/en.json";
import el from "@/messages/el.json";
import type { Property } from "@/content/types";
import { HomeSections } from "@/components/HomeSections";
import { AboutSections } from "@/components/AboutSections";
import { PropertyCard } from "@/components/PropertyCard";

// next/image needs the Next image pipeline in a real render; in jsdom we only
// care that a card renders *something* for the photo slot.
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
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

const nullish: Property = {
  slug: "test-apartment",
  name: "Test Apartment",
  provisionalName: false,
  address: null,
  area: "athens",
  neighborhood: "Koukaki",
  sizeSqm: null,
  bedrooms: null,
  bathrooms: null,
  sleeps: null,
  summary: "x".repeat(90),
  amenities: [],
  bedSetup: [],
  distances: [],
  registrationNo: null,
  otaLinks: { airbnb: null, booking: null },
  images: [],
  legacyUrls: [],
};

describe("Home page", () => {
  it("leads with the hero headline", () => {
    renderWithIntl(<HomeSections />);
    expect(
      screen.getByRole("heading", { level: 1, name: en.home.heroTitle }),
    ).toBeInTheDocument();
  });

  it("renders the hero headline in Greek on the el locale", () => {
    renderWithIntl(<HomeSections />, "el", el);
    expect(
      screen.getByRole("heading", { level: 1, name: el.home.heroTitle }),
    ).toBeInTheDocument();
  });

  it("offers a no-JS availability form that GETs to the localised apartments page", () => {
    const { container } = renderWithIntl(<HomeSections />);
    const form = container.querySelector("form");
    expect(form).toHaveAttribute("action", "/en/apartments");
    expect(form).toHaveAttribute("method", "get");
    expect(form?.querySelector('input[name="from"][type="date"]')).toBeInTheDocument();
    expect(form?.querySelector('input[name="to"][type="date"]')).toBeInTheDocument();
    expect(form?.querySelector('select[name="guests"]')).toBeInTheDocument();
  });

  it("features exactly three apartments", () => {
    renderWithIntl(<HomeSections />);
    const featured = screen.getByRole("region", { name: en.home.featured.title });
    expect(within(featured).getAllByRole("article")).toHaveLength(3);
    expect(within(featured).getAllByRole("link", { name: /View apartment/ })).toHaveLength(3);
  });

  it("links on to the full apartment list", () => {
    renderWithIntl(<HomeSections />);
    const featured = screen.getByRole("region", { name: en.home.featured.title });
    expect(
      within(featured).getByRole("link", { name: en.home.featured.all }),
    ).toHaveAttribute("href", "/en/apartments");
  });

  it("shows all five services", () => {
    renderWithIntl(<HomeSections />);
    const services = screen.getByRole("region", { name: en.services.title });
    expect(within(services).getAllByRole("heading", { level: 3 })).toHaveLength(5);
  });

  it("introduces the hosts by name", () => {
    renderWithIntl(<HomeSections />);
    expect(screen.getByText(en.hosts.title)).toBeInTheDocument();
  });

  it("shows the three real testimonials", () => {
    renderWithIntl(<HomeSections />);
    const section = screen.getByRole("region", { name: en.testimonials.title });
    expect(within(section).getAllByRole("blockquote")).toHaveLength(3);
    expect(within(section).getByText(/Miroslava/)).toBeInTheDocument();
  });

  it("shows the six guest FAQs as no-JS accordions", () => {
    const { container } = renderWithIntl(<HomeSections />);
    expect(container.querySelectorAll("details")).toHaveLength(6);
  });

  it("closes with a contact call to action", () => {
    renderWithIntl(<HomeSections />);
    expect(screen.getByRole("link", { name: en.home.cta.action })).toHaveAttribute(
      "href",
      "/en/contact",
    );
  });

  it("carries none of the legacy real-estate template artefacts", () => {
    const { container } = renderWithIntl(<HomeSections />);
    const text = container.textContent ?? "";
    expect(text).not.toContain("$");
    expect(text).not.toMatch(/Realtor/i);
    expect(text).not.toMatch(/Dream Home/i);
    expect(text).not.toMatch(/John Doe|Jane Doe/i);
  });
});

describe("PropertyCard", () => {
  it("shows the name, neighbourhood and a link to the apartment", () => {
    renderWithIntl(<PropertyCard property={nullish} />);
    expect(screen.getByRole("heading", { name: "Test Apartment" })).toBeInTheDocument();
    expect(screen.getByText("Koukaki")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View apartment/ })).toHaveAttribute(
      "href",
      "/en/apartments/test-apartment",
    );
  });

  it("omits facts the inventory does not have", () => {
    const { container } = renderWithIntl(<PropertyCard property={nullish} />);
    expect(container.querySelectorAll("li")).toHaveLength(0);
    expect(screen.queryByText(/NA|null|undefined/)).not.toBeInTheDocument();
  });

  it("renders the facts it does have", () => {
    renderWithIntl(
      <PropertyCard property={{ ...nullish, sleeps: 4, bedrooms: 2, sizeSqm: 62 }} />,
    );
    expect(screen.getByText("4 guests")).toBeInTheDocument();
    expect(screen.getByText("2 bedrooms")).toBeInTheDocument();
    expect(screen.getByText("62 m²")).toBeInTheDocument();
  });

  it("falls back to an initial placeholder when there is no photo yet", () => {
    const { container } = renderWithIntl(<PropertyCard property={nullish} />);
    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(screen.getByText("T")).toBeInTheDocument();
  });

  it("renders the photo when the inventory has one", () => {
    renderWithIntl(
      <PropertyCard property={{ ...nullish, images: ["/images/test/01.jpg"] }} />,
    );
    expect(screen.getByRole("img", { name: "Test Apartment" })).toHaveAttribute(
      "src",
      "/images/test/01.jpg",
    );
  });
});

describe("About page", () => {
  it("states the mission, vision and goals", () => {
    renderWithIntl(<AboutSections />);
    for (const key of ["vision", "mission", "goals"] as const) {
      expect(screen.getByText(en.about[key].title)).toBeInTheDocument();
      expect(screen.getByText(en.about[key].body)).toBeInTheDocument();
    }
  });

  it("keeps the hosts band and drops the fake agents and stat counters", () => {
    const { container } = renderWithIntl(<AboutSections />);
    expect(screen.getByText(en.hosts.title)).toBeInTheDocument();
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/John Doe|Jane Doe|Agent/i);
    expect(text).not.toMatch(/Happy Clients|Projects Done|Awards Won/i);
  });

  it("renders in Greek on the el locale", () => {
    renderWithIntl(<AboutSections />, "el", el);
    expect(screen.getByText(el.about.mission.body)).toBeInTheDocument();
  });
});
