"use client";

import { useState, useEffect, useRef } from "react";
import { EventItem } from "@/types/events";
import { eventsData } from "@/data/events-data";
import EventCard from "@/components/events/EventCard";
import GalleryModal from "@/components/events/GalleryModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EventGrid() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        if (headingRef.current) {
          gsap.from(headingRef.current, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });
        }
        if (gridRef.current) {
          const cards =
            gridRef.current.querySelectorAll<HTMLElement>(".event-card-item");
          gsap.from(cards, {
            opacity: 0,
            y: 40,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }
      });
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  const handleSelect = (event: EventItem) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <section
      id="recent-events"
      aria-labelledby="recent-events-heading"
      className="bg-brand-bg"
    >
      <div className="w-full">
        {/* Editorial section header */}
        <div
          ref={headingRef}
          className="mx-auto max-w-7xl px-6 pt-12 pb-6 md:px-12"
        >
          <p className="font-display text-overline text-brand-red uppercase tracking-widest mb-2">
            Gallery
          </p>
          <h3
            id="recent-events-heading"
            className="font-display text-heading text-brand-dark"
          >
            Recent Events
          </h3>
        </div>

        {/* Event cards grid */}
        <div
          ref={gridRef}
          className="mx-auto max-w-7xl grid grid-cols-1 gap-6 px-6 pb-12 md:grid-cols-2 md:px-12 lg:grid-cols-3"
        >
          {eventsData.map((event, index) => {
            const delay = (((index % 3) + 1) * 100) as 100 | 200 | 300;

            return (
              <div key={event.id} className="event-card-item">
                <EventCard
                  event={event}
                  onSelect={handleSelect}
                  delay={delay}
                />
              </div>
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
