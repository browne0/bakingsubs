import { Database } from '@/database.types';
import { revalidateTag } from 'next/cache';
import { slugify } from '../utils/slugify';
import { createClient } from '../utils/supabase/server';

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
  data: Omit<SubstitutionInsert, 'id' | 'original_ingredient_id' | 'dietary_flags' | 'allergens'>
) {
  const supabase = await createClient();

  // Fetch all ingredients to get their dietary flags and allergens
  const { data: ingredients, error: fetchIngredientsError } = await supabase
    .from('ingredients')
    .select('id, dietary_flags, allergens')
    .in(
      'id',
      toIngredients.map((ing) => ing.ingredientId)
    );

  if (fetchIngredientsError) throw fetchIngredientsError;

  // Aggregate dietary flags and allergens
  const dietaryFlags = new Set<string>();
  const allergens = new Set<string>();

  ingredients.forEach((ingredient) => {
    ingredient.dietary_flags?.forEach((flag) => dietaryFlags.add(flag));
    ingredient.allergens?.forEach((allergen) => allergens.add(allergen));
  });

  // Check for duplicate ingredients
  const uniqueIngredients = new Set(toIngredients.map((ing) => ing.ingredientId));
  if (uniqueIngredients.size !== toIngredients.length) {
    throw new Error('Duplicate ingredients found in substitution');
  }

  // Check if fromIngredientId is in the toIngredients list
  if (toIngredients.some((ing) => ing.ingredientId === originalIngredientId)) {
    throw new Error('Cannot substitute an ingredient with itself');
  }

  // Fetch the original ingredient name
  const { data: originalIngredient, error: originalIngredientError } = await supabase
    .from('ingredients')
    .select('name')
    .eq('id', originalIngredientId)
    .single();

  if (originalIngredientError) throw originalIngredientError;

  // Generate ID by combining original ingredient and substitution name
  if (!data.name) {
    throw new Error('Substitution name is required');
  }

  const id = slugify(`${originalIngredient.name}-to-${data.name}`);

  // Check if substitution with this ID already exists
  const { data: existing } = await supabase
    .from('substitutions')
    .select('id')
    .eq('id', id)
    .single();

  if (existing) {
    throw new Error('A substitution with this name already exists');
  }

  // Insert with aggregated dietary information
  const { data: substitution, error: substitutionError } = await supabase
    .from('substitutions')
    .insert({
      id,
      original_ingredient_id: originalIngredientId,
      dietary_flags: Array.from(dietaryFlags),
      allergens: Array.from(allergens),
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

  // Revalidate after successful creation
  revalidateTag('substitution');

  return substitution;
}

export async function getSubstitutionByIngredientId(from: string) {
  const supabase = await createClient();

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
  const supabase = await createClient();

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

export async function getSubstitutionById(substitutionId: string) {
  const supabase = await createClient();

  return supabase
    .from('substitutions')
    .select(
      `
      *,
      from_ingredient:ingredients!original_ingredient_id (
        *,
        calories,
        fat,
        carbohydrates,
        protein,
        sodium,
        fiber
      ),
      substitution_ingredients (
        amount,
        unit,
        notes,
        ingredient:ingredients!ingredient_id (*)
      )
    `
    )
    .eq('id', substitutionId)
    .single();
}

export async function searchSubstitutions(query: string) {
  const supabase = await createClient();

  let queryBuilder = supabase
    .from('substitutions')
    .select(
      `
      *,
      from_ingredient:ingredients!original_ingredient_id (name),
      substitution_ingredients (
        amount,
        unit,
        notes,
        ingredient:ingredients!ingredient_id (
          id,
          name
        )
      )
    `
    )
    .order('name');

  if (query) {
    queryBuilder = queryBuilder.ilike('name', `%${query}%`);
  }

  return queryBuilder;
}

export async function deleteSubstitution(id: string) {
  const supabase = await createClient();

  // First delete all substitution ingredients
  const { error: ingredientsError } = await supabase
    .from('substitution_ingredients')
    .delete()
    .eq('substitution_id', id);

  if (ingredientsError) throw ingredientsError;

  // Then delete the substitution itself
  const { error: substitutionError } = await supabase.from('substitutions').delete().eq('id', id);

  if (substitutionError) throw substitutionError;

  // Revalidate cache
  revalidateTag('substitution');
}

export async function updateSubstitution(id: string, data: any) {
  const supabase = await createClient();

  // First update the substitution
  const { error: substitutionError } = await supabase
    .from('substitutions')
    .update({
      name: data.name,
      amount: data.amount,
      unit: data.unit,
      rating: data.rating,
      best_for: data.bestFor,
      effects: data.effects,
    })
    .eq('id', id);

  if (substitutionError) throw substitutionError;

  // Delete existing ingredients
  const { error: deleteError } = await supabase
    .from('substitution_ingredients')
    .delete()
    .eq('substitution_id', id);

  if (deleteError) throw deleteError;

  // Insert new ingredients
  const { error: ingredientsError } = await supabase.from('substitution_ingredients').insert(
    data.ingredients.map((ing: any) => ({
      substitution_id: id,
      ingredient_id: slugify(ing.ingredientName),
      amount: ing.amount,
      unit: ing.unit,
      notes: ing.notes,
    }))
  );

  if (ingredientsError) throw ingredientsError;

  revalidateTag('substitution');
  return { success: true };
}

export async function getEggSubstitutions() {
  const supabase = await createClient();

  return supabase
    .from('substitutions')
    .select(
      `
      id,
      name,
      amount,
      unit,
      best_for,
      rating,
      description: notes,
      substitution_ingredients (
        amount,
        unit,
        notes,
        ingredient:ingredients!ingredient_id (*)
      )
    `
    )
    .eq('original_ingredient_id', 'large-eggs')
    .order('rating', { ascending: false })
    .limit(6);
}
