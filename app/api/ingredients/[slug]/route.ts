import { getIngredientBySlug } from '@/app/services/ingredientService';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const ingredient = await getIngredientBySlug(slug);

    if (!ingredient) {
      return NextResponse.json({ error: 'Ingredient not found' }, { status: 404 });
    }

    return NextResponse.json(ingredient);
  } catch (error) {
    console.error('Error fetching ingredient:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
