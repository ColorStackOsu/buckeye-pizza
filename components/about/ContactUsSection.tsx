export default function ContactUsSection() {
  return (
    <section
      id="contact-us"
      className="bg-brand-dark py-16 md:py-24"
      aria-labelledby="contact-us-title"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* ── Overline ── */}
        <p className="font-display text-overline text-brand-red uppercase tracking-widest mb-6">
          Get In Touch
        </p>

        {/* ── Display-scale heading — the dominant element ── */}
        <h2
          id="contact-us-title"
          className="font-display text-display text-white leading-tight max-w-2xl mb-8"
        >
          Want to collaborate or have a question?
        </h2>

        <hr
          className="h-px border-none bg-brand-red w-24 mb-10"
          aria-hidden="true"
        />

        {/* ── Email CTA — treated as a primary action, not inline text ── */}
        <a
          href="mailto:colorstackosu@gmail.com"
          className="group inline-flex items-center gap-4 font-display text-heading text-white hover:text-brand-red transition-colors duration-200"
          aria-label="Email ColorStack at Ohio State"
        >
          <span>colorstackosu@gmail.com</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>

        {/* ── Supporting copy ── */}
        <p className="font-body text-body text-brand-slate mt-6 max-w-lg">
          For sponsorship inquiries, event collaborations, or anything else —
          we&apos;re happy to hear from you.
        </p>
      </div>
    </section>
  );
}
