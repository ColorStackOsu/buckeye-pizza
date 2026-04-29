"use client";

import Image from "next/image";
import SponsorScroller from "./SponsorScroller";

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="hero-gradient-overlay"
    >
      <div className="bg-[#efefef] relative">
        <div className="flex flex-wrap">
          {/* Left spacer column - visible on lg only */}
          <div className="hidden lg:block lg:w-1/12 relative px-0">
            <div className="absolute w-full bottom-0 left-0" />
          </div>

          {/* Hero image column - visible on lg only */}
          <div className="hidden lg:block lg:w-5/12 p-0">
            <div className="overflow-hidden relative">
              <Image
                src="/images/hero_photo.jpg"
                alt="ColorStack community members gathered at an event"
                width={800}
                height={750}
                className="h-[750px] w-full object-cover"
                priority
                draggable={false}
              />
            </div>
          </div>

          {/* Content column */}
          <div className="w-full lg:w-6/12 pt-5 pb-0 px-0 relative">
            <div className="pb-4 my-auto mx-4 md:mx-5 text-left w-[65%]">
              <h1
                className="text-[2.5rem] font-normal pt-2 pb-0"
                id="hero-title"
              >
                <span className="typewriter-line animate-typing-1">
                  Welcome to
                </span>
                <span className="typewriter-line animate-typing-2">
                  <span className="text-primary-red font-semibold">
                    ColorStack
                  </span>
                </span>
                <span className="typewriter-line animate-typing-3">
                  at Ohio State
                  <span
                    className="animate-cursor-blink text-black font-extralight"
                    aria-hidden="true"
                  >
                    |
                  </span>
                </span>
              </h1>

              <p>&nbsp;</p>

              <div className="my-1">
                <a
                  href="https://airtable.com/appwBXPiTFhfryfV0/shrvvknL6HRR8H2EZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-primary-red text-white px-3 py-2 rounded hover:bg-hover-red transition-colors"
                  aria-label="Become a ColorStack member - opens in new tab"
                >
                  Become a Member
                </a>
              </div>
            </div>

            <div className="py-4">
              <h6 className="mx-4 md:mx-5 py-2 uppercase font-light text-[0.8rem]">
                Our Supporters
              </h6>

              <SponsorScroller />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
