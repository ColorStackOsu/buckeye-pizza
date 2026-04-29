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
      <CalendarEmbed />
      <EventGrid />
    </>
  );
}
