import { render, screen, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import type { ReactElement } from "react";
import en from "@/messages/en.json";
import el from "@/messages/el.json";
import { experiences } from "@/content/experiences";
import { ExperiencesSections } from "@/components/ExperiencesSections";
import { AreaGuideSections } from "@/components/AreaGuideSections";

// next/image needs the Next image pipeline in a real render; in jsdom we only
// care that the "stay nearby" property cards render *something* for the
// photo slot.
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

describe("experiences content", () => {
  it("has 16 entries, 8 per area", () => {
    expect(experiences).toHaveLength(16);
    expect(experiences.filter((e) => e.area === "athens")).toHaveLength(8);
    expect(experiences.filter((e) => e.area === "alimos")).toHaveLength(8);
  });

  it("has unique slugs", () => {
    expect(new Set(experiences.map((e) => e.slug)).size).toBe(16);
  });

  it("gives every experience a non-empty blurb", () => {
    for (const experience of experiences) {
      expect(experience.blurb.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("Experiences page", () => {
  it("mentions Boat Tours", () => {
    renderWithIntl(<ExperiencesSections />);
    expect(screen.getByRole("heading", { name: /Boat/ })).toBeInTheDocument();
  });

  it("links both area guides", () => {
    renderWithIntl(<ExperiencesSections />);
    expect(screen.getByRole("link", { name: /Athens/i })).toHaveAttribute(
      "href",
      "/en/experiences/athens",
    );
    expect(screen.getByRole("link", { name: /Alimos/i })).toHaveAttribute(
      "href",
      "/en/experiences/alimos",
    );
  });

  it("renders in Greek on the el locale", () => {
    renderWithIntl(<ExperiencesSections />, "el", el);
    expect(screen.getByText(el.experiences.title)).toBeInTheDocument();
  });
});

describe("Athens guide", () => {
  it("renders Acropolis", () => {
    renderWithIntl(<AreaGuideSections area="athens" />);
    expect(screen.getAllByText(/Acropolis/).length).toBeGreaterThan(0);
  });

  it("shows 3 nearby apartments linking to the filtered list", () => {
    renderWithIntl(<AreaGuideSections area="athens" />);
    const region = screen.getByRole("region", { name: en.experiences.stayNearby.title });
    expect(within(region).getAllByRole("article")).toHaveLength(3);
    expect(within(region).getByRole("link", { name: /All Athens apartments/i })).toHaveAttribute(
      "href",
      "/en/apartments?area=athens",
    );
  });
});

describe("Alimos guide", () => {
  it("renders Kalamaki Beach", () => {
    renderWithIntl(<AreaGuideSections area="alimos" />);
    expect(screen.getAllByText(/Kalamaki/).length).toBeGreaterThan(0);
  });
});
