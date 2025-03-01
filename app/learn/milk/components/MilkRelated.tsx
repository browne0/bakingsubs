import RelatedContent from '@/components/learn/shared/RelatedContent';
import { substitutionCategories } from '../../page';

export default function MilkRelated() {
  return (
    <RelatedContent
      categories={substitutionCategories}
      currentCategory="milk"
      title="Explore More Dairy Substitutions"
      description="Discover more ways to adapt your recipes with these comprehensive dairy-free guides."
    />
  );
}
