import { createClient } from '../utils/supabase/server';

const USDA_API_KEY = process.env.USDA_API_KEY;
const USDA_API_URL = 'https://api.nal.usda.gov/fdc/v1';

interface NutritionInfo {
  fat: number | null;
  calories: number | null;
  sugar: number | null;
  sodium: number | null;
  fiber: number | null;
  protein: number | null;
  carbohydrates: number | null;
}

export async function getNutritionInfo(ingredientName: string): Promise<NutritionInfo> {
  try {
    // Search for the ingredient
    const searchResponse = await fetch(
      `${USDA_API_URL}/foods/search?api_key=${USDA_API_KEY}&query=${encodeURIComponent(
        ingredientName
      )}&pageSize=1`
    );

    if (!searchResponse.ok) {
      throw new Error('Failed to search USDA database');
    }

    const searchData = await searchResponse.json();

    if (!searchData.foods || searchData.foods.length === 0) {
      return {
        fat: null,
        calories: null,
        sugar: null,
        sodium: null,
        fiber: null,
        protein: null,
        carbohydrates: null,
      };
    }

    const food = searchData.foods[0];

    // Extract nutrients from the response
    const nutrients = food.foodNutrients || [];

    // Map USDA nutrient IDs to our properties
    const nutritionInfo: NutritionInfo = {
      fat: getNutrientValue(nutrients, 1004), // Total fat
      calories: getNutrientValue(nutrients, 1008), // Energy
      sodium: getNutrientValue(nutrients, 1093), // Sodium
      fiber: getNutrientValue(nutrients, 1079), // Fiber
      protein: getNutrientValue(nutrients, 1003), // Protein
      carbohydrates: getNutrientValue(nutrients, 1005), // Carbohydrates
      sugar: getNutrientValue(nutrients, 2000), // Total Sugars
    };

    // Store in Supabase for caching
    const supabase = await createClient();
    await supabase.from('ingredients').update(nutritionInfo).eq('name', ingredientName);

    return nutritionInfo;
  } catch (error) {
    console.error('Error fetching nutrition info:', error);
    throw error;
  }
}

function getNutrientValue(nutrients: any[], nutrientId: number): number | null {
  const nutrient = nutrients.find((n: any) => n.nutrientId === nutrientId);
  return nutrient ? nutrient.value : null;
}
