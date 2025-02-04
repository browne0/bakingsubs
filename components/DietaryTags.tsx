import { Egg, Fish, Leaf, Milk, NutOff, Wheat, type LucideIcon } from 'lucide-react';

interface DietaryTagsProps {
  dietary: string[];
  allergens: string[];
}

const dietaryIcons: Record<string, LucideIcon> = {
  vegan: Leaf,
  vegetarian: Leaf,
  'gluten-free': Wheat,
  'dairy-free': Milk,
};

const allergenIcons: Record<string, LucideIcon> = {
  dairy: Milk,
  fish: Fish,
  eggs: Egg,
  nuts: NutOff,
  gluten: Wheat,
};

export function DietaryTags({ dietary, allergens }: DietaryTagsProps) {
  return (
    <div className="space-y-3">
      {dietary.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {dietary.map((diet) => {
            const Icon = dietaryIcons[diet.toLowerCase()];
            return (
              <span
                key={diet}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100"
              >
                {Icon && <Icon className="w-4 h-4" />}
                {diet}
              </span>
            );
          })}
        </div>
      )}

      {allergens.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {allergens.map((allergen) => {
            const Icon = allergenIcons[allergen.toLowerCase()];
            return (
              <span
                key={allergen}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100"
              >
                {Icon && <Icon className="w-4 h-4" />}
                Contains {allergen}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
