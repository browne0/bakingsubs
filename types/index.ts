export interface Ingredient {
  id: string;
  name: string;
  general_notes: string;
  created_at: string;
}

export interface Substitution {
  id: string;
  ingredient_id: string;
  substitute: string;
  works_best: string[];
  affects: string;
  rating: number;
  notes: string;
  created_at: string;
}

export interface SubstitutionWithIngredient extends Substitution {
  ingredient: Ingredient;
}
