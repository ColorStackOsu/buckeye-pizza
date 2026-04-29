import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import GetInvolvedSection from "@/components/home/GetInvolvedSection";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

// Mock RevealAnimator to render children directly (no IntersectionObserver needed)
vi.mock("@/components/RevealAnimator", () => ({
  default: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));

describe("GetInvolvedSection", () => {
  // Requirement 8.1: THE Site SHALL display three Calls_To_Action:
  // Sponsorship, Join The Community, and Contact Us
  it("renders the section with id=get-involved", () => {
    render(<GetInvolvedSection />);
    const section = document.getElementById("get-involved");
    expect(section).toBeInTheDocument();
  });

  it("renders the section heading 'Get Involved'", () => {
    render(<GetInvolvedSection />);
    expect(
      screen.getByRole("heading", { name: /get involved/i }),
    ).toBeInTheDocument();
  });

  it("renders the 'Sponsorship' CTA", () => {
    render(<GetInvolvedSection />);
    const headings = screen.getAllByRole("heading", { name: /sponsorship/i });
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the 'Join The Community' CTA", () => {
    render(<GetInvolvedSection />);
    const headings = screen.getAllByRole("heading", {
      name: /join the community/i,
    });
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the 'Contact Us' CTA", () => {
    render(<GetInvolvedSection />);
    const headings = screen.getAllByRole("heading", { name: /contact us/i });
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  // Requirement 8.2: THE Site SHALL visually differentiate the
  // "Join The Community" action as the primary engagement pathway
  // using the Brand_Palette primary red
  it("'Join The Community' card has the brand-red background class", () => {
    render(<GetInvolvedSection />);
    // The card is an anchor element with aria-labelledby pointing to the title
    const joinLinks = screen.getAllByRole("link", {
      name: /join the community/i,
    });
    // At least one link should have the red background class
    const redCard = joinLinks.find(
      (el) =>
        el.classList.contains("bg-brand-red") ||
        el.className.includes("bg-brand-red"),
    );
    expect(redCard).toBeDefined();
  });

  // Requirement 8.4: THE Site SHALL use the Display_Font for action titles
  // and the Body_Font for supporting text
  it("applies font-display class to CTA card titles", () => {
    render(<GetInvolvedSection />);
    // All h4 card titles should have font-display
    const sponsorshipHeadings = screen.getAllByRole("heading", {
      name: /sponsorship/i,
    });
    // Filter to h4 elements (card titles, not the section heading)
    const h4Headings = sponsorshipHeadings.filter((el) => el.tagName === "H4");
    expect(h4Headings.length).toBeGreaterThanOrEqual(1);
    h4Headings.forEach((heading) => {
      expect(heading).toHaveClass("font-display");
    });
  });

  it("applies font-body italic class to CTA subtitle text", () => {
    render(<GetInvolvedSection />);
    // Subtitle text for Sponsorship card
    const subtitle = screen.getAllByText(/collaborate with us/i);
    expect(subtitle.length).toBeGreaterThanOrEqual(1);
    subtitle.forEach((el) => {
      expect(el).toHaveClass("font-body");
      expect(el).toHaveClass("italic");
    });
  });

  // Requirement 8.5: THE Site SHALL maintain all existing link destinations
  it("'Sponsorship' card links to /sponsors", () => {
    render(<GetInvolvedSection />);
    const sponsorLinks = screen.getAllByRole("link", { name: /sponsorship/i });
    const sponsorLink = sponsorLinks.find(
      (el) => el.getAttribute("href") === "/sponsors",
    );
    expect(sponsorLink).toBeDefined();
  });

  it("'Join The Community' card links to the Slack community URL", () => {
    render(<GetInvolvedSection />);
    const joinLinks = screen.getAllByRole("link", {
      name: /join the community/i,
    });
    const slackLink = joinLinks.find((el) =>
      el.getAttribute("href")?.includes("colorstackosu.slack.com"),
    );
    expect(slackLink).toBeDefined();
  });

  it("'Join The Community' card opens in a new tab", () => {
    render(<GetInvolvedSection />);
    const joinLinks = screen.getAllByRole("link", {
      name: /join the community/i,
    });
    const slackLink = joinLinks.find((el) =>
      el.getAttribute("href")?.includes("colorstackosu.slack.com"),
    );
    expect(slackLink).toHaveAttribute("target", "_blank");
    expect(slackLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("'Contact Us' card links to /about#contact-us", () => {
    render(<GetInvolvedSection />);
    const contactLinks = screen.getAllByRole("link", { name: /contact us/i });
    const contactLink = contactLinks.find(
      (el) => el.getAttribute("href") === "/about#contact-us",
    );
    expect(contactLink).toBeDefined();
  });

  // Accessibility — ARIA labels
  it("all CTA card links have aria-labelledby attributes", () => {
    render(<GetInvolvedSection />);
    const allLinks = screen.getAllByRole("link");
    // Filter to CTA card links (those with aria-labelledby)
    const ctaLinks = allLinks.filter((el) =>
      el.hasAttribute("aria-labelledby"),
    );
    expect(ctaLinks.length).toBeGreaterThanOrEqual(3);
  });

  it("section has aria-labelledby pointing to get-involved-title", () => {
    render(<GetInvolvedSection />);
    const section = document.getElementById("get-involved");
    expect(section).toHaveAttribute("aria-labelledby", "get-involved-title");
  });

  // Asymmetric triptych — center card is elevated on desktop
  it("center card wrapper has -translate-y-4 and scale-105 classes for desktop elevation", () => {
    render(<GetInvolvedSection />);
    // The center card wrapper div should have both classes
    const elevatedWrapper = document.querySelector(".-translate-y-4.scale-105");
    expect(elevatedWrapper).toBeInTheDocument();
  });

  // Perspective tilt — cards have perspective-card class
  it("CTA cards have the perspective-card class for the tilt effect", () => {
    render(<GetInvolvedSection />);
    const perspectiveCards = document.querySelectorAll(".perspective-card");
    // There are 3 cards rendered in the desktop layout + 3 in mobile = 6 total
    // but at minimum 3 should be present
    expect(perspectiveCards.length).toBeGreaterThanOrEqual(3);
  });
});
