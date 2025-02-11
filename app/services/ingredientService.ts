import { slugify } from '@/app/utils/slugify';
import { Tables, TablesInsert } from '@/database.types';
import { createClient } from '../utils/supabase/server';
import { getNutritionInfo } from './nutritionService';
import { revalidateTag } from 'next/cache';
type IngredientInsert = TablesInsert<'ingredients'>;

export async function createIngredient(data: Omit<IngredientInsert, 'id' | 'search_count'>) {
  const slug = slugify(data.name);

  // Fetch nutrition information
  let nutritionInfo;
  try {
    nutritionInfo = await getNutritionInfo(data.name);
  } catch (error) {
    console.error('Error fetching nutrition info:', error);
    nutritionInfo = {
      fat: null,
      calories: null,
      sugar: null,
      sodium: null,
      fiber: null,
      protein: null,
      carbohydrates: null,
    };
  }

  const supabase = await createClient();

  const { data: ingredient, error } = await supabase
    .from('ingredients')
    .insert({
      id: slug,
      name: data.name,
      category: data.category,
      functions: data.functions,
      common_in: data.common_in,
      dietary_flags: data.dietary_flags,
      allergens: data.allergens,
      default_unit: data.default_unit,
      notes: data.notes,
      search_count: 0,
      ...nutritionInfo,
    })
    .select()
    .single();

  if (error) throw error;
  return ingredient;
}

export async function getIngredientBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.from('ingredients').select('*').eq('id', slug).single();

  if (error) throw error;
  return data;
}

export async function getCommonIngredients(): Promise<Tables<'ingredients'>[]> {
  const supabase = await createClient();

  const { data: substitutionIds, error: subError } = await supabase
    .from('substitutions')
    .select('original_ingredient_id');

  if (subError) throw subError;

  const ids = substitutionIds?.map((s) => s.original_ingredient_id) || [];

  const { data, error } = await supabase
    .from('ingredients')
    .select('*')
    .order('search_count', { ascending: false })
    .in('id', ids)
    .limit(5);

  if (error) throw error;
  return data;
}

export async function searchIngredientsWithSubstitutions(
  query: string
): Promise<Tables<'ingredients'>[]> {
  const supabase = await createClient();

  const { data: substitutionIds, error: subError } = await supabase
    .from('substitutions')
    .select('original_ingredient_id');

  if (subError) throw subError;

  const ids = substitutionIds?.map((s) => s.original_ingredient_id) || [];

  let queryBuilder = supabase.from('ingredients').select('*').order('name').in('id', ids);

  if (query) {
    queryBuilder = queryBuilder.ilike('name', `%${query}%`);
  }

  const { data, error } = await queryBuilder;

  if (error) throw error;
  return data;
}

export async function searchIngredients(query: string): Promise<Tables<'ingredients'>[]> {
  const supabase = await createClient();

  let queryBuilder = supabase.from('ingredients').select('*').order('name');

  if (query) {
    queryBuilder = queryBuilder.ilike('name', `%${query}%`);
  }

  const { data, error } = await queryBuilder;

  if (error) throw error;
  return data;
}

export async function deleteIngredient(id: string) {
  const supabase = await createClient();

  // First, delete all substitutions where this ingredient is used
  const { error: substitutionsError } = await supabase
    .from('substitution_ingredients')
    .delete()
    .eq('ingredient_id', id);

  if (substitutionsError) throw substitutionsError;

  // Delete substitutions where this is the original ingredient
  const { error: originalSubstitutionsError } = await supabase
    .from('substitutions')
    .delete()
    .eq('original_ingredient_id', id);

  if (originalSubstitutionsError) throw originalSubstitutionsError;

  // Finally, delete the ingredient itself
  const { error: ingredientError } = await supabase.from('ingredients').delete().eq('id', id);

  if (ingredientError) throw ingredientError;

  // Revalidate cache
  revalidateTag('ingredients');
}

export async function updateIngredient(id: string, data: Partial<Tables<'ingredients'>>) {
  const supabase = await createClient();

  const { data: ingredient, error } = await supabase
    .from('ingredients')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  revalidateTag('ingredients');
  return ingredient;
}
