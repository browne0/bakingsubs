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

export default function StartHereSection() {
  return (
    <section id="start" className="py-6">
      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          Start Here
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          New to egg substitutions? These essential guides will help you understand the basics and
          set you up for success in your egg-free baking journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {startHereCards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="group block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm 
                       hover:shadow-md transition-shadow border border-gray-200 
                       dark:border-gray-700"
            >
              <div className="flex items-start space-x-4">
                <span className="text-2xl">{card.icon}</span>
                <div>
                  <h3
                    className="text-lg font-semibold text-gray-900 dark:text-white 
                               group-hover:text-blue-600 dark:group-hover:text-blue-400 
                               transition-colors"
                  >
                    {card.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{card.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
