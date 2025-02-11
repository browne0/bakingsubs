import { searchIngredientsWithSubstitutions } from '@/app/services/ingredientService';
import { IngredientsPageClient } from './IngredientsPageClient';

export default async function IngredientsPage() {
  const ingredients = await searchIngredientsWithSubstitutions('');
  return <IngredientsPageClient initialIngredients={ingredients} />;
}
