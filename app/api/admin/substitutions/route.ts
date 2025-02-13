import { createSubstitution } from '@/app/services/substitutionService';
import { slugify } from '@/app/utils/slugify';
import { NextResponse } from 'next/server';
import { SubstitutionFormValues } from '@/app/admin/substitutions/schema';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate the incoming data
    if (!data.fromIngredientId || !data.ingredients?.length) {
      return NextResponse.json(
        { error: 'Invalid request data: missing required fields' },
        { status: 400 }
      );
    }

    // Create single substitution
    const result = await createSubstitution(
      data.fromIngredientId,
      data.ingredients.map(
        (ing: { ingredientName: string; amount: number; unit: string; notes?: string }) => ({
          ingredientId: slugify(ing.ingredientName),
          amount: ing.amount,
          unit: ing.unit,
          notes: ing.notes,
        })
      ),
      {
        name: data.name,
        amount: data.amount,
        unit: data.unit,
        rating: data.rating,
        effects: data.effects,
        best_for: data.bestFor,
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
