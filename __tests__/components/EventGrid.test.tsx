import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EventGrid from "@/components/events/EventGrid";

// Mock GSAP and ScrollTrigger — no DOM animations in unit tests
vi.mock("gsap", () => ({
  default: {
    registerPlugin: vi.fn(),
    matchMedia: vi.fn(() => ({
      add: vi.fn(),
      revert: vi.fn(),
    })),
    context: vi.fn(() => ({ revert: vi.fn() })),
    from: vi.fn(),
  },
}));
vi.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: {} }));

// Mock the drive-gallery module
vi.mock("@/lib/drive-gallery", () => ({
  fetchDriveFolderImages: vi.fn().mockResolvedValue([]),
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { fill, unoptimized, ...rest } = props;
    return <img {...rest} />;
  },
}));

// Mock the events data
vi.mock("@/data/events-data", () => ({
  eventsData: [
    {
      id: "event-1",
      name: "Event One",
      date: "January 1st, 2025",
      alt: "Event One Thumbnail",
      galleryTitle: "Event One - January 1st",
      driveFolderId: "folder1",
    },
    {
      id: "event-2",
      name: "Event Two",
      date: "February 2nd, 2025",
      alt: "Event Two Thumbnail",
      galleryTitle: "Event Two - February 2nd",
      driveFolderId: "folder2",
    },
    {
      id: "event-3",
      name: "Event Three",
      date: "March 3rd, 2025",
      alt: "Event Three Thumbnail",
      galleryTitle: "Event Three - March 3rd",
      driveFolderId: "folder3",
    },
  ],
}));

// Mock RevealAnimator to just render children — REMOVED (RevealAnimator deleted)

describe("EventGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the Recent Events heading", () => {
    render(<EventGrid />);

    expect(screen.getByText("Recent Events")).toBeInTheDocument();
  });

  it("renders all event cards from events data", () => {
    render(<EventGrid />);

    expect(screen.getByText("Event One")).toBeInTheDocument();
    expect(screen.getByText("Event Two")).toBeInTheDocument();
    expect(screen.getByText("Event Three")).toBeInTheDocument();
  });

  it("renders event dates", () => {
    render(<EventGrid />);

    expect(screen.getByText("January 1st, 2025")).toBeInTheDocument();
    expect(screen.getByText("February 2nd, 2025")).toBeInTheDocument();
    expect(screen.getByText("March 3rd, 2025")).toBeInTheDocument();
  });

  it("renders clickable event card buttons", () => {
    render(<EventGrid />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
  });

  it("has the section with correct id for navigation", () => {
    render(<EventGrid />);

    const section = document.getElementById("recent-events");
    expect(section).toBeInTheDocument();
  });
});
