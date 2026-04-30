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

// Mock GSAP — no DOM animations in unit tests
vi.mock("gsap", () => ({
  default: {
    registerPlugin: vi.fn(),
    matchMedia: vi.fn(() => ({ add: vi.fn(), revert: vi.fn() })),
    context: vi.fn(() => ({ revert: vi.fn() })),
    from: vi.fn(),
  },
}));
vi.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: {} }));

describe("GetInvolvedSection", () => {
  it("renders the section with id=get-involved", () => {
    render(<GetInvolvedSection />);
    const section = document.getElementById("get-involved");
    expect(section).toBeInTheDocument();
  });

  it("renders the 'Join The Community' action", () => {
    render(<GetInvolvedSection />);
    expect(screen.getByText("Join The Community")).toBeInTheDocument();
  });

  it("renders the 'Become a Sponsor' action", () => {
    render(<GetInvolvedSection />);
    expect(screen.getByText("Become a Sponsor")).toBeInTheDocument();
  });

  it("renders the 'Contact Us' action", () => {
    render(<GetInvolvedSection />);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("'Join The Community' links to the Slack community URL", () => {
    render(<GetInvolvedSection />);
    const slackLink = screen.getByRole("link", {
      name: /join the community/i,
    });
    expect(slackLink).toHaveAttribute(
      "href",
      "https://colorstackosu.slack.com/",
    );
  });

  it("'Join The Community' opens in a new tab", () => {
    render(<GetInvolvedSection />);
    const slackLink = screen.getByRole("link", { name: /join the community/i });
    expect(slackLink).toHaveAttribute("target", "_blank");
    expect(slackLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("'Become a Sponsor' links to /sponsors", () => {
    render(<GetInvolvedSection />);
    const sponsorLink = screen.getByRole("link", { name: /become a sponsor/i });
    expect(sponsorLink).toHaveAttribute("href", "/sponsors");
  });

  it("'Contact Us' links to /about#contact-us", () => {
    render(<GetInvolvedSection />);
    const contactLink = screen.getByRole("link", { name: /contact us/i });
    expect(contactLink).toHaveAttribute("href", "/about#contact-us");
  });

  it("section has aria-labelledby pointing to get-involved-title", () => {
    render(<GetInvolvedSection />);
    const section = document.getElementById("get-involved");
    expect(section).toHaveAttribute("aria-labelledby", "get-involved-title");
  });

  it("section has brand-red background", () => {
    render(<GetInvolvedSection />);
    const section = document.getElementById("get-involved");
    expect(section).toHaveClass("bg-brand-red");
  });
});
