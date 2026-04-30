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
  const bgClass = bgVariant === "lighter" ? "bg-brand-bg" : "bg-brand-cream";

  return (
    <section
      className={`${bgClass} py-16 md:py-20`}
      aria-labelledby={`tier-${tierName.toLowerCase()}-heading`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Tier label */}
        <div className="flex items-center gap-6 mb-10">
          <div className="shrink-0">
            <p className="font-display text-overline text-brand-red uppercase tracking-widest mb-1">
              Tier
            </p>
            <h2
              id={`tier-${tierName.toLowerCase()}-heading`}
              className="font-display text-heading text-brand-dark leading-none"
            >
              {tierName}
            </h2>
          </div>
          <hr
            className="flex-1 border-none h-px bg-black/10"
            aria-hidden="true"
          />
        </div>

        {/* Logo grid — consistent 3 columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sponsors.map((sponsor) => (
            <SponsorEntry key={sponsor.name} sponsor={sponsor} />
          ))}
        </div>
      </div>
    </section>
  );
}
