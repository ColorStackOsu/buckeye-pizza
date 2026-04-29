import Image from "next/image";
import Link from "next/link";
import RevealAnimator from "@/components/RevealAnimator";

interface MissionCard {
  title: string;
  image: string;
  alt: string;
  description: string;
}

const missionCards: MissionCard[] = [
  {
    title: "Workshops",
    image: "/images/body_photo_1.jpg",
    alt: "Students participating in a ColorStack workshop",
    description:
      "Join us for interactive workshops aimed at boosting your technical skills and career readiness. From LeetCode sessions to resume-building workshops, we provide practical experiences to help you excel in the tech industry.",
  },
  {
    title: "Professional Development",
    image: "/images/body_photo_2.jpg",
    alt: "Professional development session with industry representatives",
    description:
      "Elevate your career with our professional development programs. We offer networking opportunities, and career guidance to help you navigate the tech landscape and achieve your professional goals.",
  },
  {
    title: "Community",
    image: "/images/body_photo_3.jpg",
    alt: "ColorStack community members socializing",
    description:
      "Be part of a supportive and inclusive community. At ColorStack, we foster connections, share resources, and celebrate each other's successes. Together, we build a stronger, more diverse tech ecosystem.",
  },
];

export default function MissionSection() {
  return (
    <section
      id="our-mission"
      className="bg-dark"
      aria-labelledby="mission-title"
    >
      <div className="px-4">
        {/* Mission Statement */}
        <div className="flex flex-wrap pb-2 md:pb-10">
          <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto">
            <RevealAnimator variant="fade-up">
              <div className="text-center text-white py-5 my-4 mx-auto">
                <h2 className="py-3 text-3xl font-semibold" id="mission-title">
                  Our Mission.
                </h2>
                <hr
                  className="divide-line-main w-3/4 mx-auto"
                  aria-hidden="true"
                />
                <h4 className="py-3 text-lg font-normal leading-relaxed">
                  As one of the largest public universities in the nation{" "}
                  <span
                    className="text-primary-red text-2xl align-middle"
                    aria-hidden="true"
                  >
                    🎓
                  </span>{" "}
                  , we leverage OSU&apos;s vast resources and connections to
                  create meaningful change{" "}
                  <span
                    className="text-primary-red text-2xl align-middle"
                    aria-hidden="true"
                  >
                    📈
                  </span>{" "}
                  in tech diversity.
                </h4>
                <Link
                  href="/about#about-us"
                  className="inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </RevealAnimator>
          </div>
        </div>

        {/* Mission Cards */}
        <div className="flex flex-wrap gap-y-4 md:gap-4 px-2 pb-10 justify-center">
          {missionCards.map((card, index) => (
            <div
              key={card.title}
              className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-1rem)] flex justify-center my-2"
            >
              <RevealAnimator
                variant={index % 2 === 0 ? "slide-left" : "slide-right"}
                delay={((index + 1) * 100) as 100 | 200 | 300}
                className="px-2 md:px-4"
              >
                <Image
                  src={card.image}
                  alt={card.alt}
                  width={400}
                  height={300}
                  className="w-full rounded-[1rem] object-cover"
                  loading="lazy"
                />
                <div className="text-start py-4">
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {card.title}
                  </h3>
                  <hr className="border-white/30 mb-3" />
                  <p className="text-white text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </RevealAnimator>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
