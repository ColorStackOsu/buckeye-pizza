"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealAnimator from "@/components/RevealAnimator";

interface StatItem {
  value: string;
  label: string;
}

const redRibbonStats: StatItem[] = [
  { value: "54%", label: "First-Gen Students" },
  { value: "250+", label: "Registered Members" },
  { value: "49%", label: "Low-Income Students" },
];

const blackRibbonStats: StatItem[] = [
  { value: "30%", label: "Identify As Women" },
  { value: "25+", label: "2025 Offers Received" },
  { value: "10+", label: "Industry Partners" },
];

const mobileStats: StatItem[] = [
  { value: "54%", label: "First-Gen Students" },
  { value: "250+", label: "Registered Members" },
  { value: "25+", label: "2025 Offers Received" },
];

function ShapeDivider() {
  return (
    <div className="w-full">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="h-[60px] w-full"
      >
        <path
          d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
          style={{ fill: "#202020" }}
        />
      </svg>
    </div>
  );
}

function StatDivider() {
  return (
    <div
      className="hidden md:block h-[clamp(35px,5vw,60px)] w-px bg-white/30 self-center"
      aria-hidden="true"
    />
  );
}

export default function StatsSection() {
  const mobileStatsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const statElements = mobileStatsRef.current?.querySelectorAll(".sm-stat");
      if (!statElements) return;

      statElements.forEach((stat) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stat,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
            markers: false,
            toggleActions: "play reverse play reverse",
          },
        });

        tl.fromTo(
          stat,
          { scale: 0.9, opacity: 0.7 },
          { scale: 1.3, opacity: 1, ease: "power2.out" },
        );
      });
    }, mobileStatsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section aria-label="Impact statistics">
      {/* Desktop/Tablet Ribbon Layout (md+) */}
      <div className="hidden md:block overflow-hidden bg-bg-white">
        <ShapeDivider />

        {/* Red Ribbon */}
        <RevealAnimator variant="slide-left" delay={300}>
          <div className="py-4">
            <h3 className="py-3 ms-4 text-primary-red text-2xl lg:text-3xl font-semibold">
              Our Impact,
            </h3>

            <div
              className="flex items-center text-white w-full"
              aria-label="Impact statistics"
            >
              <div className="ribbon-red flex items-center w-[70%] min-h-[10rem] max-h-[11rem] bg-primary-red ps-2 md:ps-3 lg:ps-4 py-3 lg:py-4">
                <div className="flex gap-[clamp(0.75rem,2vw,1.75rem)]">
                  {redRibbonStats.map((stat, index) => (
                    <div
                      key={stat.label}
                      className="flex items-center gap-[clamp(0.75rem,2vw,1.75rem)]"
                    >
                      {index > 0 && <StatDivider />}
                      <div className="px-[clamp(5px,1.5vw,12px)] mx-[clamp(3px,1.2vw,8px)]">
                        <h2 className="text-[clamp(1.8rem,4vw,2.4rem)] mb-0 font-semibold">
                          {stat.value}
                        </h2>
                        <h5 className="text-[clamp(0.8rem,1.5vw,1rem)]">
                          {stat.label}
                        </h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Person icon */}
              <div className="ms-auto me-3 md:me-4 lg:me-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  className="text-primary-red text-[5rem] lg:text-[8rem] me-2 md:me-3 lg:me-4"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.854 1.5 1.5a.5.5 0 0 1-.708.708L13 11.707V14.5a.5.5 0 0 1-1 0v-2.793l-.646.647a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                </svg>
              </div>
            </div>
          </div>
        </RevealAnimator>

        {/* Black Ribbon */}
        <RevealAnimator variant="slide-right" delay={500}>
          <div className="py-4">
            <h3 className="py-3 me-4 flex text-2xl lg:text-3xl justify-end font-semibold">
              Through Numbers.
            </h3>

            <div
              className="flex items-center text-white w-full"
              aria-label="Additional impact statistics"
            >
              {/* Briefcase icon */}
              <div className="ms-4 md:ms-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  className="text-dark text-[5rem] lg:text-[8rem] me-0 md:me-4 lg:me-5"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5" />
                  <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85l-7.614 2.03a2.5 2.5 0 0 1-1.272 0L0 6.85z" />
                </svg>
              </div>

              <div className="ribbon-black flex items-center justify-end w-[70%] min-h-[10rem] max-h-[11rem] bg-dark ms-auto pe-3 lg:pe-5 py-4">
                <div className="flex gap-[clamp(0.75rem,2vw,1.75rem)]">
                  {blackRibbonStats.map((stat, index) => (
                    <div
                      key={stat.label}
                      className="flex items-center gap-[clamp(0.75rem,2vw,1.75rem)]"
                    >
                      {index > 0 && <StatDivider />}
                      <div className="px-[clamp(5px,1.5vw,12px)] mx-[clamp(3px,1.2vw,8px)]">
                        <h2 className="text-[clamp(1.8rem,4vw,2.4rem)] mb-0 font-semibold">
                          {stat.value}
                        </h2>
                        <h5 className="text-[clamp(0.8rem,1.5vw,1rem)]">
                          {stat.label}
                        </h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealAnimator>
      </div>

      {/* Mobile Stats Layout (below md) */}
      <div
        ref={mobileStatsRef}
        className="block md:hidden overflow-hidden bg-bg-white"
      >
        <ShapeDivider />

        <RevealAnimator variant="fade-up" className="text-center pb-4 pt-4">
          <div className="py-4">
            <h2 className="text-primary-red text-3xl font-semibold mb-0">
              Our Impact,
            </h2>
            <h3 className="text-xl font-semibold">Through Numbers.</h3>
          </div>
        </RevealAnimator>

        <div
          className="flex flex-col items-center overflow-hidden pb-8"
          role="list"
          aria-label="Impact statistics for mobile view"
        >
          {mobileStats.map((stat) => (
            <div
              key={stat.label}
              className="sm-stat my-4 text-center p-5 rounded-lg"
              style={{
                transformOrigin: "center center",
                willChange: "transform",
              }}
              role="listitem"
            >
              <h2 className="text-[5rem] font-medium text-dark mb-2">
                {stat.value}
              </h2>
              <h5 className="text-lg font-light text-dark">{stat.label}</h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
