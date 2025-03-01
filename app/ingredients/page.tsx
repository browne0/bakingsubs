import { searchIngredientsWithSubstitutions } from '@/app/services/ingredientService';
import { ogImage } from '@/lib/metadata';
import { Metadata } from 'next';
import { IngredientsPageClient } from './IngredientsPageClient';

export const metadata: Metadata = {
  title: 'Baking Ingredients and Substitutions',
  description:
    'Browse our comprehensive list of baking ingredients and discover perfect substitutions for your recipes',
  openGraph: {
    title: 'Baking Ingredients and Substitutions - BakingSubs',
    description:
      'Browse our comprehensive list of baking ingredients and discover perfect substitutions for your recipes',
    ...ogImage,
  },
};

export default async function IngredientsPage() {
  const ingredients = await searchIngredientsWithSubstitutions('');
  return <IngredientsPageClient initialIngredients={ingredients} />;
}
