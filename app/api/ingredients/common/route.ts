import { supabase } from '@/utils/supabase/client';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data, error } = await supabase
    .from('ingredients')
    .select('*')
    .order('search_count', { ascending: false })
    .limit(5);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
} 