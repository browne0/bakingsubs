import { deleteSubstitution, updateSubstitution } from '@/app/services/substitutionService';
import { Database } from '@/database.types';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    await deleteSubstitution(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting substitution:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to delete substitution',
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const formData = await request.formData();

    // Parse JSON strings back to objects
    const effects = JSON.parse(formData.get('effects') as string);
    const bestFor = JSON.parse(formData.get('bestFor') as string);
    const ingredients = JSON.parse(formData.get('ingredients') as string);

    const file = formData.get('file') as File | null;

    const data = {
      name: formData.get('name') as string,
      amount: Number(formData.get('amount')),
      unit: formData.get('unit') as Database['public']['Enums']['unit_type'],
      rating: Number(formData.get('rating')),
      effects,
      best_for: bestFor,
      ingredients,
      ...(file && { file }),
    };

    const result = await updateSubstitution(id, data);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating substitution:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to update substitution',
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
