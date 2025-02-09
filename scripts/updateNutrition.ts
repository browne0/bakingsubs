import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { Database } from '../database.types';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const USDA_API_KEY = process.env.USDA_API_KEY;
const USDA_API_URL = 'https://api.nal.usda.gov/fdc/v1';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface NutritionInfo {
  fat: number | null;
  calories: number | null;
  sodium: number | null;
  fiber: number | null;
  protein: number | null;
  carbohydrates: number | null;
  sugar: number | null;
}

function getNutrientValue(nutrients: any[], nutrientId: number): number | null {
  const nutrient = nutrients.find((n: any) => n.nutrientId === nutrientId);
  return nutrient ? nutrient.value : null;
}

async function getNutritionInfo(ingredientName: string): Promise<NutritionInfo> {
  try {
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
        sodium: null,
        fiber: null,
        protein: null,
        carbohydrates: null,
        sugar: null,
      };
    }

    const food = searchData.foods[0];
    const nutrients = food.foodNutrients || [];

    return {
      fat: getNutrientValue(nutrients, 1004),
      calories: getNutrientValue(nutrients, 1008),
      sodium: getNutrientValue(nutrients, 1093),
      fiber: getNutrientValue(nutrients, 1079),
      protein: getNutrientValue(nutrients, 1003),
      carbohydrates: getNutrientValue(nutrients, 1005),
      sugar: getNutrientValue(nutrients, 2000),
    };
  } catch (error) {
    console.error('Error fetching nutrition info:', error);
    throw error;
  }
}

async function updateNutritionForIngredients() {
  try {
    const { data: ingredients, error } = await supabase
      .from('ingredients')
      .select('id, name')
      .is('sugar', null);

    if (error) throw error;

    console.log(`Found ${ingredients.length} ingredients to update`);

    for (const ingredient of ingredients) {
      try {
        console.log(`Updating nutrition for ${ingredient.name}...`);

        const nutritionInfo = await getNutritionInfo(ingredient.name);

        const { error: updateError } = await supabase
          .from('ingredients')
          .update(nutritionInfo)
          .eq('id', ingredient.id);

        if (updateError) {
          console.error(`Error updating ${ingredient.name}:`, updateError);
          continue;
        }

        console.log(`✓ Updated ${ingredient.name}`);

        // Add a small delay to avoid hitting API rate limits
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Failed to update ${ingredient.name}:`, error);
      }
    }

    console.log('Finished updating nutrition information');
  } catch (error) {
    console.error('Script failed:', error);
  }
}

updateNutritionForIngredients()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
