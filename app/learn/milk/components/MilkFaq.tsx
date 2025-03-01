import FaqSection from '@/components/learn/shared/FaqSection';

const faqs = [
  {
    question: 'Will plant-based milk affect the taste of my baked goods?',
    answer:
      'Yes, some plant-based milks can add subtle flavors. Soy and oat milk are relatively neutral, while coconut and almond milk may add noticeable flavors. Choose based on your recipe and desired taste profile.',
  },
  {
    question: 'Do I need to adjust other ingredients when using milk alternatives?',
    answer:
      'Sometimes. Plant-based milks have different fat and protein contents than dairy milk. You might need to add a bit more fat for richness or adjust leavening agents. Follow specific substitution ratios for best results.',
  },
  {
    question: 'Can I use any milk alternative for any recipe?',
    answer:
      'Not always. Different milk alternatives work better in different recipes. For example, soy milk works well in most recipes due to its protein content, while coconut milk is great for rich desserts but might be too heavy for light cakes.',
  },
  {
    question: 'How do milk substitutes affect texture?',
    answer:
      'The texture impact varies by substitute. Protein-rich options like soy milk provide structure similar to dairy milk. Lower-protein alternatives might need additional ingredients to achieve the same texture. Fat content also plays a crucial role.',
  },
  {
    question: 'What about recipes that call for buttermilk?',
    answer:
      'You can make a vegan buttermilk by adding 1 tablespoon of lemon juice or vinegar to 1 cup of plant-based milk and letting it sit for 5-10 minutes. This creates the acidity needed for recipes calling for buttermilk.',
  },
];

export default function MilkFaq() {
  return (
    <FaqSection
      faqs={faqs}
      title="Frequently Asked Questions"
      description="Common questions about milk substitutions in baking."
    />
  );
}
