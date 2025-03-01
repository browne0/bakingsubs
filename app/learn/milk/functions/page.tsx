import { NewsletterSignup } from '@/app/blog/[slug]/components/NewsletterSignup';
import Milk3 from '@/app/images/learn/milk/milk3.jpg';
import BackToTopButton from '@/components/BackToTopButton';
import QuickReferenceTable from '@/components/learn/QuickReferenceTable';
import { ogImage } from '@/lib/metadata';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Function of Milk in Baking',
  description:
    'Learn how milk provides moisture, enrichment, and tenderness in baking, and why these properties matter for successful dairy-free baking.',
  openGraph: {
    title: 'The Function of Milk in Baking',
    description:
      'Learn how milk provides moisture, enrichment, and tenderness in baking, and why these properties matter for successful dairy-free baking.',
    ...ogImage,
  },
};

export default function MilkFunctionsPage() {
  const sections = [
    { id: 'moisture', title: 'Moisture and Hydration' },
    { id: 'protein', title: 'Protein Content' },
    { id: 'fat', title: 'Fat and Richness' },
    { id: 'browning', title: 'Browning and Flavor' },
    { id: 'substitution', title: 'Substitution Strategies' },
    { id: 'practical', title: 'Practical Applications' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        {/* Featured Image for Mobile */}
        <div className="lg:hidden mb-8">
          <Image
            src={Milk3}
            alt="Milk in baking"
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
                The Function of Milk in Baking
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Milk is a versatile ingredient in baking, providing moisture, protein, and fat while
                contributing to texture, flavor, and browning. Understanding these functions is
                essential for successful dairy-free baking.
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
                    src={Milk3}
                    alt="Milk in baking"
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
              <section id="moisture" className="mt-12">
                <h2 className="font-serif text-3xl font-bold mb-6">Moisture and Hydration</h2>
                <p>
                  <Link
                    href="/ingredients/milk"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Milk
                  </Link>{' '}
                  is approximately 87% water, making it a crucial source of moisture in baking. This
                  hydration helps dissolve sugars, activate leavening agents, and develop gluten in
                  flour.
                </p>

                <p className="mt-6">
                  When milk is added to a batter or dough, it initiates a series of important
                  chemical reactions. The water content dissolves sugar crystals, creating a
                  solution that distributes sweetness evenly throughout the mixture. It also
                  activates baking powder and baking soda, triggering the release of carbon dioxide
                  that creates the rise in cakes, muffins, and quick breads.
                </p>

                <p className="mt-6">
                  In bread making, milk's moisture content plays a different but equally important
                  role. When combined with flour, it hydrates the proteins gliadin and glutenin,
                  allowing them to form the elastic gluten network that gives bread its structure.
                  Compared to water, milk creates a softer gluten development, resulting in a more
                  tender crumb in the final product.
                </p>
              </section>

              {/* Protein Content Section */}
              <section id="protein" className="mt-12">
                <h2 className="font-serif text-3xl font-bold mb-6">Protein Content</h2>
                <p>
                  Milk proteins, particularly casein and whey, play several important roles in
                  baking. Unlike the proteins in eggs that primarily provide structure, milk
                  proteins contribute more subtly to the overall quality of baked goods.
                </p>

                <p className="mt-6">
                  Casein, which makes up about 80% of milk protein, is heat-stable and contributes
                  to structure development in baked goods. When heated during baking, these proteins
                  coagulate and set, helping to reinforce the framework created by flour proteins
                  and eggs. This is particularly noticeable in custards and cheesecakes, where milk
                  proteins create the characteristic smooth, set texture.
                </p>

                <p className="mt-6">
                  Whey proteins, making up the remaining 20%, are more heat-sensitive and play a
                  role in moisture retention. They have excellent water-binding properties, helping
                  to keep baked goods moist for longer periods. This is why milk-enriched breads
                  tend to stay fresh longer than those made with just water.
                </p>

                <ul className="list-disc pl-5 space-y-2 mt-4">
                  <li>Structure development through protein coagulation</li>
                  <li>Improved texture and tenderness</li>
                  <li>Enhanced browning through Maillard reaction</li>
                  <li>Better moisture retention</li>
                </ul>

                <div className="mt-6">
                  <p className="text-lg font-semibold mb-2">Protein Content Comparison</p>
                  <p className="text-gray-600">
                    Dairy milk contains about 3.3g of protein per 100ml. When choosing plant-based
                    alternatives, consider their protein content:
                  </p>
                  <ul className="mt-2 space-y-1 text-gray-600">
                    <li>• Soy milk: 3.0-3.4g (closest to dairy)</li>
                    <li>• Pea milk: 2.8-3.2g</li>
                    <li>• Oat milk: 1.0-1.5g</li>
                    <li>• Almond milk: 0.5-1.0g</li>
                  </ul>
                </div>
              </section>

              {/* Fat and Richness Section */}
              <section id="fat" className="mt-12">
                <h2 className="font-serif text-3xl font-bold mb-6">Fat and Richness</h2>
                <p>
                  The fat content in milk is perhaps its most significant contribution to baking.
                  Milk fat creates a tender crumb by coating flour proteins and preventing them from
                  forming strong gluten bonds. This is why recipes for tender cakes often call for
                  whole milk rather than skim milk—the higher fat content results in a softer, more
                  delicate texture.
                </p>

                <p className="mt-6">
                  Beyond tenderness, milk fat adds richness and mouthfeel to baked goods. It carries
                  flavor compounds and helps them linger on the palate, enhancing the overall taste
                  experience. The buttery notes in milk fat complement sweet flavors particularly
                  well, creating depth in everything from simple vanilla cakes to complex pastries.
                </p>

                <p className="mt-6">
                  Milk fat also contributes to the keeping quality of baked goods. Fat molecules
                  slow the migration of moisture, helping to prevent baked goods from drying out
                  quickly. This is why enriched doughs like brioche and challah, which contain milk
                  and additional fats, stay fresh longer than lean doughs made with just water.
                </p>

                <ul className="list-disc pl-5 space-y-2 mt-4">
                  <li>Tenderness by interfering with gluten development</li>
                  <li>Richness and mouthfeel</li>
                  <li>Extended freshness</li>
                  <li>Improved flavor carrying</li>
                </ul>

                <div className="mt-6 border-l-4 border-gray-200 pl-6">
                  <p className="font-semibold mb-2">Fat Content Guidelines:</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>Whole milk: 3.25% fat</li>
                    <li>2% reduced-fat milk: 2% fat</li>
                    <li>1% low-fat milk: 1% fat</li>
                    <li>Skim milk: less than 0.5% fat</li>
                  </ul>
                </div>
              </section>

              {/* Browning and Flavor Section */}
              <section id="browning" className="mt-12">
                <h2 className="font-serif text-3xl font-bold mb-6">Browning and Flavor</h2>
                <p>
                  One of milk's most visible contributions to baking is its role in browning. The
                  combination of proteins and sugars in milk creates ideal conditions for the
                  Maillard reaction—a complex chemical process that produces hundreds of flavor
                  compounds and the characteristic brown color on the surface of baked goods.
                </p>

                <p className="mt-6">
                  When milk is used in bread dough, the crust develops a deeper golden-brown color
                  than breads made with water alone. This is why many bakers brush the tops of bread
                  loaves with milk before baking—it promotes beautiful browning and adds a subtle
                  sweetness to the crust. The same principle applies to pie crusts, where a milk
                  wash creates an attractive golden finish.
                </p>

                <p className="mt-6">
                  Lactose, the sugar naturally present in milk, plays a dual role in browning and
                  flavor development. It participates in the Maillard reaction with proteins and
                  also undergoes caramelization at high temperatures. This creates complex flavor
                  notes that range from nutty and toasty to subtly sweet, adding depth to the
                  overall flavor profile of baked goods.
                </p>

                <div className="space-y-6 mt-6">
                  <div className="border-l-4 border-gray-200 pl-6">
                    <p className="font-semibold">Maillard Reaction</p>
                    <p className="text-gray-600">
                      The proteins in milk react with sugars during baking to create brown colors
                      and complex flavors.
                    </p>
                  </div>

                  <div className="border-l-4 border-gray-200 pl-6">
                    <p className="font-semibold">Lactose (Milk Sugar)</p>
                    <p className="text-gray-600">
                      Contributes to caramelization and provides subtle sweetness.
                    </p>
                  </div>

                  <div className="border-l-4 border-gray-200 pl-6">
                    <p className="font-semibold">Flavor Enhancement</p>
                    <p className="text-gray-600">
                      Milk fats help carry and enhance other flavors in the recipe.
                    </p>
                  </div>
                </div>
              </section>

              {/* Substitution Strategies Section */}
              <section id="substitution" className="mt-12">
                <h2 className="font-serif text-3xl font-bold mb-6">Substitution Strategies</h2>
                <p>
                  Successfully replacing milk in baking requires understanding which of its
                  properties are most important for your specific recipe. Different baked goods rely
                  on different aspects of milk's functionality, so the best substitution strategy
                  varies depending on what you're making.
                </p>

                <p className="mt-6">
                  For recipes where milk's tenderizing effect and richness are paramount, such as
                  cake batters and soft cookie doughs, you'll want to choose alternatives that
                  provide both moisture and fat. Plant-based milks with higher fat contents, like
                  full-fat coconut milk or "barista" versions of oat and soy milk, often work best
                  in these applications.
                </p>

                <p className="mt-6">
                  When milk's protein content is crucial, as in bread doughs where it contributes to
                  structure and browning, soy milk makes an excellent substitute due to its similar
                  protein content. For delicate baked goods where a neutral flavor is important,
                  almond or oat milk often provides the right balance of properties without
                  overwhelming the other flavors in the recipe.
                </p>

                <div className="space-y-12">
                  <div>
                    <h3 className="font-serif text-2xl font-semibold mb-4">
                      Rich, Tender Baked Goods
                    </h3>
                    <p className="mb-4">
                      <span className="font-semibold">Best choices:</span>{' '}
                      <Link
                        href="/ingredients/soy-milk"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        Soy milk
                      </Link>{' '}
                      or{' '}
                      <Link
                        href="/ingredients/oat-milk"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        oat milk
                      </Link>
                    </p>
                    <ul className="list-disc pl-5 mb-4 space-y-2">
                      <li>High protein content for structure</li>
                      <li>Good fat content for tenderness</li>
                      <li>Neutral flavor profile</li>
                    </ul>

                    <div className="mt-6 border-l-4 border-gray-200 pl-6">
                      <p className="font-semibold mb-2">For best results:</p>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Choose full-fat versions when possible</li>
                        <li>Look for "barista" or "extra creamy" varieties</li>
                        <li>
                          Consider adding 1 tablespoon neutral oil per cup if using low-fat
                          alternatives
                        </li>
                      </ol>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-semibold mb-4">
                      Light, Delicate Bakes
                    </h3>
                    <p className="mb-4">
                      <span className="font-semibold">Best choices:</span> Almond milk or light oat
                      milk
                    </p>
                    <p className="mb-4">
                      For delicate cakes, soufflés, and light pastries, the goal is to provide
                      moisture without weighing down the structure. Almond milk works particularly
                      well here because of its light body and subtle flavor that won't overpower
                      delicate taste profiles.
                    </p>
                    <ul className="list-disc pl-5 mb-4 space-y-2">
                      <li>Lower fat content prevents heaviness</li>
                      <li>Subtle flavor complements delicate items</li>
                      <li>Good moisture without excess richness</li>
                    </ul>

                    <div className="mt-6 border-l-4 border-gray-200 pl-6">
                      <p className="font-semibold mb-2">Tips for success:</p>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Choose unsweetened varieties</li>
                        <li>Avoid coconut milk (too heavy)</li>
                        <li>Consider reducing sugar slightly if using sweetened alternatives</li>
                      </ol>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-semibold mb-4">Rich Desserts</h3>
                    <p className="mb-4">
                      <span className="font-semibold">Best choices:</span> Coconut milk or cashew
                      milk
                    </p>
                    <p className="mb-4">
                      For custards, puddings, and decadent cakes where richness is the primary goal,
                      full-fat coconut milk provides the closest match to dairy milk's richness. Its
                      high fat content (around 14%) creates luxurious mouthfeel and carries flavors
                      beautifully, though its distinctive taste works best in recipes where coconut
                      flavor is complementary.
                    </p>
                    <ul className="list-disc pl-5 mb-4 space-y-2">
                      <li>High fat content for richness</li>
                      <li>Creamy texture</li>
                      <li>Complementary flavors</li>
                    </ul>

                    <div className="mt-6 border-l-4 border-gray-200 pl-6">
                      <p className="font-semibold mb-2">For best results:</p>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Use full-fat coconut milk for maximum richness</li>
                        <li>Shake well before using</li>
                        <li>Consider flavor pairings when choosing alternatives</li>
                      </ol>
                    </div>
                  </div>
                </div>
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
                    Remember: These are general guidelines. Success can vary based on specific
                    brands and recipes. For detailed substitution ratios, check our guides for{' '}
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

              {/* Practical Applications Section */}
              <section id="practical" className="mt-12">
                <h2 className="font-serif text-3xl font-bold mb-6">Practical Applications</h2>
                <div className="mb-8">
                  <p>
                    Understanding milk's functions is essential, but applying this knowledge in
                    practice requires attention to specific techniques and considerations for
                    different types of baked goods.
                  </p>

                  <p className="mt-6">
                    In cake baking, milk plays a crucial role in creating a tender crumb. The
                    proteins in milk help form a soft structure, while the fat content prevents
                    gluten from developing too strongly. When substituting plant-based milks in cake
                    recipes, pay attention to both the protein and fat content of your alternative.
                    A low-protein, low-fat option like almond milk might require additional
                    structure from other ingredients, while a high-protein option like soy milk
                    might need less mixing to prevent toughness.
                  </p>

                  <p className="mt-6">
                    For enriched bread doughs, milk contributes to a tender crumb and golden crust.
                    The lactose in milk provides food for yeast while also contributing to browning.
                    When using plant-based alternatives in bread, consider adding a small amount of
                    sugar (about 1 teaspoon per cup) to compensate for the missing lactose,
                    especially if using unsweetened alternatives. This will help achieve similar
                    browning and fermentation characteristics.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <img
                      src="https://placehold.co/400x300"
                      alt="Cake baking with milk alternatives"
                      width="400"
                      height="300"
                      className="rounded-lg w-full h-auto"
                    />
                    <h3 className="font-serif text-xl font-semibold">Cakes</h3>
                    <p className="text-gray-600">How milk affects cake texture and crumb</p>
                    <ul className="space-y-2 text-gray-600">
                      <li>Use room temperature milk alternatives</li>
                      <li>Consider protein content for structure</li>
                      <li>Adjust leavening if needed</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <img
                      src="https://placehold.co/400x300"
                      alt="Bread baking with milk alternatives"
                      width="400"
                      height="300"
                      className="rounded-lg w-full h-auto"
                    />
                    <h3 className="font-serif text-xl font-semibold">Enriched Breads</h3>
                    <p className="text-gray-600">The role of milk in bread texture and browning</p>
                    <ul className="space-y-2 text-gray-600">
                      <li>Choose protein-rich alternatives</li>
                      <li>Consider fat content for tenderness</li>
                      <li>Adjust liquid ratios as needed</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Closing Section with CTAs */}
              <section className="mt-16 border-t border-gray-200 pt-12">
                <h2 className="font-serif text-3xl font-bold mb-6">Continue Your Baking Journey</h2>
                <p className="text-lg mb-8">
                  Now that you understand the role of milk in baking, explore our other
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
                  to master dairy-free baking.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                  <div className="p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                    <h3 className="font-serif text-xl font-semibold mb-2">
                      Plant-Based Milk Guide
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Explore different plant-based milk options and their best uses in baking.
                    </p>
                    <a
                      href="/learn/milk/plant-based-guide"
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
