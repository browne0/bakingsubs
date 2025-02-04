'use client';

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tables } from '@/database.types';
import { getCommonIngredients, searchIngredients } from '@/services/ingredientService';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { ChevronRight, Search, UtensilsCrossed } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MAX_RECENT_SEARCHES = 3;

interface RecentSearch {
  name: string;
  id: string;
}

const updateSearchCount = async (ingredientId: string) => {
  try {
    const response = await fetch('/api/ingredients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredientId }),
    });

    if (!response.ok) {
      console.error(response);
    }
  } catch (error) {
    console.error('Error updating search count:', error);
  }
};

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const router = useRouter();

  // Debounced search query
  const debouncedQuery = useMemo(() => debounce((q: string) => setSearchQuery(q), 300), []);

  // Common ingredients query
  const { data: commonIngredients = [], isLoading: isLoadingCommon } = useQuery({
    queryKey: ['commonIngredients'],
    queryFn: getCommonIngredients,
    enabled: open,
  });

  // Search query
  const { data: searchResults = [], isLoading: isLoadingSearch } = useQuery({
    queryKey: ['ingredients', searchQuery],
    queryFn: () => searchIngredients(searchQuery),
    enabled: Boolean(searchQuery.trim()),
  });

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const addToRecentSearches = (ingredient: Tables<'ingredients'>) => {
    const updated = [
      { name: ingredient.name, id: ingredient.id },
      ...recentSearches.filter((item) => item.id !== ingredient.id),
    ].slice(0, MAX_RECENT_SEARCHES);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Add this skeleton component inside the SearchDialog component
  const IngredientSkeleton = () => (
    <div className="flex items-center justify-between p-3 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-muted rounded-md w-8 h-8" />
        <div className="h-4 bg-muted rounded w-32" />
      </div>
      <div className="h-4 w-4 bg-muted rounded" />
    </div>
  );

  const isLoading = isLoadingSearch || isLoadingCommon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full h-full p-0">
        <DialogTitle className="sr-only">Search for ingredient</DialogTitle>
        <DialogDescription className="sr-only">Search for ingredient</DialogDescription>
        <div className="flex flex-col h-full">
          <div className="px-4 pt-6">
            <div className="relative flex items-center mt-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search ingredients"
                className="pl-10 h-12 w-full"
                autoFocus
                onChange={(e) => debouncedQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="px-4 pt-6 flex-1 overflow-auto">
            {isLoading ? (
              <div className="mb-8">
                <h3 className="text-sm font-medium mb-3">
                  {searchQuery ? 'Search results' : 'Common ingredients'}
                </h3>
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <IngredientSkeleton key={i} />
                  ))}
                </div>
              </div>
            ) : searchQuery ? (
              <div className="mb-8">
                <h3 className="text-sm font-medium mb-3">Search results</h3>
                {searchResults.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No ingredients found
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {searchResults.map((ingredient) => (
                      <li
                        key={ingredient.id}
                        className="flex items-center justify-between p-3 hover:bg-accent rounded-md cursor-pointer transition-colors"
                        onClick={async () => {
                          await updateSearchCount(ingredient.id);
                          addToRecentSearches(ingredient);
                          router.push(`/ingredients/${ingredient.id}`);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-md">
                            <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <span className="text-sm font-medium">{ingredient.name}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <>
                {recentSearches.length > 0 && (
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-medium">Recent searches</h3>
                      <button
                        className="text-sm text-muted-foreground hover:text-foreground"
                        onClick={() => {
                          setRecentSearches([]);
                          localStorage.removeItem('recentSearches');
                        }}
                      >
                        Clear all
                      </button>
                    </div>
                    <ul className="space-y-2">
                      {recentSearches.map((search) => (
                        <li
                          key={search.id}
                          className="flex items-center justify-between p-3 hover:bg-accent rounded-md cursor-pointer transition-colors"
                          onClick={async () => {
                            await updateSearchCount(search.id);
                            router.push(`/ingredients/${search.id}`);
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-muted rounded-md">
                              <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <span className="text-sm font-medium">{search.name}</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-sm font-medium mb-3">Common ingredients</h3>
                  <ul className="space-y-2">
                    {commonIngredients.map((ingredient) => (
                      <li
                        key={ingredient.id}
                        className="flex items-center justify-between p-3 hover:bg-accent rounded-md cursor-pointer transition-colors"
                        onClick={async () => {
                          await updateSearchCount(ingredient.id);
                          addToRecentSearches(ingredient);
                          router.push(`/ingredients/${ingredient.id}`);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-md">
                            <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <span className="text-sm font-medium">{ingredient.name}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
