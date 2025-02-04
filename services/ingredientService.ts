import { Tables } from '@/database.types';
import { slugify } from '@/utils/slugify';
import { supabase } from '@/utils/supabase/client';

export async function createIngredient(name: string, description: string) {
  const slug = slugify(name);

  const { data, error } = await supabase
    .from('ingredients')
    .insert({
      id: slug,
      name,
      description,
      // ... other fields
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getIngredientBySlug(slug: string) {
  const { data, error } = await supabase.from('ingredients').select('*').eq('id', slug).single();

  if (error) throw error;
  return data;
}

export async function getCommonIngredients(): Promise<Tables<'ingredients'>[]> {
  const { data, error } = await supabase
    .from('ingredients')
    .select('*')
    .order('search_count', { ascending: false })
    .limit(5);

  if (error) throw error;
  return data;
}

export async function searchIngredients(query: string): Promise<Tables<'ingredients'>[]> {
  let queryBuilder = supabase.from('ingredients').select('*').order('name');

  if (query) {
    queryBuilder = queryBuilder.ilike('name', `%${query}%`);
  }

  const { data, error } = await queryBuilder;

  if (error) throw error;
  return data;
}
