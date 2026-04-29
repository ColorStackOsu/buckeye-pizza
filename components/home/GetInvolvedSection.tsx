"use client";

import Link from "next/link";
import { useRef, useCallback } from "react";
import RevealAnimator from "@/components/RevealAnimator";

/* ── SVG Icons (inline since Bootstrap Icons CDN is not available) ── */

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
    >
      <path d="M1 2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1h1.5A1.5 1.5 0 0 1 16 4.5v7a1.5 1.5 0 0 1-1.5 1.5H14v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1H.5A.5.5 0 0 1 0 12.5v-7A.5.5 0 0 1 .5 5H2V2zm12 10h1.5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5H13v8zM2 6v7H.5a.5.5 0 0 1 0-1H1V6H.5a.5.5 0 0 1 0-1H2zm2-3v11h8V3H4zm2 1h4v2H6V4zm0 3h4v2H6V7zm0 3h4v2H6v-2z" />
    </svg>
  );
}

function PersonHeartIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4m13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276Z" />
    </svg>
  );
}

function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
    >
      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757ZM16 11.801V4.697l-5.803 3.546L16 11.801Z" />
    </svg>
  );
}

/* ── Card data ── */

interface InvolvedCard {
  icon: React.ReactNode;
  subtitle: string;
  title: string;
  href: string;
  external?: boolean;
  variant: "standard" | "red";
  /** Whether this card is the elevated center card on desktop */
  primary?: boolean;
}

const cards: InvolvedCard[] = [
  {
    icon: <BuildingIcon className="text-4xl" />,
    subtitle: "Collaborate With Us",
    title: "Sponsorship",
    href: "/sponsors",
    variant: "standard",
  },
  {
    icon: <PersonHeartIcon className="text-4xl" />,
    subtitle: "Join Us",
    title: "Join The Community",
    href: "https://colorstackosu.slack.com/",
    external: true,
    variant: "red",
    primary: true,
  },
  {
    icon: <EnvelopeIcon className="text-4xl" />,
    subtitle: "Get In Touch",
    title: "Contact Us",
    href: "/about#contact-us",
    variant: "standard",
  },
];

/* ── Component ── */

export default function GetInvolvedSection() {
  return (
    <section id="get-involved" aria-labelledby="get-involved-title">
      <div className="bg-brand-bg px-6 md:px-12 py-16 md:py-24">
        {/* Section heading */}
        <RevealAnimator variant="fade-up">
          <div className="max-w-6xl mx-auto mb-12">
            <p className="font-body text-overline uppercase tracking-widest text-brand-red mb-3">
              Your turn
            </p>
            <h3
              className="font-display font-semibold text-3xl md:text-heading"
              id="get-involved-title"
            >
              Ready to be part of something bigger?
            </h3>
            <hr className="divide-line-red w-24 mt-3" aria-hidden="true" />
          </div>
        </RevealAnimator>

        {/* CTA Cards — asymmetric triptych */}
        <RevealAnimator variant="fade-up">
          {/* Desktop (lg+): three cards in a row, center elevated */}
          <div className="hidden lg:flex items-end justify-center gap-8 max-w-6xl mx-auto pb-8">
            {/* Flanking card — Sponsorship */}
            <div className="flex-1 max-w-sm">
              <TiltCard card={cards[0]} />
            </div>

            {/* Center card — Join The Community (elevated + scaled) */}
            <div className="flex-1 max-w-md -translate-y-4 scale-105">
              <TiltCard card={cards[1]} />
            </div>

            {/* Flanking card — Contact Us */}
            <div className="flex-1 max-w-sm">
              <TiltCard card={cards[2]} />
            </div>
          </div>

          {/* Mobile / Tablet (below lg): stacked layout */}
          <div className="flex lg:hidden flex-col items-center gap-5 max-w-lg mx-auto">
            {/* Join The Community — primary, full width, on top */}
            <div className="w-full">
              <TiltCard card={cards[1]} />
            </div>

            {/* Sponsorship + Contact Us side by side */}
            <div className="flex w-full gap-4">
              <div className="flex-1">
                <TiltCard card={cards[0]} />
              </div>
              <div className="flex-1">
                <TiltCard card={cards[2]} />
              </div>
            </div>
          </div>
        </RevealAnimator>
      </div>
    </section>
  );
}

/* ── Tilt card with JS mousemove perspective effect ── */

function TiltCard({ card }: { card: InvolvedCard }) {
  const cardRef = useRef<HTMLElement | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    // Max tilt of ±8 degrees
    const rotateY = ((x - cx) / cx) * 8;
    const rotateX = -((y - cy) / cy) * 8;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "";
  }, []);

  const isRed = card.variant === "red";

  const cardClasses = [
    "flex flex-col shadow-lg px-8 py-8 rounded-2xl w-full min-h-[14rem]",
    "perspective-card no-underline",
    "focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2",
    isRed
      ? "bg-brand-red text-white hover:bg-brand-red-hover"
      : "bg-white text-black hover:bg-brand-light border border-black/8",
  ].join(" ");

  const titleId = `${card.title.replace(/\s+/g, "-").toLowerCase()}-title`;

  const content = (
    <>
      {card.icon}
      <p
        className={`font-body italic opacity-70 mb-0 text-sm mt-4 ${
          isRed ? "text-white" : "text-brand-slate"
        }`}
      >
        {card.subtitle}
      </p>
      <h4 id={titleId} className="font-display text-2xl font-semibold mt-2">
        {card.title}
      </h4>
    </>
  );

  if (card.external) {
    return (
      <a
        ref={cardRef as React.Ref<HTMLAnchorElement>}
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClasses}
        aria-labelledby={titleId}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      ref={cardRef as React.Ref<HTMLAnchorElement>}
      href={card.href}
      className={cardClasses}
      aria-labelledby={titleId}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {content}
    </Link>
  );
}
