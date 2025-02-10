'use client';

import { cn } from '@/lib/utils';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

interface RateSubstitutionProps {
  substitutionId: string;
  currentRating?: number;
}

export function RateSubstitution({ substitutionId, currentRating }: RateSubstitutionProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRated, setHasRated] = useState(() => {
    // Check localStorage on component mount
    if (typeof window !== 'undefined') {
      return localStorage.getItem(`rated-${substitutionId}`) === 'true';
    }
    return false;
  });

  const handleRatingSubmit = async () => {
    if (rating === 0 || hasRated) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/substitutions/rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          substitutionId,
          rating,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit rating');

      // Store rating status in localStorage
      localStorage.setItem(`rated-${substitutionId}`, 'true');
      setHasRated(true);
      toast.success('Thank you for rating!');
    } catch (_error) {
      toast.error('Error submitting rating');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasRated) {
    return (
      <div className="border-t pt-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-muted-foreground">Thank you for rating this substitution!</p>
          {currentRating && (
            <p className="text-sm text-muted-foreground pt-2">
              Current community rating: {currentRating.toFixed(1)} / 5
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="border-t pt-8">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h2 className="text-2xl font-semibold">Rate this Substitution</h2>
        <p className="text-muted-foreground">
          How well did this substitution work for you? Your feedback helps other bakers!
        </p>

        <div className="flex justify-center items-center gap-2 my-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className="p-1 hover:scale-110 transition-transform"
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setRating(star)}
              type="button"
            >
              <StarFilledIcon
                className={cn(
                  'w-8 h-8',
                  star <= (hoveredRating || rating) ? 'text-yellow-500' : 'text-muted'
                )}
              />
            </button>
          ))}
        </div>

        <Button
          onClick={handleRatingSubmit}
          disabled={rating === 0 || isSubmitting}
          className="min-w-[200px]"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Rating'}
        </Button>

        {currentRating && (
          <p className="text-sm text-muted-foreground pt-2">
            Current community rating: {currentRating.toFixed(1)} / 5
          </p>
        )}
      </div>
    </div>
  );
}
