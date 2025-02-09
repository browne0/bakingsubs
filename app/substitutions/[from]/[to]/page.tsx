import { getSubstitutionById } from '@/app/services/substitutionService';
import { QueryData } from '@supabase/supabase-js';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SubstitutionPageClient } from './SubstitutionPageClient';

interface Props {
  params: Promise<{
    from: string;
    to: string;
  }>;
}

interface ErrorResponse {
  error: string;
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

  return <SubstitutionPageClient substitution={substitution} />;
}
