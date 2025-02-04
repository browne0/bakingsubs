'use client';

import { Star } from 'lucide-react';
import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  explanation?: string;
  className?: string;
}

export function StarRating({ rating, explanation, className = '' }: StarRatingProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="relative">
      <div
        className={`flex items-center gap-1 cursor-help ${className}`}
        onMouseEnter={() => setShowExplanation(true)}
        onMouseLeave={() => setShowExplanation(false)}
      >
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>

      {explanation && showExplanation && (
        <div className="absolute z-20 top-full mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-64">
          <p className="text-sm text-gray-600 dark:text-gray-300">{explanation}</p>
        </div>
      )}
    </div>
  );
}
