import type { Metadata } from "next";
import SponsorHeader from "@/components/sponsors/SponsorHeader";
import SponsorTier from "@/components/sponsors/SponsorTier";
import SponsorForm from "@/components/sponsors/SponsorForm";
import { sponsorTiers } from "@/data/sponsors-data";

export const metadata: Metadata = {
  openGraph: {
    title: "Sponsors - ColorStack at Ohio State",
    description:
      "Meet the industry partners who support ColorStack at The Ohio State University. Learn about sponsorship opportunities.",
    images: ["/images/Logo.png"],
    url: "https://colorstackosu.org/sponsors",
  },
};

export default function SponsorsPage() {
  return (
    <>
      <SponsorHeader />
      {sponsorTiers.map((tier, index) => (
        <SponsorTier
          key={tier.tierName}
          tierName={tier.tierName}
          sponsors={tier.sponsors}
          bgVariant={index % 2 === 0 ? "lighter" : "light"}
        />
      ))}
      <SponsorForm />
    </>
  );
}
