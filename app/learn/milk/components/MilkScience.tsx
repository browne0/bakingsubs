import BakingImg from '@/app/images/learn/milk/baking.jpg';
import ChoosingSubstituteImg from '@/app/images/learn/milk/choosing_substitution.jpg';
import ProteinImg from '@/app/images/learn/milk/protein.jpg';
import TextureImg from '@/app/images/learn/milk/texture.jpg';
import ScienceSection from '@/components/learn/shared/ScienceSection';

const scienceTopics = [
  {
    title: 'Protein Content',
    content:
      'Milk proteins play a crucial role in structure and texture. They help create tender baked goods and contribute to browning through the Maillard reaction. Plant-based alternatives vary in protein content, affecting how they perform in baking.',
    image: ProteinImg.src,
    imageAlt: 'Protein structures in different types of milk',
  },
  {
    title: 'Fat and Moisture',
    content:
      'The fat in milk adds richness and helps create a tender crumb, while its moisture content affects the consistency of batters and doughs. Different milk alternatives have varying fat levels, which can impact the final texture.',
    image: TextureImg.src,
    imageAlt: 'Texture comparison of different milk types',
  },
  {
    title: 'Baking Chemistry',
    content:
      'Milk affects the pH of batters and interacts with leavening agents. Its sugars contribute to browning and flavor development. When substituting, consider how these chemical interactions might change with different alternatives.',
    image: BakingImg.src,
    imageAlt: 'Chemical reactions in baking with milk substitutes',
  },
];

export default function MilkScience() {
  return (
    <ScienceSection
      topics={scienceTopics}
      title="The Science Behind Milk in Baking"
      description="Milk serves multiple functions in baking, from providing structure to enhancing flavor. Understanding these roles helps in choosing the right substitute:"
      conclusion={{
        title: 'Choosing Your Milk Alternative',
        content:
          'Consider the role of milk in your recipe when selecting a substitute. For structure, choose protein-rich options like soy milk. For richness, consider full-fat alternatives like coconut milk. Match the fat content and protein level to your needs for best results.',
        image: ChoosingSubstituteImg.src,
        imageAlt: 'Different milk alternatives for baking',
      }}
    />
  );
}
