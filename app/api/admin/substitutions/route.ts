import { AddSubstitutionFormValues } from '@/app/admin/add/components/AddSubstitutionsForm';
import { createSubstitution } from '@/app/services/substitutionService';
import { slugify } from '@/app/utils/slugify';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data: {
      fromIngredientId: string;
      substitutions: AddSubstitutionFormValues['substitutions'];
    } = await request.json();

    // Validate the incoming data
    if (!data.fromIngredientId || !data.substitutions?.length) {
      return NextResponse.json(
        { error: 'Invalid request data: missing required fields' },
        { status: 400 }
      );
    }

    // Handle multiple substitutions
    const results = await Promise.all(
      data.substitutions.map(async (sub) => {
        // Validate each substitution has required fields
        if (!sub.ingredients?.length) {
          throw new Error(`Invalid substitution data: missing ingredients for "${sub.name}"`);
        }

        return await createSubstitution(
          data.fromIngredientId,
          sub.ingredients.map((ing) => ({
            ingredientId: slugify(ing.ingredientName),
            amount: ing.amount,
            unit: ing.unit,
            notes: ing.notes,
          })),
          {
            name: sub.name,
            amount: sub.amount,
            unit: sub.unit,
            rating: sub.rating,
            effects: sub.effects,
            best_for: sub.bestFor,
          }
        );
      })
    );

    return NextResponse.json({ success: true, data: results });
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
