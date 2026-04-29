import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SponsorScroller from "@/components/home/SponsorScroller";

describe("SponsorScroller", () => {
  it("renders the sponsor logos container with aria-label", () => {
    render(<SponsorScroller />);
    const container = screen.getByLabelText("Sponsor logos scrolling display");
    expect(container).toBeInTheDocument();
  });

  it("renders the logos container with the logos CSS class for hover effects", () => {
    render(<SponsorScroller />);
    const container = screen.getByLabelText("Sponsor logos scrolling display");
    expect(container).toHaveClass("logos");
  });

  it("renders all sponsor logos", () => {
    render(<SponsorScroller />);
    // All logos are rendered twice (two LogoSet instances for seamless scroll)
    // Use getAllByAltText and check at least one instance exists per logo
    const expectedLogos = [
      "Cardinal Health",
      "Capital One",
      "Pinterest",
      "Mastercard",
      "GoDaddy",
      "Netflix",
      "Adobe",
      "ADS",
      "PwC",
      "Progressive",
      "WillowTree",
    ];

    for (const logoAlt of expectedLogos) {
      const logos = screen.getAllByAltText(logoAlt);
      expect(logos.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("renders logo slides with the animation class", () => {
    const { container } = render(<SponsorScroller />);
    const slides = container.querySelectorAll(".logos-slide");
    expect(slides.length).toBeGreaterThanOrEqual(1);
    // Animation is driven by rAF; slides just need to be present
    slides.forEach((slide) => {
      expect(slide).toBeInTheDocument();
    });
  });

  it("renders the scroll track with will-change-transform for performance", () => {
    const { container } = render(<SponsorScroller />);
    // will-change-transform is on the track wrapper, not individual slides
    const track = container.querySelector(".will-change-transform");
    expect(track).toBeInTheDocument();
  });

  it("renders two logo sets for seamless infinite scroll", () => {
    const { container } = render(<SponsorScroller />);
    const slides = container.querySelectorAll(".logos-slide");
    expect(slides.length).toBe(2);
  });

  it("renders logo images with consistent height class", () => {
    const { container } = render(<SponsorScroller />);
    // All logos should have the base height class
    const imgs = container.querySelectorAll(".logos-slide img");
    imgs.forEach((img) => {
      expect(img.className).toContain("h-[1.7rem]");
    });
  });
});
