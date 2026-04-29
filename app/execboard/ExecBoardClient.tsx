"use client";

import { useState } from "react";
import { boardData } from "@/data/board-data";
import YearSelector from "@/components/execboard/YearSelector";
import MemberGrid from "@/components/execboard/MemberGrid";

export default function ExecBoardClient() {
  const years = Object.keys(boardData.boards).sort().reverse();
  const [activeYear, setActiveYear] = useState(years[0]);

  const members = boardData.boards[activeYear]?.members ?? [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      {/* Page heading */}
      <h1 className="mb-2 text-center text-3xl font-bold text-dark">
        Executive Board
      </h1>
      <p className="mb-8 text-center text-gray-600">
        Meet the team behind ColorStack at Ohio State
      </p>

      {/* Year selector */}
      <div className="mb-10">
        <YearSelector
          years={years}
          activeYear={activeYear}
          onYearChange={setActiveYear}
        />
      </div>

      {/* Member grid */}
      <MemberGrid members={members} />
    </main>
  );
}
