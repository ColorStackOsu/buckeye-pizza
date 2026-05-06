"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { EventItem } from "@/types/events";
import { DriveImage } from "@/types/drive";
import { fetchDriveFolderImages } from "@/lib/drive-gallery";

interface GalleryModalProps {
  event: EventItem | null;
  onClose: () => void;
}

type GalleryState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "empty" }
  | { status: "loaded"; images: DriveImage[] };

export default function GalleryModal({ event, onClose }: GalleryModalProps) {
  const [galleryState, setGalleryState] = useState<GalleryState>({
    status: "loading",
  });
  const [selectedImage, setSelectedImage] = useState<DriveImage | null>(null);
  const modalPanelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  // Fetch images when event changes
  useEffect(() => {
    if (!event) return;

    let cancelled = false;
    setGalleryState({ status: "loading" });
    setSelectedImage(null);

    async function loadImages() {
      try {
        const images = await fetchDriveFolderImages(event!.driveFolderId);
        if (cancelled) return;

        if (images.length === 0) {
          setGalleryState({ status: "empty" });
        } else {
          setGalleryState({ status: "loaded", images });
        }
      } catch {
        if (!cancelled) {
          setGalleryState({ status: "error" });
        }
      }
    }

    loadImages();

    return () => {
      cancelled = true;
    };
  }, [event]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (event) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [event]);

  // Close on Escape key
  useEffect(() => {
    if (!event) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (selectedImage) {
          setSelectedImage(null);
        } else {
          onClose();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [event, onClose, selectedImage]);

  // Move focus into modal when it opens; return focus to triggering element on close
  useEffect(() => {
    if (event) {
      triggerRef.current = document.activeElement;
      const id = setTimeout(() => {
        modalPanelRef.current?.focus();
      }, 50);
      return () => clearTimeout(id);
    } else if (triggerRef.current) {
      (triggerRef.current as HTMLElement).focus?.();
      triggerRef.current = null;
    }
  }, [event]);

  // Focus trap: keep Tab cycling within the modal panel
  const handleModalKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "Tab") return;
      const panel = modalPanelRef.current;
      if (!panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [],
  );

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        if (selectedImage) {
          setSelectedImage(null);
        } else {
          onClose();
        }
      }
    },
    [onClose, selectedImage],
  );

  if (!event) return null;

  const title = event.galleryTitle || `${event.name} - ${event.date}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="relative mx-4 flex max-h-[90vh] w-full max-w-4xl flex-col rounded-lg bg-white shadow-xl"
        ref={modalPanelRef}
        tabIndex={-1}
        onKeyDown={handleModalKeyDown}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-dark">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close gallery"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6">
          {selectedImage ? (
            /* Full-size image view */
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="mb-4 self-start rounded px-3 py-1 text-sm font-medium text-primary-red transition-colors hover:bg-red-50"
                aria-label="Back to thumbnails"
              >
                ← Back
              </button>
              <div className="relative w-full">
                <Image
                  src={selectedImage.full}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  className="mx-auto max-h-[70vh] w-auto rounded object-contain"
                  unoptimized
                />
              </div>
            </div>
          ) : (
            /* Thumbnail grid / loading / error / empty states */
            <>
              {galleryState.status === "loading" && (
                <p className="m-0 text-center text-gray-600">Loading photos…</p>
              )}

              {galleryState.status === "error" && (
                <p className="m-0 text-center text-primary-red">
                  Couldn&apos;t load photos
                </p>
              )}

              {galleryState.status === "empty" && (
                <p className="m-0 text-center text-gray-600">No photos found</p>
              )}

              {galleryState.status === "loaded" && (
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  {galleryState.images.map((image, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedImage(image)}
                      className="group relative aspect-square overflow-hidden rounded"
                      aria-label={`View ${image.alt}`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-200 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 33vw"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
