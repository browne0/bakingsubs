import BrokenEggImg from '@/app/images/learn/eggs/broken_egg.jpg';
import ChoosingSubstituteImg from '@/app/images/learn/eggs/choosing_substitution.jpg';
import DoughImg from '@/app/images/learn/eggs/dough.jpg';
import EggWashImg from '@/app/images/learn/eggs/egg_wash.jpg';
import ScienceSection from '@/components/learn/shared/ScienceSection';

const scienceTopics = [
  {
    title: 'Binding Power',
    content:
      'Eggs are essential as a binding agent, ensuring that ingredients stay together. Any substitutes must effectively replicate this binding capability!',
    image: DoughImg.src,
    imageAlt: 'Dough being kneaded showing binding properties',
  },
  {
    title: 'Moisture & Air',
    content:
      'The moisture from eggs helps keep the bake tender and prevents it from becoming too dry, while the air they incorporate during beating adds lightness and volume, especially in baked goods like cakes and soufflés.',
    image: BrokenEggImg.src,
    imageAlt: 'Cracked egg showing moisture content',
  },
  {
    title: 'Flavor & Color',
    content:
      'Eggs enhance the flavor of baked goods by adding richness and a subtle savory note, helping to bind the ingredients together. They also contribute a natural golden color through the Maillard reaction during baking, which adds visual appeal and a slightly caramelized taste.',
    image: EggWashImg.src,
    imageAlt: 'Egg wash being applied to a baked good',
  },
];

export default function EggsScience() {
  return (
    <ScienceSection
      topics={scienceTopics}
      title="The Science Behind Eggs in Baking"
      description="Eggs play a crucial role in baking and can be used in various ways to enhance both the texture and flavor of baked goods. Here are some key functions they serve:"
      conclusion={{
        title: 'When choosing your substitution',
        content:
          'Consider the primary function of the eggs in your recipe—whether they provide moisture, structure, or leavening. Aim to select a replacement that mimics these properties, such as applesauce for moisture or a combination of baking powder and liquid for leavening, to achieve the best results in your baked goods.',
        image: ChoosingSubstituteImg.src,
        imageAlt: 'Baking substitution example',
      }}
    />
  );
}
