"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { EventItem } from "@/types/events";
import { fetchDriveFolderImages } from "@/lib/drive-gallery";

interface EventCardProps {
  event: EventItem;
  onSelect: (event: EventItem) => void;
  delay: 100 | 200 | 300;
}

export default function EventCard({ event, onSelect, delay }: EventCardProps) {
  const [thumbnailSrc, setThumbnailSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadThumbnail() {
      if (event.driveFolderId) {
        try {
          const images = await fetchDriveFolderImages(event.driveFolderId);
          if (!cancelled && images.length > 0) {
            setThumbnailSrc(images[0].src);
            return;
          }
        } catch {
          // Fall through to fallback
        }
      }

      if (!cancelled) {
        setThumbnailSrc(event.img || "/images/placeholder-event.jpg");
      }
    }

    loadThumbnail();

    return () => {
      cancelled = true;
    };
  }, [event.driveFolderId, event.img]);

  return (
    <button
      type="button"
      className="group relative w-full cursor-pointer overflow-hidden rounded-xl aspect-[4/3] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl"
      onClick={() => onSelect(event)}
      aria-label={`View ${event.name} gallery`}
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
        {thumbnailSrc ? (
          <Image
            src={thumbnailSrc}
            alt={event.alt || `${event.name} Thumbnail`}
            fill
            className="object-cover"
            style={{ objectPosition: "center 60%" }}
            sizes="(max-width: 768px) 90vw, (max-width: 992px) 45vw, 30vw"
            unoptimized={thumbnailSrc.includes("drive.google.com")}
          />
        ) : (
          <div className="absolute inset-0 animate-pulse bg-brand-charcoal" />
        )}
      </div>

      {/* Gradient — tall, rich, dark at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Red left border accent — grows up from bottom on hover */}
      <div className="absolute left-0 bottom-0 w-[3px] h-0 bg-brand-red transition-all duration-500 ease-out group-hover:h-full" />

      {/* Event info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 transition-transform duration-300 ease-out group-hover:translate-y-0">
        {/* Date overline — fades in on hover */}
        <p className="font-display text-overline text-brand-red uppercase tracking-widest mb-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {event.date}
        </p>
        <h3 className="font-display text-white font-bold leading-tight text-subheading">
          {event.name}
        </h3>
        {/* "View Gallery" hint — fades in on hover */}
        <p className="font-body text-caption text-white/60 mt-1.5 flex items-center gap-1.5 opacity-0 transition-opacity duration-300 delay-75 group-hover:opacity-100">
          View Gallery
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 6h8M6 2l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </p>
      </div>
    </button>
  );
}
