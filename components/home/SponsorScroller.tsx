"use client";

const sponsorLogos = [
  {
    src: "/images/sponsor-logos/cardinal-health-logo.svg",
    alt: "Cardinal Health",
  },
  { src: "/images/sponsor-logos/CapitalOne.svg", alt: "Capital One" },
  { src: "/images/sponsor-logos/pinterest.svg", alt: "Pinterest" },
  {
    src: "/images/sponsor-logos/Mastercard.svg",
    alt: "Mastercard",
    className: "scale-[1.2]",
  },
  { src: "/images/sponsor-logos/GoDaddy.svg", alt: "GoDaddy" },
  { src: "/images/sponsor-logos/netflix.svg", alt: "Netflix" },
  { src: "/images/sponsor-logos/adobe.svg", alt: "Adobe" },
  { src: "/images/sponsor-logos/ADS.svg", alt: "ADS" },
  { src: "/images/sponsor-logos/PwC.svg", alt: "PwC", className: "scale-150" },
  {
    src: "/images/sponsor-logos/Progressive.svg",
    alt: "Progressive",
    className: "!h-auto w-[200px]",
  },
  { src: "/images/sponsor-logos/WillowTree.svg", alt: "WillowTree" },
];

function LogoSet() {
  return (
    <div
      className="logos-slide inline-block animate-slide will-change-transform"
      aria-hidden="true"
    >
      {sponsorLogos.map((logo) => (
        <img
          key={logo.alt}
          src={logo.src}
          alt={logo.alt}
          loading="eager"
          className={`inline-block h-[1.7rem] mx-[1.3rem] ${logo.className ?? ""}`}
        />
      ))}
    </div>
  );
}

export default function SponsorScroller() {
  return (
    <div
      className="logos overflow-hidden whitespace-nowrap bg-white py-[1.2rem] px-[1.2rem] shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
      aria-label="Sponsor logos scrolling display"
    >
      <LogoSet />
      <LogoSet />
    </div>
  );
}
