'use client';

import BackgroundImage from '@/app/images/bg.webp';
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
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Form } from '@/components/ui/form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import HappyBaker from '@/app/images/happy_baker.jpg';

interface HomePageClientProps {
  initialCommonIngredients: Tables<'ingredients'>[];
}

interface RecentSearch {
  id: string;
  name: string;
}

const MAX_RECENT_SEARCHES = 3;

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
});

type FormValues = z.infer<typeof formSchema>;

export function HomePageClient({ initialCommonIngredients }: HomePageClientProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const router = useRouter();
  const commandRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Debounced search query
  const debouncedQuery = useMemo(() => debounce((q: string) => setSearchQuery(q), 300), []);

  // Update the search query to use the API
  const { data: searchResults = [], isLoading: searchLoading } = useQuery({
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

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      toast.success('Successfully subscribed to newsletter!');
      form.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to subscribe');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[60vh] md:min-h-[55vh] flex items-center">
        {/* Background Image */}
        <Image
          src={BackgroundImage}
          alt="Baking background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 z-[1]" />

        {/* Content */}
        <div className="container relative z-[2] py-8 sm:py-16 mx-auto px-4">
          <div className="max-w-2xl">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-8 bg-white/10 backdrop-blur-sm px-2.5 sm:px-4 py-1 sm:py-2 rounded-full">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              <span className="text-[11px] sm:text-sm text-white/90 drop-shadow-md">
                Trusted by 100+ home bakers
              </span>
            </div>

            <h1 className="text-[28px] sm:text-3xl md:text-4xl tracking-tight font-[500] text-shadow">
              <span className="font-bold text-white leading-tight">Rescue Your Recipe With</span>
              <span className="block text-white mt-1 sm:mt-2 font-bold leading-tight">
                Ingredients From Your Pantry
              </span>
            </h1>

            <p className="mt-3 sm:mt-6 text-[15px] sm:text-lg leading-[1.6] sm:leading-8 text-white/90 max-w-xl text-shadow">
              Find detailed, community-tested baking substitutions for your bake in seconds.
            </p>

            {/* Search Section */}
            <div className="mt-6 sm:mt-10">
              <div className="relative flex shadow-xl rounded-lg">
                {isDesktop ? (
                  <div className="relative w-full">
                    <div className="flex">
                      <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <input
                          ref={inputRef}
                          type="text"
                          placeholder="Which ingredient are you missing?"
                          className="w-full h-16 pl-12 pr-4 text-lg rounded-l-lg bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-0 border-none"
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
                                {searchLoading ? (
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
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Button
                      variant="outline"
                      className="w-full pl-10 h-12 sm:h-14 justify-start font-normal text-muted-foreground text-base sm:text-lg"
                      onClick={() => setOpen(true)}
                    >
                      Which ingredient are you missing?
                    </Button>
                    <SearchDialog open={open} onOpenChange={setOpen} />
                  </>
                )}
              </div>

              {/* Feature Badges */}
              <div className="flex flex-col sm:flex-row justify-start gap-3 sm:gap-6 mt-4 sm:mt-6 text-xs sm:text-sm text-white/90 drop-shadow-md">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-[10px] sm:text-xs text-white text-shadow">
                    ✓
                  </span>
                  <span>50+ Ingredients</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-[10px] sm:text-xs text-white text-shadow">
                    ✓
                  </span>
                  <span>Community Verified</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-[10px] sm:text-xs text-white text-shadow">
                    ✓
                  </span>
                  <span>Free to Use</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Demo Section in its own container */}
      <section className="mt-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="text-left">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Never let a missing ingredient stop your baking.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Choose from over 50+ proven baking substitutions, share your solutions, and become a
                more confident baker. Your perfect alternative is just one search away.
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

      {/* Value Proposition Section */}
      <section className="mt-24 bg-gradient-to-b from-background via-amber-50/50 to-amber-800/5">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Bake with Confidence, Every Time
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Turn missing ingredients into successful recipe adaptations with substitutions that
                are scientifically sound and proven by real bakers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <UtensilsCrossed className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Recipe-Specific Solutions</h3>
                <p className="text-muted-foreground">
                  Not all substitutes work in every recipe. Get recommendations tailored to what
                  you're baking, whether it's cookies, bread, or cakes.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Proven by Real Bakers</h3>
                <p className="text-muted-foreground">
                  Every substitution is tested and rated by our community. See real results and tips
                  from bakers who've tried it before.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Understand the Science</h3>
                <p className="text-muted-foreground">
                  Learn how each substitute affects your bake's texture, taste, and rise. Make
                  informed decisions with our detailed explanations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase Section */}
      <section className="mt-24 mb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Why Use BakingSubs?</h2>
                <div className="mt-8 space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Get Context-Aware Recommendations
                      </h3>
                      <p className="text-muted-foreground">
                        Get substitutions that consider your specific recipe type, dietary
                        restrictions, and available ingredients.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <UtensilsCrossed className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Gain Access To Our Comprehensive Catalog
                      </h3>
                      <p className="text-muted-foreground">
                        Access our growing list of ingredients with multiple verified substitution
                        options for each one.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Search className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Get Instant Results</h3>
                      <p className="text-muted-foreground">
                        Find your perfect substitution in seconds.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square md:aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={HappyBaker.src}
                    alt="BakingSubs Features"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-card shadow-xl rounded-xl p-3 sm:p-4 max-w-[calc(100%-2rem)] sm:max-w-xs">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                    <p className="font-semibold text-sm sm:text-base">Trusted by 100+ Bakers</p>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Join our growing community of successful home bakers using verified
                    substitutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-muted-foreground">
                Common things we get from asked from bakers just like you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="what-is-bakingsubs">
                    <AccordionTrigger>What is BakingSubs?</AccordionTrigger>
                    <AccordionContent>
                      BakingSubs is the definitive resource for baking substitutions, helping you
                      find the perfect ingredient alternatives for your recipes.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="how-many-ingredients">
                    <AccordionTrigger>
                      How many ingredients do you have substitutions for?
                    </AccordionTrigger>
                    <AccordionContent>
                      We currently offer substitutions for over 50 common baking ingredients, with
                      our database growing regularly.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="are-substitutions-tested">
                    <AccordionTrigger>
                      Are your baking substitutions tested and verified?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes, all our substitutions are community-tested and verified by experienced
                      bakers. Each alternative includes detailed information about how it affects
                      texture, taste, and the final result of your baked goods.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="egg-substitutes">
                    <AccordionTrigger>What can I substitute for eggs in baking?</AccordionTrigger>
                    <AccordionContent>
                      Common egg substitutes include mashed bananas, applesauce, ground flaxseed
                      mixed with water, commercial egg replacers, or silken tofu. The best
                      substitute depends on your specific recipe and dietary needs.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="butter-substitutes">
                    <AccordionTrigger>How do I substitute butter in a recipe?</AccordionTrigger>
                    <AccordionContent>
                      Butter can be substituted with oil, margarine, applesauce, Greek yogurt, or
                      coconut oil depending on the recipe. Each substitute will affect the texture
                      and taste differently, and our detailed guides help you choose the best option
                      for your specific bake.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="space-y-2">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="is-free">
                    <AccordionTrigger>Is BakingSubs free to use?</AccordionTrigger>
                    <AccordionContent>
                      Yes, BakingSubs is completely free to use. You can access all our substitution
                      guides, community recommendations, and detailed explanations without any cost.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="substitution-ratios">
                    <AccordionTrigger>How do you determine substitution ratios?</AccordionTrigger>
                    <AccordionContent>
                      Our substitution ratios are based on extensive testing, community feedback,
                      and food science principles. We consider factors like moisture content,
                      binding properties, and leavening effects to provide accurate conversion
                      rates.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="gluten-free">
                    <AccordionTrigger>
                      Can I find gluten-free baking substitutions?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes, we offer comprehensive guides for gluten-free substitutions, including
                      different flour alternatives and binding agents. Each substitute comes with
                      specific measurements and tips for successful gluten-free baking.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="best-substitute">
                    <AccordionTrigger>
                      How do I know which substitute will work best in my recipe?
                    </AccordionTrigger>
                    <AccordionContent>
                      Our platform provides detailed information about how each substitute affects
                      texture, taste, and structure. We categorize substitutes by recipe type
                      (cookies, cakes, breads, etc.) and include success rates and community tips to
                      help you make the best choice.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="contribute">
                    <AccordionTrigger>
                      Can I contribute my own substitution experiences?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes! BakingSubs is community-driven, and we encourage users to share their
                      successful substitution experiences and tips. All contributions are reviewed
                      and verified before being added to our database.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Updated Popular Ingredients Section */}
      <section className="mt-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Popular Ingredient Alternatives
            </h2>
            <p className="mt-4 text-muted-foreground">
              Join hundreds of bakers who found their solution here.
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
            className="w-full"
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
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="relative mt-24 py-16 bg-gradient-to-r from-amber-800/10 via-amber-50/20 to-background border-y">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Never Miss a Substitution
              </h2>

              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join 100+ home bakers who receive weekly baking substitutions, expert tips, and
                exclusive recipes.
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Your name" className="h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Your email"
                              className="h-12"
                              required
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={isLoading} size="lg" className="h-12 px-8">
                      {isLoading ? 'Subscribing...' : 'Subscribe'}
                    </Button>
                  </div>
                </form>
              </Form>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm">Weekly Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm">Expert Tips</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm">Free Forever</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
