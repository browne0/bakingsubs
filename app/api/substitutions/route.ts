import { searchIngredientsWithSubstitutions } from '@/app/services/ingredientService';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';

  try {
    const data = await searchIngredientsWithSubstitutions(query);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error searching ingredients with substitutions:', error);
    return NextResponse.json({ error: 'Failed to search ingredients' }, { status: 500 });
  }
}
