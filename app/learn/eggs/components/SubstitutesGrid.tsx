import { substitutes } from '../data/substitutes';

export default function SubstitutesGrid() {
  return (
    <section id="substitutes" className="py-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Common Egg Substitutes
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Discover the most effective egg alternatives for your baking needs. Each substitute has
          its own unique properties and best uses.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {substitutes.map((sub) => (
            <a
              key={sub.id}
              href={sub.href}
              className="group block bg-white dark:bg-gray-800 rounded-lg shadow-sm 
                       hover:shadow-md transition-all border border-gray-200 
                       dark:border-gray-700 overflow-hidden"
            >
              <div className="aspect-video relative">
                <img src={sub.image} alt={sub.name} className="object-cover w-full h-full" />
              </div>

              <div className="p-6">
                <h3
                  className="text-xl font-semibold text-gray-900 dark:text-white 
                             group-hover:text-blue-600 dark:group-hover:text-blue-400 
                             transition-colors"
                >
                  {sub.name}
                </h3>

                <div className="mt-2 space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300">{sub.description}</p>

                  <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Ratio: {sub.ratio}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {sub.bestUses.map((use) => (
                      <span
                        key={use}
                        className="px-2 py-1 text-xs rounded-full bg-blue-100 
                                 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
