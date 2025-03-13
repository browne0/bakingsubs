import { NewsletterSignup } from '@/app/blog/[slug]/components/NewsletterSignup';
import Milk2 from '@/app/images/learn/milk/milk2.jpg';
import BackToTopButton from '@/components/BackToTopButton';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Common Milk Substitution Mistakes in Baking: Troubleshooting Guide',
  description:
    'Learn how to fix common milk substitution problems in baking: dry cakes, dense bread, pale crusts, and failed custards. Expert tips for dairy-free baking success.',
  keywords: [
    'milk substitution mistakes',
    'dairy free baking problems',
    'milk alternative fails',
    'how to fix dry dairy free cake',
    'why is my vegan bread dense',
    'milk substitute troubleshooting',
    'dairy free custard problems',
    'plant milk baking issues',
    'almond milk baking mistakes',
    'oat milk baking problems',
  ],
  openGraph: {
    title: 'Common Milk Substitution Mistakes in Baking: Troubleshooting Guide',
    description:
      'Fix common milk substitution problems in baking with expert solutions for dry cakes, dense bread, pale crusts, and failed custards.',
    type: 'article',
  },
};

export default function MistakesPage() {
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
    },
    {
      id: 'common-substitution-mistakes',
      title: 'Common Substitution Mistakes & How to Fix Them',
    },
    {
      id: 'troubleshooting-specific-baked-goods',
      title: 'Troubleshooting Specific Baked Goods',
    },
    {
      id: 'rescuing-failed-recipes',
      title: 'Rescuing Failed Recipes',
    },
    {
      id: 'best-substitutes',
      title: 'Our Best Milk Substitutes by Recipe Type',
    },
    {
      id: 'conclusion',
      title: 'Final Words of Encouragement',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        {/* Featured Image for Mobile */}
        <div className="lg:hidden mb-8">
          <Image
            src={Milk2}
            alt="Common baking mistakes with milk substitutes"
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
                Common Milk Substitution Mistakes in Baking: Troubleshooting Guide
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Learn how to fix common milk substitution problems in baking: dry cakes, dense
                bread, pale crusts, and failed custards.
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
                    src={Milk2}
                    alt="Common baking mistakes with milk substitutes"
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
            <div className="prose prose-lg lg:prose-xl max-w-none">
              <section
                id="introduction"
                className="prose-headings:font-serif prose-h2:text-4xl prose-h3:text-2xl prose-h4:text-xl max-w-none"
              >
                <h2 className="not-prose text-3xl font-bold mb-6">Introduction</h2>

                <p className="text-base leading-relaxed mb-4">
                  Let's talk about something we've all been through - you're ready to bake your
                  favorite recipe, and suddenly realize you're out of milk (or you're baking for
                  someone who's dairy-free). We've all grabbed that carton of almond milk thinking,
                  "Well, it works in my coffee, so why not?" But here's the thing - baking is a
                  whole different story.
                </p>

                <p className="text-base leading-relaxed mb-4">
                  We can't tell you how many times we've heard from fellow bakers who've had their
                  supposedly foolproof recipes go sideways because of milk substitutions. You see,
                  milk isn't just about adding liquid - it's bringing protein for structure, fat for
                  tenderness, or sugars for that beautiful golden brown color we all love.
                </p>

                <p className="text-base leading-relaxed mb-4">
                  Whether you're new to dairy-free baking or just trying to work with what's in your
                  fridge, we're going to walk you through everything we wish someone had told us
                  when we started experimenting with milk substitutes.
                </p>
              </section>

              <section
                id="common-substitution-mistakes"
                className="prose dark:prose-invert max-w-none mt-12"
              >
                <h2 className="text-3xl font-bold mb-6">
                  Common Substitution Mistakes & How to Fix Them
                </h2>

                <p className="text-base leading-relaxed mb-4">
                  When we first started baking with milk alternatives, we made every mistake in the
                  book. Let's walk through these pitfalls one by one, so you can learn from our
                  (sometimes messy) experiments.
                </p>

                <h3 className="text-2xl font-semibold mt-8 mb-4">There's a fat content mismatch</h3>
                <p className="text-base leading-relaxed mb-4">
                  <strong>The Problem:</strong> Using low-fat milk alternatives in recipes that need
                  whole milk, or vice versa.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  <strong>Real-Life Example:</strong> Our first dairy-free chocolate cake disaster
                  happened when we used watery rice milk instead of whole milk. The cake was dry and
                  crumbly instead of rich and moist. It was like trying to make a decadent dessert
                  with colored water!
                </p>
                <p className="text-base leading-relaxed mb-4">
                  <strong>Quick Fix:</strong>
                </p>
                <ul className="list-disc pl-6 mb-4 text-base leading-relaxed">
                  <li>
                    For recipes calling for whole milk: Add 1 tablespoon of neutral oil (like
                    sunflower or melted coconut oil) to each cup of low-fat milk alternative
                  </li>
                  <li>
                    For recipes calling for skim milk: Dilute full-fat coconut milk with water (2
                    parts coconut milk to 1 part water)
                  </li>
                </ul>
                <p className="text-base leading-relaxed italic">
                  <strong>Try This:</strong> For brownies or chocolate cake that call for whole
                  milk, use unsweetened oat milk with 1/2 tablespoon of olive oil mixed in. The oat
                  milk provides creaminess while the oil adds the needed fat.
                </p>

                <h3 className="text-2xl font-semibold mt-8 mb-4">The protein balance is off</h3>
                <p className="text-base leading-relaxed mb-4">
                  <strong>The Problem:</strong> Most plant milks have less protein than dairy milk,
                  affecting structure and browning.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  <strong>Real-Life Example:</strong> Our first loaf of dairy-free sandwich bread
                  looked like it had never seen the sun - pale and slightly collapsed in the middle
                  because rice milk has almost no protein compared to cow's milk.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  <strong>Quick Fix:</strong>
                </p>
                <ul className="list-disc pl-6 mb-4 text-base leading-relaxed">
                  <li>
                    For yeast breads: Add 1 tablespoon vital wheat gluten per cup of low-protein
                    milk alternative
                  </li>
                  <li>
                    For quick breads and muffins: Use soy or pea milk (highest in protein) or add 1
                    tablespoon of almond flour to the dry ingredients
                  </li>
                </ul>
                <p className="text-base leading-relaxed italic">
                  <strong>Try This:</strong> When making dinner rolls with almond milk, brush the
                  tops with a mixture of maple syrup and plant milk before baking. The sugars will
                  help them brown beautifully despite the lack of milk proteins.
                </p>

                <h3 className="text-2xl font-semibold mt-8 mb-4">There's a heat stability issue</h3>
                <p className="text-base leading-relaxed mb-4">
                  <strong>The Problem:</strong> Some plant milks separate or curdle when heated.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  <strong>Real-Life Example:</strong> We once made pastry cream with almond milk and
                  watched in horror as it separated into a grainy mess when it hit the hot pan. Not
                  exactly the smooth custard we were hoping for!
                </p>
                <p className="text-base leading-relaxed mb-4">
                  <strong>Quick Fix:</strong>
                </p>
                <ul className="list-disc pl-6 mb-4 text-base leading-relaxed">
                  <li>
                    For heated applications: Soy milk and oat milk are more heat-stable than almond
                    or rice milk
                  </li>
                  <li>
                    When cooking custards: Lower the heat and stir constantly, removing from heat as
                    soon as it thickens
                  </li>
                  <li>
                    For sauces: Add 1/2 teaspoon cornstarch per cup of plant milk before heating to
                    prevent separation
                  </li>
                </ul>
                <p className="text-base leading-relaxed italic">
                  <strong>Try This:</strong> If making a béchamel sauce, warm the plant milk to room
                  temperature first, then add it gradually to your roux while whisking constantly to
                  prevent any separation.
                </p>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Your bake came out too sweet</h3>
                <p className="text-base leading-relaxed mb-4">
                  <strong>The Problem:</strong> Many store-bought plant milks come sweetened or
                  flavored, throwing off your recipe's balance.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  <strong>Real-Life Example:</strong> Our cornbread tasted like birthday cake when
                  we accidentally used vanilla almond milk instead of unsweetened. Our dinner guests
                  were confused but politely ate "dessert cornbread" with their chili!
                </p>
                <p className="text-base leading-relaxed mb-4">
                  <strong>Quick Fix:</strong>
                </p>
                <ul className="list-disc pl-6 mb-4 text-base leading-relaxed">
                  <li>Always check the label for "unsweetened" and "unflavored"</li>
                  <li>
                    If you only have sweetened milk: Reduce the sugar in your recipe by 1-2
                    tablespoons per cup of milk
                  </li>
                  <li>
                    If you used vanilla milk by accident: Balance it with a pinch of salt and
                    possibly some herbs (for savory dishes) or lemon zest (for sweet ones)
                  </li>
                </ul>
                <p className="text-base leading-relaxed italic">
                  <strong>Try This:</strong> Keep a shelf-stable carton of unsweetened, unflavored
                  milk alternative just for baking emergencies.
                </p>

                <h3 className="text-2xl font-semibold mt-8 mb-4">The acidity is off</h3>
                <p className="text-base leading-relaxed mb-4">
                  <strong>The Problem:</strong> Plant milks have different acidity levels than dairy
                  milk, affecting how leavening agents work.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  <strong>Real-Life Example:</strong> Our first batch of dairy-free pancakes was as
                  flat as frisbees because almond milk didn't react with the baking soda the same
                  way buttermilk would.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  <strong>Quick Fix:</strong>
                </p>
                <ul className="list-disc pl-6 mb-4 text-base leading-relaxed">
                  <li>
                    When substituting for regular milk: Add 1 teaspoon of lemon juice or apple cider
                    vinegar per cup of plant milk
                  </li>
                  <li>
                    When substituting for buttermilk: Add 1 tablespoon of lemon juice or vinegar per
                    cup of plant milk and let it sit for 5 minutes before using
                  </li>
                </ul>
                <p className="text-base leading-relaxed italic">
                  <strong>Try This:</strong> For quick breads that need to rise well, stir 1
                  teaspoon of apple cider vinegar into your plant milk, wait 5 minutes (you might
                  see slight curdling, that's good!), then use as directed in your recipe.
                </p>
              </section>

              <section
                id="troubleshooting-specific-baked-goods"
                className="prose dark:prose-invert max-w-none mt-12"
              >
                <h2 className="text-3xl font-bold mb-6">Troubleshooting Specific Baked Goods</h2>
                <p className="text-base leading-relaxed mb-4">
                  Different recipes present unique challenges when it comes to milk substitution.
                  Let's look at the most common categories and how to handle them.
                </p>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Cakes and Cupcakes</h3>
                <p className="text-base leading-relaxed mb-4">
                  Cakes are often the first place we notice problems with milk substitutions because
                  they rely on a delicate balance of moisture, structure, and flavor.
                </p>

                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300 mb-6 text-base">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2">Problem</th>
                        <th className="border border-gray-300 px-4 py-2">What It Looks Like</th>
                        <th className="border border-gray-300 px-4 py-2">Quick Fix</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Cake volcano</td>
                        <td className="border border-gray-300 px-4 py-2">
                          Center rises dramatically while edges stay flat
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Use room temperature ingredients and reduce baking powder by 1/4 teaspoon
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Dry, crumbly texture</td>
                        <td className="border border-gray-300 px-4 py-2">
                          Cake falls apart when you cut it
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Add 1 Tbsp applesauce or mashed banana per cup of milk substitute
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Gummy bottom layer</td>
                        <td className="border border-gray-300 px-4 py-2">
                          Dense, wet strip at the bottom of the cake
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Switch to a lighter milk substitute or reduce the amount by 2 Tbsp
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Pale color</td>
                        <td className="border border-gray-300 px-4 py-2">
                          Cake looks anemic even when fully baked
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Brush top with plant milk + maple syrup before baking
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-base leading-relaxed italic">
                  <strong>Try This:</strong> For a foolproof chocolate cake, mix 3/4 cup soy milk
                  with 1/4 cup full-fat coconut milk. The soy provides protein while the coconut
                  adds richness without making it too heavy.
                </p>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Bread and Enriched Doughs</h3>
                <p className="text-base leading-relaxed mb-4">
                  Yeast breads present different challenges than quick breads and cakes because they
                  rely on gluten development and proper fermentation.
                </p>

                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300 mb-6 text-base">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2">Problem</th>
                        <th className="border border-gray-300 px-4 py-2">What It Looks Like</th>
                        <th className="border border-gray-300 px-4 py-2">Quick Fix</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Tough dough</td>
                        <td className="border border-gray-300 px-4 py-2">
                          Dough feels like you're wrestling it
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Add 1 extra Tbsp oil to your recipe and knead less
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Pale crust</td>
                        <td className="border border-gray-300 px-4 py-2">
                          Bread looks underbaked even when done
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Brush with olive oil before baking
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Slow rising</td>
                        <td className="border border-gray-300 px-4 py-2">
                          Dough takes forever to double in size
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Warm your plant milk slightly before adding to yeast
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Dense texture</td>
                        <td className="border border-gray-300 px-4 py-2">
                          Bread is heavy and lacks air pockets
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Use soy milk or add 1 Tbsp vital wheat gluten
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-base leading-relaxed italic">
                  <strong>Try This:</strong> For the best dairy-free brioche, warm oat milk
                  slightly, add 1 tablespoon of maple syrup (for food for the yeast and better
                  browning), and mix in 1 tablespoon of neutral oil per cup of milk. The dough rises
                  beautifully and gets that golden color we all love.
                </p>

                <h3 className="text-2xl font-semibold mt-8 mb-4">Pastries and Pie Crusts</h3>
                <p className="text-base leading-relaxed mb-4">
                  The most delicate baked goods often reveal even minor differences in milk
                  substitutes, especially in terms of fat content and heat behavior.
                </p>

                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300 mb-6 text-base">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2">Problem</th>
                        <th className="border border-gray-300 px-4 py-2">What It Looks Like</th>
                        <th className="border border-gray-300 px-4 py-2">Quick Fix</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Cracking pie crust</td>
                        <td className="border border-gray-300 px-4 py-2">
                          Crust breaks when you roll it
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Add 1 extra Tbsp of fat (coconut oil or vegan butter) to your dough
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Soggy bottom</td>
                        <td className="border border-gray-300 px-4 py-2">
                          Wet, undercooked bottom crust
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Blind bake for 10 minutes before adding filling
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Grainy custard</td>
                        <td className="border border-gray-300 px-4 py-2">
                          Filling looks separated or curdled
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Use full-fat coconut milk and cook on lower heat
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Flat croissants</td>
                        <td className="border border-gray-300 px-4 py-2">
                          Pastry doesn't puff up in layers
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Chill dough between folding and use soy milk for the wash
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-base leading-relaxed italic">
                  <strong>Try This:</strong> For custard pies, blend silken tofu with oat cream (1:1
                  ratio) for a stable filling that won't curdle during baking. It sets beautifully
                  and has a creamy texture without any bean flavor.
                </p>
              </section>

              <section
                id="rescuing-failed-recipes"
                className="prose dark:prose-invert max-w-none mt-12"
              >
                <h2 className="text-3xl font-bold mb-6">Rescuing Failed Recipes</h2>
                <p className="text-base leading-relaxed mb-4">
                  Don't throw out that failed bake just yet! Many common milk substitution mishaps
                  can be salvaged. Here are proven ways to rescue your recipes when things don't go
                  as planned.
                </p>

                <div className="mb-8 border-b border-gray-200 pb-6">
                  <h4 className="font-bold mb-4">When your cake is dry:</h4>
                  <ol className="list-decimal pl-6">
                    <li>
                      Make a simple syrup (equal parts sugar and water, heated until dissolved)
                    </li>
                    <li>Poke small holes in your cake with a toothpick</li>
                    <li>Brush syrup over the top, letting it soak in</li>
                    <li>Cover and let sit for a few hours</li>
                  </ol>
                </div>

                <div className="mb-8 border-b border-gray-200 pb-6">
                  <h4 className="font-bold mb-4">When your bread is heavy and too dense:</h4>
                  <ul className="list-disc pl-6">
                    <li>Slice it thin and toast it</li>
                    <li>Turn it into croutons or bread pudding</li>
                    <li>
                      For your next batch, reduce the plant milk by 3 tablespoons and add 1
                      tablespoon vital wheat gluten
                    </li>
                  </ul>
                </div>

                <div className="mb-8 border-b border-gray-200 pb-6">
                  <h4 className="font-bold mb-4">When your bread is too sweet:</h4>
                  <ul className="list-disc pl-6">
                    <li>Add a pinch of salt to balance sweetness</li>
                    <li>Add 1/2 teaspoon of lemon juice or vinegar to cut through sweetness</li>
                    <li>
                      Repurpose as a dessert with fresh fruit if originally intended as a savory
                      item
                    </li>
                  </ul>
                </div>

                <div className="mb-8 border-b border-gray-200 pb-6">
                  <h4 className="font-bold mb-4">When your bread is pale and underbrowned:</h4>
                  <ul className="list-disc pl-6">
                    <li>Brush with a mixture of maple syrup and plant milk</li>
                    <li>
                      For savory items, brush with olive oil and sprinkle with nutritional yeast
                    </li>
                    <li>A few minutes under the broiler can add color (watch carefully!)</li>
                  </ul>
                </div>
              </section>

              <section id="best-substitutes" className="prose dark:prose-invert max-w-none mt-12">
                <h2 className="text-3xl font-bold mb-6">
                  Our Best Milk Substitutes by Recipe Type
                </h2>
                <p className="text-base leading-relaxed mb-4">
                  After countless experiments (and a few memorable failures), we've found that
                  certain milk alternatives shine in specific recipes. Here are our go-to choices
                  that you can rely on.
                </p>

                <div className="space-y-8">
                  <div className="mb-8 border-b border-gray-200 pb-6">
                    <h4 className="font-bold mb-4">For Rich Chocolate Cakes:</h4>
                    <p className="font-medium mb-2">
                      Our go-to: Equal parts oat milk and coconut milk
                    </p>
                    <p className="text-base leading-relaxed mb-2">
                      Why it works: The oat milk provides a neutral base while coconut milk adds
                      richness without a strong flavor
                    </p>
                    <p className="text-gray-600">
                      Real-life success: Our chocolate birthday cake fooled my coworker who loves
                      everything dairy.
                    </p>
                  </div>

                  <div className="mb-8 border-b border-gray-200 pb-6">
                    <h4 className="font-bold mb-4">For Fluffy White Cakes:</h4>
                    <p className="font-medium mb-2">
                      Our go-to: Unsweetened almond milk + 1 tablespoon neutral oil per cup
                    </p>
                    <p className="text-base leading-relaxed mb-2">
                      Why it works: Light flavor that doesn't compete with vanilla, while added oil
                      provides tenderness
                    </p>
                    <p className="text-gray-600">
                      Real-life success: Cupcakes that were indistinguishable from the dairy version
                    </p>
                  </div>

                  <div className="mb-8 border-b border-gray-200 pb-6">
                    <h4 className="font-bold mb-4">For Crusty Artisan Bread:</h4>
                    <p className="font-medium mb-2">Our go-to: Soy milk or oat milk</p>
                    <p className="text-base leading-relaxed mb-2">
                      Why it works: Higher protein content helps with structure and browning
                    </p>
                    <p className="text-gray-600">
                      Real-life success: Our sourdough boules get that beautiful crackling crust and
                      open crumb
                    </p>
                  </div>

                  <div className="mb-8 border-b border-gray-200 pb-6">
                    <h4 className="font-bold mb-4">For Flaky Pastry:</h4>
                    <p className="font-medium mb-2">
                      Our go-to: Almond milk with a splash of apple cider vinegar
                    </p>
                    <p className="text-base leading-relaxed mb-2">
                      Why it works: The acid helps create layers by reacting with the leavening
                    </p>
                    <p className="text-gray-600">
                      Real-life success: Our dairy-free croissants have 27 distinct layers (yes, I
                      counted!)
                    </p>
                  </div>

                  <div className="mb-8 border-b border-gray-200 pb-6">
                    <h4 className="font-bold mb-4">For Creamy Puddings and Custards:</h4>
                    <p className="font-medium mb-2">
                      Our go-to: Full-fat coconut milk or cashew cream (1 cup soaked cashews blended
                      with 1 cup water)
                    </p>
                    <p className="text-base leading-relaxed mb-2">
                      Why it works: High fat content gives that silky, rich mouthfeel
                    </p>
                    <p className="text-gray-600">
                      Real-life success: Our dairy-free crème brûlée converted my French neighbor
                      who claimed it couldn't be done!
                    </p>
                  </div>
                </div>
              </section>

              <section id="conclusion" className="prose dark:prose-invert max-w-none mt-12">
                <h2 className="text-3xl font-bold mb-6">Wrapping it up</h2>

                <p className="text-base leading-relaxed mb-4">
                  Every "disaster" teaches you something new. Our favorite recipe—a vegan chocolate
                  olive oil cake—came from a desperate experiment when we ran out of both butter AND
                  milk.
                </p>

                <p className="text-base leading-relaxed mb-4">
                  The principles we've covered today aren't just theoretical - they're practical
                  solutions we've developed through hundreds of baking sessions. From understanding
                  why protein matters in bread to learning how to balance the sweetness in flavored
                  milks, these insights will transform your dairy-free baking.
                </p>

                <p className="text-base leading-relaxed mb-4">
                  Keep these practical fixes in your back pocket, and don't be afraid to experiment.
                  Write down what works and what doesn't. Take pictures of your successes (and
                  failures—they make great stories later!). Above all, remember that baking is part
                  science, part art, and even the pros have their off days.
                </p>

                <p className="text-base leading-relaxed mb-4">
                  With a few tweaks to your technique, your dairy-free baking will be so delicious
                  that no one will ever know the difference. And isn't that the ultimate goal? Not
                  just to make something "good for dairy-free," but something that's simply
                  outstanding, period.
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
