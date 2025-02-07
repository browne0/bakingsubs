import { createSubstitution } from '@/app/services/substitutionService';
import { slugify } from '@/app/utils/slugify';
import { createClient } from '@/app/utils/supabase/server';
import { Enums } from '@/database.types';

type UnitType = Enums<'unit_type'>;

// Define ingredient data in a more structured way
const ingredients = {
  flours: [
    {
      name: 'All-Purpose Flour',
      category: 'flour',
      functions: ['structure', 'binding'],
      common_in: ['cookies', 'cakes', 'breads', 'pastries'],
      dietary_flags: ['vegetarian'],
      allergens: ['wheat', 'gluten'],
      default_unit: 'g' as UnitType,
      notes: 'Standard wheat flour for general baking',
    },
    {
      name: 'Cake Flour',
      category: 'flour',
      functions: ['structure', 'tenderness'],
      common_in: ['cakes', 'delicate pastries'],
      dietary_flags: ['vegetarian'],
      allergens: ['wheat', 'gluten'],
      default_unit: 'g' as UnitType,
      notes: 'Lower protein content for tender baked goods',
    },
    {
      name: 'Bread Flour',
      category: 'flour',
      functions: ['structure', 'binding'],
      common_in: ['breads', 'pizza dough'],
      dietary_flags: ['vegetarian'],
      allergens: ['wheat', 'gluten'],
      default_unit: 'g' as UnitType,
      notes: 'High protein content for chewy texture',
    },
    {
      name: 'Almond Flour',
      category: 'flour',
      functions: ['structure', 'moisture'],
      common_in: ['cookies', 'cakes', 'gluten-free baking'],
      dietary_flags: ['vegetarian', 'gluten-free'],
      allergens: ['tree nuts'],
      default_unit: 'g' as UnitType,
      notes: 'Made from ground blanched almonds',
    },
  ],
  leaveners: [
    {
      name: 'Baking Powder',
      category: 'leavener',
      functions: ['leavening'],
      common_in: ['cakes', 'quick breads', 'muffins'],
      dietary_flags: ['vegan', 'vegetarian'],
      allergens: [],
      default_unit: 'g' as UnitType,
      notes: 'Double-acting chemical leavener',
    },
    {
      name: 'Baking Soda',
      category: 'leavener',
      functions: ['leavening'],
      common_in: ['cookies', 'quick breads'],
      dietary_flags: ['vegan', 'vegetarian'],
      allergens: [],
      default_unit: 'g' as UnitType,
      notes: 'Requires acid to activate',
    },
    {
      name: 'Active Dry Yeast',
      category: 'leavener',
      functions: ['leavening'],
      common_in: ['breads', 'pizza dough'],
      dietary_flags: ['vegan', 'vegetarian'],
      allergens: [],
      default_unit: 'g' as UnitType,
      notes: 'Biological leavener for breads',
    },
  ],
  fats: [
    {
      name: 'Unsalted Butter',
      category: 'fat',
      functions: ['tenderness', 'moisture', 'flavor'],
      common_in: ['cookies', 'cakes', 'pastries'],
      dietary_flags: ['vegetarian'],
      allergens: ['dairy'],
      default_unit: 'g' as UnitType,
      notes: 'Standard fat for baking',
    },
    {
      name: 'Vegetable Oil',
      category: 'fat',
      functions: ['tenderness', 'moisture'],
      common_in: ['cakes', 'quick breads'],
      dietary_flags: ['vegan', 'vegetarian'],
      allergens: [],
      default_unit: 'ml' as UnitType,
      notes: 'Neutral-flavored liquid fat',
    },
    {
      name: 'Coconut Oil',
      category: 'fat',
      functions: ['tenderness', 'structure'],
      common_in: ['cookies', 'vegan baking'],
      dietary_flags: ['vegan', 'vegetarian'],
      allergens: [],
      default_unit: 'g' as UnitType,
      notes: 'Solid at room temperature',
    },
  ],
  sweeteners: [
    {
      name: 'Granulated Sugar',
      category: 'sweetener',
      functions: ['sweetness', 'structure', 'moisture'],
      common_in: ['cookies', 'cakes', 'breads'],
      dietary_flags: ['vegan', 'vegetarian'],
      allergens: [],
      default_unit: 'g' as UnitType,
      notes: 'Standard sweetener for baking',
    },
    {
      name: 'Brown Sugar',
      category: 'sweetener',
      functions: ['sweetness', 'moisture', 'flavor'],
      common_in: ['cookies', 'bars'],
      dietary_flags: ['vegan', 'vegetarian'],
      allergens: [],
      default_unit: 'g' as UnitType,
      notes: 'Contains molasses for moisture',
    },
    {
      name: 'Honey',
      category: 'sweetener',
      functions: ['sweetness', 'moisture', 'preservation'],
      common_in: ['breads', 'muffins'],
      dietary_flags: ['vegetarian'],
      allergens: [],
      default_unit: 'g' as UnitType,
      notes: 'Natural liquid sweetener',
    },
  ],
  binders: [
    {
      name: 'Large Eggs',
      category: 'binder',
      functions: ['binding', 'structure', 'leavening'],
      common_in: ['cakes', 'cookies', 'breads'],
      dietary_flags: ['vegetarian'],
      allergens: ['eggs'],
      default_unit: 'g' as UnitType,
      notes: 'Standard size eggs for baking',
    },
    {
      name: 'Ground Flaxseed',
      category: 'binder',
      functions: ['binding'],
      common_in: ['vegan baking'],
      dietary_flags: ['vegan', 'vegetarian'],
      allergens: [],
      default_unit: 'g' as UnitType,
      notes: 'Mixed with water as egg replacer',
    },
  ],
};

