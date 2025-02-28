import { StaticImageData } from 'next/image';
import Link from 'next/link';
import { substitutionCategories } from '../../page';

type SubstitutionCategory = {
  title: string;
  image: string | StaticImageData;
  href: string;
  status: 'complete' | 'coming-soon';
};

function getRandomCategories(
  categories: SubstitutionCategory[],
  count: number,
  currentCategory: string
): SubstitutionCategory[] {
  // First, filter out the current category and separate complete and coming-soon categories
  const filteredCategories = categories.filter((cat) => !cat.href.includes(currentCategory));
  const complete = filteredCategories.filter((cat) => cat.status === 'complete');
  const comingSoon = filteredCategories.filter((cat) => cat.status === 'coming-soon');

  // Shuffle both arrays
  const shuffledComplete = [...complete].sort(() => Math.random() - 0.5);
  const shuffledComingSoon = [...comingSoon].sort(() => Math.random() - 0.5);

  // Take all complete ones first, then fill remaining with coming-soon
  const result = [...shuffledComplete];
  while (result.length < count && shuffledComingSoon.length > 0) {
    result.push(shuffledComingSoon.pop()!);
  }

  // If we still need more, take from complete again (unlikely in this case)
  while (result.length < count && shuffledComplete.length > 0) {
    result.push(shuffledComplete.pop()!);
  }

  return result.slice(0, count);
}

export default function RelatedContent() {
  const relatedTopics = getRandomCategories(substitutionCategories, 3, 'eggs');

  return (
    <section className="py-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Explore More Baking Substitutions
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Discover more ways to adapt your favorite recipes with these comprehensive guides.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedTopics.map((topic) => (
            <div key={topic.title} className="relative group">
              {topic.status === 'complete' ? (
                <Link href={topic.href} className="block">
                  <CategoryCard {...topic} />
                </Link>
              ) : (
                <div className="cursor-not-allowed">
                  <CategoryCard {...topic} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  title,
  image,
  status,
}: {
  title: string;
  image: StaticImageData | string;
  status: 'complete' | 'coming-soon';
}) {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <img
        src={typeof image === 'string' ? image : image.src}
        alt={title}
        className="object-fit aspect-[16/9]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />

      <div className="absolute inset-x-0 bottom-0 p-4">
        <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
      </div>

      {status === 'coming-soon' && (
        <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium">
          Coming Soon
        </div>
      )}
    </div>
  );
}
