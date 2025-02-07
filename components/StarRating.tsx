'use client';

import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  className?: string;
}

export function StarRating({ rating, className = '' }: StarRatingProps) {
  return (
    <div className="relative">
      <div className={`flex items-center gap-1 cursor-help ${className}`}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
