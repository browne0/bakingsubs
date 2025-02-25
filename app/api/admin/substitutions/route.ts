import { createSubstitution } from '@/app/services/substitutionService';
import { slugify } from '@/app/utils/slugify';
import { Database } from '@/database.types';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | undefined;

    // Parse JSON strings back to objects
    const ingredients = JSON.parse(formData.get('ingredients') as string);
    const effects = JSON.parse(formData.get('effects') as string);
    const bestFor = JSON.parse(formData.get('bestFor') as string);

    // Create single substitution
    const result = await createSubstitution(
      slugify(formData.get('ingredientName') as string),
      ingredients.map(
        (ing: { ingredientName: string; amount: number; unit: string; notes?: string }) => ({
          ingredientId: slugify(ing.ingredientName),
          amount: ing.amount,
          unit: ing.unit as Database['public']['Enums']['unit_type'],
          notes: ing.notes,
        })
      ),
      {
        name: formData.get('name') as string,
        amount: Number(formData.get('amount')),
        unit: formData.get('unit') as Database['public']['Enums']['unit_type'],
        rating: Number(formData.get('rating')),
        effects,
        best_for: bestFor,
        file,
      }
    );

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error creating substitution:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to create substitution',
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
