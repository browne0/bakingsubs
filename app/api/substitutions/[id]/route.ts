import { getSubstitutionById } from '@/app/services/substitutionService';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const { data: substitution, error } = await getSubstitutionById(id);
    console.log('id', id);

    if (error || !substitution) {
      return NextResponse.json({ error: 'Substitution not found' }, { status: 404 });
    }

    return NextResponse.json(substitution);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
