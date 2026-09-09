import { render, screen } from "@testing-library/react";

it("renders", () => {
  render(<h1>Harmony Rental</h1>);
  expect(screen.getByText("Harmony Rental")).toBeInTheDocument();
});
