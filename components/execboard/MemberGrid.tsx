"use client";

import { useState } from "react";
import { BoardMember } from "@/types/board";
import MemberCard from "./MemberCard";
import MemberModal from "./MemberModal";

interface MemberGridProps {
  members: BoardMember[];
}

export default function MemberGrid({ members }: MemberGridProps) {
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(
    null,
  );

  // Grid balancing: insert spacers when memberCount % 4 === 2 on lg viewports
  const needsBalancing = members.length % 4 === 2;

  return (
    <>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
        {/* Leading spacer for centering last row on lg when needed */}
        {needsBalancing && (
          <div className="hidden lg:block" aria-hidden="true" />
        )}

        {members.map((member, index) => (
          <MemberCard
            key={`${member.name}-${index}`}
            member={member}
            onSelect={setSelectedMember}
          />
        ))}

        {/* Trailing spacer for centering last row on lg when needed */}
        {needsBalancing && (
          <div className="hidden lg:block" aria-hidden="true" />
        )}
      </div>

      {/* Member Modal */}
      <MemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </>
  );
}
