import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HeroSection from "@/components/home/HeroSection";

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock SponsorScroller to isolate HeroSection tests
vi.mock("@/components/home/SponsorScroller", () => ({
  default: () => (
    <div
      data-testid="sponsor-scroller"
      aria-label="Sponsor logos scrolling display"
    />
  ),
}));

// Mock gsap to avoid animation side effects in tests
vi.mock("gsap", () => ({
  default: {
    context: vi.fn(() => ({
      revert: vi.fn(),
    })),
    timeline: vi.fn(() => ({
      fromTo: vi.fn().mockReturnThis(),
    })),
  },
}));

describe("HeroSection", () => {
  // Requirement 4.1: Hero_Area SHALL display headline text that communicates
  // the ColorStack identity and welcome message
  it('renders "Welcome to" headline text', () => {
    render(<HeroSection />);
    expect(screen.getByText("Welcome to")).toBeInTheDocument();
  });

  it('renders "ColorStack" headline text', () => {
    render(<HeroSection />);
    expect(screen.getByText("ColorStack")).toBeInTheDocument();
  });

  it('renders "at Ohio State" headline text', () => {
    render(<HeroSection />);
    expect(screen.getByText("at Ohio State")).toBeInTheDocument();
  });

  // Requirement 4.2: Hero_Area SHALL use the Display_Font at the largest
  // typographic scale for the headline
  it('applies the display font class (font-display) to "ColorStack"', () => {
    render(<HeroSection />);
    const colorstackEl = screen.getByText("ColorStack");
    expect(colorstackEl).toHaveClass("font-display");
  });

  it('applies the hero text scale (text-hero) to "ColorStack"', () => {
    render(<HeroSection />);
    const colorstackEl = screen.getByText("ColorStack");
    expect(colorstackEl).toHaveClass("text-hero");
  });

  // Requirement 4.3: Hero_Area SHALL include the "Become a Member"
  // call-to-action linking to the Airtable signup form
  it('renders the "Become a Member" CTA link', () => {
    render(<HeroSection />);
    // The link has aria-label "Become a ColorStack member - opens in new tab"
    const ctaLink = screen.getByRole("link", {
      name: /become a colorstack member/i,
    });
    expect(ctaLink).toBeInTheDocument();
  });

  it("CTA link points to the Airtable signup form URL", () => {
    render(<HeroSection />);
    const ctaLink = screen.getByRole("link", {
      name: /become a colorstack member/i,
    });
    expect(ctaLink).toHaveAttribute(
      "href",
      "https://airtable.com/appwBXPiTFhfryfV0/shrvvknL6HRR8H2EZ",
    );
  });

  it("CTA link opens in a new tab", () => {
    render(<HeroSection />);
    const ctaLink = screen.getByRole("link", {
      name: /become a colorstack member/i,
    });
    expect(ctaLink).toHaveAttribute("target", "_blank");
    expect(ctaLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  // Requirement 4.4: Hero_Area SHALL incorporate the community photo as a
  // visual element
  it("renders the hero community photo with appropriate alt text", () => {
    render(<HeroSection />);
    const heroPhotos = screen.getAllByAltText(
      "ColorStack community members gathered at an event",
    );
    expect(heroPhotos.length).toBeGreaterThanOrEqual(1);
  });

  it("hero photo uses the correct image source", () => {
    render(<HeroSection />);
    const heroPhotos = screen.getAllByAltText(
      "ColorStack community members gathered at an event",
    );
    expect(heroPhotos[0]).toHaveAttribute("src", "/images/hero_photo.jpg");
  });

  // Requirement 4.5: Hero_Area SHALL include the Sponsor_Logos display
  it("renders the SponsorScroller component within the hero section", () => {
    render(<HeroSection />);
    const scroller = screen.getByTestId("sponsor-scroller");
    expect(scroller).toBeInTheDocument();
  });

  it("SponsorScroller is contained within the hero section element", () => {
    render(<HeroSection />);
    const heroSection = document.getElementById("hero");
    const scroller = screen.getByTestId("sponsor-scroller");
    expect(heroSection).toContainElement(scroller);
  });
});
