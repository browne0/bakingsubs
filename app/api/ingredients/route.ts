import {
  searchIngredients,
  searchIngredientsWithSubstitutions,
} from '@/app/services/ingredientService';
import { createClient } from '@/app/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const withSubstitutions = searchParams.get('withSubstitutions') === 'true';

    const data = withSubstitutions
      ? await searchIngredientsWithSubstitutions(query)
      : await searchIngredients(query);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error searching ingredients:', error);
    return NextResponse.json({ error: 'Failed to search ingredients' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { ingredientId } = await request.json();

  const supabase = await createClient();

  const { error } = await supabase.rpc('increment_search_count', {
    ingredient_id: ingredientId,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
