import Link from "next/link";
import RevealAnimator from "@/components/RevealAnimator";

export default function AboutUsSection() {
  return (
    <section
      id="about-us"
      className="bg-light-gray"
      aria-labelledby="about-us-title"
    >
      <div className="px-4 pt-2 pb-4">
        {/* Section Header */}
        <div className="w-full">
          <div className="text-center mx-auto p-4">
            <RevealAnimator variant="fade-up">
              <h2 className="font-semibold text-2xl" id="about-us-title">
                About Us
              </h2>
            </RevealAnimator>

            <RevealAnimator variant="fade-up">
              <div className="flex justify-center items-center">
                <hr
                  className="divide-line-sub-right w-[200px]"
                  aria-hidden="true"
                />
                <svg
                  className="w-8 h-8 text-primary-red mx-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                </svg>
                <hr
                  className="divide-line-sub-left w-[200px]"
                  aria-hidden="true"
                />
              </div>
            </RevealAnimator>
          </div>
        </div>

        {/* Content Columns */}
        <RevealAnimator variant="fade-up">
          <div className="flex flex-wrap py-3">
            {/* Left spacer */}
            <div className="hidden lg:block lg:w-3/12" />

            {/* Left column */}
            <div className="w-full md:w-6/12 lg:w-3/12 px-4">
              <div className="text-start mx-auto">
                <p className="text-base">
                  ColorStack&apos;s mission is to{" "}
                  <span className="font-bold">
                    increase the number of Black, Latinx, and Indigenous
                    technologists
                  </span>{" "}
                  who graduate and launch rewarding technical careers. We drive
                  this mission forward in the heart of the Midwest. As one of
                  the largest public universities in the nation, we leverage
                  OSU&apos;s vast resources and connections to{" "}
                  <span className="font-bold">
                    create meaningful change in tech diversity.
                  </span>
                </p>

                <p className="text-base">
                  Founded in 2023, the Ohio State Chapter of ColorStack was
                  established to build community, create opportunities, and
                  foster excellence among underrepresented students in computing
                  fields. Our membership is open to all students passionate
                  about increasing diversity in technology, regardless of major,
                  background, or experience level.
                </p>
              </div>
            </div>

            {/* Right column */}
            <div className="w-full md:w-6/12 lg:w-3/12 px-4">
              <div className="text-start mx-auto">
                <p className="text-base">
                  Thank you for taking the time to learn about us. We would love
                  to have you join our community! To receive the latest
                  information about our meetings and events, please visit our{" "}
                  <Link href="/events" className="text-dark underline">
                    Events Page
                  </Link>{" "}
                  and follow our socials.
                </p>

                <div className="text-base">
                  <p className="mb-1">Socials:</p>
                  <ul className="list-disc pl-5 mb-4">
                    <li>
                      <a
                        href="https://colorstackosu.slack.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-red hover:underline"
                      >
                        Slack
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/colorstackosu/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-red hover:underline"
                      >
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/company/colorstack-osu/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-red hover:underline"
                      >
                        LinkedIn
                      </a>
                    </li>
                  </ul>

                  <p className="mb-1">What We Offer:</p>
                  <ul className="list-disc pl-5 mb-4">
                    <li>Technical Workshops</li>
                    <li>Professional Development</li>
                    <li>Career Opportunities</li>
                    <li>Community Building</li>
                  </ul>

                  <p>
                    Interested in becoming a member of the national
                    organization? Talk to an e-board member for a referral or
                    visit{" "}
                    <a
                      href="https://www.colorstack.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-red hover:underline"
                    >
                      colorstack.org
                    </a>{" "}
                    to learn more.
                  </p>
                </div>
              </div>
            </div>

            {/* Right spacer */}
            <div className="hidden lg:block lg:w-3/12" />
          </div>
        </RevealAnimator>
      </div>
    </section>
  );
}
