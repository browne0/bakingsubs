import { createIngredient } from '@/app/services/ingredientService';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const ingredient = await createIngredient(formData);
    return NextResponse.json({ success: true, data: ingredient });
  } catch (error) {
    console.error('Error creating ingredient:', error);
    return NextResponse.json({ error: 'Failed to create ingredient' }, { status: 500 });
  }
}
