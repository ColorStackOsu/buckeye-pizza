import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Footer from "@/components/Footer";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe("Footer", () => {
  it("renders the ColorStack logo linking to home", () => {
    render(<Footer />);
    const logoLink = screen.getByLabelText("ColorStackOSU Home");
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute("href", "/");

    const logo = screen.getByAltText("ColorStackOSU Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/images/Logo Horizontal.png");
  });

  it("renders all page navigation links", () => {
    render(<Footer />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Events")).toBeInTheDocument();
    expect(screen.getByText("Sponsors")).toBeInTheDocument();
    expect(screen.getByText("Meet Us")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
  });

  it("renders page links with correct hrefs", () => {
    render(<Footer />);
    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Events").closest("a")).toHaveAttribute(
      "href",
      "/events",
    );
    expect(screen.getByText("Sponsors").closest("a")).toHaveAttribute(
      "href",
      "/sponsors",
    );
    expect(screen.getByText("Meet Us").closest("a")).toHaveAttribute(
      "href",
      "/execboard",
    );
    expect(screen.getByText("About Us").closest("a")).toHaveAttribute(
      "href",
      "/about",
    );
  });

  it("renders Home link with md:hidden class for mobile-only visibility", () => {
    render(<Footer />);
    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveClass("md:hidden");
  });

  it("renders all four social media buttons", () => {
    render(<Footer />);
    expect(screen.getByLabelText("Email us")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Instagram - opens in new tab"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("LinkedIn - opens in new tab"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Slack - opens in new tab"),
    ).toBeInTheDocument();
  });

  it("renders social media links with correct hrefs", () => {
    render(<Footer />);
    expect(screen.getByLabelText("Email us")).toHaveAttribute(
      "href",
      "mailto:colorstackosu@gmail.com",
    );
    expect(
      screen.getByLabelText("Instagram - opens in new tab"),
    ).toHaveAttribute("href", "https://www.instagram.com/colorstackosu/");
    expect(
      screen.getByLabelText("LinkedIn - opens in new tab"),
    ).toHaveAttribute(
      "href",
      "https://www.linkedin.com/company/colorstack-osu/",
    );
    expect(screen.getByLabelText("Slack - opens in new tab")).toHaveAttribute(
      "href",
      "https://colorstackosu.slack.com/",
    );
  });

  it("opens external social links in new tab with noopener noreferrer", () => {
    render(<Footer />);
    const instagram = screen.getByLabelText("Instagram - opens in new tab");
    expect(instagram).toHaveAttribute("target", "_blank");
    expect(instagram).toHaveAttribute("rel", "noopener noreferrer");

    const linkedin = screen.getByLabelText("LinkedIn - opens in new tab");
    expect(linkedin).toHaveAttribute("target", "_blank");
    expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");

    const slack = screen.getByLabelText("Slack - opens in new tab");
    expect(slack).toHaveAttribute("target", "_blank");
    expect(slack).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not open email link in new tab", () => {
    render(<Footer />);
    const email = screen.getByLabelText("Email us");
    expect(email).not.toHaveAttribute("target");
  });

  it("renders the dynamic copyright year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(
        `© ${currentYear} ColorStack Ohio State. All Rights Reserved.`,
      ),
    ).toBeInTheDocument();
  });

  it("has contentinfo role on footer element", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("renders footer navigation with proper aria-label", () => {
    render(<Footer />);
    const nav = screen.getByLabelText("Footer navigation");
    expect(nav).toBeInTheDocument();
  });

  it("applies footer-nav-link class to navigation links", () => {
    render(<Footer />);
    const eventsLink = screen.getByText("Events").closest("a");
    expect(eventsLink).toHaveClass("footer-nav-link");
  });
});