// Define substitution data with proper typing
const substitutions = [
  {
    fromIngredientId: slugify('All-Purpose Flour'),
    toIngredients: [
      {
        ingredientId: slugify('Cake Flour'),
        amount: 1,
        unit: 'cup' as UnitType,
        notes: 'Remove 2 tablespoons per cup',
      },
    ],
    data: {
      name: 'All-Purpose Flour to Cake Flour',
      rating: 4,
      best_for: ['cakes', 'delicate pastries'],
      dietary_flags: ['vegetarian'],
      allergens: ['wheat', 'gluten'],
      effects: {
        texture: 'more tender',
        structure: 'more delicate',
        moisture: 'similar',
      },
      temperature_adjustments: {},
      time_adjustments: {},
    },
  },
  {
    fromIngredientId: slugify('Unsalted Butter'),
    toIngredients: [
      {
        ingredientId: slugify('Coconut Oil'),
        amount: 1,
        unit: 'cup' as UnitType,
        notes: "Best when recipe doesn't rely on butter flavor",
      },
    ],
    data: {
      name: 'Unsalted Butter to Coconut Oil',
      rating: 4,
      best_for: ['cookies', 'quick breads'],
      dietary_flags: ['vegan', 'vegetarian'],
      allergens: [],
      effects: {
        texture: 'slightly more crisp',
        flavor: 'slight coconut taste',
        structure: 'similar',
      },
      substitution_ingredients: [
        {
          ingredient_id: slugify('Coconut Oil'),
          amount: 1,
          unit: 'cup' as const,
          notes: "Best when recipe doesn't rely on butter flavor",
        },
      ],
    },
  },
  {
    fromIngredientId: slugify('Large Eggs'),
    toIngredients: [
      {
        ingredientId: slugify('Ground Flaxseed'),
        amount: 1,
        unit: 'tbsp' as UnitType,
        notes: '1 tbsp ground flax + 3 tbsp water per egg',
      },
    ],
    data: {
      name: 'Large Eggs to Ground Flaxseed',
      rating: 3,
      best_for: ['cookies', 'quick breads'],
      dietary_flags: ['vegan', 'vegetarian'],
      allergens: [],
      effects: {
        texture: 'denser',
        structure: 'less rise',
        moisture: 'similar',
      },
      temperature_adjustments: {},
      time_adjustments: {},
    },
  },
];

async function seedDatabase() {
  const ingredientIds: Record<string, string> = {};
  const supabase = await createClient();

  // Upsert ingredients
  for (const category of Object.values(ingredients)) {
    for (const ingredient of category) {
      const id = slugify(ingredient.name);
      const { error } = await supabase
        .from('ingredients')
        .upsert({
          ...ingredient,
          id,
        })
        .select('id')
        .single();

      if (error) throw error;
      ingredientIds[ingredient.name] = id;
    }
  }

  // Create substitutions using service
  for (const substitution of substitutions) {
    try {
      await createSubstitution(
        substitution.fromIngredientId,
        substitution.toIngredients,
        substitution.data
      );
    } catch (error) {
      console.error('Error creating substitution:', error);
      throw error;
    }
  }
}

seedDatabase().catch(console.error);
