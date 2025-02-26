import { getEggSubstitutions } from '@/app/services/substitutionService';
import { decimalToFraction } from '@/app/utils/fractions';
import Image from 'next/image';
import Link from 'next/link';

export default async function SubstitutesGrid() {
  const { data: substitutes = [] } = await getEggSubstitutions();

  if (!substitutes) return null;
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
            <Link
              key={sub.id}
              href={`/ingredients/eggs/substitutions/${sub.id}`}
              className="group block bg-white dark:bg-gray-800 rounded-lg shadow-sm 
                       hover:shadow-md transition-all border border-gray-200 
                       dark:border-gray-700 overflow-hidden"
            >
              <div className="aspect-video relative">
                <Image
                  src={sub.image_url || 'https://placehold.co/400x600'}
                  alt={sub.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
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
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {sub.substitution_ingredients.map((si, index) => (
                      <span key={si.ingredient.id} className="lowercase">
                        {index > 0 && ' + '}
                        {decimalToFraction(si.amount)} {si.unit} {si.ingredient.name}
                      </span>
                    ))}{' '}
                    = 1 egg
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {sub.best_for?.map((use) => (
                      <span
                        key={use}
                        className="px-2 py-1 text-xs rounded-full bg-blue-100 
                                 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                      >
                        {use.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
