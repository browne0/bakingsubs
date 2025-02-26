import { Tables } from '@/database.types';
import { revalidateTag } from 'next/cache';
import { slugify } from '../utils/slugify';
import { createClient } from '../utils/supabase/server';

export async function createIngredient(formData: FormData) {
  const supabase = await createClient();

  // Handle image upload if present
  const file = formData.get('file') as File | null;
  let imageUrl = null;

  if (file) {
    imageUrl = await uploadIngredientImage(file);
  }

  // Parse form data
  const data = {
    id: slugify(formData.get('name') as string),
    name: formData.get('name') as string,
    category: formData.get('category') as string,
    functions: JSON.parse(formData.get('functions') as string),
    common_in: JSON.parse(formData.get('common_in') as string),
    dietary_flags: JSON.parse(formData.get('dietary_flags') as string),
    allergens: JSON.parse(formData.get('allergens') as string),
    default_unit: formData.get('default_unit') as string,
    notes: formData.get('notes') as string,
    image_url: imageUrl,
    search_count: 0,
    calories: parseFloat(formData.get('calories') as string) || null,
    fat: parseFloat(formData.get('fat') as string) || null,
    carbohydrates: parseFloat(formData.get('carbohydrates') as string) || null,
    protein: parseFloat(formData.get('protein') as string) || null,
    sodium: parseFloat(formData.get('sodium') as string) || null,
    fiber: parseFloat(formData.get('fiber') as string) || null,
    sugar: parseFloat(formData.get('sugar') as string) || null,
  };

  const { data: ingredient, error } = await supabase
    .from('ingredients')
    .insert(data)
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

  // Get the ingredient to find its image URL
  const { data: ingredient } = await supabase
    .from('ingredients')
    .select('image_url')
    .eq('id', id)
    .single();

  // Delete image from storage if it exists
  if (ingredient?.image_url) {
    const fileName = ingredient.image_url.split('/').pop();
    if (fileName) {
      const { error: storageError } = await supabase.storage
        .from('ingredient-images')
        .remove([fileName]);

      if (storageError) {
        console.error('Error deleting image:', storageError);
      }
    }
  }

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

export async function uploadIngredientImage(file: File) {
  const supabase = await createClient();

  // Generate a unique filename with original extension
  const extension = file.name.split('.').pop() || 'jpg';
  const fileName = `${Math.random().toString(36).substring(2)}.${extension}`;

  // Upload the file directly to Supabase storage
  const { error } = await supabase.storage.from('ingredient-images').upload(fileName, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from('ingredient-images').getPublicUrl(fileName);

  return publicUrl;
}
