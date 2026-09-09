import { render, screen, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import type { ReactElement } from "react";
import en from "@/messages/en.json";
import el from "@/messages/el.json";
import { site } from "@/content/site";
import { OwnersSections } from "@/components/OwnersSections";
import { RenovationSections } from "@/components/RenovationSections";

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

describe("Owners page", () => {
  it("leads with the full-circle headline", () => {
    renderWithIntl(<OwnersSections />);
    expect(
      screen.getByRole("heading", { level: 1, name: en.owners.title }),
    ).toBeInTheDocument();
  });

  it("shows all six Home Airbnb sub-services", () => {
    renderWithIntl(<OwnersSections />);
    const region = screen.getByRole("region", { name: en.owners.services.title });
    expect(within(region).getAllByRole("heading", { level: 3 })).toHaveLength(6);
    for (const service of site.ownerServices) {
      expect(within(region).getByText(service.title)).toBeInTheDocument();
    }
  });

  it("never mentions commission-based pricing", () => {
    const { container } = renderWithIntl(<OwnersSections />);
    expect(container.textContent ?? "").not.toMatch(/commission/i);
  });

  it("shows the four value props", () => {
    renderWithIntl(<OwnersSections />);
    const region = screen.getByRole("region", { name: en.owners.why.title });
    for (const prop of site.ownerValueProps) {
      expect(within(region).getByText(prop.title)).toBeInTheDocument();
    }
  });

  it("states the compliance / AMA registration position without inventing numbers", () => {
    renderWithIntl(<OwnersSections />);
    expect(screen.getByText(/AMA/)).toBeInTheDocument();
    const text = document.body.textContent ?? "";
    expect(text).not.toMatch(/\d+%/);
  });

  it("shows the full-circle strip of five stages", () => {
    renderWithIntl(<OwnersSections />);
    for (const step of Object.values(en.owners.circle.steps)) {
      expect(screen.getByText(step)).toBeInTheDocument();
    }
  });

  it("offers an owner inquiry form that tags submissions kind=owner", () => {
    const { container } = renderWithIntl(<OwnersSections />);
    expect(container.querySelector("form")).toBeInTheDocument();
    expect(container.querySelector('input[name="kind"]')).toHaveAttribute("value", "owner");
  });

  it("links on to the renovation page", () => {
    renderWithIntl(<OwnersSections />);
    expect(screen.getByRole("link", { name: en.owners.crossLink.cta })).toHaveAttribute(
      "href",
      "/en/owners/renovation",
    );
  });

  it("renders in Greek on the el locale", () => {
    renderWithIntl(<OwnersSections />, "el", el);
    expect(
      screen.getByRole("heading", { level: 1, name: el.owners.title }),
    ).toBeInTheDocument();
  });
});

describe("Renovation page", () => {
  it("leads with the renovation headline", () => {
    renderWithIntl(<RenovationSections />);
    expect(
      screen.getByRole("heading", { level: 1, name: en.owners.renovation.title }),
    ).toBeInTheDocument();
  });

  it("shows the seven-step process, including Consultation & Planning", () => {
    renderWithIntl(<RenovationSections />);
    expect(screen.getByText("Consultation & Planning")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(
      site.renovationProcess.length,
    );
  });

  it("shows the 4–12 week timeline callout", () => {
    renderWithIntl(<RenovationSections />);
    expect(screen.getByText(/4–12/)).toBeInTheDocument();
  });

  it("shows the five renovation FAQs as no-JS accordions", () => {
    const { container } = renderWithIntl(<RenovationSections />);
    expect(container.querySelectorAll("details")).toHaveLength(5);
  });

  it("omits the portfolio section while renovationProjects is empty", () => {
    renderWithIntl(<RenovationSections />);
    expect(site.renovationProjects).toHaveLength(0);
    expect(screen.queryByRole("img", { name: /before|after/i })).not.toBeInTheDocument();
  });

  it("links back to the owners page", () => {
    renderWithIntl(<RenovationSections />);
    expect(
      screen.getByRole("link", { name: en.owners.renovation.crossLink.cta }),
    ).toHaveAttribute("href", "/en/owners");
  });

  it("renders in Greek on the el locale", () => {
    renderWithIntl(<RenovationSections />, "el", el);
    expect(
      screen.getByRole("heading", { level: 1, name: el.owners.renovation.title }),
    ).toBeInTheDocument();
  });
});
