import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { getSubstitutionByIngredientId } from '@/services/substitutionService';
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

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { from } = await params;

  const { data: substitution, error } = await getSubstitutionByIngredientId(from);

  if (!substitution || error) {
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
  const { data: substitution, error } = await getSubstitutionByIngredientId(from);

  if (error || !substitution) {
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
          {/* <div className="flex items-center justify-between">
            <StarRating
              rating={substitution.rating}
              explanation={substitution.rating_explanation}
              className="text-xl"
            />
          </div> */}

          {/* Dietary & Allergen Tags */}
          {/* <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Dietary & Allergen Information
            </h2>
            <DietaryTags dietary={substitution.dietary_flags} allergens={substitution.allergens} />
          </div> */}

          {/* Substitution Amounts */}
          {/* <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
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
          </div> */}
        </div>

        {/* Effects Section */}
        <section className="space-y-4">
          {/* <h2 className="text-xl font-semibold">Effects on Your Baking</h2>
          <EffectsAccordion
            effects={{
              flavor: substitution.flavor_effects,
              texture: substitution.texture_effects,
              structure: substitution.structure_effects,
            }}
          /> */}
        </section>

        {/* Use Cases */}
        {/* <section className="space-y-4">
          <h2 className="text-xl font-semibold">Best Uses</h2>
          <UseCases bestFor={substitution.best_for} commonUses={substitution.common_uses} />
        </section> */}

        {/* Baking Adjustments */}
        {/* <section className="space-y-4">
          <h2 className="text-xl font-semibold">Baking Adjustments</h2>
          <BakingAdjustments
            temperature={substitution.temperature_adjustments}
            time={substitution.time_adjustments}
            tips={substitution.baking_tips}
          />
        </section> */}
      </div>
    </div>
  );
}
