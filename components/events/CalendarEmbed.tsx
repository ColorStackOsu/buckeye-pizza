"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CalendarEmbed() {
  const sectionHeaderRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        if (sectionHeaderRef.current) {
          gsap.from(sectionHeaderRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionHeaderRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });
        }
        if (iframeRef.current) {
          gsap.from(iframeRef.current, {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: iframeRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });
        }
      });
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="calendar"
      aria-labelledby="calendar-heading"
      className="calendar-gradient-overlay relative w-full overflow-hidden bg-brand-cream"
    >
      {/* Editorial section header */}
      <div
        ref={sectionHeaderRef}
        className="mx-auto max-w-7xl px-6 pt-12 pb-6 md:px-12"
      >
        <p className="font-display text-overline text-brand-red uppercase tracking-widest mb-2">
          Schedule
        </p>
        <h2
          id="calendar-heading"
          className="font-display text-heading text-brand-dark"
        >
          Event Calendar
        </h2>
      </div>

      {/* Calendar iframe */}
      <div ref={iframeRef} className="pb-12">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="border border-black/10 rounded-lg shadow-sm">
            <iframe
              src="https://embed.styledcalendar.com/#vJW8FFhYNPb9GISWWw71"
              title="Styled Calendar"
              className="w-full border-none block"
              style={{ border: "none", minHeight: "clamp(400px, 60vw, 700px)" }}
              data-cy="calendar-embed-iframe"
            />
          </div>
        </div>
      </div>

      {/* Styled Calendar parent-window script for iframe communication */}
      <Script
        src="https://embed.styledcalendar.com/assets/parent-window.js"
        strategy="lazyOnload"
      />
    </section>
  );
}
