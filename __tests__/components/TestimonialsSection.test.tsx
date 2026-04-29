import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TestimonialsSection from "@/components/home/TestimonialsSection";

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe("TestimonialsSection", () => {
  // Requirement 7.1: THE Site SHALL display all four student testimonials
  // with their names, year, title, quote text, and photos
  it("renders all four testimonial names", () => {
    render(<TestimonialsSection />);
    expect(screen.getAllByText("Arielle Barnes").length).toBeGreaterThanOrEqual(
      1,
    );
    expect(screen.getAllByText("Dan Flores").length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText("Berenice Araiza Sierra").length,
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Valdez Kankeu").length).toBeGreaterThanOrEqual(
      1,
    );
  });

  it("renders all four testimonial years", () => {
    render(<TestimonialsSection />);
    // Each year appears in both desktop and mobile layouts
    expect(screen.getAllByText("Sophomore").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Senior").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Freshman").length).toBeGreaterThanOrEqual(2); // two freshmen
  });

  it("renders all four testimonial titles", () => {
    render(<TestimonialsSection />);
    expect(screen.getAllByText("Opening Doors").length).toBeGreaterThanOrEqual(
      1,
    );
    expect(
      screen.getAllByText("Community to Career").length,
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText("Supported Every Step").length,
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText("Underdog to Big Tech").length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("renders photos for all four testimonials", () => {
    render(<TestimonialsSection />);
    expect(
      screen.getAllByAltText("Photo of Arielle Barnes").length,
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByAltText("Photo of Dan Flores").length,
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByAltText("Photo of Berenice Araiza Sierra").length,
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByAltText("Photo of Valdez Kankeu").length,
    ).toBeGreaterThanOrEqual(1);
  });

  // Requirement 7.2: THE Site SHALL use the Display_Font for testimonial
  // titles or pull-quote treatments
  it("applies font-display to the section heading", () => {
    render(<TestimonialsSection />);
    const heading = document.getElementById("testimonials-title");
    expect(heading).toHaveClass("font-display");
  });

  it("applies text-heading scale to the section heading", () => {
    render(<TestimonialsSection />);
    const heading = document.getElementById("testimonials-title");
    expect(heading).toHaveClass("text-heading");
  });

  it("applies font-display to testimonial year labels", () => {
    render(<TestimonialsSection />);
    // Year labels use font-display text-overline uppercase
    const yearEls = screen.getAllByText("Sophomore");
    yearEls.forEach((el) => expect(el).toHaveClass("font-display"));
  });

  // Requirement 7.5: WHEN testimonials are viewed on desktop, THE Site SHALL
  // provide a mechanism to view all four testimonials
  it("renders previous and next navigation buttons", () => {
    render(<TestimonialsSection />);
    expect(
      screen.getByRole("button", { name: "Previous testimonial" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Next testimonial" }),
    ).toBeInTheDocument();
  });

  it("renders dot indicators for all four testimonials", () => {
    render(<TestimonialsSection />);
    expect(
      screen.getByRole("tab", { name: /go to testimonial 1/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: /go to testimonial 2/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: /go to testimonial 3/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: /go to testimonial 4/i }),
    ).toBeInTheDocument();
  });

  it("first dot indicator is aria-current on initial render", () => {
    render(<TestimonialsSection />);
    const firstDot = screen.getByRole("tab", { name: /go to testimonial 1/i });
    expect(firstDot).toHaveAttribute("aria-current", "true");
  });

  // ARIA carousel attributes
  it("renders the carousel region with correct aria attributes", () => {
    render(<TestimonialsSection />);
    const carousel = screen.getByRole("region", {
      name: "Testimonials carousel",
    });
    expect(carousel).toBeInTheDocument();
    expect(carousel).toHaveAttribute("aria-roledescription", "carousel");
    expect(carousel).toHaveAttribute("aria-live", "polite");
  });

  it("renders the section with aria-labelledby pointing to testimonials-title", () => {
    render(<TestimonialsSection />);
    const section = document.getElementById("testimonials");
    expect(section).toHaveAttribute("aria-labelledby", "testimonials-title");
  });

  it("renders the tablist for dot indicators with aria-label", () => {
    render(<TestimonialsSection />);
    const tablist = screen.getByRole("tablist", {
      name: "Testimonial indicators",
    });
    expect(tablist).toBeInTheDocument();
  });

  // Requirement 7.6: THE Site SHALL give visual prominence to the quoted text
  it("renders blockquote elements for quote text", () => {
    render(<TestimonialsSection />);
    const blockquotes = screen.getAllByRole("blockquote");
    // At least one blockquote per testimonial (desktop shows 1, mobile shows 4)
    expect(blockquotes.length).toBeGreaterThanOrEqual(1);
  });

  it("applies font-body to blockquote elements", () => {
    render(<TestimonialsSection />);
    const blockquotes = screen.getAllByRole("blockquote");
    blockquotes.forEach((bq) => expect(bq).toHaveClass("font-body"));
  });
});
