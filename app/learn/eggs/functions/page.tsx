import { NewsletterSignup } from '@/app/blog/[slug]/components/NewsletterSignup';
import Eggs3 from '@/app/images/learn/eggs/eggs3.jpg';
import BackToTopButton from '@/components/BackToTopButton';
import QuickReferenceTable from '@/components/learn/QuickReferenceTable';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Function of Eggs in Baking',
  description:
    'Learn how eggs provide structure, moisture, and richness in baking, and why these properties matter for successful baking.',
};

export default function EggFunctionsPage() {
  const sections = [
    { id: 'structure', title: 'Structure (Proteins)' },
    { id: 'moisture', title: 'Moisture' },
    { id: 'richness', title: 'Richness (Fats and Emulsification)' },
    { id: 'properties', title: 'Properties in Action' },
    { id: 'substitution', title: 'Combination Substitution Strategies' },
    { id: 'practical', title: 'Practical Applications' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        {/* Featured Image for Mobile */}
        <div className="lg:hidden mb-8">
          <Image
            src={Eggs3}
            alt="Eggs in baking"
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
                  href="/learn/eggs"
                  className="text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider font-medium"
                >
                  Eggs
                </Link>
              </nav>

              <h1 className="font-serif text-5xl leading-tight mb-6 tracking-tight">
                The Function of Eggs in Baking
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Eggs are often called the 'Swiss Army knife' of baking – they provide structure,
                moisture, richness, color, and binding properties all in one ingredient.
                Understanding these functions is key to successful baking and finding effective
                substitutes when needed.
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
                    src={Eggs3}
                    alt="Eggs in baking"
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
              {/* Content Sections */}
              <section id="structure" className="mt-12">
                <h2 className="font-serif text-3xl font-bold mb-6">Structure (Proteins)</h2>
                <p>
                  <Link
                    href="/ingredients/large-eggs"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Eggs
                  </Link>{' '}
                  contain two types of proteins that are crucial for structure: albumins in the
                  whites and various proteins in the yolks. When heated, these proteins denature
                  (unfold) and then coagulate (connect), forming a complex network that gives baked
                  goods their structure.
                </p>

                <div className="my-6 border-l-4 border-gray-200 pl-6 italic text-gray-600">
                  Egg whites begin to coagulate at approximately 144°F (62°C), while yolks set at
                  around 158°F (70°C). This temperature difference is why custards need precise
                  temperature control.
                </div>
              </section>

              {/* Moisture Section */}
              <section id="moisture" className="mt-12">
                <h2 className="font-serif text-3xl font-bold mb-6">Moisture</h2>
                <p>
                  Despite their seemingly solid appearance, eggs are about 75% water. This moisture
                  content is crucial in creating the tender crumb found in many baked goods.
                </p>

                <p className="mt-6">
                  In cookies, the moisture from eggs helps dissolve{' '}
                  <Link
                    href="/learn/sugar"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    sugar
                  </Link>{' '}
                  and creates steam during baking that contributes to rise. After baking, this
                  moisture remains in the final product, preventing cookies from becoming too dry
                  and crumbly.
                </p>

                <p className="mt-6">
                  <span className="font-semibold">Balance matters:</span> Too much moisture can lead
                  to a gummy texture, while too little results in dry, crumbly bakes. Eggs help
                  maintain this delicate balance, particularly in recipes with high flour content.
                </p>
              </section>

              {/* Richness Section */}
              <section id="richness" className="mt-12">
                <h2 className="font-serif text-3xl font-bold mb-6">
                  Richness (Fats and Emulsification)
                </h2>
                <p>
                  Egg yolks contain about 33% fat, contributing richness and a velvety mouthfeel to
                  baked goods. Beyond just adding fat, eggs are natural emulsifiers – they help
                  combine ingredients that wouldn't normally mix well.
                </p>

                <div className="mt-6 border-l-4 border-gray-200 pl-6">
                  <p className="text-lg font-semibold mb-2">The Emulsification Magic</p>
                  <p className="text-gray-600">
                    Lecithin in egg yolks acts as a mediator between water and{' '}
                    <Link
                      href="/learn/oils-fats"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      fats
                    </Link>
                    . One end of the lecithin molecule bonds with water while the other bonds with
                    fat, allowing them to mix smoothly instead of separating.
                  </p>
                </div>

                <p className="mt-6">
                  In a pound cake, eggs help create a smooth, even batter by emulsifying the{' '}
                  <Link
                    href="/ingredients/unsalted-butter"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    butter
                  </Link>{' '}
                  with other liquid ingredients. This results in a fine, tender crumb rather than a
                  greasy or uneven texture.
                </p>
              </section>

              {/* Properties in Action Section */}
              <section id="properties" className="mt-12">
                <h2 className="font-serif text-3xl font-bold mb-6">Properties in Action</h2>
                <p>
                  The versatility of eggs is best understood through different preparation methods:
                </p>

                <div className="space-y-6 mt-6">
                  <div className="border-l-4 border-gray-200 pl-6">
                    <p className="font-semibold">Whipping egg whites</p>
                    <p className="text-gray-600">
                      Incorporating air creates a foam where proteins surround air bubbles. These
                      tiny bubbles provide the lift in soufflés and angel food cakes.
                    </p>
                  </div>

                  <div className="border-l-4 border-gray-200 pl-6">
                    <p className="font-semibold">Whole eggs in batters</p>
                    <p className="text-gray-600">
                      When whole eggs are beaten into a batter, they provide emulsification,
                      structure, and moisture all at once – the perfect balance for layer cakes and
                      muffins.
                    </p>
                  </div>

                  <div className="border-l-4 border-gray-200 pl-6">
                    <p className="font-semibold">Egg wash on bread</p>
                    <p className="text-gray-600">
                      A simple brush of beaten egg creates the golden, shiny crust on breads and
                      pastries through protein coagulation and Maillard browning reactions.
                    </p>
                  </div>
                </div>
              </section>

              {/* Substitution Challenges Section */}
              <section id="substitution" className="mt-12">
                <h2 className="font-serif text-3xl font-bold mb-6">
                  Combination Substitution Strategies
                </h2>
                <div className="space-y-12">
                  <div>
                    <h3 className="font-serif text-2xl font-semibold mb-4">
                      Rich Cakes and Quick Breads
                    </h3>
                    <p className="mb-4">
                      <span className="font-semibold">Combination:</span>{' '}
                      <Link
                        href="/ingredients/ground-flaxseed"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        Ground flax
                      </Link>{' '}
                      +{' '}
                      <Link
                        href="/ingredients/silken-tofu"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        silken tofu
                      </Link>{' '}
                      +{' '}
                      <Link
                        href="/ingredients/baking-powder"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        baking powder
                      </Link>
                    </p>
                    <ul className="list-disc pl-5 mb-4 space-y-2">
                      <li>Structure: Ground flax provides proteins for binding</li>
                      <li>Moisture: Silken tofu adds moisture and protein</li>
                      <li>Lift: Extra baking powder compensates for lost leavening</li>
                    </ul>

                    <div className="mt-6 border-l-4 border-gray-200 pl-6">
                      <p className="font-semibold mb-2">For 1 egg, combine:</p>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>
                          1 tablespoon ground flax + 3 tablespoons warm water (let sit 5 minutes)
                        </li>
                        <li>2 tablespoons pureed silken tofu</li>
                        <li>¼ teaspoon additional baking powder</li>
                      </ol>
                    </div>

                    <p className="mt-4 text-gray-600 italic">
                      The flax creates a gel-like structure similar to egg proteins, while tofu
                      provides protein and moisture. The additional leavening compensates for the
                      loss of egg protein structure that typically traps air bubbles. For more
                      details, check out our{' '}
                      <Link
                        href="/blog/the-ultimate-guide-to-flax-eggs"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        ultimate guide to flax eggs
                      </Link>
                      .
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-semibold mb-4">Chewy Cookies</h3>
                    <p className="mb-4">
                      <span className="font-semibold">Combination:</span> Aquafaba +{' '}
                      <Link
                        href="/ingredients/peanut-butter"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        nut butter
                      </Link>
                    </p>
                    <ul className="list-disc pl-5 mb-4 space-y-2">
                      <li>Structure & Binding: Aquafaba proteins</li>
                      <li>Fat & Richness: Nut butter</li>
                      <li>Moisture: Both ingredients contribute</li>
                    </ul>

                    <div className="mt-6 border-l-4 border-gray-200 pl-6">
                      <p className="font-semibold mb-2">For 1 egg, combine:</p>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>
                          3 tablespoons aquafaba (reduced by simmering until slightly thickened)
                        </li>
                        <li>1 tablespoon nut butter (room temperature)</li>
                      </ol>
                      <p className="mt-2">Whisk together until completely smooth.</p>
                    </div>

                    <p className="mt-4 text-gray-600 italic">
                      Aquafaba contains proteins that can trap air similar to egg whites, while nut
                      butter provides fats and emulsifiers that help create a tender crumb. We have
                      a detailed tutorial on{' '}
                      <Link
                        href="/blog/how-to-make-aquafaba-meringue-at-home"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        making aquafaba meringue at home
                      </Link>{' '}
                      if you'd like to explore this versatile egg substitute further.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-semibold mb-4">
                      Light Cakes and Meringue-Based Recipes
                    </h3>
                    <p className="mb-4">
                      <span className="font-semibold">Combination:</span> Aquafaba + xanthan gum +{' '}
                      <Link
                        href="/ingredients/cream-of-tartar"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        cream of tartar
                      </Link>
                    </p>
                    <ul className="list-disc pl-5 mb-4 space-y-2">
                      <li>Structure: Aquafaba proteins</li>
                      <li>Stability: Xanthan gum</li>
                      <li>Foam stability: Cream of tartar</li>
                    </ul>

                    <div className="mt-6 border-l-4 border-gray-200 pl-6">
                      <p className="font-semibold mb-2">For replacing egg whites in meringue:</p>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>3 tablespoons aquafaba</li>
                        <li>1/8 teaspoon xanthan gum</li>
                        <li>Pinch cream of tartar</li>
                      </ol>
                      <p className="mt-2">
                        Whip until stiff peaks form (takes longer than egg whites)
                      </p>
                    </div>

                    <p className="mt-4 text-gray-600 italic">
                      This combination works because aquafaba proteins can trap air, while xanthan
                      gum provides additional structure and cream of tartar stabilizes the foam.
                    </p>
                  </div>
                </div>
              </section>

              {/* Quick Reference Table Section */}
              <section className="mt-12">
                <h2 className="font-serif text-3xl font-bold mb-6">Quick Reference Guide</h2>
                <div className="mb-8">
                  <p>
                    Need a quick answer for your egg substitution? This reference table provides
                    common substitutions and their best use cases. Each substitute is rated for
                    different properties (structure, moisture, and richness) to help you make the
                    best choice for your specific recipe.
                  </p>
                  <p className="text-gray-600 mt-4">
                    Remember: These are general guidelines. The success of a substitution can vary
                    depending on the specific recipe and how the egg is used in it. For more
                    specific substitutions, check our detailed guides for{' '}
                    <Link
                      href="/ingredients/large-eggs/substitutions/large-eggs-to-applesauce"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      applesauce
                    </Link>{' '}
                    and{' '}
                    <Link
                      href="/ingredients/large-eggs/substitutions/large-eggs-to-ground-flaxseed-water"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      flax egg
                    </Link>{' '}
                    replacements.
                  </p>
                </div>
                <QuickReferenceTable ingredientType="eggs" />
              </section>

              {/* Practical Applications Section */}
              <section id="practical" className="mt-12">
                <h2 className="font-serif text-3xl font-bold mb-6">Practical Applications</h2>
                <div className="mb-8">
                  <p>
                    Understanding egg functions is one thing, but putting that knowledge into
                    practice is another. Below are real-world examples of how eggs behave in
                    different types of baked goods, along with specific techniques to help you
                    achieve the best results.
                  </p>
                  <p className="text-gray-600 mt-4">
                    These techniques work whether you're using traditional eggs or substitutes like{' '}
                    <Link
                      href="/ingredients/applesauce"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      applesauce
                    </Link>{' '}
                    or{' '}
                    <Link
                      href="/ingredients/ground-flaxseed"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      ground flaxseed
                    </Link>
                    . Pay special attention to the temperature and mixing guidelines, as these are
                    crucial for success with both eggs and egg alternatives.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <img
                      src="https://placehold.co/400x300"
                      alt="Cake baking techniques"
                      width="400"
                      height="300"
                      className="rounded-lg w-full h-auto"
                    />
                    <h3 className="font-serif text-xl font-semibold">Cakes</h3>
                    <p className="text-gray-600">How eggs create rise and structure in cakes</p>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Use room temperature eggs for better volume</li>
                      <li>• Beat whole eggs until light and fluffy for maximum lift</li>
                      <li>• Separate eggs carefully to avoid any yolk in whites for meringues</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <img
                      src="https://placehold.co/400x300"
                      alt="Cookie baking techniques"
                      width="400"
                      height="300"
                      className="rounded-lg w-full h-auto"
                    />
                    <h3 className="font-serif text-xl font-semibold">Cookies</h3>
                    <p className="text-gray-600">The role of eggs in spread and chewiness</p>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Extra yolks create fudgier cookies</li>
                      <li>• Whole eggs provide structure and moisture</li>
                      <li>• Egg whites alone can create crispier cookies</li>
                    </ul>
                    <p className="mt-2 text-gray-600">
                      If you're looking to make egg-free cookies, our article on{' '}
                      <Link
                        href="/blog/how-to-use-applesauce-as-an-egg-substitute-in-your-favorite-recipes"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        using applesauce as an egg substitute
                      </Link>{' '}
                      provides tested recipes and techniques.
                    </p>
                  </div>
                </div>
              </section>

              {/* Closing Section with CTAs */}
              <section className="mt-16 border-t border-gray-200 pt-12">
                <h2 className="font-serif text-3xl font-bold mb-6">Continue Your Baking Journey</h2>
                <p className="text-lg mb-8">
                  Now that you understand the role of eggs in baking, explore our other
                  comprehensive guides to become a more confident baker. Learn about other essential
                  ingredients like{' '}
                  <Link
                    href="/learn/flour"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    flour
                  </Link>
                  ,{' '}
                  <Link
                    href="/learn/sugar"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    sugar
                  </Link>
                  , and{' '}
                  <Link
                    href="/learn/leaveners"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    leaveners
                  </Link>{' '}
                  to master the science of baking.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                  <div className="p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                    <h3 className="font-serif text-xl font-semibold mb-2">
                      The Role of Butter in Baking
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Discover how butter creates flakiness, flavor, and tenderness in your baked
                      goods.
                    </p>
                    <a href="/learn/butter" className="text-blue-600 font-medium hover:underline">
                      Read the guide →
                    </a>
                  </div>

                  <div className="p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                    <h3 className="font-serif text-xl font-semibold mb-2">
                      The Role of Milk in Baking
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Learn how milk enriches, tenderizes, and browns your baked creations.
                    </p>
                    <a href="/learn/milk" className="text-blue-600 font-medium hover:underline">
                      Read the guide →
                    </a>
                  </div>
                </div>

                {/* Replace Enhanced Newsletter CTA with NewsletterSignup component */}
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
                      <a href="/resources/baking-guide">Free Baking Guide</a>
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
