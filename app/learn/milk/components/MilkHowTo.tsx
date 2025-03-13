import HowToSection from '@/components/learn/shared/HowToSection';
import { getPostsBySlugs } from '@/lib/ghost';

export default async function MilkHowTo() {
  // Specify the exact slugs of the posts you want to display
  const posts = await getPostsBySlugs([
    'how-to-make-a-buttermilk-substitute-5-easy-methods-for-a-perfect-bake-2',
    '5-best-substitutes-for-heavy-cream-in-baking-that-actually-work',
  ]);

  return (
    <HowToSection
      posts={posts}
      title="How To Use Milk Substitutes"
      description="Essential guides about milk substitutions in baking."
    />
  );
}
