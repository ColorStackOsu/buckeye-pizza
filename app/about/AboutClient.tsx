"use client";

import { useEffect } from "react";
import AboutHero from "@/components/about/AboutHero";
import AboutUsSection from "@/components/about/AboutUsSection";
import ContactUsSection from "@/components/about/ContactUsSection";

export default function AboutClient() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#about-us" || hash === "#contact-us") {
      // Prevent the browser from restoring the hash-scroll position
      // so we can control the scroll ourselves.
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }

      // Jump to top immediately so the hero is visible on arrival,
      // then smoothly scroll to the target section after the hero
      // entrance animation has had a moment to play.
      window.scrollTo({ top: 0, behavior: "instant" });

      const target = document.querySelector(hash);
      if (target) {
        const timer = setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 2600);
        return () => {
          clearTimeout(timer);
          // Restore default scroll restoration when leaving the page
          if ("scrollRestoration" in history) {
            history.scrollRestoration = "auto";
          }
        };
      }
    }
  }, []);

  return (
    <>
      <AboutHero />
      <AboutUsSection />
      <ContactUsSection />
    </>
  );
}
