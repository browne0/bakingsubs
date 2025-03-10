import MaddyMalik from '@/app/images/maddy-malik.jpg';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About BakingSubs - Our Story and Mission',
  description:
    'Learn about BakingSubs, born from a passion for baking and a mission to provide comprehensive, science-based baking substitution guidance.',
  openGraph: {
    title: 'About BakingSubs - Our Story and Mission',
    description:
      'Learn about BakingSubs, born from a passion for baking and a mission to provide comprehensive, science-based baking substitution guidance.',
    images: [{ url: MaddyMalik.src, width: 400, height: 600, alt: 'Founders baking together' }],
  },
};

const textStyles = 'text-gray-700 dark:text-gray-300';
const headingStyles = 'font-bold text-gray-900 dark:text-white';
const sectionStyles = 'space-y-6';

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
      <div className="space-y-12">
        {/* Origin Story Section */}
        <section className={sectionStyles}>
          <h1 className={`text-3xl md:text-4xl ${headingStyles}`}>Our Story</h1>
          <div className="space-y-4">
            <p className={`text-lg ${textStyles}`}>
              BakingSubs was born from a simple yet relatable moment in the kitchen.
            </p>
            <p className={`text-lg ${textStyles}`}>
              My partner Maddy, an avid baker, found herself in the all-too-familiar situation of
              being mid-recipe only to discover she was missing a key ingredient. <br />
              <br />
              While there were substitution guides available online, none provided the depth of
              information needed to make her feel confident about her baking decisions.
            </p>
            <p className={`text-lg ${textStyles}`}>
              Her passion for baking was contagious, and soon I found myself joining her in the
              kitchen, learning how to bake pastries and different breads. <br />
              <br /> Together, we&apos;ve evolved in our baking journey, now focusing on creating
              healthier versions of our favorite desserts without compromising on the taste.
            </p>
          </div>
        </section>

        {/* Image Section */}
        <section className="mx-auto max-w-lg">
          <div className="relative w-full h-[400px] sm:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={MaddyMalik}
              alt="Founders baking together with their baked goods"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 640px) 100vw, 32rem"
              quality={90}
            />
          </div>
        </section>

        {/* Vision Section */}
        <section className={sectionStyles}>
          <h2 className={`text-2xl md:text-3xl ${headingStyles}`}>Our Vision</h2>
          <div className="space-y-4">
            <p className={`text-lg ${textStyles}`}>
              We want BakingSubs becoming the definitive resource for baking substitutions
              worldwide. Unlike traditional substitution guides that only scratch the surface with
              basic swaps, we&apos;re building a comprehensive platform that explains the
              &quot;why&quot; behind each substitution.
            </p>
            <p className={`text-lg ${textStyles}`}>Our platform aims to provide:</p>
            <ul className={`list-disc list-inside space-y-2 ${textStyles}`}>
              <li>Detailed explanations of how substitutions affect texture, taste, and rise</li>
              <li>Clear hierarchy of best options for each ingredient</li>
              <li>Science-backed insights into the chemistry of baking</li>
            </ul>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 font-semibold">
              Our Mission
            </h2>
            <p className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white leading-relaxed">
              &quot;Our mission is to make baking more accessible and less stressful by providing
              reliable, science-based substitution guidance for bakers of all skill levels.&quot;
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
