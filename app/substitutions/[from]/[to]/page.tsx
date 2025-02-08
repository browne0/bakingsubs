import { getSubstitutionById } from '@/app/services/substitutionService';
import { decimalToFraction } from '@/app/utils/fractions';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { RateSubstitution } from '@/components/RateSubstitution';
import { StarRating } from '@/components/StarRating';
import { UseCases } from '@/components/UseCases';
import { QueryData } from '@supabase/supabase-js';
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

interface SubstitutionEffects {
  flavor?: string;
  texture?: string;
  structure?: string;
}

interface ErrorResponse {
  error: string;
}

interface Props {
  params: Promise<{
    from: string;
    to: string;
  }>;
}

async function getSubstitution(
  id: string
): Promise<QueryData<ReturnType<typeof getSubstitutionById>> | ErrorResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/substitutions/${id}`, {
    next: { tags: ['substitution'] },
  });

  const data = await response.json();

  if (!response.ok) {
    return data as ErrorResponse;
  }

  return data;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { to } = await params;
  const substitution = await getSubstitution(to);

  if (!substitution || 'code' in substitution || 'error' in substitution) {
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
      'baking substitutions',
      substitution.from_ingredient.name,
      substitution.substitution_ingredients.map((si) => si.ingredient.name).join(' + '),
      'baking alternative',
      'baking alternatives',
      `baking substitute for ${substitution.from_ingredient.name}`,
      `baking alternative for ${substitution.from_ingredient.name}`,
    ],
  };
}

export default async function SubstitutionPage({ params }: Props) {
  const { to } = await params;
  const substitution = await getSubstitution(to);

  if ('error' in substitution) {
    if (substitution.error === 'Substitution not found') {
      notFound();
    }
    throw new Error(substitution.error);
  }

  console.log(substitution);
  const sections = [
    { id: 'effects', label: 'Effects' },
    { id: 'uses', label: 'Best Uses' },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background" />
        <div className="container max-w-4xl mx-auto py-8 px-4 relative">
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

          <div className="mt-6 space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold">
              Substituting {substitution.from_ingredient.name} with{' '}
              <span className="text-primary">{substitution.name}</span>
            </h1>

            <div className="flex items-center gap-4">
              <StarRating rating={substitution.rating} className="text-xl" />
              <span className="text-sm text-muted-foreground">
                {substitution.rating.toFixed(1)} ({substitution.rating_count})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Navigation */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container max-w-4xl mx-auto px-4">
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
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Left Column - Quick Info */}
          <div className="space-y-6">
            {/* Substitution Amounts */}
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <h2 className="font-medium mb-3">Substitution Amounts</h2>
              {substitution.substitution_ingredients.map((si: SubstitutionIngredient) => (
                <div key={si.ingredient.id} className="flex items-center mb-2">
                  <span className="font-medium mr-1">{decimalToFraction(si.amount)}</span>
                  <span className="text-sm text-muted-foreground">{si.unit}</span>
                  <span className="ml-2">{si.ingredient.name}</span>
                  {si.notes && (
                    <span className="text-sm text-muted-foreground ml-1">({si.notes})</span>
                  )}
                </div>
              ))}
            </div>

            {/* Dietary Information */}
            {substitution.dietary_flags.length > 0 && (
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <h2 className="font-medium mb-3">Dietary Information</h2>
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
              </div>
            )}

            {/* Allergen Information */}
            {substitution.allergens.length > 0 && (
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <h2 className="font-medium mb-3">Allergen Information</h2>
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
              </div>
            )}
          </div>

          {/* Right Column - Detailed Info */}
          <div className="md:col-span-2 space-y-8">
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

            {/* Use Cases */}
            <section id="uses" className="scroll-mt-16">
              <h2 className="text-2xl font-semibold mb-4">Best Uses</h2>
              <UseCases bestFor={substitution.best_for} commonUses={substitution.common_uses} />
            </section>
          </div>
        </div>
      </div>

      <section className="container max-w-4xl mx-auto px-4 py-8">
        <RateSubstitution substitutionId={substitution.id} currentRating={substitution.rating} />
      </section>
    </>
  );
}
