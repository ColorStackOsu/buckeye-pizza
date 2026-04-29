"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import SponsorScroller from "./SponsorScroller";
import gsap from "gsap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLSpanElement>(null);
  const colorstackRef = useRef<HTMLSpanElement>(null);
  const atOhioRef = useRef<HTMLSpanElement>(null);
  const atOhioHighlightRef = useRef<HTMLSpanElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Photo fades in with subtle scale settle
      tl.fromTo(
        photoRef.current,
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" },
        0,
      );

      // 2. Overlay fades in with photo
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.9 },
        0,
      );

      // 3. "Welcome to" fades up
      tl.fromTo(
        welcomeRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.4 },
        0.4,
      );

      // 4. "ColorStack" fades up
      tl.fromTo(
        colorstackRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.6,
      );

      // 5. "at Ohio State" — red box sweeps in, then text fades in on top
      tl.fromTo(
        atOhioHighlightRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.45,
          ease: "power3.inOut",
          transformOrigin: "left center",
        },
        0.8,
      );
      tl.fromTo(
        atOhioRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2 },
        1.1,
      );

      // 6. Subline fades up
      tl.fromTo(
        sublineRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4 },
        1.3,
      );

      // 7. CTA fades up
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4 },
        1.5,
      );

      // 8. Sponsor scroller slides up into frame
      tl.fromTo(
        scrollerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        1.6,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-title"
      className="relative min-h-screen overflow-hidden flex flex-col"
    >
      {/* ── Full-bleed background photo ── */}
      <div
        ref={photoRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <Image
          src="/images/hero-image.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
          draggable={false}
        />
      </div>

      {/* ── Light gradient overlay: cream/white on the left where text lives,
              fading to transparent on the right so the photo shows through ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          opacity: 0,
          background: `
            linear-gradient(
              to right,
              rgba(20, 20, 20, 0.62) 0%,
              rgba(20, 20, 20, 0.45) 40%,
              rgba(20, 20, 20, 0.15) 70%,
              rgba(20, 20, 20, 0.0) 100%
            ),
            linear-gradient(
              to top,
              rgba(20, 20, 20, 0.4) 0%,
              transparent 25%
            )
          `,
        }}
        aria-hidden="true"
      />

      {/* ── Atmospheric noise texture ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none hero-noise-overlay"
        aria-hidden="true"
      />

      {/* ── Text content — left-aligned, vertically centered ── */}
      <div className="relative z-20 flex-1 flex flex-col justify-center px-8 py-24 sm:px-12 lg:px-20 max-w-3xl pb-40">
        <h1 id="hero-title" className="text-left">
          {/* "Welcome to" — overline */}
          <span
            ref={welcomeRef}
            className="block font-body text-overline uppercase tracking-widest text-white/60 mb-3"
            style={{ opacity: 0 }}
          >
            Welcome to
          </span>

          {/* "ColorStack" — Syne bold, bright red with glow for dark bg */}
          <span
            ref={colorstackRef}
            className="block font-display font-bold text-hero leading-none tracking-tight text-white"
            style={{
              opacity: 0,
            }}
          >
            ColorStack
          </span>

          {/* "at Ohio State" — red highlight box sweeps in, then text appears */}
          <span className="block mt-1 relative">
            {/* Red highlight box — sweeps from left via scaleX */}
            <span
              ref={atOhioHighlightRef}
              className="absolute inset-y-0 left-0 right-0 bg-brand-red origin-left"
              style={{ transform: "scaleX(0)" }}
              aria-hidden="true"
            />
            {/* Text sits on top of the highlight */}
            <span
              ref={atOhioRef}
              className="relative font-display font-normal text-display text-white leading-tight tracking-tight px-2"
              style={{ opacity: 0 }}
            >
              at Ohio State
            </span>
          </span>
        </h1>

        {/* Mission subline */}
        <p
          ref={sublineRef}
          className="mt-6 font-body text-body text-white/80 max-w-sm leading-relaxed"
          style={{ opacity: 0 }}
        >
          Increasing the number of Black, Latinx, and Indigenous technologists
          who graduate and launch rewarding careers.
        </p>

        {/* CTA */}
        <div className="mt-8">
          <a
            ref={ctaRef}
            href="https://airtable.com/appwBXPiTFhfryfV0/shrvvknL6HRR8H2EZ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-red text-white px-7 py-3.5 rounded-lg font-body text-body font-semibold transition-colors duration-normal ease-out-quart hover:bg-brand-red-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
            aria-label="Become a ColorStack member - opens in new tab"
            style={{ opacity: 0 }}
          >
            Become a Member
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* ── Sponsor scroller — pinned to bottom of hero, always in frame ── */}
      <div
        ref={scrollerRef}
        className="absolute bottom-0 left-0 right-0 z-20"
        style={{ opacity: 0 }}
      >
        <p className="px-8 sm:px-12 lg:px-20 pt-4 pb-2 uppercase font-body text-overline tracking-widest text-brand-slate">
          Our Supporters
        </p>
        <SponsorScroller />
      </div>
    </section>
  );
}
