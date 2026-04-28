"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom hook that uses IntersectionObserver to detect when an element
 * enters the viewport. Returns a ref to attach to the target element
 * and a boolean indicating visibility.
 */
export function useReveal(threshold = 0.1): {
  ref: React.RefObject<HTMLDivElement>;
  isVisible: boolean;
} {
  const ref = useRef<HTMLDivElement>(null!);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Initial visibility check for elements already in view on mount
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, isVisible };
}
