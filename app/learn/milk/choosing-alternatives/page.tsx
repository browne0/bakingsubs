import { NewsletterSignup } from '@/app/blog/[slug]/components/NewsletterSignup';
import MilkAlternatives from '@/app/images/learn/milk/milk3.jpg'; // Using existing image for now
import BackToTopButton from '@/components/BackToTopButton';
import QuickReferenceTable from '@/components/learn/QuickReferenceTable';
import { ogImage } from '@/lib/metadata';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Choosing the Perfect Milk Alternative for Baking',
  description:
    'Learn how to select the ideal milk alternative for your baking needs based on protein content, fat levels, and flavor profile.',
  openGraph: {
    title: 'Choosing the Perfect Milk Alternative for Baking',
    description:
      'Learn how to select the ideal milk alternative for your baking needs based on protein content, fat levels, and flavor profile.',
    ...ogImage,
  },
};

export default function ChoosingMilkAlternativesPage() {
  const sections = [
    { id: 'decision', title: 'Decision Framework' },
    { id: 'alternatives', title: 'Milk Alternative Options' },
    { id: 'best-uses', title: 'Best Uses by Recipe Type' },
    { id: 'practical', title: 'Practical Application' },
    { id: 'troubleshooting', title: 'Troubleshooting Guide' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        {/* Featured Image for Mobile */}
        <div className="lg:hidden mb-8">
          <Image
            src={MilkAlternatives}
            alt="Various milk alternatives for baking"
            width={800}
            height={600}
            className="w-full rounded-lg"
          />
        </div>

        {/* Desktop Header Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Nav, Title, Excerpt */}
            <div className="lg:col-span-7">
              <nav className="flex items-center space-x-2 text-sm mb-8">
                <Link
                  href="/learn"
                  className="text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider font-medium"
                >
                  Learn
                </Link>
                <span className="text-gray-400">›</span>
                <Link
                  href="/learn/milk"
                  className="text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider font-medium"
                >
                  Milk
                </Link>
              </nav>

              <h1 className="font-serif text-5xl leading-tight mb-6 tracking-tight">
                Choosing the Perfect Milk Alternative for Baking
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Now that you understand how milk functions in baking, it's time to explore the world
                of milk alternatives. This guide will help you select the perfect alternative based
                on your specific baking needs, dietary requirements, and desired outcomes.
              </p>

              {/* Table of Contents */}
              <div className="py-6 border-t border-gray-200">
                <h2 className="font-serif text-2xl mb-4">Contents</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {sections.map(({ id, title }) => (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Featured Image */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="sticky top-8">
                <figure>
                  <Image
                    src={MilkAlternatives}
                    alt="Various milk alternatives for baking"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover rounded-lg aspect-square"
                    priority
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>

        {/* Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 mt-8 gap-8 max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-8 lg:col-start-1">
            <div className="prose prose-lg max-w-none">
              {/* Decision Framework Section */}
              <section id="decision" className="mt-12">
                <h2 className="font-serif text-3xl font-bold mb-6">Decision Framework</h2>
                <p>
                  So you're out of milk or maybe you can't have dairy – now what? Before you grab
                  just any alternative, think about what milk is actually doing in your recipe. Is
                  it adding moisture? Fat? Protein? Flavor?
                </p>

                <p className="mt-6">Milk in baking usually serves a few key purposes:</p>

                <ul className="list-disc pl-5 space-y-2 mt-4">
                  <li>It provides moisture and liquid</li>
                  <li>It adds fat (especially whole milk)</li>
                  <li>It contributes protein that helps with structure</li>
                  <li>It contains sugar (lactose) that affects browning</li>
                </ul>

                <p className="mt-6">
                  When choosing a substitute, focus on matching the properties that matter most for
                  your specific recipe. For cakes, moisture and fat content are crucial. For breads,
                  protein matters more.
                </p>

                <div className="mt-6">
                  <p className="text-gray-600">
                    Always consider the primary function of milk in your specific recipe before
                    selecting an alternative.
                  </p>
                </div>
              </section>

              {/* Milk Alternative Options Section */}
              <section id="alternatives" className="mt-12">
                <h2 className="font-serif text-3xl font-bold mb-6">Milk Alternative Options</h2>
                <p>Here's a comprehensive breakdown of each milk alternative and its properties:</p>

                <div className="space-y-6 mt-6">
                  <div className="border-l-4 border-gray-200 pl-6">
                    <p className="font-semibold">Soy Milk</p>
                    <p className="text-gray-600 mb-2">
                      Has protein levels similar to dairy milk (7-8g per cup), making it great for
                      recipes that need structure. Contains moderate fat (2-3g) and lower sugar
                      (4g). The flavor is slightly beany, which can come through in delicate
                      recipes.
                    </p>
                    <p className="text-gray-600 font-medium">
                      Best for: Breads, muffins, and recipes needing structure
                    </p>
                  </div>

                  <div className="border-l-4 border-gray-200 pl-6">
                    <p className="font-semibold">Oat Milk</p>
                    <p className="text-gray-600 mb-2">
                      Has a naturally sweet flavor (7g sugar) and creates a nice golden brown crust.
                      Moderate protein (3g) and fat content (2-3g). Its creamy texture makes it one
                      of the closest matches to dairy milk for most recipes.
                    </p>
                    <p className="text-gray-600 font-medium">
                      Best for: General baking, especially cakes and cookies
                    </p>
                  </div>

                  <div className="border-l-4 border-gray-200 pl-6">
                    <p className="font-semibold">Coconut Milk</p>
                    <p className="text-gray-600 mb-2">
                      Highest in fat (4-5g per cup) with very low sugar (0-1g) and protein (1g). The
                      canned version is much richer than the refrigerated kind. Perfect for adding
                      richness, but will add coconut flavor.
                    </p>
                    <p className="text-gray-600 font-medium">
                      Best for: Rich desserts, custards, and tropical-themed bakes
                    </p>
                  </div>

                  <div className="border-l-4 border-gray-200 pl-6">
                    <p className="font-semibold">Almond Milk</p>
                    <p className="text-gray-600 mb-2">
                      Low in fat (1-2g) and protein (1g) with minimal sugar (0-1g). Has a pleasant,
                      mild flavor. It's thinner than dairy milk, so it works well in cakes and
                      muffins, but might not provide enough richness for custards.
                    </p>
                    <p className="text-gray-600 font-medium">
                      Best for: Light cakes, muffins, and everyday baking
                    </p>
                  </div>

                  <div className="border-l-4 border-gray-200 pl-6">
                    <p className="font-semibold">Cashew Milk</p>
                    <p className="text-gray-600 mb-2">
                      Similar to almond milk in nutrition (1-2g fat, 1g protein), but with a more
                      neutral, creamy taste. Works well in most recipes but doesn't provide much
                      structure.
                    </p>
                    <p className="text-gray-600 font-medium">
                      Best for: Recipes where a neutral taste is important
                    </p>
                  </div>

                  <div className="border-l-4 border-gray-200 pl-6">
                    <p className="font-semibold">Rice Milk</p>
                    <p className="text-gray-600 mb-2">
                      Highest in natural sugars (10g) but very low in fat (1-2g) and protein (1g).
                      Very thin consistency and the least allergenic option. Best in recipes where
                      milk is just for moisture.
                    </p>
                    <p className="text-gray-600 font-medium">
                      Best for: Simple recipes needing just liquid content
                    </p>
                  </div>
                </div>

                <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                  <p className="font-semibold mb-4">How They Compare to Dairy Milk (per cup):</p>
                  <p className="text-gray-600">
                    Regular dairy milk contains 8g protein, 3.5g fat (whole milk), and 12g sugar.
                    Keep these numbers in mind when choosing alternatives, especially for recipes
                    where protein content or fat content is crucial for structure and texture.
                  </p>
                </div>
              </section>

              {/* Best Uses by Recipe Type Section */}
              <section id="best-uses" className="mt-12">
                <h2 className="font-serif text-3xl font-bold mb-6">Best Uses by Recipe Type</h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="font-serif text-2xl font-semibold mb-4">
                      For Cakes and Cupcakes
                    </h3>
                    <p className="mb-4">
                      <span className="font-semibold">Best choices:</span> Oat milk and almond milk
                      are your best bets. They provide good moisture without overwhelming the
                      flavor. If you want extra richness, try cashew milk.
                    </p>
                    <ul className="list-disc pl-5 mb-4 space-y-2">
                      <li>Oat milk provides good moisture and subtle sweetness</li>
                      <li>Almond milk works well for lighter cakes</li>
                      <li>Cashew milk adds richness without strong flavor</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-semibold mb-4">For Cookies and Bars</h3>
                    <p className="mb-4">
                      <span className="font-semibold">Best choices:</span> Almost any alternative
                      works here since cookies don't typically rely on milk for structure. Choose
                      based on flavor preference or fat content.
                    </p>
                    <ul className="list-disc pl-5 mb-4 space-y-2">
                      <li>Almond milk for neutral flavor</li>
                      <li>Coconut milk for added richness</li>
                      <li>Oat milk for subtle sweetness</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-semibold mb-4">
                      For Breads and Pastries
                    </h3>
                    <p className="mb-4">
                      <span className="font-semibold">Best choices:</span> Soy milk helps provide
                      structure thanks to its protein content. Oat milk is also good because it
                      browns nicely.
                    </p>
                    <ul className="list-disc pl-5 mb-4 space-y-2">
                      <li>Soy milk provides protein for structure</li>
                      <li>Oat milk contributes to good browning</li>
                      <li>Avoid rice milk (too thin for bread)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-semibold mb-4">
                      For Custards and Puddings
                    </h3>
                    <p className="mb-4">
                      <span className="font-semibold">Best choices:</span> Full-fat coconut milk or
                      a barista-blend oat milk will give you the richness you need. Regular almond
                      or rice milk might be too thin.
                    </p>
                    <ul className="list-disc pl-5 mb-4 space-y-2">
                      <li>Coconut milk provides necessary fat for creamy texture</li>
                      <li>Barista-blend oat milk has added fat for richness</li>
                      <li>Cashew cream (blended cashews with water) works well too</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Practical Application Section */}
              <section id="practical" className="mt-12">
                <h2 className="font-serif text-3xl font-bold mb-6">Practical Application</h2>
                <p>
                  In most recipes, you can substitute plant milks 1:1 for dairy milk. But here are
                  some adjustments that might help:
                </p>

                <ul className="list-disc pl-5 space-y-2 mt-4">
                  <li>
                    If the recipe calls for whole milk, consider adding 1 tsp of oil per cup of
                    low-fat milk alternative
                  </li>
                  <li>
                    For extra richness, substitute ¼ of the alternative milk with canned coconut
                    milk
                  </li>
                  <li>
                    When using rice or almond milk in a recipe that needs structure, add 1 Tbsp of
                    cornstarch per cup
                  </li>
                  <li>
                    For better browning with any milk alternative, add ½ tsp more sugar to the
                    recipe
                  </li>
                </ul>

                <p className="mt-6">
                  Remember that plant milks often contain less fat and protein than dairy milk, so
                  recipes that rely heavily on those properties (like custards) might need
                  additional adjustments.
                </p>
              </section>

              {/* Troubleshooting Guide Section */}
              <section id="troubleshooting" className="mt-12">
                <h2 className="font-serif text-3xl font-bold mb-6">Troubleshooting Guide</h2>

                <div className="space-y-6">
                  <div className="border-l-4 border-gray-200 pl-6">
                    <p className="font-semibold">Problem: Baked goods aren't browning properly</p>
                    <p className="text-gray-600">
                      Fix: Brush the top with a bit of maple syrup or add ¼ tsp baking soda to the
                      batter.
                    </p>
                  </div>

                  <div className="border-l-4 border-gray-200 pl-6">
                    <p className="font-semibold">Problem: Structure is weak or cake is crumbly</p>
                    <p className="text-gray-600">
                      Fix: Next time, try using soy milk instead, or add 1 Tbsp of cornstarch or an
                      extra egg to your recipe.
                    </p>
                  </div>

                  <div className="border-l-4 border-gray-200 pl-6">
                    <p className="font-semibold">
                      Problem: Flavor of the milk alternative is too strong
                    </p>
                    <p className="text-gray-600">
                      Fix: Try a more neutral option like oat or cashew milk, or mask the flavor
                      with vanilla extract or other compatible flavorings.
                    </p>
                  </div>

                  <div className="border-l-4 border-gray-200 pl-6">
                    <p className="font-semibold">Problem: Final product is too dry</p>
                    <p className="text-gray-600">
                      Fix: Plant milks sometimes absorb differently than dairy milk. Try using 2-3
                      Tbsp more of your milk alternative next time.
                    </p>
                  </div>

                  <div className="border-l-4 border-gray-200 pl-6">
                    <p className="font-semibold">Problem: Mixture is curdling</p>
                    <p className="text-gray-600">
                      Fix: Some plant milks (especially almond) can curdle with acidic ingredients.
                      Try warming the milk alternative slightly before mixing, or use soy or oat
                      milk instead.
                    </p>
                  </div>
                </div>

                <p className="mt-6">
                  Remember, baking is part science and part art – don't be afraid to experiment
                  until you find what works best for your favorite recipes!
                </p>
              </section>

              {/* Quick Reference Table Section */}
              <section className="mt-12">
                <h2 className="font-serif text-3xl font-bold mb-6">Quick Reference Guide</h2>
                <div className="mb-8">
                  <p>
                    Use this quick reference guide to choose the right milk alternative for your
                    specific baking needs. Each alternative is rated for different properties
                    (protein content, fat content, and flavor neutrality).
                  </p>
                  <p className="text-gray-600 mt-4">
                    Remember: These are general guidelines. The success in your recipe can vary
                    based on the specific brands and recipes you use. For detailed substitution
                    ratios, check our guides for{' '}
                    <Link
                      href="/ingredients/milk/substitutions/milk-to-soy-milk"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      soy milk
                    </Link>{' '}
                    and{' '}
                    <Link
                      href="/ingredients/milk/substitutions/milk-to-almond-milk"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      almond milk
                    </Link>{' '}
                    replacements.
                  </p>
                </div>
                <QuickReferenceTable ingredientType="milk" />
              </section>

              {/* Closing Section with CTAs */}
              <section className="mt-16 border-t border-gray-200 pt-12">
                <h2 className="font-serif text-3xl font-bold mb-6">Continue Your Baking Journey</h2>
                <p className="text-lg mb-8">
                  Now that you understand how to choose the right milk alternative for your baking
                  needs, explore our other comprehensive guides to become a more confident
                  dairy-free baker. Learn about other essential ingredients like{' '}
                  <Link
                    href="/learn/flour"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    flour
                  </Link>
                  ,{' '}
                  <Link
                    href="/learn/eggs"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    eggs
                  </Link>
                  , and{' '}
                  <Link
                    href="/learn/butter"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    butter
                  </Link>{' '}
                  substitutions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                  <div className="p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                    <h3 className="font-serif text-xl font-semibold mb-2">
                      The Function of Milk in Baking
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Understand the fundamental roles milk plays in your baking recipes.
                    </p>
                    <a
                      href="/learn/milk/functions"
                      className="text-blue-600 font-medium hover:underline"
                    >
                      Read the guide →
                    </a>
                  </div>

                  <div className="p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                    <h3 className="font-serif text-xl font-semibold mb-2">
                      Common Substitution Mistakes
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Learn what to avoid when substituting milk in your recipes.
                    </p>
                    <a
                      href="/learn/milk/mistakes"
                      className="text-blue-600 font-medium hover:underline"
                    >
                      Read the guide →
                    </a>
                  </div>
                </div>

                <NewsletterSignup />
              </section>
            </div>
          </div>

          {/* Sidebar with Advertisements */}
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="sticky top-8">
              <div className="space-y-6">
                {/* Ad placeholder 1 */}
                <div className="bg-gray-50 h-[400px] rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Advertisement</p>
                </div>

                {/* Promotional content */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-serif text-xl font-semibold mb-2">Related Resources</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="text-gray-600 hover:text-blue-600">
                      <a href="/resources/dairy-free-guide">Free Dairy-Free Guide</a>
                    </li>
                    <li className="text-gray-600 hover:text-blue-600">
                      <a href="/newsletter">Newsletter Signup</a>
                    </li>
                    <li className="text-gray-600 hover:text-blue-600">
                      <a href="/premium">Premium Recipes</a>
                    </li>
                  </ul>
                </div>

                {/* Ad placeholder 2 */}
                <div className="bg-gray-50 h-[300px] rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Advertisement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BackToTopButton />
    </div>
  );
}
