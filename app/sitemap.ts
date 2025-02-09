import { Database } from '@/database.types';
import { createClient } from '@supabase/supabase-js';
import { MetadataRoute } from 'next';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all ingredients
  const { data: ingredients = [], error: ingredientsError } = await supabase
    .from('ingredients')
    .select('id');

  if (ingredientsError) {
    console.error('Error fetching ingredients:', ingredientsError);
    throw ingredientsError;
  }

  // Fetch all substitutions
  const { data: substitutions = [], error: substitutionsError } = await supabase
    .from('substitutions')
    .select('id, original_ingredient_id');

  if (substitutionsError) {
    console.error('Error fetching substitutions:', substitutionsError);
    throw substitutionsError;
  }

  // Base URL from environment variable or default
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bakingsubs.com';

  // Static routes
  const staticRoutes = ['', '/about', '/privacy', '/terms', '/ingredients', '/support'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })
  );

  // Dynamic routes for ingredients
  const ingredientRoutes = (ingredients ?? []).map((ingredient) => ({
    url: `${baseUrl}/ingredients/${ingredient.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic routes for substitutions
  const substitutionRoutes = (substitutions ?? []).map((sub) => ({
    url: `${baseUrl}/substitutions/${sub.original_ingredient_id}/${sub.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...ingredientRoutes, ...substitutionRoutes];
}
