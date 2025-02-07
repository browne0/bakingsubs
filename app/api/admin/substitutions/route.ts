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

    // Handle multiple substitutions
    const results = await Promise.all(
      data.substitutions.map(async (sub) => {
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
      { error: error instanceof Error ? error.message : 'Failed to create substitution' },
      { status: 500 }
    );
  }
}
