import EggsImg from '@/app/images/learn/eggs/eggs.jpg';
import { Metadata } from 'next';
import { StaticImageData } from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Learn About Baking Substitutions | BakingSubs',
  description:
    'Discover how to substitute common baking ingredients. From eggs to flour, find the right alternatives for your dietary needs and preferences.',
};

const substitutionCategories: {
  title: string;
  image: string | StaticImageData;
  href: string;
  status: 'complete' | 'coming-soon';
}[] = [
  {
    title: 'Eggs',
    image: EggsImg,
    href: '/learn/eggs',
    status: 'complete' as const,
  },
  {
    title: 'Milk',
    image: 'https://placehold.co/800x800',
    href: '/learn/milk',
    status: 'coming-soon' as const,
  },
  {
    title: 'Sugar',
    image: 'https://placehold.co/800x800',
    href: '/learn/sugar',
    status: 'coming-soon' as const,
  },
  {
    title: 'Butter',
    image: 'https://placehold.co/800x800',
    href: '/learn/butter',
    status: 'coming-soon' as const,
  },
  {
    title: 'Flour',
    image: 'https://placehold.co/800x800',
    href: '/learn/flour',
    status: 'coming-soon' as const,
  },
  {
    title: 'Leaveners',
    image: 'https://placehold.co/800x800',
    href: '/learn/leaveners',
    status: 'coming-soon' as const,
  },
  {
    title: 'Oils & Fats',
    image: 'https://placehold.co/800x800',
    href: '/learn/oils-fats',
    status: 'coming-soon' as const,
  },
  {
    title: 'Vanilla & Flavorings',
    image: 'https://placehold.co/800x800',
    href: '/learn/flavorings',
    status: 'coming-soon' as const,
  },
];

export default function LearnPage() {
  return (
    <main className="min-h-screen py-12">
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          What do you want to <span className="text-red-600 dark:text-red-500">substitute</span>?
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Whether you're accommodating dietary restrictions or just ran out of an ingredient, we'll
          help you find the right substitution. Explore our comprehensive guides or dive into a
          specific topic below.
        </p>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {substitutionCategories.map((category) => (
            <div key={category.title} className="relative group">
              {category.status === 'complete' ? (
                <Link href={category.href} className="block">
                  <CategoryCard {...category} />
                </Link>
              ) : (
                <div className="cursor-not-allowed">
                  <CategoryCard {...category} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
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
    <div className="relative aspect-square overflow-hidden rounded-xl">
      <img
        src={typeof image === 'string' ? image : image.src}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />

      <div className="absolute inset-x-0 bottom-0 p-4">
        <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
      </div>

      {status === 'coming-soon' && (
        <div
          className="absolute top-4 right-4 bg-black/80 text-white 
                     px-3 py-1 rounded-full text-sm font-medium"
        >
          Coming Soon
        </div>
      )}
    </div>
  );
}
