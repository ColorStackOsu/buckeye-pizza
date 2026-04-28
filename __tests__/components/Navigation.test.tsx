import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Navigation from "@/components/Navigation";

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

describe("Navigation", () => {
  it("renders the ColorStack logo linking to home", () => {
    render(<Navigation />);
    const logoLink = screen.getByLabelText("ColorStackOSU Home");
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute("href", "/");

    const logo = screen.getByAltText("ColorStackOSU Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/images/Logo Horizontal.png");
  });

  it("renders all page navigation links", () => {
    render(<Navigation />);
    const eventsLinks = screen.getAllByText("Events");
    expect(eventsLinks.length).toBeGreaterThanOrEqual(1);

    const sponsorsLinks = screen.getAllByText("Sponsors");
    expect(sponsorsLinks.length).toBeGreaterThanOrEqual(1);

    const meetUsLinks = screen.getAllByText("Meet Us");
    expect(meetUsLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("renders Events link with correct href", () => {
    render(<Navigation />);
    const eventsLinks = screen.getAllByText("Events");
    const eventsLink = eventsLinks.find(
      (el) => el.closest("a")?.getAttribute("href") === "/events",
    );
    expect(eventsLink).toBeDefined();
  });

  it("renders Sponsors link with correct href", () => {
    render(<Navigation />);
    const sponsorsLinks = screen.getAllByText("Sponsors");
    const sponsorsLink = sponsorsLinks.find(
      (el) => el.closest("a")?.getAttribute("href") === "/sponsors",
    );
    expect(sponsorsLink).toBeDefined();
  });

  it("renders Meet Us link with correct href", () => {
    render(<Navigation />);
    const meetUsLinks = screen.getAllByText("Meet Us");
    const meetUsLink = meetUsLinks.find(
      (el) => el.closest("a")?.getAttribute("href") === "/execboard",
    );
    expect(meetUsLink).toBeDefined();
  });

  it("renders About Us dropdown buttons", () => {
    render(<Navigation />);
    const aboutButtons = screen.getAllByText("About Us");
    expect(aboutButtons.length).toBeGreaterThanOrEqual(1);
  });

  it("shows dropdown sub-links when About Us is clicked", () => {
    render(<Navigation />);
    const aboutButtons = screen.getAllByRole("button", { name: /About Us/i });
    fireEvent.click(aboutButtons[0]);

    // Both desktop and mobile dropdowns share state, so use getAllByText
    const aboutLinks = screen.getAllByText("About");
    expect(aboutLinks.length).toBeGreaterThanOrEqual(1);
    expect(aboutLinks[0].closest("a")).toHaveAttribute(
      "href",
      "/about#about-us",
    );

    const contactLinks = screen.getAllByText("Contact Us");
    expect(contactLinks.length).toBeGreaterThanOrEqual(1);
    expect(contactLinks[0].closest("a")).toHaveAttribute(
      "href",
      "/about#contact-us",
    );

    const testBankLinks = screen.getAllByText("Test Bank");
    expect(testBankLinks.length).toBeGreaterThanOrEqual(1);
    const testBankAnchor = testBankLinks[0].closest("a");
    expect(testBankAnchor).toHaveAttribute(
      "href",
      "https://color-stack-test-bank.vercel.app/",
    );
    expect(testBankAnchor).toHaveAttribute("target", "_blank");
    expect(testBankAnchor).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("toggles mobile menu when hamburger button is clicked", () => {
    render(<Navigation />);
    const toggleButton = screen.getByLabelText("Toggle navigation");
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  });

  it("has sticky positioning", () => {
    render(<Navigation />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("sticky", "top-0");
  });

  it("uses Next.js Link for internal navigation", () => {
    render(<Navigation />);
    const eventsLinks = screen.getAllByText("Events");
    const eventsAnchor = eventsLinks[0].closest("a");
    expect(eventsAnchor).toHaveAttribute("href", "/events");
  });

  it("closes dropdown when clicking outside", () => {
    render(<Navigation />);
    const aboutButtons = screen.getAllByRole("button", { name: /About Us/i });
    fireEvent.click(aboutButtons[0]);

    // Dropdown should be open - use getAllByText since both desktop and mobile render
    const aboutLinks = screen.getAllByText("About");
    expect(aboutLinks.length).toBeGreaterThanOrEqual(1);

    // Click outside
    fireEvent.mouseDown(document.body);

    // Dropdown should be closed - no submenu should be present
    expect(screen.queryByLabelText("About Us submenu")).not.toBeInTheDocument();
  });
});
