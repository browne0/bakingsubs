/**
 * Schema.org type definitions for structured data
 * These types help ensure we're using the correct schema.org types in our JSON-LD
 */

export type SchemaContext = 'https://schema.org';

// Base types
export type SchemaType =
  | 'FoodIngredient'
  | 'Recipe'
  | 'HowTo'
  | 'CollectionPage'
  | 'ItemList'
  | 'ListItem'
  | 'HowToStep'
  | 'HowToTool'
  | 'HowToSupply'
  | 'QuantitativeValue'
  | 'MonetaryAmount'
  | 'PropertyValue'
  | 'NutritionInformation';

// Diet types
export type SchemaDietType =
  | 'https://schema.org/VeganDiet'
  | 'https://schema.org/VegetarianDiet'
  | 'https://schema.org/GlutenFreeDiet'
  | 'https://schema.org/KosherDiet'
  | 'https://schema.org/HalalDiet'
  | 'https://schema.org/LowCalorieDiet'
  | 'https://schema.org/LowFatDiet'
  | 'https://schema.org/LowLactoseDiet'
  | 'https://schema.org/LowSaltDiet';

// Base schema interface
export interface SchemaBase {
  '@context': SchemaContext;
  '@type': SchemaType;
  name: string;
  description?: string;
  image?: string;
}

// Food ingredient schema
export interface FoodIngredientSchema extends SchemaBase {
  '@type': 'FoodIngredient';
  suitableForDiet?: SchemaDietType[];
  nutrition?: NutritionInformationSchema;
  category?: string;
  allergens?: string;
}

// Nutrition information schema
export interface NutritionInformationSchema {
  '@type': 'NutritionInformation';
  calories?: string;
  fatContent?: string;
  carbohydrateContent?: string;
  proteinContent?: string;
  sodiumContent?: string;
  fiberContent?: string;
  sugarContent?: string;
}

// How-to schema for substitutions
export interface HowToSchema extends SchemaBase {
  '@type': 'HowTo';
  step: HowToStepSchema | HowToStepSchema[];
  tool?: HowToToolSchema | HowToToolSchema[];
  supply?: HowToSupplySchema | HowToSupplySchema[];
  estimatedCost?: MonetaryAmountSchema;
  suitableForDiet?: SchemaDietType[];
  additionalProperty?: PropertyValueSchema | PropertyValueSchema[];
}

// How-to step schema
export interface HowToStepSchema {
  '@type': 'HowToStep';
  name: string;
  text: string;
}

// How-to tool schema
export interface HowToToolSchema {
  '@type': 'HowToTool';
  name: string;
}

// How-to supply schema
export interface HowToSupplySchema {
  '@type': 'HowToSupply';
  name: string;
  requiredQuantity?: QuantitativeValueSchema;
}

// Quantitative value schema
export interface QuantitativeValueSchema {
  '@type': 'QuantitativeValue';
  value: number;
  unitText: string;
}

// Monetary amount schema
export interface MonetaryAmountSchema {
  '@type': 'MonetaryAmount';
  currency: string;
  value: string | number;
}

// Property value schema
export interface PropertyValueSchema {
  '@type': 'PropertyValue';
  name: string;
  value: string | number;
}

// Collection page schema
export interface CollectionPageSchema extends SchemaBase {
  '@type': 'CollectionPage';
  mainEntity: ItemListSchema;
}

// Item list schema
export interface ItemListSchema {
  '@type': 'ItemList';
  itemListElement: ListItemSchema[];
}

// List item schema
export interface ListItemSchema {
  '@type': 'ListItem';
  position: number;
  name?: string;
  url?: string;
  item?: FoodIngredientSchema | Record<string, any>;
}
