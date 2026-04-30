"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function EventsHero() {
  const overlineRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLHRElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Background panel slides down from top
      tl.from(bgRef.current, {
        yPercent: -100,
        duration: 0.7,
        ease: "power4.out",
      })
        // Overline fades up
        .from(
          overlineRef.current,
          { opacity: 0, y: 12, duration: 0.45 },
          "-=0.2",
        )
        // Title clips up — each word staggers in
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 60,
            duration: 0.65,
            ease: "power4.out",
          },
          "-=0.15",
        )
        // Red rule expands from left
        .from(
          ruleRef.current,
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.55,
            ease: "power3.inOut",
          },
          "-=0.2",
        )
        // Subtitle fades up
        .from(
          subtitleRef.current,
          { opacity: 0, y: 10, duration: 0.4 },
          "-=0.25",
        );
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="relative overflow-hidden bg-brand-dark">
      {/* Animated background panel (for the slide-down reveal) */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-brand-dark"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        {/* Overline */}
        <p
          ref={overlineRef}
          className="font-display text-overline text-brand-red uppercase tracking-widest mb-4"
        >
          ColorStack at Ohio State
        </p>

        {/* Main title */}
        <div ref={titleRef} className="overflow-hidden">
          <h1 className="font-display text-hero text-white leading-none">
            Events
          </h1>
        </div>

        {/* Red rule */}
        <hr ref={ruleRef} className="mt-6 h-px border-none bg-brand-red w-24" />

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-brand-slate mt-4 text-subheading max-w-md"
        >
          Workshops, socials, and professional development — all in one place.
        </p>
      </div>
    </div>
  );
}
