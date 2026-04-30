import { Sponsor } from "@/types/sponsors";

interface SponsorEntryProps {
  sponsor: Sponsor;
}

export default function SponsorEntry({ sponsor }: SponsorEntryProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 py-4 my-5 items-center">
      {/* Logo */}
      <div className="lg:w-3/12 md:w-3/12 w-8/12 lg:ml-[16.666%] md:ml-[16.666%] flex justify-center mb-3 md:mb-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/${sponsor.logo}`}
          alt={`${sponsor.name} logo`}
          className="max-h-40 w-auto"
        />
      </div>

      {/* Blurb */}
      <div className="lg:w-6/12 md:w-6/12 w-full mx-auto px-4 md:px-0">
        <p className="text-sm leading-relaxed w-[80%] mx-auto md:mx-0">
          {sponsor.blurb}
        </p>
      </div>
    </div>
  );
}
