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
      className="group flex w-full cursor-pointer flex-col rounded-[10px] border-[1.5px] border-[#dcdcdc] bg-[#f7f7f7] text-left text-inherit shadow-none transition-all duration-300 ease-in-out hover:-translate-y-[5px] hover:shadow-[0_6px_12px_rgba(0,0,0,0.1)]"
      style={{ aspectRatio: "1.64" }}
      onClick={() => onSelect(event)}
      aria-label={`View ${event.name} gallery`}
    >
      {/* Card media / thumbnail */}
      <div
        className="relative w-full overflow-hidden rounded-t-[10px]"
        style={{ paddingTop: "30%" }}
      >
        {thumbnailSrc ? (
          <Image
            src={thumbnailSrc}
            alt={event.alt || `${event.name} Thumbnail`}
            fill
            className="rounded-t-[10px] object-cover"
            style={{ objectPosition: "center 60%" }}
            sizes="(max-width: 768px) 90vw, (max-width: 992px) 45vw, 30vw"
            unoptimized={thumbnailSrc.includes("drive.google.com")}
          />
        ) : (
          <div className="absolute inset-0 animate-pulse rounded-t-[10px] bg-gray-200" />
        )}
        {/* Red gradient overlay */}
        <div className="event-gradient absolute inset-0 rounded-t-[10px] opacity-100" />
      </div>

      {/* Card content */}
      <div className="px-2 py-3">
        <h3 className="mb-0 text-lg font-semibold">{event.name}</h3>
        <p className="text-sm font-semibold text-primary-red">{event.date}</p>
      </div>
    </button>
  );
}
