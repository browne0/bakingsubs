const recipes = [
  {
    title: 'Vegan Chocolate Chip Cookies',
    image: 'https://placehold.co/400x600',
    difficulty: 'Easy',
    time: '30 mins',
    substitute: 'Flax Egg',
    href: '/recipes/vegan-chocolate-chip-cookies',
  },
  {
    title: 'Eggless Vanilla Cake',
    image: 'https://placehold.co/400x600',
    difficulty: 'Medium',
    time: '45 mins',
    substitute: 'Commercial Replacer',
    href: '/recipes/eggless-vanilla-cake',
  },
  {
    title: 'Aquafaba Meringue Cookies',
    image: 'https://placehold.co/400x600',
    difficulty: 'Advanced',
    time: '2 hrs',
    substitute: 'Aquafaba',
    href: '/recipes/aquafaba-meringue-cookies',
  },
  {
    title: 'Banana Bread',
    image: 'https://placehold.co/400x600',
    difficulty: 'Easy',
    time: '1 hr',
    substitute: 'Mashed Banana',
    href: '/recipes/eggless-banana-bread',
  },
];

export default function RecipeSection() {
  return (
    <section id="recipes" className="py-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Tested Recipes Using Egg Substitutes
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Try these carefully tested recipes designed specifically for egg substitutes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <a
              key={recipe.title}
              href={recipe.href}
              className="group block bg-white dark:bg-gray-800 rounded-lg overflow-hidden 
                       shadow-sm hover:shadow-md transition-all border border-gray-200 
                       dark:border-gray-700"
            >
              <div className="aspect-square relative">
                <img src={recipe.image} alt={recipe.title} className="object-cover w-full h-full" />
                <div
                  className="absolute top-2 right-2 bg-white dark:bg-gray-800 
                              px-2 py-1 rounded-full text-xs font-medium 
                              text-gray-600 dark:text-gray-300"
                >
                  {recipe.time}
                </div>
              </div>

              <div className="p-4">
                <h3
                  className="font-semibold text-gray-900 dark:text-white 
                             group-hover:text-blue-600 dark:group-hover:text-blue-400 
                             transition-colors"
                >
                  {recipe.title}
                </h3>

                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">{recipe.difficulty}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    {recipe.substitute}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
