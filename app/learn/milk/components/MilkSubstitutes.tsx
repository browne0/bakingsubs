import { getMilkSubstitutions } from '@/app/services/substitutionService';
import SubstitutesGrid from '@/components/learn/shared/SubstitutesGrid';

export default async function MilkSubstitutes() {
  const { data: substitutes = [] } = await getMilkSubstitutions();

  if (!substitutes) return null;

  return (
    <SubstitutesGrid
      title="Common Milk Substitutes"
      description="Discover the most effective milk alternatives for your baking needs. Each substitute has its own unique properties and best uses."
      substitutes={substitutes}
      baseIngredient="cup milk"
      basePath="/ingredients/milk/substitutions"
    />
  );
}
