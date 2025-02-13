'use client';

import { BEST_FOR_OPTIONS } from '@/app/admin/constants';
import { Badge } from '@/components/ui/badge';
import { Tables } from '@/database.types';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardTitle } from './ui/card';

interface SubstitutionCardProps {
  substitution: Tables<'substitutions'>;
}

export function SubstitutionCard({ substitution }: SubstitutionCardProps) {
  const router = useRouter();

  return (
    <Card
      className="group flex h-full cursor-pointer flex-col border border-border/50 bg-card transition-all hover:border-border hover:bg-accent/5"
      onClick={() =>
        router.push(
          `/ingredients/${substitution.original_ingredient_id}/substitutions/${substitution.id}`
        )
      }
    >
      <CardContent className="space-y-3 p-6">
        {/* Title */}
        <CardTitle className="text-xl font-medium leading-tight text-primary hover:text-primary/80">
          {substitution.name}
        </CardTitle>

        {/* Rating */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) =>
              i < substitution.rating ? (
                <StarFilledIcon key={i} className="h-5 w-5 text-yellow-500" />
              ) : (
                <StarIcon key={i} className="h-5 w-5 text-yellow-500" />
              )
            )}
          </div>
          <span className="text-sm text-muted-foreground">{substitution.rating.toFixed(1)}</span>
        </div>

        {/* Best For */}
        <div className="text-base">
          <span className="font-medium text-muted-foreground">Best in: </span>
          <span className="text-foreground">
            {substitution.best_for
              .map(
                (value) => BEST_FOR_OPTIONS.find((option) => option.value === value)?.label ?? value
              )
              .join(', ')}
          </span>
        </div>

        {/* Allergens */}
        {substitution.allergens.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {substitution.allergens.map((allergen) => (
              <Badge
                key={allergen}
                variant="secondary"
                className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
              >
                {allergen}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
