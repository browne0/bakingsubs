import { deleteSubstitution, updateSubstitution } from '@/app/services/substitutionService';
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
    const data = await request.json();

    const result = await updateSubstitution(id, data);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating substitution:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update substitution' },
      { status: 500 }
    );
  }
}
