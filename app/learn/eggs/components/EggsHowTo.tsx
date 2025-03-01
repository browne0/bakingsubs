import HowToSection from '@/components/learn/shared/HowToSection';
import { getPostsBySlugs } from '@/lib/ghost';

export default async function EggsHowTo() {
  // Specify the exact slugs of the posts you want to display
  const posts = await getPostsBySlugs([
    'the-ultimate-guide-to-flax-eggs',
    'how-to-make-aquafaba-meringue-at-home',
    'how-to-use-applesauce-as-an-egg-substitute-in-your-favorite-recipes',
  ]);

  console.log(posts);

  return (
    <HowToSection
      posts={posts}
      title="How To Use Egg Substitutes"
      description="Essential guides about egg substitutions in baking."
    />
  );
}
