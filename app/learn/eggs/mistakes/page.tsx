import { NewsletterSignup } from '@/app/blog/[slug]/components/NewsletterSignup';
import Eggs2 from '@/app/images/learn/eggs/eggs2.jpg';
import BackToTopButton from '@/components/BackToTopButton';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Common Mistakes When Using Eggs in Baking',
  description:
    'Learn about common egg-related baking mistakes and how to avoid them for better baking results.',
};

export default function MistakesPage() {
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
    },
    {
      id: 'common-substitution-mistakes',
      title: 'Common Substitution Mistakes',
    },
    {
      id: 'recipe-specific-pitfalls',
      title: 'Recipe-Specific Pitfalls',
    },
    {
      id: 'troubleshooting-guide',
      title: 'Troubleshooting Guide',
    },
    {
      id: 'best-practices',
      title: 'Best Practices',
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        {/* Featured Image for Mobile */}
        <div className="lg:hidden mb-8">
          <Image
            src={Eggs2}
            alt="Common baking mistakes with eggs"
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
                Common Mistakes When Using Eggs in Baking
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Learn about common egg-related baking mistakes and how to avoid them for better
                baking results.
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
                    src={Eggs2}
                    alt="Common baking mistakes with eggs"
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
              <section id="introduction" className="prose dark:prose-invert max-w-none">
                <h2 className="text-3xl font-bold mb-6">Introduction</h2>

                <p className="mb-4">
                  We&apos;ve all been there - you&apos;re ready to bake, the oven is preheated,
                  ingredients are measured, and then you realize you&apos;re out of eggs.
                </p>

                <p className="mb-4">
                  What makes egg substitution so challenging is that eggs aren&apos;t just one
                  ingredient - they&apos;re more like a Swiss Army knife in baking. Sometimes
                  they&apos;re there for moisture, other times for structure, and occasionally
                  they&apos;re doing four or five different jobs at once. This means that what works
                  perfectly in your banana bread might lead to a complete disaster in your birthday
                  cake.
                </p>

                <p className="mb-4">
                  In this guide, we&apos;ll explore the most common mistakes bakers make when
                  substituting eggs, and more importantly, how to avoid them. Whether you&apos;re an
                  experienced baker adapting recipes or a beginner trying to work around dietary
                  restrictions, understanding these pitfalls will save you from wasted ingredients
                  and disappointing results.
                </p>

                <p className="mb-4">
                  Let&apos;s start by looking at the most common mistakes bakers make when
                  substituting eggs.
                </p>
              </section>

              <section
                id="common-substitution-mistakes"
                className="prose dark:prose-invert max-w-none mt-12"
              >
                <h2 className="text-3xl font-bold mb-6">Common Substitution Mistakes</h2>

                <h3 className="text-2xl font-semibold mt-8 mb-4">
                  Using the Same Substitute for Everything
                </h3>
                <p className="mb-4">
                  Not all egg substitutes work equally well in every recipe. Take banana bread
                  versus a vanilla cake. While mashed banana might work perfectly in that quick
                  bread, adding it to a delicate vanilla cake will give you an unintended banana
                  flavor and a denser texture than desired. Similarly, a commercial egg replacer
                  that works beautifully in cakes might make your cookies spread too much during
                  baking.
                </p>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Incorrect Proportions</h3>
                <p className="mb-4">
                  The right ratio is crucial for successful substitution. A common mistake is using
                  too much of a substitute, like adding a full 1/4 cup of applesauce for one egg
                  when the recipe already has plenty of moisture. In a chocolate chip cookie recipe,
                  this could make your dough too wet, resulting in cookies that spread into a thin,
                  crispy mess instead of staying thick and chewy.
                </p>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Not Adjusting Liquid Content</h3>
                <p className="mb-4">
                  When using egg substitutes that add moisture, many bakers forget to reduce other
                  liquids in the recipe. For example, if you&apos;re making pumpkin muffins and
                  using applesauce as an egg substitute, you might need to reduce the amount of milk
                  or other liquid ingredients. Otherwise, you&apos;ll end up with muffins that are
                  gummy and take forever to bake through.
                </p>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Temperature and Timing Issues</h3>
                <p className="mb-4">
                  Some substitutes need specific preparation or temperature conditions. A classic
                  example is forgetting to let flax eggs gel properly. If you add the flax mixture
                  to your cookie dough immediately after mixing with water, instead of waiting 10-15
                  minutes for it to thicken, your cookies won&apos;t hold together properly during
                  baking.
                </p>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Missing Protein Content</h3>
                <p className="mb-4">
                  Eggs provide structure through their protein content. When making a yellow cake
                  with applesauce instead of eggs, you might notice it sinks in the middle after
                  baking. This happens because there isn&apos;t enough protein to maintain the
                  structure as the cake cools. Adding a small amount of protein powder or increasing
                  the flour slightly could help prevent this issue.
                </p>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Improper Mixing Methods</h3>
                <p className="mb-4">
                  Different substitutes require different mixing techniques. For instance, if
                  you&apos;re using aquafaba (chickpea liquid) in a meringue-based recipe,
                  overbeating can cause it to deflate and lose its structure. Similarly, overmixing
                  a batter with flax eggs can break down their binding properties, leading to
                  crumbly results.
                </p>

                <p className="mt-8 mb-4">
                  While these general mistakes can affect any recipe, certain types of baked goods
                  are particularly challenging when it comes to egg substitution. Let&apos;s look at
                  some specific recipes where egg substitution requires extra attention.
                </p>
              </section>

              <section
                id="recipe-specific-pitfalls"
                className="prose dark:prose-invert max-w-none mt-12"
              >
                <h2 className="text-3xl font-bold mb-6">Recipe-Specific Pitfalls</h2>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Layer Cakes</h3>
                <p className="mb-4">
                  Layer cakes are particularly vulnerable to egg substitution problems. The most
                  common failure is a cake that rises beautifully in the oven, only to sink
                  dramatically as it cools. This often happens when using fruit purees alone as
                  substitutes, since they lack the structural proteins needed to maintain height.
                  Another frequent issue is cakes that come out gummy and dense because the liquid
                  ratio wasn&apos;t properly adjusted for moisture-heavy substitutes like applesauce
                  or mashed banana.
                </p>
                <p className="mb-4">
                  For example, a vanilla layer cake using commercial egg replacer might not brown
                  properly on top, leading bakers to overbake it while waiting for that golden
                  color. The result? A dry, tough cake. The solution is often to accept a lighter
                  color or to add a small amount of milk powder to promote browning.
                </p>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Cookies</h3>
                <p className="mb-4">
                  Cookie dough is especially sensitive to moisture changes from egg substitutes. A
                  common disaster is using a full flax egg in a small batch of cookies without
                  reducing other liquids. The cookies spread into one giant, thin puddle instead of
                  staying as separate, chewy cookies.
                </p>
                <p className="mb-4">
                  Another classic mistake is using mashed banana in chocolate chip cookies. While it
                  might bind the dough, the extra sugar and moisture from the banana causes
                  excessive spreading and caramelization, resulting in cookies that are crispy and
                  dark around the edges but undercooked in the middle.
                </p>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Enriched Breads</h3>
                <p className="mb-4">
                  Enriched doughs like brioche and challah present unique challenges. Many bakers
                  try to substitute the eggs with just a binding agent like flax, forgetting that
                  eggs also contribute richness and color to these breads. The result is often a
                  pale, dense loaf that lacks the characteristic golden color and tender crumb.
                </p>
                <p className="mb-4">
                  For instance, a brioche made with just commercial egg replacer might have good
                  structure but miss the rich, buttery quality that eggs provide. Adding a small
                  amount of turmeric for color and increasing the fat content can help achieve more
                  traditional results.
                </p>
                <p className="mb-4">
                  Finally, we come to perhaps the biggest challenge in egg-free baking - custards
                  and puddings.
                </p>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Custards and Puddings</h3>
                <p className="mb-4">
                  This is the trickiest category, because eggs play a crucial thickening role. A
                  common failure is using cornstarch alone as a thickener without accounting for the
                  protein structure eggs provide. This results in a pudding that&apos;s thick but
                  lacks the smooth, creamy texture of traditional custard.
                </p>
                <p className="mb-4">
                  Many vegan custard attempts end up either too loose or with a grainy texture
                  because the protein structure and fat emulsion aren&apos;t properly replicated.
                  Success often requires a combination of thickeners, proteins (like silken tofu),
                  and careful temperature control.
                </p>
                <p className="mb-4">
                  Even with the best prep, you might still encounter some problems when working with
                  egg substitutes. Here&apos;s how to identify common issues and fix them before
                  they ruin your bake.
                </p>
              </section>

              <section
                id="troubleshooting-guide"
                className="prose dark:prose-invert max-w-none mt-12"
              >
                <h2 className="text-3xl font-bold mb-6">Troubleshooting Guide</h2>

                <p className="mb-6">
                  Let&apos;s look at the most frequent issues you might encounter and how to fix
                  them:
                </p>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Identifying Common Problems</h3>

                <h4 className="text-xl font-semibold mt-6 mb-3">Dense or Heavy Texture</h4>
                <p className="mb-4">
                  If your baked good is coming out dense or heavy, you&apos;re likely dealing with a
                  structural issue. This commonly happens in cakes and quick breads where the egg
                  substitute isn&apos;t providing enough protein structure. You might notice:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>A tight, gummy crumb</li>
                  <li>Compressed layers in cakes</li>
                  <li>A heavy, wet bottom</li>
                </ul>
                <p className="mb-6">
                  <strong>Quick fix:</strong> If you catch this during testing, try adding 1-2
                  tablespoons of protein powder or increasing the flour by 2-3 tablespoons in your
                  next attempt. For cakes specifically, consider using a combination of substitutes
                  - perhaps commercial egg replacer for structure plus applesauce for moisture.
                </p>

                <h4 className="text-xl font-semibold mt-6 mb-3">Spreading Issues</h4>
                <p className="mb-4">
                  When your baked goods spread too much or too little, it&apos;s usually a moisture
                  balance problem. Common signs include:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Cookies that run into each other</li>
                  <li>Cakes that overflow their pans</li>
                  <li>Batter that&apos;s too thick or too thin</li>
                </ul>
                <p className="mb-6">
                  <strong>Quick fix:</strong> For too much spread, chill your dough thoroughly
                  before baking. If making another batch, reduce liquid ingredients by 2-3
                  tablespoons. For too little spread, try adding 1-2 tablespoons of liquid.
                </p>

                <h4 className="text-xl font-semibold mt-6 mb-3">Crumbly Results</h4>
                <p className="mb-4">
                  If your baked good falls apart easily, the binding properties aren&apos;t
                  sufficient. You might see:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Cookies that break when picked up</li>
                  <li>Cake that doesn&apos;t hold together when sliced</li>
                  <li>Muffins that crumble when unwrapped</li>
                </ul>
                <p className="mb-6">
                  <strong>Quick fix:</strong> For items still in the mixing bowl, try adding 1-2
                  teaspoons of xanthan gum or increasing your binding substitute (like flax egg) by
                  25%. For future batches, consider using a stronger binding substitute or a
                  combination approach.
                </p>

                <h4 className="text-xl font-semibold mt-6 mb-3">When to Start Over</h4>
                <p className="mb-4">
                  Sometimes it&apos;s better to cut your losses. Start over if:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>The batter has separated and won&apos;t recombine</li>
                  <li>Your flax or chia eggs didn&apos;t gel properly</li>
                  <li>The mixture is significantly lumpier or thinner than usual</li>
                  <li>There&apos;s any sign of curdling</li>
                </ul>

                <h4 className="text-xl font-semibold mt-6 mb-3">Storage Problems</h4>
                <p className="mb-4">
                  Egg-free baked goods often have different storage needs. Watch for:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Faster staling</li>
                  <li>Moisture development during storage</li>
                  <li>Textural changes overnight</li>
                </ul>
                <p className="mb-6">
                  <strong>Quick fix:</strong> Store items in airtight containers, but add a paper
                  towel to absorb excess moisture. Many egg-free bakes are best consumed within 1-2
                  days or frozen immediately after cooling.
                </p>

                <p className="mt-8 mb-4">
                  Now that we understand what can go wrong, let&apos;s look at how to set yourself
                  up for success from the start.
                </p>
              </section>

              <section id="best-practices" className="prose dark:prose-invert max-w-none mt-12">
                <h2 className="text-3xl font-bold mb-6">Best Practices</h2>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Choosing the Right Substitute</h3>
                <p className="mb-4">
                  Match your substitute to the primary role eggs play in your recipe:
                </p>
                <ul className="list-disc pl-6 mb-6">
                  <li>
                    For moisture and binding (like in quick breads): Applesauce, mashed banana, or
                    pumpkin puree work well
                  </li>
                  <li>
                    For structure (like in cakes): Commercial egg replacer or a combination of
                    substitutes
                  </li>
                  <li>
                    For leavening (like in light, fluffy cakes): Try carbonated water combined with
                    a structural substitute
                  </li>
                  <li>
                    For richness (like in cookies): Add a bit more fat along with your binding
                    substitute
                  </li>
                </ul>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Testing Strategies</h3>
                <p className="mb-4">
                  Always test your substitutions in a smaller batch first. A good approach is to:
                </p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Make a quarter or half recipe as a test</li>
                  <li>Take detailed notes about texture, taste, and behavior during baking</li>
                  <li>
                    Let the test batch cool completely - some problems only show up after cooling
                  </li>
                  <li>
                    Try the baked good both fresh and after 24 hours to check keeping qualities
                  </li>
                </ul>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Temperature Considerations</h3>
                <p className="mb-4">
                  Temperature control becomes even more critical with egg substitutes:
                </p>
                <ul className="list-disc pl-6 mb-6">
                  <li>
                    Room temperature ingredients are essential - cold ingredients can prevent proper
                    binding
                  </li>
                  <li>Flax and chia eggs need 10-15 minutes at room temperature to gel properly</li>
                  <li>Most egg-free batters benefit from resting time before baking</li>
                  <li>
                    Watch baking temperatures carefully - egg-free goods often need slightly lower
                    temperatures
                  </li>
                </ul>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Measuring Guidelines</h3>
                <p className="mb-4">Precision is crucial when working with egg substitutes:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Use weight measurements when possible</li>
                  <li>Prepare substitutes fresh for each bake</li>
                  <li>Don&apos;t substitute for more than 2-3 eggs in a recipe</li>
                  <li>Consider scaling recipes down rather than making large egg-free batches</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Recipe Adjustments</h3>
                <p className="mb-4">Common adjustments that help ensure success:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Add 1/4 teaspoon extra leavener per egg replaced</li>
                  <li>
                    Increase vanilla or other flavoring slightly to compensate for lost egg flavor
                  </li>
                  <li>Reduce sugar by 1-2 tablespoons when using fruit-based substitutes</li>
                  <li>Add an extra pinch of salt to enhance flavors</li>
                </ul>
              </section>

              <section id="conclusion" className="prose dark:prose-invert max-w-none mt-12">
                <h2 className="text-3xl font-bold mb-6">Conclusion</h2>

                <p className="mb-4">
                  Egg substitution in baking might seem overwhelming at first, but understanding
                  these common pitfalls and their solutions puts you on the path to consistent
                  success. Remember that even experienced bakers face challenges when working with
                  egg substitutes - it&apos;s all part of the learning process.
                </p>

                <p className="mb-4">
                  Keep this guide handy as a reference, and remember that successful egg-free baking
                  is about understanding not just what to substitute, but why and how these
                  substitutions work in different recipes.
                </p>
              </section>

              {/* Add NewsletterSignup before the end of main content */}
              <NewsletterSignup />
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
