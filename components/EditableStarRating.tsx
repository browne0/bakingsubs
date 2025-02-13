'use client';

import { Star } from 'lucide-react';

interface EditableStarRatingProps {
  rating: number;
  onChange: (rating: number) => void;
  className?: string;
}

export function EditableStarRating({ rating, onChange, className = '' }: EditableStarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i + 1)}
          className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-sm ${className}`}
        >
          <Star
            className={`w-5 h-5 ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'
            } hover:text-yellow-400 transition-colors`}
          />
        </button>
      ))}
    </div>
  );
}
