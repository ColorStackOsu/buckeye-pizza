"use client";

import { useState } from "react";
import { EventItem } from "@/types/events";
import { eventsData } from "@/data/events-data";
import EventCard from "@/components/events/EventCard";
import GalleryModal from "@/components/events/GalleryModal";
import RevealAnimator from "@/components/RevealAnimator";

export default function EventGrid() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const handleSelect = (event: EventItem) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <section id="recent-events" aria-labelledby="recent-events-heading">
      <div className="w-full">
        {/* Section heading */}
        <RevealAnimator className="mx-2 px-2 pt-3 md:mx-5 md:px-4">
          <h3 id="recent-events-heading" className="px-2 font-semibold">
            Recent Events
          </h3>
          <hr className="divide-line-red ms-2 mt-2 w-1/2" />
        </RevealAnimator>

        {/* Event cards grid */}
        <div className="grid grid-cols-1 gap-4 px-5 py-4 md:grid-cols-2 lg:grid-cols-3">
          {eventsData.map((event, index) => {
            const delay = (((index % 3) + 1) * 100) as 100 | 200 | 300;

            return (
              <RevealAnimator
                key={event.id}
                delay={delay}
                className="mx-auto w-11/12 py-3 md:w-full"
              >
                <EventCard
                  event={event}
                  onSelect={handleSelect}
                  delay={delay}
                />
              </RevealAnimator>
            );
          })}
        </div>

        {/* Gallery modal for selected event */}
        <GalleryModal event={selectedEvent} onClose={handleCloseModal} />
      </div>
    </section>
  );
}

export type { EventItem };
export { EventGrid };
