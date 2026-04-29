"use client";

import Script from "next/script";
import RevealAnimator from "@/components/RevealAnimator";

export default function CalendarEmbed() {
  return (
    <section id="calendar" aria-labelledby="calendar-heading">
      <div className="calendar-gradient-overlay relative w-full overflow-hidden bg-bg-white">
        {/* Section heading */}
        <div className="mx-2 px-2 pt-5 md:mx-5 md:px-4">
          <h3 id="calendar-heading" className="px-2 font-semibold">
            Event Calendar
          </h3>
          <hr className="divide-line-red ms-2 mt-2 w-1/2" />
        </div>

        {/* Calendar iframe */}
        <RevealAnimator className="py-4">
          <div className="mx-auto w-11/12 pb-4 md:w-9/12 lg:w-9/12">
            <iframe
              src="https://embed.styledcalendar.com/#vJW8FFhYNPb9GISWWw71"
              title="Styled Calendar"
              className="w-full border-none"
              style={{ border: "none" }}
              data-cy="calendar-embed-iframe"
            />
          </div>
        </RevealAnimator>
      </div>

      {/* Styled Calendar parent-window script for iframe communication */}
      <Script
        src="https://embed.styledcalendar.com/assets/parent-window.js"
        strategy="lazyOnload"
      />
    </section>
  );
}
