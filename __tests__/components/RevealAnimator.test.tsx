import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import RevealAnimator from "@/components/RevealAnimator";

// Mock IntersectionObserver
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();
const mockDisconnect = vi.fn();

let intersectionCallback: IntersectionObserverCallback;

beforeEach(() => {
  vi.clearAllMocks();

  // Default: element is NOT in viewport on mount
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
    top: 1000,
    bottom: 1100,
    left: 0,
    right: 100,
    width: 100,
    height: 100,
    x: 0,
    y: 1000,
    toJSON: () => {},
  });

  global.IntersectionObserver = vi.fn((callback) => {
    intersectionCallback = callback;
    return {
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
      root: null,
      rootMargin: "",
      thresholds: [],
      takeRecords: () => [],
    };
  });
});

describe("RevealAnimator", () => {
  it("renders children", () => {
    render(
      <RevealAnimator>
        <p>Hello World</p>
      </RevealAnimator>,
    );
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("applies the default fade-up variant class", () => {
    render(
      <RevealAnimator>
        <p>Content</p>
      </RevealAnimator>,
    );
    const wrapper = screen.getByText("Content").parentElement!;
    expect(wrapper.className).toContain("reveal");
    expect(wrapper.className).not.toContain("reveal-forward");
    expect(wrapper.className).not.toContain("reveal-left");
    expect(wrapper.className).not.toContain("reveal-right");
  });

  it("applies the scale-forward variant class", () => {
    render(
      <RevealAnimator variant="scale-forward">
        <p>Content</p>
      </RevealAnimator>,
    );
    const wrapper = screen.getByText("Content").parentElement!;
    expect(wrapper.className).toContain("reveal-forward");
  });

  it("applies the slide-left variant class", () => {
    render(
      <RevealAnimator variant="slide-left">
        <p>Content</p>
      </RevealAnimator>,
    );
    const wrapper = screen.getByText("Content").parentElement!;
    expect(wrapper.className).toContain("reveal-left");
  });

  it("applies the slide-right variant class", () => {
    render(
      <RevealAnimator variant="slide-right">
        <p>Content</p>
      </RevealAnimator>,
    );
    const wrapper = screen.getByText("Content").parentElement!;
    expect(wrapper.className).toContain("reveal-right");
  });

  it("applies delay class when delay prop is provided", () => {
    render(
      <RevealAnimator delay={300}>
        <p>Content</p>
      </RevealAnimator>,
    );
    const wrapper = screen.getByText("Content").parentElement!;
    expect(wrapper.className).toContain("delay-300");
  });

  it("does not apply delay class when no delay prop", () => {
    render(
      <RevealAnimator>
        <p>Content</p>
      </RevealAnimator>,
    );
    const wrapper = screen.getByText("Content").parentElement!;
    expect(wrapper.className).not.toMatch(/delay-/);
  });

  it("applies custom className", () => {
    render(
      <RevealAnimator className="my-custom-class">
        <p>Content</p>
      </RevealAnimator>,
    );
    const wrapper = screen.getByText("Content").parentElement!;
    expect(wrapper.className).toContain("my-custom-class");
  });

  it("does not have active class initially when element is out of viewport", () => {
    render(
      <RevealAnimator>
        <p>Content</p>
      </RevealAnimator>,
    );
    const wrapper = screen.getByText("Content").parentElement!;
    expect(wrapper.className).not.toContain("active");
  });

  it("adds active class when element is already in viewport on mount", () => {
    // Override to simulate element already in viewport
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      top: 100,
      bottom: 200,
      left: 0,
      right: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 100,
      toJSON: () => {},
    });

    render(
      <RevealAnimator>
        <p>Content</p>
      </RevealAnimator>,
    );
    const wrapper = screen.getByText("Content").parentElement!;
    expect(wrapper.className).toContain("active");
  });

  it("sets up IntersectionObserver when element is not in viewport", () => {
    render(
      <RevealAnimator>
        <p>Content</p>
      </RevealAnimator>,
    );
    expect(mockObserve).toHaveBeenCalled();
  });

  it("adds active class when IntersectionObserver fires", () => {
    render(
      <RevealAnimator>
        <p>Content</p>
      </RevealAnimator>,
    );

    const wrapper = screen.getByText("Content").parentElement!;
    expect(wrapper.className).not.toContain("active");

    // Simulate intersection wrapped in act to flush state updates
    act(() => {
      intersectionCallback(
        [
          {
            isIntersecting: true,
            target: wrapper,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
    });

    expect(wrapper.className).toContain("active");
  });

  it("supports all delay values", () => {
    const delays = [100, 200, 300, 400, 500] as const;
    for (const delay of delays) {
      const { unmount } = render(
        <RevealAnimator delay={delay}>
          <p>Content {delay}</p>
        </RevealAnimator>,
      );
      const wrapper = screen.getByText(`Content ${delay}`).parentElement!;
      expect(wrapper.className).toContain(`delay-${delay}`);
      unmount();
    }
  });
});
