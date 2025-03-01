import { getIngredientBySlug } from '@/app/services/ingredientService';
import { getSubstitutionsByIngredientId } from '@/app/services/substitutionService';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { IngredientPageClient } from './IngredientPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ingredient = await getIngredientBySlug(slug);

  if (!ingredient) {
    return {
      title: 'Ingredient Not Found',
      description: 'The requested ingredient could not be found',
    };
  }

  return {
    title: `${ingredient.name} - Baking Substitutions`,
    description: `Learn about ${ingredient.name} and discover the best substitutions for your baking recipes`,
    openGraph: {
      title: `${ingredient.name} - Baking Substitutions | BakingSubs`,
      description: `Learn about ${ingredient.name} and discover the best substitutions for your baking recipes`,
      images: [
        {
          url: ingredient.image_url || '/images/og-default.jpg',
          width: 1200,
          height: 630,
          alt: `${ingredient.name} - Baking Substitutions`,
        },
      ],
    },
  };
}

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
