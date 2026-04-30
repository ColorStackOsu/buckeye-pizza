import Link from "next/link";

export default function AboutUsSection() {
  return (
    <section
      id="about-us"
      className="bg-brand-light py-16 md:py-24"
      aria-labelledby="about-us-title"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* ── Pull-quote mission statement — the dominant element ── */}
        <div className="mb-16 md:mb-20 max-w-4xl">
          <p className="font-display text-overline text-brand-red uppercase tracking-widest mb-6">
            Our Mission
          </p>
          <h2
            id="about-us-title"
            className="font-display text-display text-brand-dark leading-tight"
          >
            Increasing the number of{" "}
            <span className="text-brand-red">
              Black, Latinx, and Indigenous technologists
            </span>{" "}
            who graduate and launch rewarding careers in tech.
          </h2>
          <hr
            className="mt-8 h-px border-none bg-brand-red w-24"
            aria-hidden="true"
          />
        </div>

        {/* ── Two-column detail grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Left — story */}
          <div>
            <p className="font-display text-overline text-brand-red uppercase tracking-widest mb-4">
              Who We Are
            </p>
            <p className="font-body text-body text-brand-dark leading-relaxed mb-5">
              Founded in 2023, the Ohio State Chapter of ColorStack was
              established to build community, create opportunities, and foster
              excellence among underrepresented students in computing fields. As
              one of the largest public universities in the nation, we leverage
              OSU&apos;s vast resources and connections to create meaningful
              change in tech diversity.
            </p>
            <p className="font-body text-body text-brand-dark leading-relaxed">
              Our membership is open to all students passionate about increasing
              diversity in technology, regardless of major, background, or
              experience level.{" "}
              <Link
                href="/events"
                className="text-brand-red font-semibold hover:underline"
              >
                See upcoming events ↗
              </Link>
            </p>
          </div>

          {/* Right — quick facts */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-row gap-20">
              {/* What we offer */}
              <div>
                <p className="font-display text-overline text-brand-red uppercase tracking-widest mb-4">
                  What We Offer
                </p>
                <ul className="space-y-3">
                  {[
                    "Technical Workshops",
                    "Professional Development",
                    "Career Opportunities",
                    "Community Building",
                  ].map((item) => (
                    <li
                      key={item}
                      className="font-body text-body text-brand-dark"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Socials */}
              <div>
                <p className="font-display text-overline text-brand-red uppercase tracking-widest mb-4">
                  Find Us
                </p>
                <ul className="space-y-3">
                  {[
                    {
                      label: "Slack",
                      href: "https://colorstackosu.slack.com/",
                    },
                    {
                      label: "Instagram",
                      href: "https://www.instagram.com/colorstackosu/",
                    },
                    {
                      label: "LinkedIn",
                      href: "https://www.linkedin.com/company/colorstack-osu/",
                    },
                  ].map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-body text-brand-dark hover:text-brand-red transition-colors"
                      >
                        {label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* National org CTA */}
            <p className="font-body text-caption text-brand-slate">
              Interested in the national organization?{" "}
              <a
                href="https://www.colorstack.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-red hover:underline"
              >
                Visit colorstack.org ↗
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
