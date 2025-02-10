import { getSubstitutionById } from '@/app/services/substitutionService';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SubstitutionPageClient } from './SubstitutionPageClient';

interface Props {
  params: Promise<{
    slug: string;
    to: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { to } = await params;
  const { data: substitution, error } = await getSubstitutionById(to);

  if (error || !substitution) {
    return {
      title: 'Substitution Not Found',
    };
  }

  return {
    title: `Substitute ${substitution.from_ingredient.name} with ${substitution.name}`,
    description: `Learn how to substitute ${substitution.from_ingredient.name} with ${substitution.substitution_ingredients
      .map((si) => si.ingredient.name)
      .join(' + ')} in your baking`,
  };
}

export default async function SubstitutionPage({ params }: Props) {
  const { to } = await params;
  const { data: substitution, error } = await getSubstitutionById(to);

  if (error || !substitution) {
    notFound();
  }

  return <SubstitutionPageClient substitution={substitution} />;
}
