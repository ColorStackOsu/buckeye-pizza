"use client";

import Image from "next/image";
import { BoardMember } from "@/types/board";

interface MemberCardProps {
  member: BoardMember;
  onSelect: (member: BoardMember) => void;
}

export default function MemberCard({ member, onSelect }: MemberCardProps) {
  const hasBio = member.bio !== null && member.bio !== "";
  const hasCompany = member.company !== undefined && member.company !== "";

  return (
    <div className="flex flex-col items-center text-center">
      {/* Member photo */}
      {hasBio ? (
        <button
          type="button"
          role="button"
          onClick={() => onSelect(member)}
          className="group relative mb-3 h-44 w-44 cursor-pointer overflow-hidden rounded-full border-0 bg-transparent p-0 transition-transform duration-300 lg:hover:-translate-y-1 lg:hover:shadow-lg"
          aria-label={`View ${member.name}'s bio`}
        >
          <Image
            src={`/${member.img}`}
            alt={member.name}
            fill
            className="rounded-full object-cover"
            sizes="176px"
          />
          {/* Gradient shine overlay on hover (lg viewports) */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-300 lg:group-hover:opacity-100" />
        </button>
      ) : (
        <div className="relative mb-3 h-44 w-44 overflow-hidden rounded-full">
          <Image
            src={`/${member.img}`}
            alt={member.name}
            fill
            className="rounded-full object-cover"
            sizes="176px"
          />
        </div>
      )}

      {/* Member info */}
      <h3 className="mb-0.5 text-base font-semibold text-dark">
        {member.name}
      </h3>
      <p className="mb-1 text-sm text-gray-600">{member.position}</p>

      {/* Conditional company logo */}
      {hasCompany && (
        <div className="mt-1 flex h-6 items-center justify-center">
          <img
            src={`/${member.company}`}
            alt={`${member.name}'s company`}
            className="h-5 w-auto object-contain"
          />
        </div>
      )}
    </div>
  );
}
