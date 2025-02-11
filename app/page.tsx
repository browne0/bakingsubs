import { getCommonIngredients } from '@/app/services/ingredientService';
import { HomePageClient } from './HomePageClient';

export default async function HomePage() {
  const commonIngredients = await getCommonIngredients();
  return <HomePageClient initialCommonIngredients={commonIngredients} />;
}
