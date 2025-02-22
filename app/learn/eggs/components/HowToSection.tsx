const howToGuides = [
  {
    title: 'How to Make a Flax Egg',
    duration: '5 mins',
    steps: ['Grind flax seeds', 'Mix with water', 'Let sit for 5 minutes'],
    videoUrl: 'https://placehold.co/400x600',
    href: '/learn/eggs/how-to/flax-egg',
  },
  {
    title: 'How to Use Aquafaba in Meringues',
    duration: '15 mins',
    steps: ['Drain chickpeas', 'Whip liquid', 'Add sugar gradually'],
    videoUrl: 'https://placehold.co/400x600',
    href: '/learn/eggs/how-to/aquafaba-meringue',
  },
  {
    title: 'How to Adjust Recipe Moisture',
    duration: '3 mins',
    steps: ['Calculate moisture loss', 'Add liquid', 'Test consistency'],
    videoUrl: 'https://placehold.co/400x600',
    href: '/learn/eggs/how-to/adjust-moisture',
  },
];

export default function HowToSection() {
  return (
    <section id="how-to" className="py-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          How To Use Egg Substitutes
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Master the techniques for working with egg substitutes through our step-by-step guides.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {howToGuides.map((guide) => (
            <a
              key={guide.title}
              href={guide.href}
              className="group block bg-white dark:bg-gray-800 rounded-lg overflow-hidden 
                       shadow-sm hover:shadow-md transition-all border border-gray-200 
                       dark:border-gray-700"
            >
              <div className="aspect-video relative">
                <img
                  src={guide.videoUrl}
                  alt={guide.title}
                  className="object-cover w-full h-full"
                />
                <div
                  className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 
                              rounded text-xs text-white"
                >
                  {guide.duration}
                </div>
              </div>

              <div className="p-6">
                <h3
                  className="text-xl font-semibold text-gray-900 dark:text-white 
                             group-hover:text-blue-600 dark:group-hover:text-blue-400 
                             transition-colors mb-4"
                >
                  {guide.title}
                </h3>

                <ol className="space-y-2">
                  {guide.steps.map((step, index) => (
                    <li
                      key={index}
                      className="flex items-center text-gray-600 
                                             dark:text-gray-300"
                    >
                      <span
                        className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 
                                     text-blue-800 dark:text-blue-200 flex items-center 
                                     justify-center text-sm mr-3"
                      >
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
