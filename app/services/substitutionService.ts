import { Database } from '@/database.types';
import { revalidateTag } from 'next/cache';
import sharp from 'sharp';
import { slugify } from '../utils/slugify';
import { createClient } from '../utils/supabase/server';

type SubstitutionInsert = Database['public']['Tables']['substitutions']['Insert'];
type SubstitutionIngredientInsert =
  Database['public']['Tables']['substitution_ingredients']['Insert'];

export async function uploadSubstitutionImage(file: File) {
  const supabase = await createClient();

  // Convert File to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Compress image while maintaining original dimensions
  const compressedImageBuffer = await sharp(buffer)
    .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
    .toBuffer();

  // Generate a unique filename with .jpg extension
  const fileName = `${Math.random().toString(36).substring(2)}.jpg`;

  // Upload the compressed file to Supabase storage
  const { error } = await supabase.storage
    .from('substitution-images')
    .upload(fileName, compressedImageBuffer, {
      contentType: 'image/jpeg',
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from('substitution-images').getPublicUrl(fileName);

  return publicUrl;
}

export async function createSubstitution(
  originalIngredientId: string,
  toIngredients: Array<{
    ingredientId: string;
    amount: number;
    unit: Database['public']['Enums']['unit_type'];
    notes?: string;
  }>,
  data: Omit<
    SubstitutionInsert,
    'id' | 'original_ingredient_id' | 'dietary_flags' | 'allergens'
  > & {
    file?: File;
  }
) {
  const supabase = await createClient();

  // Handle image upload if present
  let imageUrl = null;
  if (data.file) {
    imageUrl = await uploadSubstitutionImage(data.file);
  }

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

  // Insert with aggregated dietary information and image URL
  const { data: substitution, error: substitutionError } = await supabase
    .from('substitutions')
    .insert({
      id,
      original_ingredient_id: originalIngredientId,
      dietary_flags: Array.from(dietaryFlags),
      allergens: Array.from(allergens),
      ...data,
      image_url: imageUrl,
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

export async function updateSubstitution(
  id: string,
  data: Partial<Omit<SubstitutionInsert, 'id'>> & {
    file?: File;
    ingredients?: Array<{
      ingredientName: string;
      amount: number;
      unit: Database['public']['Enums']['unit_type'];
      notes?: string;
    }>;
  }
) {
  const supabase = await createClient();

  // Handle image upload if present
  let imageUrl = null;
  if (data.file) {
    imageUrl = await uploadSubstitutionImage(data.file);
  }

  // Extract ingredients and file from data to handle separately
  const { ingredients, file: _, ...substitutionData } = data;

  // Update the substitution with the new data
  const { data: substitution, error: updateError } = await supabase
    .from('substitutions')
    .update({
      ...substitutionData,
      ...(imageUrl && { image_url: imageUrl }),
    })
    .eq('id', id)
    .select()
    .single();

  if (updateError) throw updateError;

  // If ingredients are provided, update them
  if (ingredients) {
    // Delete existing ingredients
    const { error: deleteError } = await supabase
      .from('substitution_ingredients')
      .delete()
      .eq('substitution_id', id);

    if (deleteError) throw deleteError;

    // Insert new ingredients
    const substitutionIngredients: SubstitutionIngredientInsert[] = ingredients.map(
      (ingredient) => ({
        substitution_id: id,
        ingredient_id: slugify(ingredient.ingredientName),
        amount: ingredient.amount,
        unit: ingredient.unit,
        notes: ingredient.notes,
      })
    );

    const { error: insertError } = await supabase
      .from('substitution_ingredients')
      .insert(substitutionIngredients);

    if (insertError) throw insertError;
  }

  // Revalidate cache
  revalidateTag('substitution');

  return substitution;
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
      image_url,
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
