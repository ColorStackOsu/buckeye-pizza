"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Arrow icon ── */
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

/* ── Action link data ── */
interface Action {
  label: string;
  sublabel: string;
  href: string;
  external?: boolean;
  primary?: boolean;
}

const actions: Action[] = [
  {
    label: "Join The Community",
    sublabel: "Slack · Open to all OSU students",
    href: "https://colorstackosu.slack.com/",
    external: true,
    primary: true,
  },
  {
    label: "Become a Sponsor",
    sublabel: "Partner with us",
    href: "/sponsors",
  },
  {
    label: "Contact Us",
    sublabel: "Get in touch",
    href: "/about#contact-us",
  },
];

/* ── Component ── */
export default function GetInvolvedSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        if (headingRef.current) {
          gsap.from(headingRef.current, {
            opacity: 0,
            y: 40,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }
        if (actionsRef.current) {
          gsap.from(actionsRef.current, {
            opacity: 0,
            y: 40,
            duration: 0.7,
            delay: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: actionsRef.current,
              start: "top 85%",
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
      id="get-involved"
      aria-labelledby="get-involved-title"
      className="bg-brand-red"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-20">
          {/* ── Left: heading ── */}
          <div ref={headingRef} className="lg:max-w-sm xl:max-w-md">
            <p className="font-body text-overline uppercase tracking-widest text-white/60 mb-4">
              Your turn
            </p>
            <h2
              id="get-involved-title"
              className="font-display font-semibold text-white leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Ready to be part of something bigger?
            </h2>
          </div>

          {/* ── Right: stacked action links ── */}
          <div
            ref={actionsRef}
            className="flex flex-col divide-y divide-white/20 lg:min-w-[380px] xl:min-w-[440px]"
          >
            {actions.map((action) => {
              const inner = (
                <span className="flex items-center justify-between gap-6 py-5 group">
                  <span className="flex flex-col gap-0.5">
                    <span
                      className={[
                        "font-display font-semibold leading-tight transition-colors duration-200",
                        action.primary
                          ? "text-white text-2xl md:text-3xl"
                          : "text-white/80 group-hover:text-white text-xl md:text-2xl",
                      ].join(" ")}
                    >
                      {action.label}
                    </span>
                    <span className="font-body text-sm text-white/50 group-hover:text-white/70 transition-colors duration-200">
                      {action.sublabel}
                    </span>
                  </span>
                  <ArrowRight
                    className={[
                      "flex-shrink-0 text-2xl transition-all duration-300 group-hover:translate-x-1",
                      action.primary
                        ? "text-white/70 group-hover:text-white"
                        : "text-white/30 group-hover:text-white/70",
                    ].join(" ")}
                  />
                </span>
              );

              if (action.external) {
                return (
                  <a
                    key={action.label}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-red rounded-sm"
                    aria-label={`${action.label} — opens in new tab`}
                  >
                    {inner}
                  </a>
                );
              }

              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="block no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-red rounded-sm"
                >
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
