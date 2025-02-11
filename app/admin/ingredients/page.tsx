import { searchIngredients } from '@/app/services/ingredientService';
import { AdminIngredientsClient } from './components/AdminIngredientsClient';

export default async function AdminIngredientsPage() {
  const ingredients = await searchIngredients('');
  return <AdminIngredientsClient initialIngredients={ingredients} />;
}
