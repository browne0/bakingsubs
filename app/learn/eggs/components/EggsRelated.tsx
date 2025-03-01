import RelatedContent from '@/components/learn/shared/RelatedContent';
import { substitutionCategories } from '../../page';

export default function EggsRelated() {
  return (
    <RelatedContent
      categories={substitutionCategories}
      currentCategory="eggs"
      title="Explore More Baking Substitutions"
      description="Discover more ways to adapt your favorite recipes with these comprehensive guides."
    />
  );
}
