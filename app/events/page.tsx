import type { Metadata } from "next";
import CalendarEmbed from "@/components/events/CalendarEmbed";
import EventGrid from "@/components/events/EventGrid";

export const metadata: Metadata = {
  openGraph: {
    title: "Events - ColorStack at Ohio State",
    description:
      "Explore upcoming events, workshops, and activities hosted by ColorStack at Ohio State University.",
    images: ["/images/Logo.png"],
    url: "https://colorstackosu.org/events",
  },
};

export default function EventsPage() {
  return (
    <>
      {/* Page hero — editorial dark banner consistent with home page language */}
      <div className="bg-brand-dark px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display text-hero text-white leading-none">
            Events
          </h1>
          <hr className="mt-6 h-px border-none bg-brand-red w-24" />
        </div>
      </div>

      <CalendarEmbed />
      <EventGrid />
    </>
  );
}
