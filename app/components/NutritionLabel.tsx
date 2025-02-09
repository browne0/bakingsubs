import { Database } from '@/database.types';

type UnitType = Database['public']['Enums']['unit_type'];

interface NutritionInfo {
  calories: number | null;
  fat: number | null;
  carbohydrates: number | null;
  protein: number | null;
  sodium: number | null;
  fiber: number | null;
  sugar: number | null;
}

interface SubstitutionIngredient {
  amount: number;
  unit: string;
  ingredient: {
    id: string;
    name: string;
    calories: number | null;
    fat: number | null;
    carbohydrates: number | null;
    protein: number | null;
    sodium: number | null;
    fiber: number | null;
    sugar: number | null;
  };
}

interface NutritionLabelProps {
  nutrition: NutritionInfo;
  amount?: number;
  unit?: UnitType;
  substitutionIngredients?: SubstitutionIngredient[];
}

// Conversion factors to grams (per 1 unit)
const UNIT_TO_GRAMS: Record<UnitType, number> = {
  cup: 236.588, // Average conversion
  tbsp: 14.787,
  tsp: 5,
  g: 1,
  oz: 28.3495,
  ml: 1, // Assuming density of water (1g/ml) as default
  piece: 100, // Default serving size
  'fl oz': 29.5735, // Added fluid ounce conversion
  quart: 946.353, // Added quart conversion
  pint: 473.176, // Added pint conversion
};

function convertToGrams(amount: number, unit: UnitType): number {
  return amount * UNIT_TO_GRAMS[unit];
}

// Helper function to format numbers
const formatNumber = (num: number) => {
  return Number.isInteger(num) ? num.toString() : num.toFixed(1);
};

