"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "54%", label: "First-Gen Students" },
  { value: "250+", label: "Registered Members" },
  { value: "49%", label: "Low-Income Students" },
  { value: "30%", label: "Identify As Women" },
  { value: "25+", label: "2025 Offers Received" },
  { value: "10+", label: "Industry Partners" },
];

/**
 * Parse a stat value string into its numeric part and suffix.
 * e.g. "54%" → { num: 54, suffix: "%" }
 *      "250+" → { num: 250, suffix: "+" }
 *      "10+"  → { num: 10, suffix: "+" }
 */
function parseStatValue(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseFloat(match[1]), suffix: match[2] };
}

export default function StatsSection() {
  // One ref per stat cell — used to update the DOM text during count-up
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      stats.forEach((stat, index) => {
        const el = valueRefs.current[index];
        if (!el) return;

        const { num, suffix } = parseStatValue(stat.value);
        const obj = { val: 0 };

        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: num,
              duration: 1.6,
              delay: (index % 3) * 0.1 + Math.floor(index / 3) * 0.1,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = Math.round(obj.val) + suffix;
              },
              onComplete: () => {
                // Ensure final value is exact
                el.textContent = stat.value;
              },
            });
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section aria-label="Impact statistics">
      {/*
        3×2 grid on desktop (lg+), 2-column on mobile.
        Checkerboard: even index → bg-brand-light / text-brand-red
                      odd index  → bg-brand-dark  / text-white
      */}
      <div className="grid grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => {
          const isEven = index % 2 === 0;
          const bgClass = isEven ? "bg-brand-light" : "bg-brand-dark";
          const textClass = isEven ? "text-brand-red" : "text-white";
          const labelClass = isEven ? "text-brand-dark" : "text-white/70";

          return (
            <div
              key={stat.label}
              className={`${bgClass} flex flex-col items-center justify-center px-6 py-12 lg:py-16`}
            >
              {/* Stat value — count-up target */}
              <span
                ref={(el) => {
                  valueRefs.current[index] = el;
                }}
                className={`font-display text-display lg:text-hero ${textClass} leading-none tracking-tight`}
                aria-label={stat.value}
                role="text"
              >
                {stat.value}
              </span>

              {/* Label */}
              <span
                className={`font-body text-caption ${labelClass} mt-3 text-center uppercase tracking-widest`}
                aria-hidden="true"
              >
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
