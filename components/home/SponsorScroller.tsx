"use client";

import { useEffect, useRef } from "react";

const sponsorLogos = [
  {
    src: "/images/sponsor-logos/cardinal-health-logo.svg",
    alt: "Cardinal Health",
  },
  { src: "/images/sponsor-logos/CapitalOne.svg", alt: "Capital One" },
  { src: "/images/sponsor-logos/pinterest.svg", alt: "Pinterest" },
  {
    src: "/images/sponsor-logos/Mastercard.svg",
    alt: "Mastercard",
    className: "scale-[1.2]",
  },
  { src: "/images/sponsor-logos/GoDaddy.svg", alt: "GoDaddy" },
  { src: "/images/sponsor-logos/netflix.svg", alt: "Netflix" },
  { src: "/images/sponsor-logos/adobe.svg", alt: "Adobe" },
  { src: "/images/sponsor-logos/ADS.svg", alt: "ADS" },
  { src: "/images/sponsor-logos/PwC.svg", alt: "PwC", className: "scale-150" },
  {
    src: "/images/sponsor-logos/Progressive.svg",
    alt: "Progressive",
    className: "!h-auto w-[200px]",
  },
  { src: "/images/sponsor-logos/WillowTree.svg", alt: "WillowTree" },
];

// Normal speed in px/s; slow speed on hover
const SPEED_NORMAL = 60;
const SPEED_HOVER = 20;
// How fast speed transitions (px/s per second)
const SPEED_LERP = 4;

export default function SponsorScroller() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const speedRef = useRef(SPEED_NORMAL);
  const targetSpeedRef = useRef(SPEED_NORMAL);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Width of one logo set (half the track, since we duplicate)
    const getSetWidth = () => track.scrollWidth / 2;

    const tick = (now: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = now;
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1); // seconds, capped
      lastTimeRef.current = now;

      // Smoothly interpolate current speed toward target
      const current = speedRef.current;
      const target = targetSpeedRef.current;
      speedRef.current =
        current + (target - current) * Math.min(SPEED_LERP * dt, 1);

      posRef.current += speedRef.current * dt;

      const setWidth = getSetWidth();
      if (setWidth > 0 && posRef.current >= setWidth) {
        posRef.current -= setWidth;
      }

      track.style.transform = `translateX(${-posRef.current}px)`;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, []);

  const handleMouseEnter = () => {
    targetSpeedRef.current = SPEED_HOVER;
  };

  const handleMouseLeave = () => {
    targetSpeedRef.current = SPEED_NORMAL;
  };

  return (
    <div
      className="logos w-full max-w-full overflow-hidden bg-white py-[1.2rem] shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
      style={{ isolation: "isolate" }}
      aria-label="Sponsor logos scrolling display"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Single track div that we translate via JS */}
      <div
        ref={trackRef}
        className="will-change-transform"
        style={{ display: "flex", flexWrap: "nowrap", width: "max-content" }}
      >
        {/* Two copies for seamless loop */}
        {[0, 1].map((setIndex) => (
          <span
            key={setIndex}
            className="logos-slide flex-shrink-0 flex items-center"
            aria-hidden={setIndex === 1 ? "true" : undefined}
          >
            {sponsorLogos.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={setIndex === 0 ? logo.alt : ""}
                loading="eager"
                className={`flex-shrink-0 h-[1.7rem] mx-[1.3rem] ${logo.className ?? ""}`}
              />
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
