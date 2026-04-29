import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MissionSection from "@/components/home/MissionSection";

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

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

describe("MissionSection", () => {
  // Requirement 5.1: THE Site SHALL display the mission statement with the
  // section heading using the Display_Font
  it("renders the section with aria-labelledby pointing to mission-title", () => {
    render(<MissionSection />);
    const section = document.getElementById("our-mission");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("aria-labelledby", "mission-title");
  });

  it("renders the mission heading with id=mission-title", () => {
    render(<MissionSection />);
    const heading = document.getElementById("mission-title");
    expect(heading).toBeInTheDocument();
  });

  it("applies font-display class to the mission heading", () => {
    render(<MissionSection />);
    const heading = document.getElementById("mission-title");
    expect(heading).toHaveClass("font-display");
  });

  it("applies text-display scale to the mission heading", () => {
    render(<MissionSection />);
    const heading = document.getElementById("mission-title");
    expect(heading).toHaveClass("text-display");
  });

  // Requirement 5.2: THE Site SHALL present the three program pillars
  // (Workshops, Professional Development, Community) with their images
  // and descriptions
  it('renders the "Workshops" pillar title', () => {
    render(<MissionSection />);
    expect(
      screen.getByRole("heading", { name: "Workshops" }),
    ).toBeInTheDocument();
  });

  it('renders the "Professional Development" pillar title', () => {
    render(<MissionSection />);
    expect(
      screen.getByRole("heading", { name: "Professional Development" }),
    ).toBeInTheDocument();
  });

  it('renders the "Community" pillar title', () => {
    render(<MissionSection />);
    expect(
      screen.getByRole("heading", { name: "Community" }),
    ).toBeInTheDocument();
  });

  it("renders all three pillar images with alt text", () => {
    render(<MissionSection />);
    expect(
      screen.getByAltText("Students participating in a ColorStack workshop"),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(
        "Professional development session with industry representatives",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("ColorStack community members socializing"),
    ).toBeInTheDocument();
  });

  it("renders descriptions for all three pillars", () => {
    render(<MissionSection />);
    // Workshops description
    expect(
      screen.getByText(/interactive workshops aimed at boosting/i),
    ).toBeInTheDocument();
    // Professional Development description
    expect(
      screen.getByText(/elevate your career with our professional/i),
    ).toBeInTheDocument();
    // Community description
    expect(
      screen.getByText(/supportive and inclusive community/i),
    ).toBeInTheDocument();
  });

  it("applies font-display class to pillar card titles", () => {
    render(<MissionSection />);
    const workshopsHeading = screen.getByRole("heading", {
      name: "Workshops",
    });
    expect(workshopsHeading).toHaveClass("font-display");
  });

  it("applies font-body class to pillar card descriptions", () => {
    render(<MissionSection />);
    const description = screen.getByText(
      /interactive workshops aimed at boosting/i,
    );
    expect(description).toHaveClass("font-body");
  });

  // Requirement 5.5: THE Site SHALL maintain the dark background with light
  // text for the mission area to preserve brand contrast
  it("applies dark background class to the section", () => {
    render(<MissionSection />);
    const section = document.getElementById("our-mission");
    expect(section).toHaveClass("bg-brand-dark");
  });

  // Requirement 5.6: THE Site SHALL include the "Learn More" link directing
  // to the About page
  it('renders the "Learn More" link', () => {
    render(<MissionSection />);
    const learnMoreLink = screen.getByRole("link", { name: /learn more/i });
    expect(learnMoreLink).toBeInTheDocument();
  });

  it('"Learn More" link points to the About page', () => {
    render(<MissionSection />);
    const learnMoreLink = screen.getByRole("link", { name: /learn more/i });
    expect(learnMoreLink).toHaveAttribute("href", "/about#about-us");
  });

  // Desktop grid layout — first card spans 2 columns
  it("first pillar card wrapper has lg:col-span-2 class for desktop grid", () => {
    render(<MissionSection />);
    // The RevealAnimator mock passes className through; the first card's
    // RevealAnimator receives className="lg:col-span-2"
    const colSpanEl = document.querySelector(".lg\\:col-span-2");
    expect(colSpanEl).toBeInTheDocument();
  });

  // Accessibility — aria-labelledby on pillar articles
  it("each pillar card article has aria-labelledby pointing to its heading", () => {
    render(<MissionSection />);
    const articles = screen.getAllByRole("article");
    expect(articles).toHaveLength(3);
    articles.forEach((article) => {
      const labelId = article.getAttribute("aria-labelledby");
      expect(labelId).toBeTruthy();
      const labelEl = document.getElementById(labelId!);
      expect(labelEl).toBeInTheDocument();
    });
  });
});
