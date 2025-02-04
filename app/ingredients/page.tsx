'use client';

import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { Input } from '@/components/ui/input';
import { searchIngredients } from '@/services/ingredientService';
import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash/debounce';
import { Search, UtensilsCrossed } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

export default function IngredientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setSearchQuery(query);
      }, 300),
    []
  );

  const { data: ingredients = [], isLoading } = useQuery({
    queryKey: ['ingredients', searchQuery],
    queryFn: () => searchIngredients(searchQuery),
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
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-48 rounded-lg border border-gray-200 dark:border-gray-800 animate-pulse bg-gray-100 dark:bg-gray-800"
            />
          ))}
        </div>
      ) : ingredients.length === 0 && searchQuery ? (
        <div className="text-center py-12">
          <UtensilsCrossed className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No ingredients found</h3>
          <p className="text-muted-foreground">
            No ingredients match your search &quot;{searchQuery}&quot;. Try searching for something
            else.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="group relative aspect-square rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden cursor-pointer"
              onClick={() => router.push(`/ingredients/${ingredient.id}`)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-semibold text-white mb-2">{ingredient.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {ingredient.functions?.map((func) => (
                    <span
                      key={func}
                      className="px-2 py-1 rounded-full text-xs bg-white/20 text-white"
                    >
                      {func}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
