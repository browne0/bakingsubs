'use client';

import { SearchDialog } from '@/components/SearchDialog';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Tables } from '@/database.types';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash/debounce';
import { CheckCircle, ChevronRight, Search, UtensilsCrossed } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

interface HomePageClientProps {
  initialCommonIngredients: Tables<'ingredients'>[];
}

interface RecentSearch {
  id: string;
  name: string;
}

const MAX_RECENT_SEARCHES = 3;

export function HomePageClient({ initialCommonIngredients }: HomePageClientProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const router = useRouter();
  const commandRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Debounced search query
  const debouncedQuery = useMemo(() => debounce((q: string) => setSearchQuery(q), 300), []);

  // Update the search query to use the API
  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ['ingredients', searchQuery],
    queryFn: async () => {
      const response = await fetch(`/api/ingredients?query=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch ingredients');
      }
      return response.json() as Promise<Tables<'ingredients'>[]>;
    },
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

  // Common ingredients query
  const { data: commonIngredients = [] } = useQuery({
    queryKey: ['commonIngredients'],
    queryFn: async () => {
      const response = await fetch('/api/ingredients/common');
      if (!response.ok) {
        throw new Error('Failed to fetch common ingredients');
      }
      return response.json() as Promise<Tables<'ingredients'>[]>;
    },
  });

  // Handle keyboard interactions
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commandRef.current &&
        !commandRef.current.contains(event.target as Node) &&
        event.target !== inputRef.current
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-16 mx-auto sm:px-6 lg:px-8">
        {/* Updated Hero Section */}
        <section className="min-h-[50vh] mx-auto text-center flex flex-col items-center justify-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 mb-8 bg-primary/10 px-4 py-2 rounded-full">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Trusted by 100+ home bakers</span>
          </div>

          <h1 className="md:text-4xl text-3xl tracking-tight font-[500]">
            <span className="font-bold">Rescue Your Recipe With Ingredients</span>
            <span className="block text-primary mt-2 font-bold">From Your Pantry</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Find detailed, community-tested baking substitutions for your bake in seconds.
          </p>

          {/* Search Section with enhanced styling */}
          <div className="max-w-2xl w-full mx-auto mt-10">
            <div className="relative flex shadow-xl rounded-lg border-2 border-primary/20">
              {isDesktop ? (
                <div className="relative w-full">
                  <div className="flex">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Which ingredient are you missing?"
                        className="w-full h-16 pl-12 pr-4 text-lg rounded-l-lg bg-background placeholder:text-muted-foreground"
                        onChange={(e) => debouncedQuery(e.target.value)}
                        onFocus={() => setIsOpen(true)}
                        role="combobox"
                        aria-expanded={isOpen}
                        aria-controls="search-commands"
                      />
                      {isOpen && (
                        <div
                          ref={commandRef}
                          className="absolute top-[calc(100%+4px)] left-0 w-full border rounded-md bg-popover shadow-md z-50"
                          id="search-commands"
                        >
                          <Command className="[&_[cmdk-group-heading]]:text-left [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
                            <CommandList>
                              {isLoading ? (
                                <CommandGroup heading="Searching...">
                                  {[...Array(3)].map((_, i) => (
                                    <CommandItem
                                      key={i}
                                      className="flex items-center justify-between p-2 gap-2"
                                    >
                                      <div className="flex items-center gap-2 flex-1">
                                        <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                                        <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                                      </div>
                                      <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              ) : (
                                <>
                                  <CommandEmpty className="py-6 text-center text-sm">
                                    No ingredients found
                                  </CommandEmpty>

                                  {searchResults.length > 0 && (
                                    <CommandGroup heading="Search results">
                                      {searchResults.map((ingredient) => (
                                        <CommandItem
                                          key={ingredient.id}
                                          value={`search-${ingredient.name}`}
                                          onSelect={() => {
                                            addToRecentSearches(ingredient);
                                            router.push(`/ingredients/${ingredient.id}`);
                                            setIsOpen(false);
                                          }}
                                          className="flex items-center justify-between p-2 rounded-sm cursor-pointer hover:bg-accent"
                                        >
                                          <div className="flex items-center gap-2">
                                            <UtensilsCrossed className="h-4 w-4" />
                                            <span>{ingredient.name}</span>
                                          </div>
                                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  )}

                                  {!searchQuery && (
                                    <>
                                      {recentSearches.length > 0 && (
                                        <CommandGroup heading="Recent searches">
                                          {recentSearches.map((search) => (
                                            <CommandItem
                                              key={search.id}
                                              value={`recent-${search.name}`}
                                              onSelect={() => {
                                                router.push(`/ingredients/${search.id}`);
                                                setIsOpen(false);
                                              }}
                                              className="flex items-center justify-between p-2 rounded-sm cursor-pointer hover:bg-accent"
                                            >
                                              <div className="flex items-center gap-2">
                                                <UtensilsCrossed className="h-4 w-4" />
                                                <span>{search.name}</span>
                                              </div>
                                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      )}

                                      <CommandGroup heading="Common ingredients">
                                        {commonIngredients.map((ingredient) => (
                                          <CommandItem
                                            key={ingredient.id}
                                            value={`common-${ingredient.name}`}
                                            onSelect={() => {
                                              addToRecentSearches(ingredient);
                                              router.push(`/ingredients/${ingredient.id}`);
                                              setIsOpen(false);
                                            }}
                                            className="flex items-center justify-between p-2 rounded-sm cursor-pointer hover:bg-accent"
                                          >
                                            <div className="flex items-center gap-2">
                                              <UtensilsCrossed className="h-4 w-4" />
                                              <span>{ingredient.name}</span>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </>
                                  )}
                                </>
                              )}
                            </CommandList>
                          </Command>
                        </div>
                      )}
                    </div>
                    <button className="px-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-r-lg">
                      <Search className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6 pointer-events-none" />
                  <Button
                    variant="outline"
                    className="w-full pl-10 h-14 justify-start font-normal text-muted-foreground text-lg"
                    onClick={() => setOpen(true)}
                  >
                    Which ingredient are you missing?
                  </Button>
                  <SearchDialog open={open} onOpenChange={setOpen} />
                </>
              )}
            </div>

            {/* Added Feature Badges */}
            <div className="flex justify-center gap-6 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  ✓
                </span>
                <span>50+ Ingredients</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  ✓
                </span>
                <span>Community Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  ✓
                </span>
                <span>Free to Use</span>
              </div>
            </div>
          </div>
        </section>

        {/* Video Demo Section in its own container */}
        <section className="mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Text Content */}
              <div className="text-left">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Never let a missing ingredient stop your baking.
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Choose from over 50+ proven baking substitutions, share your solutions, and become
                  a more confident baker. Your perfect alternative is just one search away.
                </p>
              </div>

              {/* Video Container with Badge */}
              <div>
                <div className="rounded-xl overflow-hidden shadow-2xl">
                  <div className="aspect-video">
                    <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
                      <source src="/demo.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>

                {/* Product Hunt Badge - Centered below video */}
                <div className="flex justify-center">
                  <a
                    href="https://www.producthunt.com/posts/bakingsubs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 transform hover:scale-105 transition-transform duration-200"
                  >
                    <img
                      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=270&theme=light"
                      alt="Featured on Product Hunt"
                      className="h-12"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Updated Popular Ingredients Section */}
        <section className="mt-24">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Popular Ingredient Alternatives
            </h2>
            <p className="mt-4 text-muted-foreground">
              Join hundreds of bakers who found their solution here
            </p>
          </div>

          <Carousel
            opts={{
              align: 'start',
              loop: true,
              dragFree: true,
              containScroll: false,
              slidesToScroll: 1,
            }}
            className="w-full max-w-7xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {commonIngredients.map((ingredient, index) => (
                <CarouselItem
                  key={ingredient.id}
                  className="pl-2 md:pl-4 basis-2/3 md:basis-[28.5%]"
                >
                  <div
                    onClick={() => router.push(`/ingredients/${ingredient.id}`)}
                    className="group rounded-xl overflow-hidden cursor-pointer bg-card border shadow-sm"
                  >
                    <div className="relative pt-[100%]">
                      <img
                        src={ingredient.image_url ?? 'https://placehold.co/400x400'}
                        alt={ingredient.name}
                        className="absolute inset-0 w-full h-full object-contain p-4 bg-white"
                      />
                    </div>
                    <div className="p-4 bg-card">
                      <h3 className="text-xl font-medium text-card-foreground">
                        {ingredient.name}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        Find alternatives <ChevronRight className="h-4 w-4" />
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      </div>
    </main>
  );
}
