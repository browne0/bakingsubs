'use client';

import { CATEGORY_OPTIONS } from '@/app/admin/constants';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { Input } from '@/components/ui/input';
import { Tables } from '@/database.types';
import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash/debounce';
import { Search, UtensilsCrossed } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

interface IngredientsPageClientProps {
  initialIngredients: Tables<'ingredients'>[];
}

export function IngredientsPageClient({ initialIngredients }: IngredientsPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setSearchQuery(query);
      }, 300),
    []
  );

  const { data: ingredients = initialIngredients, isLoading } = useQuery({
    queryKey: ['ingredients', searchQuery],
    queryFn: async () => {
      if (!searchQuery) return initialIngredients;
      const response = await fetch(
        `/api/ingredients?withSubstitutions=true&query=${encodeURIComponent(searchQuery)}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch ingredients');
      }
      return response.json() as Promise<Tables<'ingredients'>[]>;
    },
    initialData: initialIngredients,
  });

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'Ingredients' }]} />

      <h1 className="text-3xl font-bold mb-8">Ingredients</h1>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="search"
          placeholder="Search ingredients..."
          className="pl-10 h-12"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="p-4 rounded-lg border border-border animate-pulse">
              <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : ingredients.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <UtensilsCrossed className="mx-auto h-12 w-12 mb-4" />
          <p>No ingredients found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="p-4 rounded-lg border border-border hover:border-primary cursor-pointer transition-colors"
              onClick={() => router.push(`/ingredients/${ingredient.id}`)}
            >
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-medium mb-2">{ingredient.name}</h3>
                  {ingredient.category && (
                    <p className="text-sm text-muted-foreground">
                      {CATEGORY_OPTIONS.find((cat) => cat.value === ingredient.category)?.label ||
                        ingredient.category}
                    </p>
                  )}
                </div>
                {ingredient.image_url && (
                  <div className="w-16 h-16 flex-shrink-0">
                    <img
                      src={ingredient.image_url}
                      alt={ingredient.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
