import { searchSubstitutions } from '@/app/services/substitutionService';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';

  try {
    const { data, error } = await searchSubstitutions(query);

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error searching substitutions:', error);
    return NextResponse.json({ error: 'Failed to search substitutions' }, { status: 500 });
  }
}
