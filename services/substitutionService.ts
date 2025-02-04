import { Database } from '@/database.types';
import { supabase } from '@/utils/supabase/client';

type SubstitutionInsert = Database['public']['Tables']['substitutions']['Insert'];
type SubstitutionIngredientInsert =
  Database['public']['Tables']['substitution_ingredients']['Insert'];

export async function createSubstitution(
  originalIngredientId: string,
  toIngredients: Array<{
    ingredientId: string;
    amount: number;
    unit: Database['public']['Enums']['unit_type'];
    notes?: string;
  }>,
  data: Omit<SubstitutionInsert, 'id' | 'original_ingredient_id'>
) {
  // Check for duplicate ingredients
  const uniqueIngredients = new Set(toIngredients.map((ing) => ing.ingredientId));
  if (uniqueIngredients.size !== toIngredients.length) {
    throw new Error('Duplicate ingredients found in substitution');
  }

  // Check if fromIngredientId is in the toIngredients list
  if (toIngredients.some((ing) => ing.ingredientId === originalIngredientId)) {
    throw new Error('Cannot substitute an ingredient with itself');
  }

  const id = `${originalIngredientId}-to-${toIngredients[0].ingredientId}`;

  // Start a Supabase transaction
  const { data: substitution, error: substitutionError } = await supabase
    .from('substitutions')
    .insert({
      id,
      original_ingredient_id: originalIngredientId,
      ...data,
    })
    .select()
    .single();

  if (substitutionError) throw substitutionError;

  // Insert all substitution ingredients
  const substitutionIngredients: SubstitutionIngredientInsert[] = toIngredients.map(
    (ingredient) => ({
      substitution_id: id,
      ingredient_id: ingredient.ingredientId,
      amount: ingredient.amount,
      unit: ingredient.unit,
      notes: ingredient.notes,
    })
  );

  const { error: ingredientsError } = await supabase
    .from('substitution_ingredients')
    .insert(substitutionIngredients);

  if (ingredientsError) throw ingredientsError;

  return substitution;
}

export async function getSubstitutionByIngredientId(from: string) {
  return supabase
    .from('substitutions')
    .select(
      `
      *,
      from_ingredient:ingredients!original_ingredient_id (*),
      substitution_ingredients (
        amount,
        unit,
        notes,
        ingredient:ingredients!ingredient_id (*)
      )
    `
    )
    .eq('original_ingredient_id', from)
    .single();
}

export async function getSubstitutionsByIngredientId(from: string) {
  return supabase
    .from('substitutions')
    .select(
      `
      *,
      substitution_ingredients (
        amount,
        unit,
        notes,
        ingredient:ingredients!ingredient_id (*)
      )
    `
    )
    .eq('original_ingredient_id', from)
    .order('rating', { ascending: false });
}
