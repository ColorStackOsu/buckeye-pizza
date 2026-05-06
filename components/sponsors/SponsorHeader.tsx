"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SponsorHeader() {
  const overlineRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLHRElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(bgRef.current, {
        yPercent: -100,
        duration: 0.7,
        ease: "power4.out",
      })
        .from(
          overlineRef.current,
          { opacity: 0, y: 12, duration: 0.45 },
          "-=0.2",
        )
        .from(
          titleRef.current,
          { opacity: 0, y: 60, duration: 0.65, ease: "power4.out" },
          "-=0.15",
        )
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
        .from(
          subtitleRef.current,
          { opacity: 0, y: 10, duration: 0.4 },
          "-=0.25",
        )
        .from(ctaRef.current, { opacity: 0, y: 10, duration: 0.35 }, "-=0.2");
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      aria-labelledby="sponsors-hero-heading"
      className="relative overflow-hidden bg-brand-dark"
    >
      {/* Animated background panel */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-brand-dark"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16 md:px-12 md:py-24">
        {/* Overline */}
        <p
          ref={overlineRef}
          className="font-display text-overline text-brand-red uppercase tracking-widest mb-4"
        >
          ColorStack at Ohio State
        </p>

        {/* Main title */}
        <div ref={titleRef} className="overflow-hidden">
          <h1
            id="sponsors-hero-heading"
            className="font-display text-hero text-white leading-none"
          >
            Sponsors
          </h1>
        </div>

        {/* Red rule */}
        <hr ref={ruleRef} className="mt-6 h-px border-none bg-brand-red w-24" />

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-brand-slate mt-4 text-subheading max-w-lg"
        >
          Industry leaders who share our vision of increasing diversity in tech,
          providing mentorship, resources, and opportunities to our members.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#sponsorForm"
            className="inline-block bg-brand-red hover:bg-brand-red-hover text-white px-8 py-3 rounded font-display text-overline uppercase tracking-widest transition-colors"
          >
            Become A Sponsor
          </a>
          <a
            href="/assets/Sponsorship Packet.pdf"
            className="font-body text-caption text-brand-slate hover:text-white transition-colors uppercase tracking-wide"
            aria-label="Download Sponsorship Packet (PDF)"
          >
            Sponsorship Packet ↗
          </a>
        </div>
      </div>
    </section>
  );
}
