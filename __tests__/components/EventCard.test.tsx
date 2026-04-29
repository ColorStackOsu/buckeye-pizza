import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EventCard from "@/components/events/EventCard";
import { EventItem } from "@/types/events";

// Mock the drive-gallery module
vi.mock("@/lib/drive-gallery", () => ({
  fetchDriveFolderImages: vi.fn(),
}));

// Mock next/image to render a standard img
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { fill, unoptimized, ...rest } = props;
    return (
      <img
        {...rest}
        data-fill={fill ? "true" : undefined}
        data-unoptimized={unoptimized ? "true" : undefined}
      />
    );
  },
}));

import { fetchDriveFolderImages } from "@/lib/drive-gallery";

const mockFetch = fetchDriveFolderImages as ReturnType<typeof vi.fn>;

const baseEvent: EventItem = {
  id: "test-event",
  name: "Test Event",
  date: "January 1st, 2025",
  alt: "Test Thumbnail",
  galleryTitle: "Test Event - January 1st",
  driveFolderId: "abc123",
};

describe("EventCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders event name and date", async () => {
    mockFetch.mockResolvedValue([
      {
        src: "https://drive.google.com/thumbnail?id=file1&sz=w400",
        full: "",
        alt: "img",
      },
    ]);

    render(<EventCard event={baseEvent} onSelect={vi.fn()} delay={100} />);

    expect(screen.getByText("Test Event")).toBeInTheDocument();
    expect(screen.getByText("January 1st, 2025")).toBeInTheDocument();
  });

  it("fetches thumbnail from Drive when driveFolderId is present", async () => {
    mockFetch.mockResolvedValue([
      {
        src: "https://drive.google.com/thumbnail?id=file1&sz=w400",
        full: "",
        alt: "img",
      },
    ]);

    render(<EventCard event={baseEvent} onSelect={vi.fn()} delay={100} />);

    await waitFor(() => {
      const img = screen.getByAltText("Test Thumbnail");
      expect(img).toHaveAttribute(
        "src",
        "https://drive.google.com/thumbnail?id=file1&sz=w400",
      );
    });

    expect(mockFetch).toHaveBeenCalledWith("abc123");
  });

  it("falls back to event.img when Drive fetch returns empty", async () => {
    mockFetch.mockResolvedValue([]);

    const eventWithImg: EventItem = { ...baseEvent, img: "/images/custom.jpg" };
    render(<EventCard event={eventWithImg} onSelect={vi.fn()} delay={100} />);

    await waitFor(() => {
      const img = screen.getByAltText("Test Thumbnail");
      expect(img).toHaveAttribute("src", "/images/custom.jpg");
    });
  });

  it("falls back to placeholder when Drive fetch fails and no img", async () => {
    mockFetch.mockRejectedValue(new Error("API error"));

    const eventNoImg: EventItem = { ...baseEvent, img: undefined };
    render(<EventCard event={eventNoImg} onSelect={vi.fn()} delay={100} />);

    await waitFor(() => {
      const img = screen.getByAltText("Test Thumbnail");
      expect(img).toHaveAttribute("src", "/images/placeholder-event.jpg");
    });
  });

  it("displays placeholder when no driveFolderId and no img", async () => {
    const eventNoDrive: EventItem = {
      ...baseEvent,
      driveFolderId: "",
      img: undefined,
    };

    render(<EventCard event={eventNoDrive} onSelect={vi.fn()} delay={100} />);

    await waitFor(() => {
      const img = screen.getByAltText("Test Thumbnail");
      expect(img).toHaveAttribute("src", "/images/placeholder-event.jpg");
    });
  });

  it("calls onSelect when clicked", async () => {
    mockFetch.mockResolvedValue([]);
    const onSelect = vi.fn();
    const user = userEvent.setup();

    render(<EventCard event={baseEvent} onSelect={onSelect} delay={100} />);

    const button = screen.getByRole("button", {
      name: /View Test Event gallery/i,
    });
    await user.click(button);

    expect(onSelect).toHaveBeenCalledWith(baseEvent);
  });

  it("renders as a button element for accessibility", () => {
    mockFetch.mockResolvedValue([]);

    render(<EventCard event={baseEvent} onSelect={vi.fn()} delay={100} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "View Test Event gallery");
  });

  it("shows loading skeleton before thumbnail loads", () => {
    // Never resolve the fetch
    mockFetch.mockReturnValue(new Promise(() => {}));

    render(<EventCard event={baseEvent} onSelect={vi.fn()} delay={100} />);

    // Should not have an img yet, but should have the loading skeleton
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