export function NutritionLabel({
  nutrition,
  amount = 100,
  unit = 'g',
  substitutionIngredients,
}: NutritionLabelProps) {
  if (!nutrition || Object.values(nutrition).every((value) => value === null)) {
    return null;
  }

  // Calculate total grams and nutrition from substitution ingredients if provided
  if (substitutionIngredients) {
    const totalGrams = substitutionIngredients.reduce((sum, ing) => {
      return sum + convertToGrams(ing.amount, ing.unit as UnitType);
    }, 0);

    // Calculate combined nutrition from all ingredients
    const combinedNutrition = substitutionIngredients.reduce(
      (total, ing) => {
        const ingGrams = convertToGrams(ing.amount, ing.unit as UnitType);
        const conversionFactor = ingGrams / 100; // Convert from per 100g to actual amount

        return {
          calories: total.calories + (ing.ingredient.calories || 0) * conversionFactor,
          fat: total.fat + (ing.ingredient.fat || 0) * conversionFactor,
          carbohydrates:
            total.carbohydrates + (ing.ingredient.carbohydrates || 0) * conversionFactor,
          protein: total.protein + (ing.ingredient.protein || 0) * conversionFactor,
          sodium: total.sodium + (ing.ingredient.sodium || 0) * conversionFactor,
          fiber: total.fiber + (ing.ingredient.fiber || 0) * conversionFactor,
          sugar: total.sugar + (ing.ingredient.sugar || 0) * conversionFactor,
        };
      },
      {
        calories: 0,
        fat: 0,
        carbohydrates: 0,
        protein: 0,
        sodium: 0,
        fiber: 0,
        sugar: 0,
      }
    );

    // Use the combined nutrition values
    return (
      <div className="w-full rounded-lg border-2 border-black bg-white p-4 font-['Helvetica'] sm:max-w-[300px]">
        <h1 className="text-2xl font-black tracking-tight">Nutrition Facts</h1>
        <div className="border-b-8 border-black py-1">
          <div className="text-sm flex justify-between">
            <div className="font-bold">Serving size</div>
            <div className="font-bold">{formatNumber(totalGrams)}g</div>
          </div>
        </div>

        <div className="border-b-4 border-black py-2">
          <div className="text-2xl font-black">
            <span>Calories</span> <span>{formatNumber(combinedNutrition.calories)}</span>
          </div>
        </div>

        <div className="border-b border-black text-sm py-1 text-right">% Daily Value*</div>

        <div className="space-y-1 text-sm">
          <div className="flex justify-between border-b border-gray-300 py-1">
            <div>
              <span className="font-bold">Total Fat</span>{' '}
              {combinedNutrition.fat === 0 ? '0' : formatNumber(combinedNutrition.fat)}g
            </div>
            <div>{Math.round((combinedNutrition.fat / 65) * 100)}%</div>
          </div>

          <div className="flex justify-between border-b border-gray-300 py-1">
            <div>
              <span className="font-bold">Total Carbohydrates</span>{' '}
              {combinedNutrition.carbohydrates === 0
                ? '0'
                : formatNumber(combinedNutrition.carbohydrates)}
              g
            </div>
            <div>{Math.round((combinedNutrition.carbohydrates / 300) * 100)}%</div>
          </div>

          <div className="flex justify-between border-b border-gray-300 py-1 pl-4">
            <div>
              Dietary Fiber{' '}
              {combinedNutrition.fiber === 0 ? '0' : formatNumber(combinedNutrition.fiber)}g
            </div>
            <div>{Math.round((combinedNutrition.fiber / 28) * 100)}%</div>
          </div>

          <div className="flex justify-between border-b border-gray-300 py-1 pl-4">
            <div>
              Total Sugars{' '}
              {combinedNutrition.sugar === 0 ? '0' : formatNumber(combinedNutrition.sugar)}g
            </div>
            <div>{Math.round((combinedNutrition.sugar / 50) * 100)}%</div>
          </div>

          <div className="flex justify-between border-b border-gray-300 py-1">
            <div>
              <span className="font-bold">Protein</span>{' '}
              {combinedNutrition.protein === 0 ? '0' : formatNumber(combinedNutrition.protein)}g
            </div>
            <div>{Math.round((combinedNutrition.protein / 50) * 100)}%</div>
          </div>

          <div className="flex justify-between border-b border-gray-300 py-1">
            <div>
              <span className="font-bold">Sodium</span>{' '}
              {combinedNutrition.sodium === 0 ? '0' : formatNumber(combinedNutrition.sodium)}mg
            </div>
            <div>{Math.round((combinedNutrition.sodium / 2300) * 100)}%</div>
          </div>
        </div>

        <div className="mt-2 text-xs border-t-4 border-black pt-2">
          * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to
          a daily diet. 2,000 calories a day is used for general nutrition advice.
        </div>
      </div>
    );
  }

  // Fall back to original ingredient nutrition if no substitution ingredients
  const gramsUsed = convertToGrams(amount, unit);
  const conversionFactor = gramsUsed / 100;

  // Convert all nutrition values based on the total grams
  const adjustedNutrition = {
    calories: (nutrition.calories || 0) * conversionFactor,
    fat: (nutrition.fat || 0) * conversionFactor,
    carbohydrates: (nutrition.carbohydrates || 0) * conversionFactor,
    protein: (nutrition.protein || 0) * conversionFactor,
    sodium: (nutrition.sodium || 0) * conversionFactor,
    fiber: (nutrition.fiber || 0) * conversionFactor,
    sugar: (nutrition.sugar || 0) * conversionFactor,
  };

  return (
    <div className="w-full rounded-lg border-2 border-black bg-white p-4 font-['Helvetica'] sm:max-w-[300px]">
      <h1 className="text-2xl font-black tracking-tight">Nutrition Facts</h1>
      <div className="border-b-8 border-black py-1">
        <div className="text-sm flex justify-between">
          <div className="font-bold">Serving size</div>
          <div className="font-bold">{formatNumber(gramsUsed)}g</div>
        </div>
      </div>

      <div className="border-b-4 border-black py-2">
        <div className="text-2xl font-black">
          <span>Calories</span> <span>{formatNumber(adjustedNutrition.calories)}</span>
        </div>
      </div>

      <div className="border-b border-black text-sm py-1 text-right">% Daily Value*</div>

      <div className="space-y-1 text-sm">
        <div className="flex justify-between border-b border-gray-300 py-1">
          <div>
            <span className="font-bold">Total Fat</span>{' '}
            {adjustedNutrition.fat === 0 ? '0' : formatNumber(adjustedNutrition.fat)}g
          </div>
          <div>{Math.round((adjustedNutrition.fat / 65) * 100)}%</div>
        </div>

        <div className="flex justify-between border-b border-gray-300 py-1">
          <div>
            <span className="font-bold">Total Carbohydrates</span>{' '}
            {adjustedNutrition.carbohydrates === 0
              ? '0'
              : formatNumber(adjustedNutrition.carbohydrates)}
            g
          </div>
          <div>{Math.round((adjustedNutrition.carbohydrates / 300) * 100)}%</div>
        </div>

        <div className="flex justify-between border-b border-gray-300 py-1 pl-4">
          <div>
            Dietary Fiber{' '}
            {adjustedNutrition.fiber === 0 ? '0' : formatNumber(adjustedNutrition.fiber)}g
          </div>
          <div>{Math.round((adjustedNutrition.fiber / 28) * 100)}%</div>
        </div>

        <div className="flex justify-between border-b border-gray-300 py-1 pl-4">
          <div>
            Total Sugars{' '}
            {adjustedNutrition.sugar === 0 ? '0' : formatNumber(adjustedNutrition.sugar)}g
          </div>
          <div>{Math.round((adjustedNutrition.sugar / 50) * 100)}%</div>
        </div>

        <div className="flex justify-between border-b border-gray-300 py-1">
          <div>
            <span className="font-bold">Protein</span>{' '}
            {adjustedNutrition.protein === 0 ? '0' : formatNumber(adjustedNutrition.protein)}g
          </div>
          <div>{Math.round((adjustedNutrition.protein / 50) * 100)}%</div>
        </div>

        <div className="flex justify-between border-b border-gray-300 py-1">
          <div>
            <span className="font-bold">Sodium</span>{' '}
            {adjustedNutrition.sodium === 0 ? '0' : formatNumber(adjustedNutrition.sodium)}mg
          </div>
          <div>{Math.round((adjustedNutrition.sodium / 2300) * 100)}%</div>
        </div>
      </div>

      <div className="mt-2 text-xs border-t-4 border-black pt-2">
        * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a
        daily diet. 2,000 calories a day is used for general nutrition advice.
      </div>
    </div>
  );
}
