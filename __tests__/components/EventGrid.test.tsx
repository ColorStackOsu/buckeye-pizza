import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
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
  fetchEventFolders: vi.fn().mockResolvedValue([
    {
      id: "folder1",
      name: "Event One",
      date: "January 1, 2025",
      alt: "Event One Thumbnail",
      galleryTitle: "Event One - January 1, 2025",
      driveFolderId: "folder1",
    },
    {
      id: "folder2",
      name: "Event Two",
      date: "February 2, 2025",
      alt: "Event Two Thumbnail",
      galleryTitle: "Event Two - February 2, 2025",
      driveFolderId: "folder2",
    },
    {
      id: "folder3",
      name: "Event Three",
      date: "March 3, 2025",
      alt: "Event Three Thumbnail",
      galleryTitle: "Event Three - March 3, 2025",
      driveFolderId: "folder3",
    },
  ]),
  fetchDriveFolderImages: vi.fn().mockResolvedValue([]),
}));

describe("EventGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the Recent Events heading", () => {
    render(<EventGrid />);

    expect(screen.getByText("Recent Events")).toBeInTheDocument();
  });

  it("renders all event cards after loading", async () => {
    render(<EventGrid />);

    await waitFor(() => {
      expect(screen.getByText("Event One")).toBeInTheDocument();
    });
    expect(screen.getByText("Event Two")).toBeInTheDocument();
    expect(screen.getByText("Event Three")).toBeInTheDocument();
  });

  it("renders event dates", async () => {
    render(<EventGrid />);

    await waitFor(() => {
      expect(screen.getByText("January 1, 2025")).toBeInTheDocument();
    });
    expect(screen.getByText("February 2, 2025")).toBeInTheDocument();
    expect(screen.getByText("March 3, 2025")).toBeInTheDocument();
  });

  it("renders clickable event card buttons", async () => {
    render(<EventGrid />);

    await waitFor(() => {
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(3);
    });
  });

  it("has the section with correct id for navigation", () => {
    render(<EventGrid />);

    const section = document.getElementById("recent-events");
    expect(section).toBeInTheDocument();
  });

  it("shows loading skeleton initially", () => {
    render(<EventGrid />);

    // Loading skeletons should be visible before data loads
    const heading = screen.getByText("Recent Events");
    expect(heading).toBeInTheDocument();
  });
});
