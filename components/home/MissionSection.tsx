"use client";

import Image from "next/image";
import Link from "next/link";
import RevealAnimator from "@/components/RevealAnimator";

interface MissionCard {
  title: string;
  image: string;
  alt: string;
  description: string;
}

const missionCards: MissionCard[] = [
  {
    title: "Workshops",
    image: "/images/body_photo_1.jpg",
    alt: "Students participating in a ColorStack workshop",
    description:
      "Join us for interactive workshops aimed at boosting your technical skills and career readiness. From LeetCode sessions to resume-building workshops, we provide practical experiences to help you excel in the tech industry.",
  },
  {
    title: "Professional Development",
    image: "/images/body_photo_2.jpg",
    alt: "Professional development session with industry representatives",
    description:
      "Elevate your career with our professional development programs. We offer networking opportunities, and career guidance to help you navigate the tech landscape and achieve your professional goals.",
  },
  {
    title: "Community",
    image: "/images/body_photo_3.jpg",
    alt: "ColorStack community members socializing",
    description:
      "Be part of a supportive and inclusive community. At ColorStack, we foster connections, share resources, and celebrate each other's successes. Together, we build a stronger, more diverse tech ecosystem.",
  },
];

/**
 * Reveal variants for each card:
 *  - Card 0 (large, col-span-2): slides from left
 *  - Card 1 (top-right stack):   slides from right
 *  - Card 2 (bottom-right stack): slides from bottom (fade-up)
 */
const cardRevealVariants = ["slide-left", "slide-right", "fade-up"] as const;

export default function MissionSection() {
  return (
    <section
      id="our-mission"
      className="bg-brand-dark py-16 lg:py-24 overflow-hidden"
      aria-labelledby="mission-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Pull-Quote Mission Statement ── */}
        <RevealAnimator variant="fade-up">
          <div className="text-center mb-12 lg:mb-16">
            {/* Top red rule */}
            <hr
              className="divide-line-red-center w-1/2 mx-auto mb-6"
              aria-hidden="true"
            />

            <h2
              id="mission-title"
              className="font-display text-display text-white leading-tight tracking-tight px-4 lg:px-16 xl:px-24"
            >
              As one of the largest public universities in the nation, we
              leverage OSU&apos;s vast resources and connections to create{" "}
              <span className="text-brand-red">meaningful change</span> in tech
              diversity.
            </h2>

            {/* Bottom red rule */}
            <hr
              className="divide-line-red-center w-1/2 mx-auto mt-6 mb-8"
              aria-hidden="true"
            />

            <Link
              href="/about#about-us"
              className="inline-block font-body text-white border border-white/40 px-6 py-3 rounded-sm hover:bg-white hover:text-brand-dark transition-colors duration-normal"
              aria-label="Learn more about ColorStack at Ohio State"
            >
              Learn More
            </Link>
          </div>
        </RevealAnimator>

        {/* ── Program Pillar Cards ── */}
        {/*
          Desktop (lg+): CSS Grid with 3 columns.
            - Card 0 spans 2 columns (large feature card)
            - Cards 1 & 2 stack in the 3rd column
          Mobile/Tablet: single column, full-width cards
        */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5"
          aria-label="Program pillars"
        >
          {/* Card 0 — large, spans 2 columns, slides from left */}
          <RevealAnimator
            variant={cardRevealVariants[0]}
            className="lg:col-span-2"
          >
            <PillarCard card={missionCards[0]} tall />
          </RevealAnimator>

          {/* Cards 1 & 2 — stack in the 3rd column */}
          <div className="flex flex-col gap-4 lg:gap-5">
            {/* Card 1 — slides from right */}
            <RevealAnimator variant={cardRevealVariants[1]} delay={200}>
              <PillarCard card={missionCards[1]} />
            </RevealAnimator>

            {/* Card 2 — slides from bottom (fade-up) */}
            <RevealAnimator variant={cardRevealVariants[2]} delay={300}>
              <PillarCard card={missionCards[2]} />
            </RevealAnimator>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Individual photo-background pillar card */
function PillarCard({
  card,
  tall = false,
}: {
  card: MissionCard;
  tall?: boolean;
}) {
  return (
    <article
      className={`relative overflow-hidden rounded-sm group ${
        tall
          ? "min-h-[420px] lg:min-h-[520px]"
          : "min-h-[240px] lg:min-h-[248px]"
      }`}
      aria-labelledby={`pillar-title-${card.title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {/* Background photo */}
      <Image
        src={card.image}
        alt={card.alt}
        fill
        className="object-cover transition-transform duration-slow group-hover:scale-105"
        sizes="(max-width: 992px) 100vw, (max-width: 1280px) 66vw, 800px"
        loading="lazy"
      />

      {/* Dark gradient overlay — covers bottom 70% of card for legible text */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/60 to-black/90"
        aria-hidden="true"
      />

      {/* Text content — anchored to bottom */}
      <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6 z-10">
        <h3
          id={`pillar-title-${card.title.toLowerCase().replace(/\s+/g, "-")}`}
          className="font-display text-white text-heading leading-tight mb-2"
        >
          {card.title}
        </h3>
        <p className="font-body text-white text-caption leading-relaxed">
          {card.description}
        </p>
      </div>
    </article>
  );
}
