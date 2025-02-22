import QuickReferenceTable from '@/components/learn/QuickReferenceTable';
import RecipeTypeCard from '@/components/learn/RecipeTypeCard';
import BakingTip from '@/components/learn/BakingTip';
import TableOfContents from '@/components/learn/TableOfContents';
import type { Metadata } from 'next';
import Image from 'next/image';
import BackToTopButton from '@/components/BackToTopButton';

export const metadata: Metadata = {
  title: 'The Function of Eggs in Baking | BakingSubs',
  description:
    'Learn how eggs provide structure, moisture, and richness in baking, and why these properties matter for successful baking.',
};

export default function EggFunctionsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[320px]">
        <Image
          src="https://placehold.co/1920x1080"
          alt="Eggs in baking"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl text-white font-bold text-center px-4">
            The Function of Eggs in Baking
          </h1>
        </div>
      </section>

      {/* Mobile ToC - Moved outside main content */}
      <div className="md:hidden sticky top-0 z-40">
        <TableOfContents
          sections={[
            { id: 'structure', title: 'Structure (Proteins)' },
            { id: 'moisture', title: 'Moisture' },
            { id: 'richness', title: 'Richness (Fats and Emulsification)' },
            { id: 'properties', title: 'Properties in Action' },
            { id: 'substitution', title: 'Combination Substitution Strategies' },
            { id: 'practical', title: 'Practical Applications' },
          ]}
        />
      </div>

      <div className="flex justify-between w-full">
        {/* Left Sidebar - Hidden on mobile */}
        <div className="hidden md:block w-64 h-[calc(100vh-40vh)] sticky top-0">
          <TableOfContents
            sections={[
              { id: 'structure', title: 'Structure (Proteins)' },
              { id: 'moisture', title: 'Moisture' },
              { id: 'richness', title: 'Richness (Fats and Emulsification)' },
              { id: 'properties', title: 'Properties in Action' },
              { id: 'substitution', title: 'Combination Substitution Strategies' },
              { id: 'practical', title: 'Practical Applications' },
            ]}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 px-4 py-8 max-w-4xl">
          {/* Remove the mobile ToC from here */}
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed">
              Eggs are often called the 'Swiss Army knife' of baking – they provide structure,
              moisture, richness, color, and binding properties all in one ingredient. Understanding
              these functions is key to successful baking and finding effective substitutes when
              needed.
            </p>
          </div>

          {/* Content Sections */}
          <section id="structure" className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">
              Structure (Proteins)
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                Eggs contain two types of proteins that are crucial for structure: albumins in the
                whites and various proteins in the yolks. When heated, these proteins denature
                (unfold) and then coagulate (connect), forming a complex network that gives baked
                goods their structure.
              </p>

              <div className="my-6 border-l-4 border-slate-200 dark:border-slate-700 pl-6 italic text-slate-600 dark:text-slate-400">
                Egg whites begin to coagulate at approximately 144°F (62°C), while yolks set at
                around 158°F (70°C). This temperature difference is why custards need precise
                temperature control.
              </div>
            </div>
          </section>

          {/* Moisture Section */}
          <section id="moisture" className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">Moisture</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                Despite their seemingly solid appearance, eggs are about 75% water. This moisture
                content is crucial in creating the tender crumb found in many baked goods.
              </p>

              <p className="mt-6">
                In cookies, the moisture from eggs helps dissolve sugar and creates steam during
                baking that contributes to rise. After baking, this moisture remains in the final
                product, preventing cookies from becoming too dry and crumbly.
              </p>

              <p className="mt-6">
                <span className="font-semibold">Balance matters:</span> Too much moisture can lead
                to a gummy texture, while too little results in dry, crumbly bakes. Eggs help
                maintain this delicate balance, particularly in recipes with high flour content.
              </p>
            </div>
          </section>

          {/* Richness Section */}
          <section id="richness" className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">
              Richness (Fats and Emulsification)
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                Egg yolks contain about 33% fat, contributing richness and a velvety mouthfeel to
                baked goods. Beyond just adding fat, eggs are natural emulsifiers – they help
                combine ingredients that wouldn't normally mix well.
              </p>

              <div className="mt-6 border-l-4 border-slate-200 dark:border-slate-700 pl-6">
                <p className="text-lg font-semibold mb-2">The Emulsification Magic</p>
                <p className="text-slate-600 dark:text-slate-400">
                  Lecithin in egg yolks acts as a mediator between water and fats. One end of the
                  lecithin molecule bonds with water while the other bonds with fat, allowing them
                  to mix smoothly instead of separating.
                </p>
              </div>

              <p className="mt-6">
                In a pound cake, eggs help create a smooth, even batter by emulsifying the butter
                with other liquid ingredients. This results in a fine, tender crumb rather than a
                greasy or uneven texture.
              </p>
            </div>
          </section>

          {/* Properties in Action Section */}
          <section id="properties" className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">
              Properties in Action
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                The versatility of eggs is best understood through different preparation methods:
              </p>

              <div className="space-y-6 mt-6">
                <div className="border-l-4 border-slate-200 dark:border-slate-700 pl-6">
                  <p className="font-semibold">Whipping egg whites</p>
                  <p className="text-slate-600 dark:text-slate-400">
                    Incorporating air creates a foam where proteins surround air bubbles. These tiny
                    bubbles provide the lift in soufflés and angel food cakes.
                  </p>
                </div>

                <div className="border-l-4 border-slate-200 dark:border-slate-700 pl-6">
                  <p className="font-semibold">Whole eggs in batters</p>
                  <p className="text-slate-600 dark:text-slate-400">
                    When whole eggs are beaten into a batter, they provide emulsification,
                    structure, and moisture all at once – the perfect balance for layer cakes and
                    muffins.
                  </p>
                </div>

                <div className="border-l-4 border-slate-200 dark:border-slate-700 pl-6">
                  <p className="font-semibold">Egg wash on bread</p>
                  <p className="text-slate-600 dark:text-slate-400">
                    A simple brush of beaten egg creates the golden, shiny crust on breads and
                    pastries through protein coagulation and Maillard browning reactions.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Substitution Challenges Section */}
          <section id="substitution" className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">
              Combination Substitution Strategies
            </h2>
            <div className="prose dark:prose-invert max-w-none space-y-12">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Rich Cakes and Quick Breads</h3>
                <p className="mb-4">
                  <span className="font-semibold">Combination:</span> Ground flax + silken tofu +
                  baking powder
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                  <li>Structure: Ground flax provides proteins for binding</li>
                  <li>Moisture: Silken tofu adds moisture and protein</li>
                  <li>Lift: Extra baking powder compensates for lost leavening</li>
                </ul>

                <div className="mt-6 border-l-4 border-slate-200 dark:border-slate-700 pl-6">
                  <p className="font-semibold mb-2">For 1 egg, combine:</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>1 tablespoon ground flax + 3 tablespoons warm water (let sit 5 minutes)</li>
                    <li>2 tablespoons pureed silken tofu</li>
                    <li>¼ teaspoon additional baking powder</li>
                  </ol>
                </div>

                <p className="mt-4 text-slate-600 dark:text-slate-400 italic">
                  The flax creates a gel-like structure similar to egg proteins, while tofu provides
                  protein and moisture. The additional leavening compensates for the loss of egg
                  protein structure that typically traps air bubbles.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">Chewy Cookies</h3>
                <p className="mb-4">
                  <span className="font-semibold">Combination:</span> Aquafaba + nut butter
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                  <li>Structure & Binding: Aquafaba proteins</li>
                  <li>Fat & Richness: Nut butter</li>
                  <li>Moisture: Both ingredients contribute</li>
                </ul>

                <div className="mt-6 border-l-4 border-slate-200 dark:border-slate-700 pl-6">
                  <p className="font-semibold mb-2">For 1 egg, combine:</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>3 tablespoons aquafaba (reduced by simmering until slightly thickened)</li>
                    <li>1 tablespoon nut butter (room temperature)</li>
                  </ol>
                  <p className="mt-2">Whisk together until completely smooth.</p>
                </div>

                <p className="mt-4 text-slate-600 dark:text-slate-400 italic">
                  Aquafaba contains proteins that can trap air similar to egg whites, while nut
                  butter provides fats and emulsifiers that help create a tender crumb.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  Light Cakes and Meringue-Based Recipes
                </h3>
                <p className="mb-4">
                  <span className="font-semibold">Combination:</span> Aquafaba + xanthan gum + cream
                  of tartar
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                  <li>Structure: Aquafaba proteins</li>
                  <li>Stability: Xanthan gum</li>
                  <li>Foam stability: Cream of tartar</li>
                </ul>

                <div className="mt-6 border-l-4 border-slate-200 dark:border-slate-700 pl-6">
                  <p className="font-semibold mb-2">For replacing egg whites in meringue:</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>3 tablespoons aquafaba</li>
                    <li>1/8 teaspoon xanthan gum</li>
                    <li>Pinch cream of tartar</li>
                  </ol>
                  <p className="mt-2">Whip until stiff peaks form (takes longer than egg whites)</p>
                </div>

                <p className="mt-4 text-slate-600 dark:text-slate-400 italic">
                  This combination works because aquafaba proteins can trap air, while xanthan gum
                  provides additional structure and cream of tartar stabilizes the foam.
                </p>
              </div>
            </div>
          </section>

          {/* Quick Reference Table Section */}
          <section className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">
              Quick Reference Guide
            </h2>
            <div className="prose dark:prose-invert max-w-none mb-8">
              <p>
                Need a quick answer for your egg substitution? This reference table provides common
                substitutions and their best use cases. Each substitute is rated for different
                properties (structure, moisture, and richness) to help you make the best choice for
                your specific recipe.
              </p>
              <p className="text-slate-600 dark:text-slate-400 mt-4">
                Remember: These are general guidelines. The success of a substitution can vary
                depending on the specific recipe and how the egg is used in it.
              </p>
            </div>
            <QuickReferenceTable />
          </section>

          {/* Practical Applications Section */}
          <section id="practical" className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">
              Practical Applications
            </h2>
            <div className="prose dark:prose-invert max-w-none mb-8">
              <p>
                Understanding egg functions is one thing, but putting that knowledge into practice
                is another. Below are real-world examples of how eggs behave in different types of
                baked goods, along with specific techniques to help you achieve the best results.
              </p>
              <p className="text-slate-600 dark:text-slate-400 mt-4">
                These techniques work whether you're using traditional eggs or the substitutes
                discussed above. Pay special attention to the temperature and mixing guidelines, as
                these are crucial for success with both eggs and egg alternatives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Image
                  src="https://placehold.co/400x300"
                  alt="Cake baking techniques"
                  width={400}
                  height={300}
                  className="rounded-lg"
                  unoptimized
                />
                <h3 className="text-xl font-semibold">Cakes</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  How eggs create rise and structure in cakes
                </p>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li>• Use room temperature eggs for better volume</li>
                  <li>• Beat whole eggs until light and fluffy for maximum lift</li>
                  <li>• Separate eggs carefully to avoid any yolk in whites for meringues</li>
                </ul>
              </div>

              <div className="space-y-4">
                <Image
                  src="https://placehold.co/400x300"
                  alt="Cookie baking techniques"
                  width={400}
                  height={300}
                  className="rounded-lg"
                  unoptimized
                />
                <h3 className="text-xl font-semibold">Cookies</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  The role of eggs in spread and chewiness
                </p>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li>• Extra yolks create fudgier cookies</li>
                  <li>• Whole eggs provide structure and moisture</li>
                  <li>• Egg whites alone can create crispier cookies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Closing Section with CTAs */}
          <section className="mt-16 border-t border-slate-200 dark:border-slate-700 pt-12">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">
                Continue Your Baking Journey
              </h2>
              <p className="text-lg mb-8">
                Now that you understand the role of eggs in baking, explore our other comprehensive
                guides to become a more confident baker.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                <h3 className="text-xl font-semibold mb-2">The Role of Butter in Baking</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Discover how butter creates flakiness, flavor, and tenderness in your baked goods.
                </p>
                <a
                  href="/learn/butter"
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  Read the guide →
                </a>
              </div>

              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                <h3 className="text-xl font-semibold mb-2">Milk in Baking</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Learn how milk enriches, tenderizes, and browns your baked creations.
                </p>
                <a
                  href="/learn/milk"
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  Read the guide →
                </a>
              </div>
            </div>

            {/* Enhanced Newsletter CTA */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <div className="relative z-10 p-8 md:p-12">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Master the Art of Baking Substitutions
                </h3>
                <p className="text-lg md:text-xl mb-8 text-blue-50 max-w-2xl">
                  Join thousands of bakers receiving our weekly insights, scientific deep-dives, and
                  exclusive recipes. Take your baking skills to the next level.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/newsletter"
                    className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
                  >
                    Subscribe to Newsletter
                  </a>
                  <a
                    href="/learn"
                    className="inline-block px-8 py-4 bg-blue-400/20 hover:bg-blue-400/30 rounded-lg font-semibold text-lg transition-colors"
                  >
                    Explore All Guides
                  </a>
                </div>
              </div>
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full bg-purple-400/20 blur-3xl"></div>
            </div>
          </section>
        </main>

        {/* Right Sidebar - Removed sticky positioning */}
        <div className="hidden lg:block w-72 p-4">
          <div className="space-y-6">
            {/* Ad placeholder 1 */}
            <div className="bg-slate-100 dark:bg-slate-800 h-[400px] rounded-lg flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-400">Advertisement</p>
            </div>

            {/* Promotional content */}
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Related Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>Free Baking Guide</li>
                <li>Newsletter Signup</li>
                <li>Premium Recipes</li>
              </ul>
            </div>

            {/* Ad placeholder 2 */}
            <div className="bg-slate-100 dark:bg-slate-800 h-[300px] rounded-lg flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-400">Advertisement</p>
            </div>
          </div>
        </div>
      </div>

      <BackToTopButton />
    </div>
  );
}
