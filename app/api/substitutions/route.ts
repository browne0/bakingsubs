import { createClient } from '@/app/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('ingredients')
    .select(
      `
      *,
      substitutions (*)
    `
    )
    .ilike('name', `%${query}%`);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
