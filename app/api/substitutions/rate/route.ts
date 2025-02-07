import { createClient } from '@/app/utils/supabase/server';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { substitutionId, rating } = await request.json();

    if (!substitutionId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Invalid rating or substitution ID' }, { status: 400 });
    }

    const supabase = await createClient();

    // Get current rating data
    const { data: currentData, error: fetchError } = await supabase
      .from('substitutions')
      .select('rating, rating_count')
      .eq('id', substitutionId)
      .single();

    if (fetchError) throw fetchError;

    // Calculate new rating
    const currentRating = currentData.rating || 0;
    const currentCount = currentData.rating_count || 0;
    const newCount = currentCount + 1;
    const newRating = (currentRating * currentCount + rating) / newCount;

    // Update the substitution
    const { error: updateError } = await supabase
      .from('substitutions')
      .update({
        rating: newRating,
        rating_count: newCount,
        updated_at: new Date().toISOString(),
      })
      .eq('id', substitutionId);

    if (updateError) throw updateError;

    // Revalidate the cache
    revalidateTag('substitution');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Rating error:', error);
    return NextResponse.json({ error: 'Failed to submit rating' }, { status: 500 });
  }
}
