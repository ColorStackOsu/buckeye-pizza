"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";
import { BoardMember } from "@/types/board";

const TRANSITION_MS = 280;

interface MemberModalProps {
  member: BoardMember | null;
  onClose: () => void;
}

export default function MemberModal({ member, onClose }: MemberModalProps) {
  const [visible, setVisible] = useState(false);
  // Keep a local copy of the member so content doesn't vanish mid-exit
  const [displayMember, setDisplayMember] = useState<BoardMember | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Enter: new member arrives → mount with visible=false → one frame later flip visible=true
  useEffect(() => {
    if (member) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      // First ensure we're in the hidden state before mounting content
      setVisible(false);
      setDisplayMember(member);
      // Two rAFs: first lets React commit the DOM with visible=false,
      // second triggers the transition from that painted state
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      return () => cancelAnimationFrame(id);
    }
  }, [member]);

  // Initiate exit: flip visible → false, then clear display member after transition
  const startClose = useCallback(() => {
    setVisible(false);
    closeTimerRef.current = setTimeout(() => {
      setDisplayMember(null);
      onClose();
    }, TRANSITION_MS);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = displayMember ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [displayMember]);

  // Escape key
  useEffect(() => {
    if (!displayMember) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") startClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [displayMember, startClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) startClose();
    },
    [startClose],
  );

  if (!displayMember) return null;

  const hasCalendly = Boolean(displayMember.calendly);
  const hasLinkedin = Boolean(displayMember.linkedin);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 transition-[background-color] duration-[280ms] ease-out ${
        visible ? "bg-black/60" : "bg-black/0"
      }`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-member-name"
    >
      {/* Modal panel */}
      <div
        className={`relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-white/20 transition-[opacity,transform] duration-[280ms] ease-out ${
          visible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-5 scale-[0.96]"
        }`}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={startClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-brand-dark/10 text-brand-dark transition-colors hover:bg-brand-dark hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Two-column layout on md+, stacked on mobile */}
        <div className="flex flex-col md:flex-row">
          {/* Left — portrait photo */}
          <div className="relative w-full shrink-0 md:w-56 lg:w-72">
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[14rem]">
              <Image
                src={`/${displayMember.img}`}
                alt={displayMember.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 288px"
              />
            </div>
          </div>

          {/* Right — content */}
          <div className="flex flex-1 flex-col justify-between px-6 pb-7 pt-5 md:px-8 md:py-8">
            <div>
              <p className="font-display text-overline text-brand-red uppercase tracking-widest mb-1">
                {displayMember.position}
              </p>

              <h2
                id="modal-member-name"
                className="font-display text-heading font-bold text-brand-dark leading-tight mb-1"
              >
                {displayMember.name}
              </h2>

              {displayMember.company && (
                <div className="mb-4 flex h-6 items-center">
                  <img
                    src={`/${displayMember.company}`}
                    alt={`${displayMember.name}'s company`}
                    className="h-5 w-auto object-contain"
                  />
                </div>
              )}

              <hr className="mb-4 h-px border-none bg-brand-red/30 w-12" />

              {displayMember.bio && (
                <p className="font-body text-sm leading-relaxed text-brand-slate">
                  {displayMember.bio}
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {hasLinkedin && (
                <a
                  href={displayMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0077b5] px-5 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-[#005f8d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0077b5]"
                  aria-label={`${displayMember.name}'s LinkedIn profile`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              )}

              {hasCalendly && (
                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      displayMember.calendly,
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-5 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-brand-red-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                  aria-label={`Book a time with ${displayMember.name}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Book a Time
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
