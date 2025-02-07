import { getSubstitutionByIngredientId } from '@/app/services/substitutionService';
import { BakingAdjustments } from '@/components/BakingAdjustments';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { DietaryTags } from '@/components/DietaryTags';
import { EffectsAccordion } from '@/components/EffectsAccordion';
import { StarRating } from '@/components/StarRating';
import { UseCases } from '@/components/UseCases';
import { QueryData, QueryError } from '@supabase/supabase-js';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface SubstitutionIngredient {
  amount: number;
  unit: string;
  notes: string | null;
  ingredient: {
    id: string;
    name: string;
  };
}

interface Props {
  params: Promise<{
    from: string;
    to: string;
  }>;
}

async function getSubstitution(
  id: string
): Promise<QueryData<ReturnType<typeof getSubstitutionByIngredientId>> | QueryError> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/substitutions/${id}`, {
    next: { tags: ['substitution'] },
  });

  if (!response.ok) {
    const errorData: QueryError = await response.json();
    return errorData;
  }

  return response.json();
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { from } = await params;
  const substitution = await getSubstitution(from);

  if (!substitution || 'code' in substitution) {
    return {
      title: 'Substitution Not Found',
    };
  }

  return {
    title: `Substitute ${substitution.from_ingredient.name} with ${substitution.name} - Baking Guide`,
    description: `Learn how to substitute ${substitution.from_ingredient.name} with ${substitution.substitution_ingredients
      .map((si) => si.ingredient.name)
      .join(' + ')} in your baking, including its ${
      substitution.substitution_ingredients.length > 1
        ? 'effects on texture, flavor, structure, and more.'
        : 'effect on texture, flavor, structure, and more.'
    }`,
    keywords: [
      'baking substitution',
      substitution.from_ingredient.name,
      substitution.substitution_ingredients.map((si) => si.ingredient.name).join(' + '),
      'baking alternative',
      ...substitution.best_for,
    ],
  };
}

export default async function SubstitutionPage({ params }: Props) {
  const { from } = await params;
  const substitution = await getSubstitution(from);

  if (!substitution || 'code' in substitution) {
    notFound();
  }

  return (
    <div className="container max-w-4xl mx-auto py-4 px-4">
      <BreadcrumbNav
        items={[
          { label: 'Home', href: '/' },
          {
            label: `${substitution.from_ingredient.name} Substitutions`,
            href: `/ingredients/${substitution.from_ingredient.id}`,
          },
          {
            label: substitution.substitution_ingredients
              .map((si: SubstitutionIngredient) => si.ingredient.name)
              .join(' + '),
          },
        ]}
      />

      {/* Main Content */}
      <div className="space-y-6">
        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">
            Substituting {substitution.from_ingredient.name} with {substitution.name}
          </h1>

          {/* Desktop Rating & Ratio */}
          <div className="flex items-center justify-between">
            <StarRating rating={substitution.rating} className="text-xl" />
          </div>

          {/* Dietary & Allergen Tags */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Dietary & Allergen Information
            </h2>
            <DietaryTags dietary={substitution.dietary_flags} allergens={substitution.allergens} />
          </div>

          {/* Substitution Amounts */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Substitution Amounts
            </h2>
            {substitution.substitution_ingredients.map((si: SubstitutionIngredient) => (
              <div key={si.ingredient.id} className="flex items-center gap-2 mb-2">
                <span className="font-medium">{si.amount}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{si.unit}</span>
                <span>{si.ingredient.name}</span>
                {si.notes && <span className="text-sm text-gray-500">({si.notes})</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Effects Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Effects on Your Baking</h2>
          <EffectsAccordion
            effects={{
              flavor: substitution.flavor_effects,
              texture: substitution.texture_effects,
              structure: substitution.structure_effects,
            }}
          />
        </section>

        {/* Use Cases */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Best Uses</h2>
          <UseCases bestFor={substitution.best_for} commonUses={substitution.common_uses} />
        </section>

        {/* Baking Adjustments */}
        <section className="space-y-4">
          <BakingAdjustments
            time={substitution.time_adjustments as { change?: string; note?: string }}
            tips={substitution.baking_tips}
          />
        </section>
      </div>
    </div>
  );
}
