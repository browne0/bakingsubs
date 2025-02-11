import { getIngredientBySlug } from '@/app/services/ingredientService';
import { notFound } from 'next/navigation';
import { EditIngredientForm } from '../components/EditIngredientForm';

export default async function EditIngredientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const ingredient = await getIngredientBySlug(id);
  if (!ingredient) {
    notFound();
  }

  return <EditIngredientForm ingredient={ingredient} />;
}
