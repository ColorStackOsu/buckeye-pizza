"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { boardData } from "@/data/board-data";
import { BoardMember } from "@/types/board";
import YearSelector from "@/components/execboard/YearSelector";
import MemberGrid from "@/components/execboard/MemberGrid";
import MemberModal from "@/components/execboard/MemberModal";

export default function ExecBoardClient() {
  const years = Object.keys(boardData.boards).sort().reverse();
  const [activeYear, setActiveYear] = useState(years[0]);
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(
    null,
  );
  const gridWrapperRef = useRef<HTMLDivElement>(null);

  /* ── Hero animation refs ── */
  const overlineRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLHRElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  /* ── Hero entrance animation ── */
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
        );
    });
    return () => mm.revert();
  }, []);

  /* ── Year switch: fade-out → swap → fade-in ── */
  const handleYearChange = (year: string) => {
    if (year === activeYear) return;
    const el = gridWrapperRef.current;
    if (!el) {
      setActiveYear(year);
      return;
    }

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(el, {
        opacity: 0,
        y: 12,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setActiveYear(year);
          requestAnimationFrame(() => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
            );
          });
        },
      });
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      setActiveYear(year);
    });
  };

  const members = boardData.boards[activeYear]?.members ?? [];

  return (
    <main>
      {/* ── Editorial page hero ── */}
      <section
        aria-labelledby="execboard-hero-heading"
        className="relative overflow-hidden bg-brand-dark"
      >
        <div
          ref={bgRef}
          className="absolute inset-0 bg-brand-dark"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16 md:px-12 md:py-24">
          <p
            ref={overlineRef}
            className="font-display text-overline text-brand-red uppercase tracking-widest mb-4"
          >
            ColorStack at Ohio State
          </p>
          <div ref={titleRef} className="overflow-hidden">
            <h1
              id="execboard-hero-heading"
              className="font-display text-hero text-white leading-none"
            >
              Executive Board
            </h1>
          </div>
          <hr
            ref={ruleRef}
            className="mt-6 h-px border-none bg-brand-red w-24"
          />
          <p
            ref={subtitleRef}
            className="font-body text-brand-slate mt-4 text-subheading max-w-xl"
          >
            The people driving ColorStack at Ohio State. Click any member to
            learn about their background and book office hours to talk
            internships, offers, career paths, or anything in between.
          </p>
        </div>
      </section>

      {/* ── Content area ── */}
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-12">
        <div className="mb-10">
          <YearSelector
            years={years}
            activeYear={activeYear}
            onYearChange={handleYearChange}
          />
        </div>

        {/* Animated wrapper — modal lives OUTSIDE this so opacity doesn't affect it */}
        <div ref={gridWrapperRef}>
          <MemberGrid members={members} onSelect={setSelectedMember} />
        </div>
      </div>

      {/* Modal rendered at page root — unaffected by gridWrapper opacity animation */}
      <MemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </main>
  );
}
