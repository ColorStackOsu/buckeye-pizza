import { Sponsor } from "@/types/sponsors";

interface SponsorEntryProps {
  sponsor: Sponsor;
}

export default function SponsorEntry({ sponsor }: SponsorEntryProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white border border-black/8 px-8 py-10 transition-shadow duration-200 hover:shadow-md">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/${sponsor.logo}`}
        alt={`${sponsor.name} logo`}
        className="max-h-12 w-auto max-w-[140px]"
      />
      <p className="font-display text-overline text-brand-slate uppercase tracking-widest text-center">
        {sponsor.name}
      </p>
    </div>
  );
}
