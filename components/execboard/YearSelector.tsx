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
  const currentIndex = years.indexOf(activeYear);
  const canGoPrev = currentIndex < years.length - 1;
  const canGoNext = currentIndex > 0;

  const goPrev = () => canGoPrev && onYearChange(years[currentIndex + 1]);
  const goNext = () => canGoNext && onYearChange(years[currentIndex - 1]);

  return (
    <div className="flex items-center justify-center gap-6">
      {/* Left arrow — goes to older year */}
      <button
        type="button"
        onClick={goPrev}
        disabled={!canGoPrev}
        aria-label="Previous year"
        className={`group flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 ${
          canGoPrev
            ? "border-brand-red text-brand-red hover:bg-brand-red hover:text-white"
            : "border-brand-light text-brand-light cursor-not-allowed"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Current year label */}
      <div className="min-w-[7rem] text-center">
        <p className="font-display text-overline text-brand-red uppercase tracking-widest mb-0.5">
          Academic Year
        </p>
        <p className="font-display text-heading font-bold text-brand-dark leading-none">
          {activeYear}
        </p>
      </div>

      {/* Right arrow — goes to newer year */}
      <button
        type="button"
        onClick={goNext}
        disabled={!canGoNext}
        aria-label="Next year"
        className={`group flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 ${
          canGoNext
            ? "border-brand-red text-brand-red hover:bg-brand-red hover:text-white"
            : "border-brand-light text-brand-light cursor-not-allowed"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
