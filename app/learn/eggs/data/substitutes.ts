export type Substitute = {
  id: string;
  name: string;
  image: string;
  bestUses: string[];
  ratio: string;
  description: string;
  href: string;
};

export const substitutes: Substitute[] = [
  {
    id: 'flax-egg',
    name: 'Flax Egg',
    image: 'https://placehold.co/400x600',
    bestUses: ['Cookies', 'Quick Breads', 'Muffins'],
    ratio: '1 tbsp ground flax + 3 tbsp water = 1 egg',
    description:
      'A nutritious option that works best in heartier baked goods. Provides binding and structure.',
    href: '/learn/eggs/flax-eggs',
  },
  {
    id: 'chia-egg',
    name: 'Chia Egg',
    image: 'https://placehold.co/400x600',
    bestUses: ['Cookies', 'Quick Breads', 'Pancakes'],
    ratio: '1 tbsp chia seeds + 3 tbsp water = 1 egg',
    description: 'Similar to flax eggs, with a neutral taste that works well in most recipes.',
    href: '/learn/eggs/chia-eggs',
  },
  {
    id: 'aquafaba',
    name: 'Aquafaba',
    image: 'https://placehold.co/400x600',
    bestUses: ['Meringues', 'Macarons', 'Light Cakes'],
    ratio: '3 tbsp aquafaba = 1 egg',
    description: 'Chickpea liquid that mimics egg whites perfectly in whipped applications.',
    href: '/learn/eggs/aquafaba',
  },
  {
    id: 'commercial',
    name: 'Commercial Replacer',
    image: 'https://placehold.co/400x600',
    bestUses: ['Cakes', 'Cookies', 'General Baking'],
    ratio: 'Varies by brand',
    description: 'Consistent results across most recipes. Follow package instructions.',
    href: '/learn/eggs/commercial-replacers',
  },
  {
    id: 'banana',
    name: 'Mashed Banana',
    image: 'https://placehold.co/400x600',
    bestUses: ['Quick Breads', 'Muffins', 'Pancakes'],
    ratio: '¼ cup mashed banana = 1 egg',
    description: 'Adds moisture and binding. Note that it will add banana flavor.',
    href: '/learn/eggs/banana',
  },
  {
    id: 'applesauce',
    name: 'Applesauce',
    image: 'https://placehold.co/400x600',
    bestUses: ['Cakes', 'Muffins', 'Quick Breads'],
    ratio: '¼ cup applesauce = 1 egg',
    description: 'Provides moisture with minimal flavor impact. Best in tender baked goods.',
    href: '/learn/eggs/applesauce',
  },
];
