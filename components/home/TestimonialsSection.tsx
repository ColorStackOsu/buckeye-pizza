"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Testimonial {
  name: string;
  year: string;
  title: string;
  quote: React.ReactNode;
  photo: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Arielle Barnes",
    year: "Sophomore",
    title: "Opening Doors",
    quote: (
      <>
        ColorStack@OSU has truly opened doors for me. Through the connections I
        made within the community, I was able to secure my{" "}
        <span className="font-semibold">
          upcoming Software Development Engineering internship with GoDaddy
        </span>{" "}
        and even landed an interview with Warner Bros., all because of the
        support and network ColorStack provides. It&rsquo;s not just a space for
        underrepresented students in tech; it&rsquo;s{" "}
        <span className="font-semibold">
          a launchpad for real opportunities
        </span>{" "}
        and a reminder that we deserve to take up space in this field. I&rsquo;m
        incredibly grateful to be part of such an empowering and uplifting
        community.
      </>
    ),
    photo: "/images/testimonial-photos/Arielle Barnes.jpeg",
  },
  {
    name: "Dan Flores",
    year: "Senior",
    title: "Community to Career",
    quote: (
      <>
        ColorStack has given me a supportive community of like-minded
        individuals dedicated to uplifting underrepresented groups and
        communities. Through ColorStack I&rsquo;ve{" "}
        <span className="font-semibold">
          built meaningful connections, gained mentorship, and strengthened my
          technical skills.
        </span>{" "}
        It has also provided access to career development opportunities and
        direct conversations with recruiters, which{" "}
        <span className="font-semibold">
          helped me secure my job after college.
        </span>{" "}
        Being part of ColorStack has not only helped me grow professionally but
        also connected me with amazing people who are passionate about making a
        difference.
      </>
    ),
    photo: "/images/testimonial-photos/Dan Flores.jpeg",
  },
  {
    name: "Berenice Araiza Sierra",
    year: "Freshman",
    title: "Supported Every Step",
    quote: (
      <>
        Through ColorStack, I met one of my closest friends and have fostered a
        sense of community with people who uplift each other in every sense. I
        have felt and had support through every step of my first year at OSU,
        and{" "}
        <span className="font-semibold">
          learned about opportunities I never would have otherwise
        </span>
        . Thanks to the mentorship and guidance I have received, I now have the
        opportunity to participate in{" "}
        <span className="font-semibold">PwC&rsquo;s Career Preview</span> this
        summer. I am truly grateful I decided to join this community.
      </>
    ),
    photo: "/images/testimonial-photos/Berenice.jpeg",
  },
  {
    name: "Valdez Kankeu",
    year: "Freshman",
    title: "Underdog to Big Tech",
    quote: (
      <>
        I arrived at OSU from an under-resourced high school lacking tech
        preparation. Through ColorStack&rsquo;s workshops and events,{" "}
        <span className="font-semibold">
          I gained the confidence and technical skills to compete for and secure
          a prestigious internship at GoDaddy.
        </span>{" "}
        ColorStack bridged the gap between my background and my potential.
      </>
    ),
    photo: "/images/testimonial-photos/Valdez Kankeu.png",
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);
  const totalTestimonials = testimonials.length;
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  // Ref so navigateTo always reads the latest index, not a stale closure
  const activeIndexRef = useRef(0);

  const navigateTo = (index: number) => {
    if (index === activeIndexRef.current) return;
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    setIsTransitioning(true);
    transitionTimeoutRef.current = setTimeout(() => {
      activeIndexRef.current = index;
      setDisplayIndex(index);
      setActiveIndex(index);
      setIsTransitioning(false);
      transitionTimeoutRef.current = null;
    }, 350);
  };

  const goToPrev = () => {
    const current = activeIndexRef.current;
    navigateTo(current === 0 ? totalTestimonials - 1 : current - 1);
  };

  const goToNext = () => {
    const current = activeIndexRef.current;
    navigateTo(current === totalTestimonials - 1 ? 0 : current + 1);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const current = testimonials[displayIndex];

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="testimonial-gradient-overlay py-space-section overflow-hidden"
    >
      {/* Section Title */}
      <div className="text-center mb-10 md:mb-14 px-4">
        <p className="font-body text-overline uppercase tracking-widest text-brand-red mb-3">
          Real people. Real outcomes.
        </p>
        <h2
          id="testimonials-title"
          className="font-display text-heading text-brand-dark"
        >
          Behind every number, <span className="text-brand-red">a story</span>
        </h2>
      </div>

      {/* ── DESKTOP / TABLET: Editorial spread layout ── */}
      <div
        className="hidden md:block relative z-10"
        role="region"
        aria-label="Testimonials carousel"
        aria-roledescription="carousel"
        aria-live="polite"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          {/* Spread container — crossfade + slide transition */}
          <div
            className="relative"
            style={{
              transition: "opacity 350ms ease, transform 350ms ease",
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? "translateX(12px)" : "translateX(0)",
              willChange: "opacity, transform",
            }}
            role="group"
            aria-roledescription="slide"
            aria-label={`Testimonial ${activeIndex + 1} of ${totalTestimonials}`}
          >
            <div className="flex items-stretch gap-0 rounded-2xl overflow-hidden shadow-sm bg-brand-cream min-h-[320px] lg:min-h-[360px]">
              {/* Photo column — 30% on tablet, 40% on desktop */}
              <div className="w-[30%] lg:w-[40%] relative flex-shrink-0 self-stretch">
                <Image
                  src={current.photo}
                  alt={`Photo of ${current.name}`}
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 40vw, 30vw"
                />
              </div>

              {/* Quote column — 70% on tablet, 60% on desktop */}
              <div className="w-[70%] lg:w-[60%] relative flex flex-col justify-center px-8 lg:px-12 py-8 lg:py-10 overflow-hidden">
                {/* Decorative oversized opening quotation mark */}
                <span
                  className="font-display absolute top-4 left-6 lg:left-10 select-none pointer-events-none"
                  aria-hidden="true"
                  style={{
                    fontSize: "8rem",
                    lineHeight: 1,
                    opacity: 0.12,
                    color: "var(--color-brand-red)",
                  }}
                >
                  &ldquo;
                </span>

                {/* Testimonial title */}
                <p className="font-display text-overline uppercase tracking-widest text-brand-red mb-3 relative z-10">
                  {current.title}
                </p>

                {/* Quote text */}
                <blockquote className="font-body text-body text-brand-dark leading-relaxed relative z-10 mb-6">
                  {current.quote}
                </blockquote>

                {/* Byline */}
                <div className="relative z-10 flex items-center gap-3">
                  <div
                    className="h-px w-8 bg-brand-red flex-shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-body font-semibold text-brand-dark text-body leading-tight">
                      {current.name}
                    </p>
                    <p className="font-display text-overline uppercase tracking-widest text-brand-red">
                      {current.year}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Prev arrow */}
            <button
              onClick={goToPrev}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red"
              aria-label="Previous testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
            </button>

            {/* Dot indicators */}
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Testimonial indicators"
            >
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => navigateTo(i)}
                  className={`rounded-full transition-all duration-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red ${
                    activeIndex === i
                      ? "w-6 h-2.5 bg-brand-red"
                      : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  role="tab"
                  aria-selected={activeIndex === i}
                  aria-current={activeIndex === i ? "true" : undefined}
                  aria-label={`Go to testimonial ${i + 1}: ${t.name}`}
                />
              ))}
            </div>

            {/* Next arrow */}
            <button
              onClick={goToNext}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red"
              aria-label="Next testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE: Stacked layout — all four testimonials ── */}
      <div className="block md:hidden px-4 relative z-10">
        <div className="flex flex-col gap-10">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="flex flex-col items-center">
              {/* Circular photo centered above */}
              <div className="relative w-24 h-24 rounded-full overflow-hidden mb-5 flex-shrink-0 shadow-sm">
                <Image
                  src={testimonial.photo}
                  alt={`Photo of ${testimonial.name}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              {/* Quote content below */}
              <div className="text-center max-w-sm">
                {/* Testimonial title */}
                <p className="font-display text-overline uppercase tracking-widest text-brand-red mb-2">
                  {testimonial.title}
                </p>

                {/* Quote text */}
                <blockquote className="font-body text-body text-brand-dark leading-relaxed mb-4">
                  {testimonial.quote}
                </blockquote>

                {/* Byline */}
                <p className="font-body font-semibold text-brand-dark text-body leading-tight">
                  {testimonial.name}
                </p>
                <p className="font-display text-overline uppercase tracking-widest text-brand-red">
                  {testimonial.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
