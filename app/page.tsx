import { getCommonIngredients } from '@/app/services/ingredientService';
import { ogImage } from '@/lib/metadata';
import { Metadata } from 'next';
import { HomePageClient } from './HomePageClient';
export const metadata: Metadata = {
  title: 'BakingSubs - Your Definitive Baking Substitution Guide',
  description:
    'Discover expert baking substitutions with detailed explanations of how each alternative affects your baked goods. Find the perfect ingredient swap based on your recipe type and needs.',
  openGraph: {
    title: 'BakingSubs - Your Definitive Baking Substitution Guide',
    description:
      'Discover expert baking substitutions with detailed explanations of how each alternative affects your baked goods. Find the perfect ingredient swap based on your recipe type and needs.',
    ...ogImage,
  },
};

export default async function HomePage() {
  const commonIngredients = await getCommonIngredients();
  return <HomePageClient initialCommonIngredients={commonIngredients} />;
}
