'use client';

import { BEST_FOR_OPTIONS } from '@/app/admin/constants';
import { Badge } from '@/components/ui/badge';
import { Tables } from '@/database.types';
import { StarFilledIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Card, CardContent, CardTitle } from './ui/card';

interface SubstitutionCardProps {
  substitution: Tables<'substitutions'>;
}

export function SubstitutionCard({ substitution }: SubstitutionCardProps) {
  return (
    <Link
      href={`/ingredients/${substitution.original_ingredient_id}/substitutions/${substitution.id}`}
      className="block h-full"
    >
      <Card className="group h-full border border-border/50 bg-card transition-all hover:border-border hover:bg-accent/5">
        {/* Image */}
        {substitution.image_url && (
          <div className="relative aspect-[2/1] overflow-hidden rounded-t-lg">
            <img
              src={substitution.image_url}
              alt={substitution.name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}

        <CardContent className="space-y-1.5 p-3">
          {/* Title and Rating */}
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base font-medium leading-tight text-primary group-hover:text-primary/80">
              {substitution.name}
            </CardTitle>
            <div className="flex items-center gap-1 shrink-0">
              <StarFilledIcon className="h-3.5 w-3.5 text-yellow-500" />
              <span className="text-xs font-medium text-muted-foreground">
                {substitution.rating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Best For */}
          <div className="text-xs">
            <span className="font-medium text-muted-foreground">Best in: </span>
            <span className="text-foreground">
              {substitution.best_for
                .map(
                  (value) =>
                    BEST_FOR_OPTIONS.find((option) => option.value === value)?.label ?? value
                )
                .join(', ')}
            </span>
          </div>

          {/* Allergens */}
          {substitution.allergens.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {substitution.allergens.map((allergen) => (
                <Badge
                  key={allergen}
                  variant="secondary"
                  className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 text-[10px] leading-none px-1.5 py-0.5"
                >
                  {allergen}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
