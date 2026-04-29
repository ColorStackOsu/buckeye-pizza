import RevealAnimator from "@/components/RevealAnimator";
import SponsorEntry from "@/components/sponsors/SponsorEntry";
import { Sponsor } from "@/types/sponsors";

interface SponsorTierProps {
  tierName: string;
  sponsors: Sponsor[];
  bgVariant: "light" | "lighter";
}

export default function SponsorTier({
  tierName,
  sponsors,
  bgVariant,
}: SponsorTierProps) {
  const bgClass = bgVariant === "lighter" ? "bg-light-gray" : "bg-bg-white";

  return (
    <div className={`${bgClass} py-4`}>
      {/* Tier heading */}
      <RevealAnimator variant="fade-up">
        <div className="mx-2 md:mx-5 px-2 md:px-4 pt-5">
          <h3 className="px-2 text-xl font-semibold">{tierName} Sponsors</h3>
          <hr className="divide-line-red w-1/2 ms-2 mt-2" aria-hidden="true" />
        </div>
      </RevealAnimator>

      {/* Sponsor entries */}
      {sponsors.map((sponsor) => (
        <SponsorEntry key={sponsor.name} sponsor={sponsor} />
      ))}
    </div>
  );
}
