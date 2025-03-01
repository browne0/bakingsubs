import { getEggSubstitutions } from '@/app/services/substitutionService';
import SubstitutesGrid from '@/components/learn/shared/SubstitutesGrid';

export default async function EggsSubstitutes() {
  const { data: substitutes = [] } = await getEggSubstitutions();

  if (!substitutes) return null;

  return (
    <SubstitutesGrid
      title="Common Egg Substitutes"
      description="Discover the most effective egg alternatives for your baking needs. Each substitute has its own unique properties and best uses."
      substitutes={substitutes}
      baseIngredient="egg"
      basePath="/ingredients/eggs/substitutions"
    />
  );
}
