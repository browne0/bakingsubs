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
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <BreadcrumbNav
        items={[
          { label: 'Home', href: '/' },
          { label: 'Ingredients', href: '/ingredients' },
          { label: ingredient.name },
        ]}
      />

      <div className="grid md:grid-cols-3 gap-8 mt-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {ingredient.image_url && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={ingredient.image_url}
                alt={ingredient.name}
                width="800"
                height="400"
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <div>
            <h1 className="text-4xl font-bold mb-4">{ingredient.name}</h1>
            {ingredient.notes && <p className="text-muted-foreground">{ingredient.notes}</p>}
          </div>

          {/* Properties */}
          <div className="grid sm:grid-cols-2 gap-4">
            {ingredient.category && (
              <Card className="p-4">
                <h3 className="font-medium mb-2">Category</h3>
                <p>
                  {CATEGORY_OPTIONS.find((cat) => cat.value === ingredient.category)?.label ||
                    ingredient.category}
                </p>
              </Card>
            )}

            {ingredient.functions && ingredient.functions.length > 0 && (
              <Card className="p-4">
                <h3 className="font-medium mb-2">Functions</h3>
                <div className="flex flex-wrap gap-2">
                  {ingredient.functions.map((func) => (
                    <span key={func} className="bg-muted px-2 py-1 rounded-md text-sm">
                      {FUNCTION_OPTIONS.find((f) => f.value === func)?.label || func}
                    </span>
                  ))}
                </div>
              </Card>
            )}

            {ingredient.common_in && ingredient.common_in.length > 0 && (
              <Card className="p-4">
                <h3 className="font-medium mb-2">Common Uses</h3>
                <div className="flex flex-wrap gap-2">
                  {ingredient.common_in.map((use) => (
                    <span key={use} className="bg-muted px-2 py-1 rounded-md text-sm">
                      {COMMON_IN_OPTIONS.find((u) => u.value === use)?.label || use}
                    </span>
                  ))}
                </div>
              </Card>
            )}

            {ingredient.dietary_flags && ingredient.dietary_flags.length > 0 && (
              <Card className="p-4">
                <h3 className="font-medium mb-2">Dietary Information</h3>
                <div className="flex flex-wrap gap-2">
                  {ingredient.dietary_flags.map((flag) => (
                    <span
                      key={flag}
                      className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm"
                    >
                      {DIETARY_FLAGS_OPTIONS.find((f) => f.value === flag)?.label || flag}
                    </span>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Top Substitutions */}
          {substitutions && substitutions.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Top Substitutions</h2>
                <Link href={`/ingredients/${ingredient.id}/substitutions`}>
                  <Button variant="ghost">
                    View all <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {substitutions.slice(0, 3).map((substitution) => (
                  <SubstitutionCard key={substitution.id} substitution={substitution} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Nutrition Facts */}
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

          {/* Allergens */}
          {ingredient.allergens && ingredient.allergens.length > 0 && (
            <Card className="p-4">
              <h3 className="font-medium mb-2 text-red-500">Allergen Warning</h3>
              <div className="flex flex-wrap gap-2">
                {ingredient.allergens.map((allergen) => (
                  <span
                    key={allergen}
                    className="bg-red-50 text-red-700 px-2 py-1 rounded-md text-sm"
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
  );
}
