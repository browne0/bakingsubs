import FaqSection from '@/components/learn/shared/FaqSection';

const faqs = [
  {
    question: 'Will my baked goods taste different with egg substitutes?',
    answer:
      "The taste difference depends on the substitute used. Some, like commercial egg replacers, are nearly undetectable. Others, like banana or applesauce, may add subtle flavors. Choose neutral-tasting substitutes like flax eggs or commercial replacers when you don't want to affect the taste.",
  },
  {
    question: 'Can I substitute just egg whites or just yolks?',
    answer:
      "Yes, you can! For egg whites, aquafaba is an excellent substitute, especially for meringues and light bakes. For yolk replacement, try silken tofu or commercial egg replacers specifically designed for yolks. The key is matching the function of the part you're replacing.",
  },
  {
    question: 'How does egg substitution affect shelf life?',
    answer:
      "Baked goods made with egg substitutes generally have a slightly shorter shelf life than those made with eggs. Store them properly in airtight containers and consider refrigerating items that you'd normally leave at room temperature.",
  },
  {
    question: 'Can I use different substitutes in the same recipe?',
    answer:
      "While it's possible to use multiple substitutes, it's generally better to stick to one type per recipe until you're familiar with how each performs. This makes it easier to troubleshoot if something goes wrong.",
  },
  {
    question: 'How do I know which substitute works best for my recipe?',
    answer:
      'Consider the role eggs play in your recipe. For binding, try flax or chia eggs. For moisture, use applesauce or banana. For structure in cakes, commercial egg replacers often work best. For whipping, aquafaba is your best bet.',
  },
];

export default function EggsFaq() {
  return (
    <FaqSection
      faqs={faqs}
      title="Frequently Asked Questions"
      description="Common questions about egg substitutions in baking."
    />
  );
}
