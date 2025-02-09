import { Database } from '@/database.types';

export const FUNCTION_OPTIONS = [
  { value: 'structure', label: 'Structure' },
  { value: 'binding', label: 'Binding' },
  { value: 'moisture', label: 'Moisture' },
  { value: 'tenderness', label: 'Tenderness' },
  { value: 'leavening', label: 'Leavening' },
  { value: 'flavor', label: 'Flavor' },
];

export const COMMON_IN_OPTIONS = [
  { value: 'cookies', label: 'Cookies' },
  { value: 'cakes', label: 'Cakes' },
  { value: 'breads', label: 'Breads' },
  { value: 'pastries', label: 'Pastries' },
  { value: 'pizza dough', label: 'Pizza Dough' },
  { value: 'quick breads', label: 'Quick Breads' },
  { value: 'gluten-free baking', label: 'Gluten-Free Baking' },
];

export const DIETARY_FLAGS_OPTIONS = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten-free', label: 'Gluten-Free' },
  { value: 'dairy-free', label: 'Dairy-Free' },
  { value: 'nut-free', label: 'Nut-Free' },
];

export const ALLERGENS_OPTIONS = [
  { value: 'wheat', label: 'Wheat' },
  { value: 'gluten', label: 'Gluten' },
  { value: 'dairy', label: 'Dairy' },
  { value: 'eggs', label: 'Eggs' },
  { value: 'tree nuts', label: 'Tree Nuts' },
  { value: 'peanuts', label: 'Peanuts' },
  { value: 'soy', label: 'Soy' },
];

export const CATEGORY_OPTIONS = [
  {
    value: 'flour',
    label: 'Flour',
    description: 'Primary structure builder in baked goods (wheat, almond, coconut flour etc.)',
  },
  {
    value: 'fat',
    label: 'Fat',
    description: 'Provides tenderness and moisture (butter, oil, shortening etc.)',
  },
  {
    value: 'sweetener',
    label: 'Sweetener',
    description: 'Adds sweetness and affects texture (sugar, honey, maple syrup etc.)',
  },
  {
    value: 'leavener',
    label: 'Leavener',
    description: 'Creates rise and lightness (baking powder, yeast, baking soda etc.)',
  },
  {
    value: 'binder',
    label: 'Binder',
    description: 'Holds ingredients together (eggs, flax, chia etc.)',
  },
  {
    value: 'dairy',
    label: 'Dairy',
    description: 'Provides moisture, richness, and structure (milk, buttermilk, cream, water etc.)',
  },
  {
    value: 'flavoring',
    label: 'Flavoring',
    description: 'Adds taste and aroma (vanilla, spices, extracts etc.)',
  },
  {
    value: 'protein',
    label: 'Protein',
    description:
      'Adds structure and nutritional value (eggs, protein powder, vital wheat gluten etc.)',
  },
  {
    value: 'salt',
    label: 'Salt & Minerals',
    description:
      'Enhances flavor and affects yeast/chemical reactions (table salt, kosher salt etc.)',
  },
];

export const UNIT_OPTIONS = [
  { value: 'g', label: 'g' },
  { value: 'ml', label: 'ml' },
  { value: 'cup', label: 'cup' },
  { value: 'tbsp', label: 'tbsp' },
  { value: 'tsp', label: 'tsp' },
  { value: 'oz', label: 'oz' },
  { value: 'pint', label: 'pint' },
  { value: 'quart', label: 'quart' },
  { value: 'piece', label: 'piece' },
  { value: 'fl oz', label: 'fl oz' },
];

export const BEST_FOR_OPTIONS: Array<{
  value: Database['public']['Enums']['substitution_best_for'];
  label: string;
}> = [
  { value: 'cookies', label: 'Cookies' },
  { value: 'cakes', label: 'Cakes' },
  { value: 'breads', label: 'Breads' },
  { value: 'pastries', label: 'Pastries' },
  { value: 'muffins', label: 'Muffins' },
  { value: 'pie_crusts', label: 'Pie Crusts' },
];
