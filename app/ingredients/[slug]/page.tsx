import { getIngredientBySlug } from '@/app/services/ingredientService';
import { getSubstitutionsByIngredientId } from '@/app/services/substitutionService';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { SubstitutionCard } from '@/components/SubstitutionCard';
import { notFound } from 'next/navigation';

export default async function IngredientPage({ params }: { params: Promise<{ slug: string }> }) {
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
        {substitutions.map((substitution) => (
          <SubstitutionCard key={substitution.id} substitution={substitution} />
        ))}
      </div>
    </div>
  );
}
