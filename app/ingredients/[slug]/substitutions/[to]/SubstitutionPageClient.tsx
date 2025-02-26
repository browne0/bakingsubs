'use client';

import { NutritionLabel } from '@/app/components/NutritionLabel';
import { getSubstitutionById } from '@/app/services/substitutionService';
import { decimalToFraction } from '@/app/utils/fractions';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { RateSubstitution } from '@/components/RateSubstitution';
import { StarRating } from '@/components/StarRating';
import { UseCases } from '@/components/UseCases';
import { useMediaQuery } from '@/hooks/use-media-query';
import { QueryData } from '@supabase/supabase-js';

interface SubstitutionPageClientProps {
  substitution: QueryData<ReturnType<typeof getSubstitutionById>>;
}

interface SubstitutionIngredient {
  amount: number;
  unit: string;
  notes: string | null;
  ingredient: {
    id: string;
    name: string;
  };
}

interface SubstitutionEffects {
  flavor?: string;
  texture?: string;
  structure?: string;
}

export function SubstitutionPageClient({ substitution }: SubstitutionPageClientProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const sections = [
    { id: 'uses', label: 'Best Uses' },
    { id: 'effects', label: 'Effects' },
    { id: 'nutrition', label: 'Nutrition' },
  ];

  // Split into two separate components
  const DietaryTags = () => (
    <>
      {substitution.dietary_flags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {substitution.dietary_flags.map((flag) => (
            <span
              key={flag}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100"
            >
              {flag}
            </span>
          ))}
        </div>
      )}
    </>
  );

  const AllergenTags = () => (
    <>
      {substitution.allergens.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {substitution.allergens.map((allergen) => (
            <span
              key={allergen}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100"
            >
              Contains {allergen}
            </span>
          ))}
        </div>
      )}
    </>
  );

  // Update QuickInfoSection to only show dietary tags
  const QuickInfoSection = () => (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <h2 className="font-medium mb-3">Substitution Amounts</h2>
        <div className="mb-4 pb-3 border-b">
          <div className="text-sm text-muted-foreground mb-1">Replace</div>
          <div className="flex items-center">
            <span className="font-medium mr-1">{decimalToFraction(substitution.amount)}</span>
            <span className="text-sm text-muted-foreground">{substitution.unit}</span>
            <span className="ml-2">{substitution.from_ingredient.name}</span>
          </div>
        </div>

        <div className="text-sm text-muted-foreground mb-2">With</div>
        {substitution.substitution_ingredients.map((si: SubstitutionIngredient) => (
          <div key={si.ingredient.id} className="flex items-center mb-2">
            <span className="font-medium mr-1">{decimalToFraction(si.amount)}</span>
            <span className="text-sm text-muted-foreground">{si.unit}</span>
            <span className="ml-2">{si.ingredient.name}</span>
            {si.notes && <span className="text-sm text-muted-foreground ml-1">({si.notes})</span>}
          </div>
        ))}
      </div>

      {isDesktop && substitution.dietary_flags.length > 0 && (
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h2 className="font-medium mb-3">Dietary Information</h2>
          <DietaryTags />
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background" />
        <div className="container max-w-5xl mx-auto py-8 px-4 relative">
          <BreadcrumbNav
            items={[
              { label: 'Home', href: '/' },
              { label: 'Ingredients', href: '/ingredients' },
              {
                label: substitution.from_ingredient.name,
                href: `/ingredients/${substitution.from_ingredient.id}`,
              },
              {
                label: 'Substitutions',
                href: `/ingredients/${substitution.from_ingredient.id}/substitutions`,
              },
              {
                label: substitution.name,
              },
            ]}
          />

          <div className="mt-6 space-y-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-6">
                <h1 className="text-3xl md:text-4xl font-bold">
                  Substituting {substitution.from_ingredient.name} with{' '}
                  <span className="text-primary">{substitution.name}</span>
                </h1>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <StarRating rating={substitution.rating} className="text-xl" />
                    <span className="text-sm text-muted-foreground">
                      {substitution.rating.toFixed(1)} ({substitution.rating_count})
                    </span>
                  </div>

                  {!isDesktop && <DietaryTags />}
                  <AllergenTags />
                </div>
              </div>

              {substitution.image_url && (
                <div className="md:w-1/3">
                  <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={substitution.image_url}
                      alt={`${substitution.from_ingredient.name} substituted with ${substitution.name}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Navigation */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container max-w-5xl mx-auto px-4">
          <nav className="flex gap-6 overflow-x-auto">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="py-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border-b-2 border-transparent hover:border-primary"
              >
                {section.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-5xl mx-auto px-4 py-8">
        {isDesktop ? (
          // Desktop Layout
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <QuickInfoSection />
              <div id="nutrition" className="mt-6 scroll-mt-16">
                <NutritionLabel
                  nutrition={substitution.from_ingredient}
                  amount={substitution.amount}
                  unit={substitution.unit}
                  substitutionIngredients={substitution.substitution_ingredients}
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-8">
              {/* Use Cases */}
              <section id="uses" className="scroll-mt-16">
                <h2 className="text-2xl font-semibold mb-4">Best Uses</h2>
                <UseCases bestFor={substitution.best_for} commonUses={substitution.common_uses} />
              </section>
              {/* Effects Section */}
              {substitution.effects && (
                <section id="effects" className="scroll-mt-16">
                  <h2 className="text-2xl font-semibold mb-8">Effects on Your Baking</h2>
                  <div className="space-y-12">
                    {typeof substitution.effects === 'object' && (
                      <>
                        {(substitution.effects as SubstitutionEffects).flavor && (
                          <div className="max-w-3xl">
                            <div className="border-primary ">
                              <h3 className="text-xl font-medium mb-4">Flavor Impact</h3>
                              <p className="text-lg leading-relaxed text-muted-foreground">
                                {(substitution.effects as SubstitutionEffects).flavor}
                              </p>
                            </div>
                          </div>
                        )}

                        {(substitution.effects as SubstitutionEffects).texture && (
                          <div className="max-w-3xl">
                            <div className="border-primary ">
                              <h3 className="text-xl font-medium mb-4">Texture Changes</h3>
                              <p className="text-lg leading-relaxed text-muted-foreground">
                                {(substitution.effects as SubstitutionEffects).texture}
                              </p>
                            </div>
                          </div>
                        )}

                        {(substitution.effects as SubstitutionEffects).structure && (
                          <div className="max-w-3xl">
                            <div className="border-primary ">
                              <h3 className="text-xl font-medium mb-4">Structural Effects</h3>
                              <p className="text-lg leading-relaxed text-muted-foreground">
                                {(substitution.effects as SubstitutionEffects).structure}
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>
        ) : (
          // Mobile Layout
          <div className="space-y-8">
            <QuickInfoSection />

            <section id="uses" className="scroll-mt-16">
              <h2 className="text-2xl font-semibold mb-4">Best Uses</h2>
              <UseCases bestFor={substitution.best_for} commonUses={substitution.common_uses} />
            </section>

            {substitution.effects && (
              <section id="effects" className="scroll-mt-16">
                <h2 className="text-2xl font-semibold mb-8">Effects on Your Baking</h2>
                <div className="space-y-12">
                  {typeof substitution.effects === 'object' && (
                    <>
                      {(substitution.effects as SubstitutionEffects).flavor && (
                        <div className="max-w-3xl">
                          <div className="border-primary ">
                            <h3 className="text-xl font-medium mb-4">Flavor Impact</h3>
                            <p className="text-lg leading-relaxed text-muted-foreground">
                              {(substitution.effects as SubstitutionEffects).flavor}
                            </p>
                          </div>
                        </div>
                      )}

                      {(substitution.effects as SubstitutionEffects).texture && (
                        <div className="max-w-3xl">
                          <div className="border-primary ">
                            <h3 className="text-xl font-medium mb-4">Texture Changes</h3>
                            <p className="text-lg leading-relaxed text-muted-foreground">
                              {(substitution.effects as SubstitutionEffects).texture}
                            </p>
                          </div>
                        </div>
                      )}

                      {(substitution.effects as SubstitutionEffects).structure && (
                        <div className="max-w-3xl">
                          <div className="border-primary ">
                            <h3 className="text-xl font-medium mb-4">Structural Effects</h3>
                            <p className="text-lg leading-relaxed text-muted-foreground">
                              {(substitution.effects as SubstitutionEffects).structure}
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </section>
            )}

            <section id="nutrition" className="scroll-mt-16">
              <NutritionLabel
                nutrition={substitution.from_ingredient}
                amount={substitution.amount}
                unit={substitution.unit}
                substitutionIngredients={substitution.substitution_ingredients}
              />
            </section>
          </div>
        )}
      </div>

      <section className="container max-w-5xl mx-auto px-4 py-8">
        <RateSubstitution substitutionId={substitution.id} currentRating={substitution.rating} />
      </section>
    </>
  );
}
