import { createClient } from '@/app/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const supabase = await createClient();

    const { error } = await supabase.from('ingredients').insert(data);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating ingredient:', error);
    return NextResponse.json({ error: 'Failed to create ingredient' }, { status: 500 });
  }
}
