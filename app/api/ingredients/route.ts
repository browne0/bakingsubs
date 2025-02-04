import { supabase } from '@/utils/supabase/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  let ingredientsQuery = supabase
    .from('ingredients')
    .select('id, name, category, dietary_flags, functions')
    .order('name');

  if (query) {
    ingredientsQuery = ingredientsQuery.ilike('name', `%${query}%`);
  }

  const { data, error } = await ingredientsQuery;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { ingredientId } = await request.json();

  const { error } = await supabase.rpc('increment_search_count', {
    ingredient_id: ingredientId,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
