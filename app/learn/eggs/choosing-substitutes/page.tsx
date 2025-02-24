import BackToTopButton from '@/components/BackToTopButton';
import TableOfContents from '@/components/learn/TableOfContents';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Choose the Right Egg Substitute',
  description: ' ',
};

export default function ChoosingSubstitutesPage() {
  const tocSections = [
    { id: 'why-eggs', title: 'Why Eggs Matter in Baking' },
    { id: 'choosing', title: 'Choosing the Right Substitute' },
    { id: 'practice', title: 'Putting Theory Into Practice' },
    { id: 'common-problems', title: 'Common Problems and Easy Fixes' },
    { id: 'tips', title: 'Tips for Success' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[320px]">
        <img
          src="https://placehold.co/1920x1080"
          alt="Various egg substitutes in baking"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl text-white font-bold text-center px-4">
            How to Choose the Right Egg Substitute
          </h1>
        </div>
      </section>

      {/* Mobile ToC */}
      <div className="md:hidden sticky top-0 z-40">
        <TableOfContents sections={tocSections} />
      </div>

      <div className="flex justify-between w-full">
        {/* Left Sidebar - Hidden on mobile */}
        <div className="hidden md:block w-64 h-[calc(100vh-40vh)] sticky top-0">
          <TableOfContents sections={tocSections} />
        </div>

        {/* Main Content */}
        <main className="flex-1 px-4 py-8 max-w-4xl">
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed">
              Different baked goods need different egg substitutes. Understanding which substitute
              to use and why can make the difference between a baking success and a kitchen
              disaster.
            </p>
          </div>

          {/* Why Eggs Matter Section */}
          <section id="why-eggs" className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">
              Why Eggs Matter in Baking
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                Think of eggs like the support beams in a building. They help hold everything
                together and keep your baked goods from falling apart. But eggs do more than just
                that - they also:
              </p>
              <ul className="list-disc pl-5 pt-5 space-y-2">
                <li>Make things moist and rich (like in brownies)</li>
                <li>Help baked goods rise and become fluffy (think light, airy cakes)</li>
                <li>Hold ingredients together (so your cookies don't crumble)</li>
                <li>Add color and flavor</li>
              </ul>
            </div>
          </section>

          {/* Choosing the Right Substitute Section */}
          <section id="choosing" className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">
              Choosing the Right Substitute
            </h2>
            <div className="prose dark:prose-invert max-w-none space-y-8">
              <p>
                Different baked goods need different egg substitutes. Let's break down the best
                options based on what you're making:
              </p>

              <div className="grid gap-6 mt-6">
                <div className="border-l-4 border-blue-200 dark:border-blue-800 pl-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-lg mb-2">For Dense and Fudgy Treats</h4>
                  <p>
                    Mashed bananas or applesauce work great for brownies and pound cakes because
                    these treats should be moist and don't need much rising. Use ¼ cup for each egg.
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 italic mt-2">
                    Pro tip: If using applesauce, reduce other liquids by 2-3 tablespoons to prevent
                    your batter from being too wet.
                  </p>
                </div>

                <div className="border-l-4 border-purple-200 dark:border-purple-800 pl-6 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-lg mb-2">For Light and Airy Bakes</h4>
                  <p>
                    For delicate cakes or cupcakes, use commercial egg replacer or mix 1 teaspoon
                    baking soda with 1 tablespoon vinegar. These options help with both moisture and
                    rising.
                  </p>
                  <p className="mt-2">
                    With commercial replacer, follow package instructions. For the baking soda mix,
                    work quickly once combined!
                  </p>
                </div>

                <div className="border-l-4 border-green-200 dark:border-green-800 pl-6 bg-green-50 dark:bg-green-900/20 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-lg mb-2">For Chewy Baked Goods</h4>
                  <p>
                    "Flax eggs" are perfect for cookies and chewy bars. Mix 1 tablespoon ground
                    flaxseed with 3 tablespoons warm water and let sit for 10 minutes until goopy.
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 italic mt-2">
                    Pro tip: Your cookies might not spread as much without eggs, so gently press
                    them down before baking.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Putting Theory Into Practice Section */}
          <section id="practice" className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">
              Putting Theory Into Practice
            </h2>
            <div className="prose dark:prose-invert max-w-none space-y-6">
              <p className="text-lg leading-relaxed">
                Let's walk through a real scenario to help you understand how to apply these
                substitutions in practice.
              </p>

              <h4 className="text-xl font-semibold mb-4">The Chocolate Cake Challenge</h4>
              <p>
                Imagine it's Sunday morning, and you're ready to make your favorite chocolate cake.
                You've got all your ingredients out, but - oh no! - you're out of eggs. Don't panic!
                Let's solve this together.
              </p>
              <p className="mt-4 mb-4">
                Looking at our recipe that calls for 2 eggs, we need to replace:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>Moisture and richness</li>
                <li>Structure to prevent collapse</li>
                <li>Leavening for a fluffy crumb</li>
              </ul>
              <p>
                The solution: For each egg, use ¼ cup mashed banana or applesauce (for moisture and
                richness) plus ½ teaspoon baking powder (for extra lift). <br />
                <br />
                Since this is a chocolate cake, any subtle banana or apple flavor will be masked by
                the cocoa. If you have plain yogurt, that's another great option - use ¼ cup per
                egg. Any of these alternatives will give you a moist, tender cake!
              </p>
            </div>
          </section>

          {/* Common Problems and Easy Fixes Section */}
          <section id="common-problems" className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">
              Common Problems and Easy Fixes
            </h2>
            <div className="prose dark:prose-invert max-w-none space-y-8">
              <p className="text-lg">
                Even experienced bakers run into challenges when working with egg substitutes. Let's
                walk through some common issues you might encounter and how to solve them.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Dealing with Density</h3>
                  <p>
                    One of the most common issues when baking without eggs is ending up with treats
                    that are too dense or heavy. This happens because eggs play a crucial role in
                    creating that light, airy texture we all love. If you're finding your cakes or
                    muffins are coming out more like bricks than clouds, try adding an extra ½
                    teaspoon of baking powder to your recipe. This gives your batter more lifting
                    power.
                  </p>
                  <p className="mt-3">
                    Another common cause of density is overmixing. Without eggs to provide
                    structure, it's easy to overwork your batter, developing too much gluten and
                    creating a tough final product. Mix just until your ingredients are combined,
                    and then stop. If you're using fruit purees as substitutes, consider switching
                    to commercial egg replacer for lighter results.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">When Everything Falls Apart</h3>
                  <p>
                    Crumbly baked goods are another frequent frustration when baking without eggs.
                    Remember, eggs are natural binders, holding everything together. Without them,
                    you might end up with cookies that crumble at the slightest touch or cakes that
                    fall apart when sliced.
                  </p>
                  <p className="mt-3">
                    The fix is usually simple: add a bit more moisture. Try an extra tablespoon of
                    oil or melted butter to your recipe. This not only helps bind everything
                    together but also improves the texture. Patience is also key - let your baked
                    goods cool completely before handling them. They'll be much more stable at room
                    temperature.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Handling Moisture Issues</h3>
                  <p>
                    Sometimes you'll find your batter looking too dry or crumbly before it even goes
                    into the oven. This is perfectly normal when working with egg substitutes, as
                    different alternatives absorb moisture differently. Trust your baker's instinct
                    here - if the batter looks too dry, it probably is.
                  </p>
                  <p className="mt-3">
                    The solution is to add liquid gradually, one tablespoon at a time. You can use
                    plant-based milk, water, or even aquafaba (the liquid from canned chickpeas).
                    Keep adding and mixing gently until you reach that familiar batter consistency
                    you're used to seeing. Remember, it's easier to add more liquid than to try to
                    fix a batter that's too wet!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Tips for Success Section */}
          <section id="tips" className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">
              Tips for Success
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-slate-400 mr-3">•</span>
                  <span>
                    Read your recipe all the way through first so you know exactly what the eggs are
                    doing in it.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-slate-400 mr-3">•</span>
                  <span>
                    Start with tried-and-true recipes rather than experimenting with family
                    heirlooms right away.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-slate-400 mr-3">•</span>
                  <span>
                    Keep notes about what works and what doesn't - this will help you become better
                    at egg-free baking.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-slate-400 mr-3">•</span>
                  <span>
                    Be patient with yourself - sometimes it takes a couple tries to get things
                    perfect!
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Closing CTA */}
          <section className="mt-16 border-t border-slate-200 dark:border-slate-700 pt-12">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Learn More About Eggs */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white flex flex-col">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Dive Deeper Into Egg Substitutions</h3>
                  <p className="text-lg mb-6">
                    Want to understand the science behind egg substitutes? Learn how eggs function
                    in baking and make better substitution choices.
                  </p>
                </div>
                <div className="mt-auto">
                  <a
                    href="/learn/eggs/functions"
                    className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Explore Egg Functions
                  </a>
                </div>
              </div>

              {/* Explore Other Ingredients */}
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white flex flex-col">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Explore Other Ingredients</h3>
                  <p className="text-lg mb-6">
                    Ready to learn about other substitutions? Discover how to replace common
                    ingredients like butter, milk, or flour in your baking.
                  </p>
                </div>
                <div className="mt-auto">
                  <a
                    href="/learn"
                    className="inline-block px-6 py-3 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
                  >
                    View All Ingredients
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Right Sidebar */}
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
