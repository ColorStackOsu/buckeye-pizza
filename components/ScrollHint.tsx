"use client";

import { useEffect, useState } from "react";

/**
 * Global fixed scroll hint — centered at the bottom of the viewport.
 * Appears after a short delay on page load, disappears when the user
 * scrolls past 80px, reappears when they scroll back to the top.
 */
export default function ScrollHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Appear after hero animation settles
    const timer = setTimeout(() => {
      if (window.scrollY < 80) setVisible(true);
    }, 1800);

    const onScroll = () => {
      const scrolled = window.scrollY >= 80;
      setVisible(!scrolled);
      // Drive sponsor logo color via body attribute
      document.body.dataset.scrolled = String(scrolled);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-28 left-1/2 -translate-x-1/2 z-[999] flex flex-col items-center gap-1.5 pointer-events-none transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <span className="font-body text-overline uppercase tracking-widest text-white/60 drop-shadow-sm">
        Scroll
      </span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="scroll-hint-arrow drop-shadow-sm"
      >
        <path
          d="M8 3v10M3 8l5 5 5-5"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
