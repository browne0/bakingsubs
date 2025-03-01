import StartHereSection from '@/components/learn/shared/StartHereSection';

const startHereCards = [
  {
    title: 'Understanding Milk in Baking',
    description:
      'Learn about the role of milk in baking, from providing moisture to affecting texture and browning.',
    icon: '🥛',
    href: '/learn/milk/functions',
  },
  {
    title: 'Choosing the Right Milk Alternative',
    description:
      'Find the perfect plant-based milk for your recipe based on protein content, fat levels, and flavor profile.',
    icon: '🌱',
    href: '/learn/milk/choosing-alternatives',
  },
  {
    title: 'Plant-Based Milk Guide',
    description:
      'Explore different plant-based milk options, from soy and almond to oat and coconut, and their best uses in baking.',
    icon: '🥥',
    href: '/learn/milk/plant-based-guide',
  },
  {
    title: 'Common Substitution Mistakes',
    description:
      'Learn what to avoid when substituting milk in your recipes and how to troubleshoot common issues.',
    icon: '⚠️',
    href: '/learn/milk/mistakes',
  },
];

export default function MilkStartHere() {
  return (
    <StartHereSection
      cards={startHereCards}
      title="Start Here"
      description="New to milk substitutions? These essential guides will help you understand the basics and set you up for success in your dairy-free baking journey."
    />
  );
}
