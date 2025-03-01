import { getSubstitutionById } from '@/app/services/substitutionService';
import { JsonLd, generateSubstitutionJsonLd } from '@/app/utils/jsonLd';
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

  // Generate JSON-LD structured data
  const jsonLdData = generateSubstitutionJsonLd(
    substitution,
    substitution.from_ingredient,
    substitution.substitution_ingredients.map((si) => ({
      ingredient: si.ingredient,
      amount: si.amount,
      unit: si.unit,
      notes: si.notes || undefined,
    }))
  );

  return (
    <>
      {/* Add JSON-LD structured data */}
      <JsonLd data={jsonLdData} />
      <SubstitutionPageClient substitution={substitution} />
    </>
  );
}
