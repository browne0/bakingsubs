import HowToSection from '@/components/learn/shared/HowToSection';
import { getPostsBySlugs } from '@/lib/ghost';

export default async function MilkHowTo() {
  // Specify the exact slugs of the posts you want to display
  const posts = await getPostsBySlugs([
    'how-to-make-oat-milk-at-home',
    'baking-with-plant-based-milk-alternatives',
    'understanding-milk-substitutes-in-baking',
  ]);

  return (
    <HowToSection
      posts={posts}
      title="How To Use Milk Substitutes"
      description="Essential guides about milk substitutions in baking."
    />
  );
}
