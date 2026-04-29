"use client";

interface YearSelectorProps {
  years: string[];
  activeYear: string;
  onYearChange: (year: string) => void;
}

export default function YearSelector({
  years,
  activeYear,
  onYearChange,
}: YearSelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {years.map((year) => (
        <button
          key={year}
          type="button"
          onClick={() => onYearChange(year)}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
            year === activeYear
              ? "bg-primary-red text-white shadow-md"
              : "bg-light-gray text-dark hover:bg-gray-200"
          }`}
          aria-pressed={year === activeYear}
        >
          {year}
        </button>
      ))}
    </div>
  );
}
