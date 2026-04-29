"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import SponsorScroller from "./SponsorScroller";
import gsap from "gsap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLSpanElement>(null);
  const colorstackRef = useRef<HTMLSpanElement>(null);
  const atOhioRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Photo clips in from left via clip-path reveal (0.8s)
      tl.fromTo(
        photoRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power3.inOut" },
        0,
      );

      // 2. "Welcome to" fades up (0.4s, 0.3s delay)
      tl.fromTo(
        welcomeRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.4 },
        0.3,
      );

      // 3. "ColorStack" slides in from right (0.6s, 0.5s delay)
      tl.fromTo(
        colorstackRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.6 },
        0.5,
      );

      // 4. "at Ohio State" fades up (0.4s, 0.7s delay)
      tl.fromTo(
        atOhioRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.4 },
        0.7,
      );

      // 5. CTA button scales in (0.3s, 1.0s delay)
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.3 },
        1.0,
      );

      // 6. Sponsor scroller fades in (0.4s, 1.2s delay)
      tl.fromTo(
        scrollerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        1.2,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-title"
      className="relative min-h-screen bg-brand-cream overflow-hidden flex flex-col"
    >
      {/* Atmospheric gradient mesh behind text area */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <div className="hero-gradient-mesh" />
        <div className="hero-noise-overlay" />
      </div>

      {/* ── Main content area: grows to fill viewport height ── */}
      <div className="relative z-10 flex-1 flex flex-col lg:block lg:min-h-[calc(100vh-80px)]">
        {/* Hero photo — mobile: full-width above text; desktop: absolute left at 55% */}
        <div
          ref={photoRef}
          className="relative w-full lg:absolute lg:left-0 lg:top-0 lg:bottom-0 lg:w-[55%]"
          style={{
            clipPath: "inset(0 100% 0 0)",
            /* Mobile height */
            height: undefined,
          }}
        >
          {/* Mobile sizing wrapper */}
          <div className="relative w-full h-[55vw] min-h-[240px] max-h-[400px] lg:hidden">
            <Image
              src="/images/hero_photo.jpg"
              alt="ColorStack community members gathered at an event"
              fill
              className="object-cover object-center"
              priority
              draggable={false}
            />
            {/* Mobile gradient fade at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-24"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, var(--color-brand-cream))",
              }}
              aria-hidden="true"
            />
          </div>

          {/* Desktop: fills the absolute container */}
          <div className="hidden lg:block absolute inset-0">
            <Image
              src="/images/hero_photo.jpg"
              alt="ColorStack community members gathered at an event"
              fill
              className="object-cover object-center"
              priority
              draggable={false}
            />
            {/* Desktop right-edge gradient blending into text area */}
            <div
              className="absolute top-0 right-0 bottom-0 w-40"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--color-brand-cream))",
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Text content — mobile: below photo; desktop: right side overlapping photo edge */}
        <div className="flex flex-col justify-center px-6 pt-6 pb-0 lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-[50%] lg:px-12 lg:py-20">
          <h1 id="hero-title" className="leading-tight text-left">
            {/* "Welcome to" — Source Serif 4 italic, subheading scale */}
            <span
              ref={welcomeRef}
              className="block font-body italic text-subheading text-brand-charcoal mb-1"
              style={{ opacity: 0 }}
            >
              Welcome to
            </span>

            {/* "ColorStack" — Syne, hero scale, brand red */}
            <span
              ref={colorstackRef}
              className="block font-display text-hero text-brand-red leading-none"
              style={{ opacity: 0 }}
            >
              ColorStack
            </span>

            {/* "at Ohio State" — Syne, display scale */}
            <span
              ref={atOhioRef}
              className="block font-display text-display text-brand-dark leading-tight"
              style={{ opacity: 0 }}
            >
              at Ohio State
            </span>
          </h1>

          {/* CTA button */}
          <div ref={ctaRef} className="mt-8" style={{ opacity: 0 }}>
            <a
              href="https://airtable.com/appwBXPiTFhfryfV0/shrvvknL6HRR8H2EZ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-red text-white px-6 py-3 rounded font-body text-body font-semibold transition-colors duration-normal ease-out-quart hover:bg-brand-red-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
              aria-label="Become a ColorStack member - opens in new tab"
            >
              Become a Member
            </a>
          </div>
        </div>
      </div>

      {/* Sponsor scroller — full-width at bottom of hero */}
      <div
        ref={scrollerRef}
        className="relative z-10 mt-auto"
        style={{ opacity: 0 }}
      >
        <p className="px-6 lg:px-12 pt-4 pb-2 uppercase font-body text-overline tracking-widest text-brand-slate">
          Our Supporters
        </p>
        <SponsorScroller />
      </div>
    </section>
  );
}
