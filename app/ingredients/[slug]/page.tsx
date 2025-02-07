import { getIngredientBySlug } from '@/app/services/ingredientService';
import { getSubstitutionsByIngredientId } from '@/app/services/substitutionService';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { SubstitutionCard } from '@/components/SubstitutionCard';
import { notFound } from 'next/navigation';

export default async function IngredientPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const ingredient = await getIngredientBySlug(slug);
  if (!ingredient) {
    notFound();
  }

  const { data: substitutions, error: substitutionsError } =
    await getSubstitutionsByIngredientId(slug);

  if (substitutionsError) {
    throw substitutionsError;
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <BreadcrumbNav
        items={[
          { label: 'Home', href: '/' },
          { label: 'Ingredients', href: '/ingredients' },
          { label: ingredient.name },
        ]}
      />
      <h1 className="text-3xl font-bold mb-2">{ingredient.name}</h1>
      <p className="text-muted-foreground mb-8">Top substitution options</p>

      <div className="grid gap-6 md:grid-cols-3">
        {substitutions.map((sub) => (
          <SubstitutionCard
            key={sub.id}
            fromSlug={sub.original_ingredient_id}
            toSlug={sub.id}
            name={sub.name}
            rating={sub.rating || 0}
            bestFor={sub.best_for}
            dietaryFlags={sub.dietary_flags}
            effects={sub.effects as { texture?: string; flavor?: string; structure?: string }}
          />
        ))}
      </div>
    </div>
  );
}
