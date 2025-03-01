import StartHereSection from '@/components/learn/shared/StartHereSection';

const startHereCards = [
  {
    title: 'Understanding Egg Functions in Baking',
    description:
      'Learn how eggs provide structure, moisture, and richness in baking, and why these properties matter.',
    icon: '🥚',
    href: '/learn/eggs/functions',
  },
  {
    title: 'How to Choose the Right Egg Substitute',
    description:
      "Find the perfect substitute based on your recipe's needs and the role eggs play in it.",
    icon: '🔄',
    href: '/learn/eggs/choosing-substitutes',
  },
  {
    title: 'Vegan Egg Substitutes: Complete Guide',
    description:
      'Learn the difference between all the plant-based options for replacing eggs in your baking, from flax to commercial alternatives.',
    icon: '🌱',
    href: '/learn/eggs/vegan-substitutes',
  },
  {
    title: 'Common Substitution Mistakes',
    description:
      'Avoid typical pitfalls and learn from common errors when replacing eggs in recipes.',
    icon: '⚠️',
    href: '/learn/eggs/mistakes',
  },
];

export default function EggsStartHere() {
  return (
    <StartHereSection
      cards={startHereCards}
      title="Start Here"
      description="New to egg substitutions? These essential guides will help you understand the basics and set you up for success in your egg-free baking journey."
    />
  );
}
