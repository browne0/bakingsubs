import Link from 'next/link';

interface StartHereCard {
  title: string;
  description: string;
  icon: string;
  href: string;
}

interface StartHereSectionProps {
  title?: string;
  description?: string;
  cards: StartHereCard[];
}

export default function StartHereSection({
  title = 'Start Here',
  description = 'New to substitutions? These essential guides will help you understand the basics and set you up for success in your baking journey.',
  cards,
}: StartHereSectionProps) {
  return (
    <section id="start-here" className="py-6">
      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          {title}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <Link
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
