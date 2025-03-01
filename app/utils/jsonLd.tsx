import { Tables } from '@/database.types';
import {
  CollectionPageSchema,
  FoodIngredientSchema,
  HowToSchema,
  HowToStepSchema,
  HowToSupplySchema,
  HowToToolSchema,
  ItemListSchema,
  ListItemSchema,
  MonetaryAmountSchema,
  PropertyValueSchema,
  SchemaContext,
} from './schemaTypes';

interface JsonLdProps {
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function generateIngredientJsonLd(ingredient: Tables<'ingredients'>): FoodIngredientSchema {
  return {
    '@context': 'https://schema.org' as SchemaContext,
    '@type': 'FoodIngredient',
    name: ingredient.name,
    description: ingredient.notes || `Information about ${ingredient.name} for baking.`,
    image: ingredient.image_url || '/images/og-default.jpg',
    suitableForDiet: ingredient.dietary_flags?.map(
      (flag) => `https://schema.org/${flag}Diet`
    ) as any[],
    nutrition: {
      '@type': 'NutritionInformation',
      calories: ingredient.calories ? `${ingredient.calories} kcal` : undefined,
      fatContent: ingredient.fat ? `${ingredient.fat}g` : undefined,
      carbohydrateContent: ingredient.carbohydrates ? `${ingredient.carbohydrates}g` : undefined,
      proteinContent: ingredient.protein ? `${ingredient.protein}g` : undefined,
      sodiumContent: ingredient.sodium ? `${ingredient.sodium}mg` : undefined,
      fiberContent: ingredient.fiber ? `${ingredient.fiber}g` : undefined,
      sugarContent: ingredient.sugar ? `${ingredient.sugar}g` : undefined,
    },
    // Remove undefined values
    ...(ingredient.category && { category: ingredient.category }),
    ...(ingredient.allergens &&
      ingredient.allergens.length > 0 && {
        allergens: ingredient.allergens.join(', '),
      }),
  };
}

export function generateSubstitutionJsonLd(
  substitution: Tables<'substitutions'>,
  originalIngredient: Tables<'ingredients'>,
  substitutionIngredients: Array<{
    ingredient: Tables<'ingredients'>;
    amount: number;
    unit: string;
    notes?: string;
  }>
): HowToSchema {
  const step: HowToStepSchema = {
    '@type': 'HowToStep',
    name: `Replace ${originalIngredient.name} with ${substitution.name}`,
    text:
      substitution.notes ||
      `Use ${substitution.name} as a substitute for ${originalIngredient.name} in your recipe.`,
  };

  const tool: HowToToolSchema = {
    '@type': 'HowToTool',
    name: 'Baking equipment',
  };

  const supplies: HowToSupplySchema[] = substitutionIngredients.map((item) => ({
    '@type': 'HowToSupply',
    name: item.ingredient.name,
    requiredQuantity: {
      '@type': 'QuantitativeValue',
      value: item.amount,
      unitText: item.unit,
    },
  }));

  const estimatedCost: MonetaryAmountSchema = {
    '@type': 'MonetaryAmount',
    currency: 'USD',
    value: 'varies',
  };

  const additionalProperties: PropertyValueSchema[] = [
    {
      '@type': 'PropertyValue',
      name: 'Rating',
      value: substitution.rating || 'Not rated',
    },
    {
      '@type': 'PropertyValue',
      name: 'Best For',
      value: substitution.best_for ? substitution.best_for.join(', ') : 'Various recipes',
    },
    {
      '@type': 'PropertyValue',
      name: 'Baking Tips',
      value: substitution.baking_tips ? substitution.baking_tips.join(', ') : 'No specific tips',
    },
  ];

  return {
    '@context': 'https://schema.org' as SchemaContext,
    '@type': 'HowTo',
    name: `${substitution.name} - Substitute for ${originalIngredient.name}`,
    description:
      substitution.notes ||
      `How to substitute ${originalIngredient.name} with ${substitution.name}`,
    image: substitution.image_url || originalIngredient.image_url || '/images/og-default.jpg',
    step,
    tool,
    supply: supplies,
    estimatedCost,
    suitableForDiet: substitution.dietary_flags?.map(
      (flag) => `https://schema.org/${flag}Diet`
    ) as any[],
    additionalProperty: additionalProperties,
  };
}

export function generateIngredientsListJsonLd(
  ingredients: Tables<'ingredients'>[]
): CollectionPageSchema {
  const itemListElements: ListItemSchema[] = ingredients.map((ingredient, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'FoodIngredient',
      name: ingredient.name,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bakingsubs.com'}/ingredients/${ingredient.id}`,
    },
  }));

  const itemList: ItemListSchema = {
    '@type': 'ItemList',
    itemListElement: itemListElements,
  };

  return {
    '@context': 'https://schema.org' as SchemaContext,
    '@type': 'CollectionPage',
    name: 'Baking Ingredients and Substitutions',
    description:
      'Browse our comprehensive list of baking ingredients and discover perfect substitutions for your recipes',
    mainEntity: itemList,
  };
}

export function generateCommonSubstitutesJsonLd(): CollectionPageSchema {
  const itemListElements: ListItemSchema[] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Egg Substitutes',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bakingsubs.com'}/ingredients/eggs/substitutions`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Milk Substitutes',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bakingsubs.com'}/ingredients/milk/substitutions`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Butter Substitutes',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bakingsubs.com'}/ingredients/butter/substitutions`,
    },
  ];

  const itemList: ItemListSchema = {
    '@type': 'ItemList',
    itemListElement: itemListElements,
  };

  return {
    '@context': 'https://schema.org' as SchemaContext,
    '@type': 'CollectionPage',
    name: 'Common Baking Substitutes',
    description: 'Discover the most frequently used baking substitutions for your recipes',
    mainEntity: itemList,
  };
}
