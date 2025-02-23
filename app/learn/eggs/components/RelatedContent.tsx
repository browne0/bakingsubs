const relatedTopics = [
  {
    title: 'Milk',
    description: 'Learn how milk enriches, tenderizes, and browns your baked creations.',
    image: 'https://placehold.co/400x600',
    href: '/learn/milk',
  },
  {
    title: 'Flour',
    description: 'Discover gluten-free and alternative flour options for baking.',
    image: 'https://placehold.co/400x600',
    href: '/learn/flour',
  },
  {
    title: 'Sugar',
    description: 'Explore natural sweeteners and sugar alternatives.',
    image: 'https://placehold.co/400x600',
    href: '/learn/sugar',
  },
];

export default function RelatedContent() {
  return (
    <section className="py-6 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Explore More Baking Substitutions
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Discover more ways to adapt your favorite recipes with these comprehensive guides.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedTopics.map((topic) => (
            <a
              key={topic.title}
              href={topic.href}
              className="group relative block bg-white dark:bg-gray-800 rounded-lg 
                       overflow-hidden shadow-sm hover:shadow-md transition-all 
                       border border-gray-200 dark:border-gray-700"
            >
              <div className="aspect-[16/9] relative">
                <img src={topic.image} alt={topic.title} className="object-cover w-full h-full" />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 
                              to-transparent group-hover:from-black/70 transition-all"
                />

                <div className="absolute bottom-0 p-6 text-white">
                  <h3
                    className="text-xl font-semibold mb-2 group-hover:text-blue-200 
                               transition-colors"
                  >
                    {topic.title}
                  </h3>
                  <p className="text-sm text-gray-200">{topic.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
