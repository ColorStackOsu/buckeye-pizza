"use client";

import { useEffect } from "react";
import AboutHero from "@/components/about/AboutHero";
import AboutUsSection from "@/components/about/AboutUsSection";
import ContactUsSection from "@/components/about/ContactUsSection";

export default function AboutClient() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#about-us" || hash === "#contact-us") {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
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
