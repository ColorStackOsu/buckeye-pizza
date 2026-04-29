"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { BoardMember } from "@/types/board";

interface MemberModalProps {
  member: BoardMember | null;
  onClose: () => void;
}

export default function MemberModal({ member, onClose }: MemberModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (member) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [member]);

  // Close on Escape key
  useEffect(() => {
    if (!member) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [member, onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  if (!member) return null;

  const hasCalendly = member.calendly !== undefined && member.calendly !== "";
  const hasLinkedin = member.linkedin !== undefined && member.linkedin !== "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`${member.name} - ${member.position}`}
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-xl">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-1.5 text-gray-600 transition-colors hover:bg-white hover:text-gray-900"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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

        {/* Modal content */}
        <div className="flex flex-col items-center px-6 pb-6 pt-8">
          {/* Member photo */}
          <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-full">
            <Image
              src={`/${member.img}`}
              alt={member.name}
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>

          {/* Name and position */}
          <h2 className="mb-1 text-xl font-bold text-dark">{member.name}</h2>
          <p className="mb-4 text-sm font-medium text-primary-red">
            {member.position}
          </p>

          {/* Bio */}
          {member.bio && (
            <p className="mb-6 text-center text-sm leading-relaxed text-gray-700">
              {member.bio}
            </p>
          )}

          {/* Action buttons */}
          <div className="flex gap-3">
            {hasLinkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#0077b5] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#005f8d]"
                aria-label={`${member.name}'s LinkedIn`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            )}

            <button
              type="button"
              disabled={!hasCalendly}
              onClick={() => {
                if (hasCalendly) {
                  window.open(member.calendly, "_blank", "noopener,noreferrer");
                }
              }}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                hasCalendly
                  ? "bg-primary-red text-white hover:bg-hover-red"
                  : "cursor-not-allowed bg-gray-200 text-gray-400"
              }`}
              aria-label={
                hasCalendly
                  ? `Book a time with ${member.name}`
                  : "No booking available"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Book a Time
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
