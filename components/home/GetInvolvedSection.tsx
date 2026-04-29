import Link from "next/link";
import RevealAnimator from "@/components/RevealAnimator";

/* ── SVG Icons (inline since Bootstrap Icons CDN is not available) ── */

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
    >
      <path d="M1 2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1h1.5A1.5 1.5 0 0 1 16 4.5v7a1.5 1.5 0 0 1-1.5 1.5H14v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1H.5A.5.5 0 0 1 0 12.5v-7A.5.5 0 0 1 .5 5H2V2zm12 10h1.5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5H13v8zM2 6v7H.5a.5.5 0 0 1 0-1H1V6H.5a.5.5 0 0 1 0-1H2zm2-3v11h8V3H4zm2 1h4v2H6V4zm0 3h4v2H6V7zm0 3h4v2H6v-2z" />
    </svg>
  );
}

function PersonHeartIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4m13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276Z" />
    </svg>
  );
}

function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
    >
      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757ZM16 11.801V4.697l-5.803 3.546L16 11.801Z" />
    </svg>
  );
}

/* ── Card data ── */

interface InvolvedCard {
  icon: React.ReactNode;
  subtitle: string;
  title: string;
  href: string;
  external?: boolean;
  variant: "standard" | "red";
}

const cards: InvolvedCard[] = [
  {
    icon: <BuildingIcon className="text-3xl" />,
    subtitle: "Collaborate With Us",
    title: "Sponsorship",
    href: "/sponsors",
    variant: "standard",
  },
  {
    icon: <PersonHeartIcon className="text-3xl" />,
    subtitle: "Join Us",
    title: "Join The Community",
    href: "https://colorstackosu.slack.com/",
    external: true,
    variant: "red",
  },
  {
    icon: <EnvelopeIcon className="text-3xl" />,
    subtitle: "Get In Touch",
    title: "Contact Us",
    href: "/about#contact-us",
    variant: "standard",
  },
];

/* ── Component ── */

export default function GetInvolvedSection() {
  return (
    <section id="get-involved" aria-labelledby="get-involved-title">
      <div className="bg-bg-white px-4">
        {/* Section heading */}
        <RevealAnimator variant="fade-up">
          <div className="mx-2 md:mx-5 px-2 md:px-4 pt-5">
            <h3 className="px-2 font-semibold text-2xl" id="get-involved-title">
              Get Involved
            </h3>
            <hr
              className="divide-line-red w-1/2 ms-2 mt-2"
              aria-hidden="true"
            />
          </div>
        </RevealAnimator>

        {/* CTA Cards */}
        <RevealAnimator variant="fade-up">
          <div className="flex flex-wrap py-4 my-4 mx-4 justify-center">
            {/* ── Desktop / Tablet (md+): all 3 cards in a row ── */}

            {/* Sponsorship – md+ */}
            <div className="hidden md:flex w-4/12 mb-3 justify-center">
              <CardContent card={cards[0]} />
            </div>

            {/* Join The Community – md+ */}
            <div className="hidden md:flex w-4/12 mb-3 justify-center">
              <CardContent card={cards[1]} />
            </div>

            {/* Contact Us – md+ */}
            <div className="hidden md:flex w-4/12 mb-3 justify-center">
              <CardContent card={cards[2]} />
            </div>

            {/* ── Mobile (below md): reordered layout ── */}

            {/* Sponsorship – mobile */}
            <div className="flex md:hidden w-6/12 mb-3 justify-center">
              <CardContent card={cards[0]} />
            </div>

            {/* Contact Us – mobile (side by side with Sponsorship) */}
            <div className="flex md:hidden w-6/12 mb-3 justify-center">
              <CardContent card={cards[2]} />
            </div>

            {/* Join The Community – mobile (full width centered below) */}
            <div className="flex md:hidden w-10/12 mx-auto mb-3 justify-center">
              <CardContent card={cards[1]} />
            </div>
          </div>
        </RevealAnimator>
      </div>
    </section>
  );
}

/* ── Card rendering helper ── */

function CardContent({ card }: { card: InvolvedCard }) {
  const isRed = card.variant === "red";

  const cardClasses = [
    "flex flex-col shadow px-4 py-3 rounded-[20px] w-full max-w-[18rem] min-h-[8rem]",
    "transition-all duration-300 ease-in-out hover:-translate-y-[5px]",
    "no-underline",
    isRed
      ? "bg-primary-red text-white hover:bg-[#c81136]"
      : "bg-[#d3d3d3] text-black hover:bg-[#e2e1e1]",
  ].join(" ");

  if (card.external) {
    return (
      <a
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClasses}
        aria-labelledby={`${card.title.replace(/\s+/g, "-").toLowerCase()}-title`}
      >
        {card.icon}
        <p className={`opacity-75 mb-0 text-sm ${isRed ? "text-white" : ""}`}>
          {card.subtitle}
        </p>
        <h4
          id={`${card.title.replace(/\s+/g, "-").toLowerCase()}-title`}
          className="text-xl font-semibold"
        >
          {card.title}
        </h4>
      </a>
    );
  }

  return (
    <Link
      href={card.href}
      className={cardClasses}
      aria-labelledby={`${card.title.replace(/\s+/g, "-").toLowerCase()}-title`}
    >
      {card.icon}
      <p className={`opacity-75 mb-0 text-sm ${isRed ? "text-white" : ""}`}>
        {card.subtitle}
      </p>
      <h4
        id={`${card.title.replace(/\s+/g, "-").toLowerCase()}-title`}
        className="text-xl font-semibold"
      >
        {card.title}
      </h4>
    </Link>
  );
}
