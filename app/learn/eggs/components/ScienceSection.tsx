import Image from 'next/image';

const scienceTopics = [
  {
    title: 'Binding Power',
    content:
      'Eggs are essential as a binding agent, ensuring that ingredients stay together. Any substitutes must effectively replicate this binding capability!',
    image: 'https://placehold.co/600x400',
    imageAlt: 'Dough being kneaded showing binding properties',
  },
  {
    title: 'Moisture & Air',
    content:
      'The moisture from eggs helps keep the bake tender and prevents it from becoming too dry, while the air they incorporate during beating adds lightness and volume, especially in baked goods like cakes and soufflés.',
    image: 'https://placehold.co/600x400',
    imageAlt: 'Cracked egg showing moisture content',
  },
  {
    title: 'Flavor & Color',
    content:
      'Eggs enhance the flavor of baked goods by adding richness and a subtle savory note, helping to bind the ingredients together. They also contribute a natural golden color through the Maillard reaction during baking, which adds visual appeal and a slightly caramelized taste.',
    image: 'https://placehold.co/600x400',
    imageAlt: 'Golden baked good showing color contribution',
  },
];

export default function ScienceSection() {
  return (
    <section id="science" className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          The Science Behind Eggs in Baking
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
          Eggs play a crucial role in baking and can be used in various ways to enhance both the
          texture and flavor of baked goods. Here are some key functions they serve:
        </p>

        <div className="space-y-16">
          {scienceTopics.map((topic, index) => (
            <div
              key={topic.title}
              className={`grid md:grid-cols-2 gap-8 ${index % 2 === 0 ? '' : 'md:[direction:rtl]'}`}
            >
              <Image
                src={topic.image}
                alt={topic.imageAlt}
                width={600}
                height={400}
                className="rounded-lg w-full object-cover"
                unoptimized
              />

              <div className={`flex gap-4 ${index % 2 === 1 ? 'md:[direction:ltr]' : ''}`}>
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-white font-semibold">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {topic.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">{topic.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            When choosing your substitution
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Consider the primary function of the eggs in your recipe—whether they provide moisture,
            structure, or leavening. Aim to select a replacement that mimics these properties, such
            as applesauce for moisture or baking powder for leavening, to achieve the best results
            in your baked goods.
          </p>
        </div>
      </div>
    </section>
  );
}
