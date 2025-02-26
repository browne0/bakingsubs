'use client';

import {
  ALLERGENS_OPTIONS,
  CATEGORY_OPTIONS,
  COMMON_IN_OPTIONS,
  DIETARY_FLAGS_OPTIONS,
  FUNCTION_OPTIONS,
} from '@/app/admin/constants';
import { NutritionLabel } from '@/app/components/NutritionLabel';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { SubstitutionCard } from '@/components/SubstitutionCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tables } from '@/database.types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface IngredientPageClientProps {
  ingredient: Tables<'ingredients'>;
  substitutions: Tables<'substitutions'>[];
}

export function IngredientPageClient({ ingredient, substitutions }: IngredientPageClientProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto py-4 px-4 sm:py-8">
        <BreadcrumbNav
          items={[
            { label: 'Home', href: '/' },
            { label: 'Ingredients', href: '/ingredients' },
            { label: ingredient.name },
          ]}
        />

        {/* Hero Section */}
        <div className="mt-8 grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Image */}
          <div className="lg:col-span-5">
            <div className="relative aspect-square w-full max-w-md mx-auto rounded-xl overflow-hidden bg-muted">
              {ingredient.image_url ? (
                <img
                  src={ingredient.image_url}
                  alt={ingredient.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="https://placehold.co/800x800"
                  alt="Placeholder"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Right Column - Key Info */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold">{ingredient.name}</h1>
                {ingredient.category && (
                  <p className="text-muted-foreground mt-2">
                    {CATEGORY_OPTIONS.find((cat) => cat.value === ingredient.category)?.label}
                  </p>
                )}
              </div>

              {ingredient.notes && (
                <div className="prose dark:prose-invert max-w-none">
                  <p>{ingredient.notes}</p>
                </div>
              )}

              {/* Quick Facts */}
              <div className="grid grid-cols-2 gap-4">
                {ingredient.functions && ingredient.functions.length > 0 && (
                  <Card className="p-4">
                    <h3 className="font-medium mb-2">Functions</h3>
                    <div className="flex flex-wrap gap-2">
                      {ingredient.functions.map((func) => (
                        <span
                          key={func}
                          className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm"
                        >
                          {FUNCTION_OPTIONS.find((f) => f.value === func)?.label || func}
                        </span>
                      ))}
                    </div>
                  </Card>
                )}

                {ingredient.dietary_flags && ingredient.dietary_flags.length > 0 && (
                  <Card className="p-4">
                    <h3 className="font-medium mb-2">Dietary Info</h3>
                    <div className="flex flex-wrap gap-2">
                      {ingredient.dietary_flags.map((flag) => (
                        <span
                          key={flag}
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded-md text-sm"
                        >
                          {DIETARY_FLAGS_OPTIONS.find((f) => f.value === flag)?.label || flag}
                        </span>
                      ))}
                    </div>
                  </Card>
                )}
              </div>

              {/* Allergen Warning */}
              {ingredient.allergens && ingredient.allergens.length > 0 && (
                <Card className="p-4 border-red-200 bg-red-50 dark:bg-red-900/10">
                  <h3 className="font-medium mb-2 text-red-600 dark:text-red-400">
                    Allergen Warning
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {ingredient.allergens.map((allergen) => (
                      <span
                        key={allergen}
                        className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 px-2 py-1 rounded-md text-sm"
                      >
                        {ALLERGENS_OPTIONS.find((a) => a.value === allergen)?.label || allergen}
                      </span>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="mt-16 grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Common Uses Section */}
            {ingredient.common_in && ingredient.common_in.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-6">Common Uses</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {ingredient.common_in.map((use) => (
                    <Card key={use} className="p-4">
                      <span className="text-lg">
                        {COMMON_IN_OPTIONS.find((u) => u.value === use)?.label || use}
                      </span>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Substitutions Section */}
            {substitutions && substitutions.length > 0 && (
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold">Top Substitutions</h2>
                  <Link href={`/ingredients/${ingredient.id}/substitutions`}>
                    <Button variant="ghost" size="sm">
                      View all <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {substitutions.slice(0, 4).map((substitution) => (
                    <SubstitutionCard key={substitution.id} substitution={substitution} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:sticky lg:top-8 space-y-6 h-fit">
            <NutritionLabel
              nutrition={{
                calories: ingredient.calories,
                fat: ingredient.fat,
                carbohydrates: ingredient.carbohydrates,
                protein: ingredient.protein,
                sodium: ingredient.sodium,
                fiber: ingredient.fiber,
                sugar: ingredient.sugar,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
