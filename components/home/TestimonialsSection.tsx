"use client";

import { useState } from "react";
import Image from "next/image";
import RevealAnimator from "@/components/RevealAnimator";

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
        &ldquo;ColorStack@OSU has truly opened doors for me. Through the
        connections I made within the community, I was able to secure my{" "}
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
        community.&rdquo;
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
        &ldquo;ColorStack has given me a supportive community of like-minded
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
        difference.&rdquo;
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
        &ldquo;Through ColorStack, I met one of my closest friends and have
        fostered a sense of community with people who uplift each other in every
        sense. I have felt and had support through every step of my first year
        at OSU, and{" "}
        <span className="font-semibold">
          learned about opportunities I never would have otherwise
        </span>
        . Thanks to the mentorship and guidance I have received, I now have the
        opportunity to participate in{" "}
        <span className="font-semibold">PwC&rsquo;s Career Preview</span> this
        summer. I am truly grateful I decided to join this community.&rdquo;
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
        &ldquo;I arrived at OSU from an under-resourced high school lacking tech
        preparation. Through ColorStack&rsquo;s workshops and events,{" "}
        <span className="font-semibold">
          I gained the confidence and technical skills to compete for and secure
          a prestigious internship at GoDaddy.
        </span>{" "}
        ColorStack bridged the gap between my background and my
        potential.&rdquo;
      </>
    ),
    photo: "/images/testimonial-photos/Valdez Kankeu.png",
  },
];

function QuoteIcon() {
  return (
    <span className="text-primary-red text-3xl leading-none" aria-hidden="true">
      &#10077;
    </span>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm py-3 px-4 mb-3">
      <h4 className="font-semibold text-lg">
        <QuoteIcon /> {testimonial.title}
      </h4>
      <p className="text-sm mt-2 leading-relaxed">{testimonial.quote}</p>
    </div>
  );
}

interface StudentInfoProps {
  testimonial: Testimonial;
  align?: "left" | "right";
}

function StudentInfo({ testimonial, align = "left" }: StudentInfoProps) {
  return (
    <div
      className={`flex items-center gap-2 ${align === "right" ? "flex-row-reverse ml-auto" : ""}`}
    >
      <Image
        src={testimonial.photo}
        alt=""
        aria-hidden="true"
        width={56}
        height={56}
        className="rounded-full w-14 h-14 object-cover"
      />
      <div className={align === "right" ? "text-right" : ""}>
        <h4 className="font-semibold text-base mb-0">{testimonial.name}</h4>
        <p className="text-primary-red uppercase font-semibold text-sm">
          {testimonial.year}
        </p>
      </div>
    </div>
  );
}

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
          style={{ fill: "#f2f2f2" }}
        />
      </svg>
    </div>
  );
}

export default function TestimonialsSection() {
  const [slideIndex, setSlideIndex] = useState(0);
  const totalPages = 2;

  const goToPrev = () => {
    setSlideIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const goToNext = () => {
    setSlideIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  // Carousel pages: page 0 = testimonials 0,1; page 1 = testimonials 2,3
  const carouselPages = [
    [testimonials[0], testimonials[1]],
    [testimonials[2], testimonials[3]],
  ];

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="testimonial-gradient-overlay"
    >
      <ShapeDivider />

      {/* Section Title */}
      <RevealAnimator
        variant="scale-forward"
        className="text-center pt-5 pb-5 md:pb-3 mt-4"
      >
        <h2 className="mb-0 font-semibold text-3xl" id="testimonials-title">
          Voices Of
        </h2>
        <h3 className="text-primary-red text-2xl font-semibold">ColorStack</h3>
      </RevealAnimator>

      {/* Small Viewport: stacked cards, testimonials 1 and 2 only */}
      <div className="block md:hidden relative pb-5 mx-auto">
        <div className="flex flex-col mx-auto justify-center px-4">
          {/* Card 1 - photo on left */}
          <RevealAnimator variant="fade-up">
            <div className="flex flex-col mb-3">
              <TestimonialCard testimonial={testimonials[0]} />
              <StudentInfo testimonial={testimonials[0]} align="left" />
            </div>
          </RevealAnimator>

          {/* Card 2 - photo on right */}
          <RevealAnimator variant="fade-up">
            <div className="flex flex-col">
              <TestimonialCard testimonial={testimonials[1]} />
              <StudentInfo testimonial={testimonials[1]} align="right" />
            </div>
          </RevealAnimator>
        </div>
      </div>

      {/* Medium Viewport: horizontal row, 3 cards */}
      <div className="hidden md:block lg:hidden relative pb-5">
        <RevealAnimator variant="fade-up" className="px-4">
          <div className="flex gap-4">
            {[testimonials[0], testimonials[1], testimonials[3]].map(
              (testimonial) => (
                <div key={testimonial.name} className="flex flex-col flex-1">
                  <TestimonialCard testimonial={testimonial} />
                  <StudentInfo testimonial={testimonial} align="left" />
                </div>
              ),
            )}
          </div>
        </RevealAnimator>
      </div>

      {/* Large Viewport: Paginated Carousel */}
      <div className="hidden lg:block py-4 my-4 relative">
        <RevealAnimator variant="scale-forward">
          <div
            aria-label="Testimonials carousel"
            aria-roledescription="carousel"
          >
            {/* Carousel Content */}
            <div className="overflow-hidden">
              {carouselPages.map((page, pageIndex) => (
                <div
                  key={pageIndex}
                  className={`${slideIndex === pageIndex ? "block" : "hidden"}`}
                  role="tabpanel"
                  aria-label={`Slide ${pageIndex + 1} of ${totalPages}`}
                >
                  <div className="flex justify-center gap-5 pb-5 mb-3">
                    {page.map((testimonial) => (
                      <div
                        key={testimonial.name}
                        className="flex flex-col max-w-md"
                      >
                        <TestimonialCard testimonial={testimonial} />
                        <StudentInfo testimonial={testimonial} align="left" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow transition-colors"
              aria-label="Previous slide"
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

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow transition-colors"
              aria-label="Next slide"
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

            {/* Dot Indicators */}
            <div
              className="flex justify-center gap-2 mt-2"
              role="tablist"
              aria-label="Carousel page indicators"
            >
              {carouselPages.map((_, pageIndex) => (
                <button
                  key={pageIndex}
                  onClick={() => setSlideIndex(pageIndex)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    slideIndex === pageIndex
                      ? "bg-primary-red"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  role="tab"
                  aria-selected={slideIndex === pageIndex}
                  aria-label={`Go to slide ${pageIndex + 1}`}
                />
              ))}
            </div>
          </div>
        </RevealAnimator>
      </div>
    </section>
  );
}
