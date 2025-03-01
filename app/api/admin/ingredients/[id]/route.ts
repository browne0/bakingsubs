import { deleteIngredient, getIngredientBySlug } from '@/app/services/ingredientService';
import { createClient } from '@/app/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    await deleteIngredient(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting ingredient:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to delete ingredient',
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const formData = await request.formData();
    const supabase = await createClient();

    // Handle image upload if present
    const file = formData.get('file') as File | null;
    let imageUrl = null;

    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('ingredient-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from('ingredient-images').getPublicUrl(fileName);

      imageUrl = publicUrl;
    }

    // Parse arrays and numeric values from form data
    const data = {
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      functions: JSON.parse(formData.get('functions') as string),
      common_in: JSON.parse(formData.get('common_in') as string),
      dietary_flags: JSON.parse(formData.get('dietary_flags') as string),
      allergens: JSON.parse(formData.get('allergens') as string),
      default_unit: formData.get('default_unit') as string,
      notes: formData.get('notes') as string,
      ...(imageUrl && { image_url: imageUrl }),
      // Add nutrition fields with proper type conversion
      calories: formData.get('calories') ? Number(formData.get('calories')) : null,
      fat: formData.get('fat') ? Number(formData.get('fat')) : null,
      carbohydrates: formData.get('carbohydrates') ? Number(formData.get('carbohydrates')) : null,
      protein: formData.get('protein') ? Number(formData.get('protein')) : null,
      sodium: formData.get('sodium') ? Number(formData.get('sodium')) : null,
      fiber: formData.get('fiber') ? Number(formData.get('fiber')) : null,
      sugar: formData.get('sugar') ? Number(formData.get('sugar')) : null,
    };

    const { data: ingredient, error } = await supabase
      .from('ingredients')
      .update(data)
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(ingredient);
  } catch (error) {
    console.error('Error updating ingredient:', error);
    return NextResponse.json({ error: 'Failed to update ingredient' }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const ingredient = await getIngredientBySlug(params.id);

    if (!ingredient) {
      return NextResponse.json({ error: 'Ingredient not found' }, { status: 404 });
    }

    return NextResponse.json(ingredient);
  } catch (error) {
    console.error('Error fetching ingredient:', error);
    return NextResponse.json({ error: 'Failed to fetch ingredient' }, { status: 500 });
  }
}
