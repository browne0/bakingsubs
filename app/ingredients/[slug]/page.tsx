import { getIngredientBySlug } from '@/app/services/ingredientService';
import { getSubstitutionsByIngredientId } from '@/app/services/substitutionService';
import { notFound } from 'next/navigation';
import { IngredientPageClient } from './IngredientPageClient';

export default async function IngredientPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const ingredient = await getIngredientBySlug(slug);
  if (!ingredient) {
    notFound();
  }

  const { data: substitutions = [], error: substitutionsError } =
    await getSubstitutionsByIngredientId(slug);

  if (substitutionsError) {
    throw substitutionsError;
  }

  return <IngredientPageClient ingredient={ingredient} substitutions={substitutions ?? []} />;
}
