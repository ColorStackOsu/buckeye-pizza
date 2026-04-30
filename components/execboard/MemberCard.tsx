"use client";

import Image from "next/image";
import { BoardMember } from "@/types/board";

interface MemberCardProps {
  member: BoardMember;
  onSelect: (member: BoardMember) => void;
}

export default function MemberCard({ member, onSelect }: MemberCardProps) {
  const hasBio = Boolean(member.bio);
  const hasCompany = Boolean(member.company);

  const inner = (
    <>
      {/* Portrait photo — fills the card */}
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
        <Image
          src={`/${member.img}`}
          alt={member.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 50vw, (max-width: 992px) 33vw, 25vw"
        />
      </div>

      {/* Gradient overlay — always present, deepens on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-100" />

      {/* Red left-border accent — grows up from bottom on hover */}
      <div className="absolute left-0 bottom-0 w-[3px] h-0 bg-brand-red transition-all duration-500 ease-out group-hover:h-full" />

      {/* "View Bio" hint — only for members with bios */}
      {hasBio && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="font-display text-overline text-white uppercase tracking-widest bg-brand-red/80 px-3 py-1.5 rounded">
            View Bio
          </span>
        </div>
      )}

      {/* Name / position / company — pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-0.5 transition-transform duration-300 ease-out group-hover:translate-y-0">
        {/* Company logo */}
        {hasCompany && (
          <div className="mb-2 flex h-5 items-center">
            <img
              src={`/${member.company}`}
              alt={`${member.name}'s company`}
              className="h-4 w-auto object-contain"
            />
          </div>
        )}
        <p className="font-display text-overline text-white/70 uppercase tracking-widest mb-0.5">
          {member.position}
        </p>
        <h3 className="font-body text-white font-semibold leading-tight text-base">
          {member.name}
        </h3>
      </div>
    </>
  );

  // Interactive card (has bio) — render as a button
  if (hasBio) {
    return (
      <button
        type="button"
        onClick={() => onSelect(member)}
        className="group relative w-full overflow-hidden rounded-xl aspect-[3/4] cursor-pointer border-0 bg-brand-charcoal text-left transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
        aria-label={`View ${member.name}'s bio`}
      >
        {inner}
      </button>
    );
  }

  // Non-interactive card (no bio) — render as a div, LinkedIn link wraps it
  return (
    <a
      href={member.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full overflow-hidden rounded-xl aspect-[3/4] bg-brand-charcoal transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
      aria-label={`${member.name} on LinkedIn`}
    >
      {inner}
    </a>
  );
}
