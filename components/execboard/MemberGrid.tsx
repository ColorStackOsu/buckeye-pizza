"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BoardMember } from "@/types/board";
import MemberCard from "./MemberCard";

gsap.registerPlugin(ScrollTrigger);

interface MemberGridProps {
  members: BoardMember[];
  onSelect: (member: BoardMember) => void;
}

export default function MemberGrid({ members, onSelect }: MemberGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  /* ── Staggered card reveal on mount / members change ── */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.children) as HTMLElement[];
    if (!cards.length) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(cards, { opacity: 0, y: 24 });

      const st = ScrollTrigger.create({
        trigger: grid,
        start: "top 95%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.06,
          });
        },
      });

      ScrollTrigger.refresh();

      return () => {
        st.kill();
        gsap.set(cards, { clearProps: "all" });
      };
    });

    return () => mm.revert();
  }, [members]);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6"
    >
      {members.map((member, index) => (
        <MemberCard
          key={`${member.name}-${index}`}
          member={member}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
