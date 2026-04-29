import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import MissionSection from "@/components/home/MissionSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import GetInvolvedSection from "@/components/home/GetInvolvedSection";

export const metadata: Metadata = {
  openGraph: {
    title: "ColorStack at Ohio State",
    description:
      "Increasing the number of Black, Latinx, and Indigenous technologists who graduate and launch rewarding technical careers.",
    images: ["/images/Logo.png"],
    url: "https://colorstackosu.org",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <StatsSection />
      <TestimonialsSection />
      <GetInvolvedSection />
    </>
  );
}
