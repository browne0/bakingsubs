interface SubstitutionRatioProps {
  ratio: {
    from: number;
    to: number;
    note?: string;
  };
}

export function SubstitutionRatio({ ratio }: SubstitutionRatioProps) {
  return (
    <div className="inline-flex flex-col items-center bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
      <div className="flex items-center gap-3">
        <span className="text-lg font-semibold">{ratio.from}</span>
        <svg
          className="w-5 h-5 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
        <span className="text-lg font-semibold">{ratio.to}</span>
      </div>
      {ratio.note && (
        <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">{ratio.note}</span>
      )}
    </div>
  );
}
