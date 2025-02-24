import BackToTopButton from '@/components/BackToTopButton';
import TableOfContents from '@/components/learn/TableOfContents';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Vegan Egg Substitutes for Baking',
  description: ' ',
};

export default function VeganSubstitutesPage() {
  const tocSections = [
    { id: 'popular-substitutes', title: 'Commercial Egg Replacers' },
    { id: 'seed-substitutes', title: 'Seed-Based Substitutes' },
    { id: 'fruit-substitutes', title: 'Fruit-Based Substitutes' },
    { id: 'bean-substitutes', title: 'Bean-Based Substitutes' },
    { id: 'vegetable-substitutes', title: 'Vegetable-Based Substitutes' },
    { id: 'comparison-guide', title: 'Choosing the Right Substitute' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[320px]">
        <img
          src="https://placehold.co/1920x1080"
          alt="Various vegan egg substitutes for baking"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl text-white font-bold text-center px-4">
            Best Vegan Egg Substitutes for Baking
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
            <p>
              The world of vegan egg substitutes has exploded in recent years, moving far beyond the
              simple banana or applesauce swap. Today's plant-based bakers have access to an
              impressive array of options, from commercial egg replacers to creative whole-food
              solutions.
            </p>

            <p className="mt-6 mb-2">
              Whether you're a seasoned vegan baker looking to expand your repertoire or someone
              exploring egg-free baking for the first time, understanding these different
              substitutes can transform your baking game.
            </p>

            <p className="mt-6 mb-2">
              By the end of this guide, you'll have a thorough understanding of:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>The different categories of egg substitutes available today</li>
              <li>How to properly prepare and store various alternatives</li>
              <li>The latest innovations in vegan egg replacements</li>
              <li>Practical considerations like cost and availability</li>
              <li>How to choose the right substitute for your needs</li>
            </ul>

            <p className="mt-6 font-medium">Let's dive in.</p>
          </div>

          {/* Popular Substitutes Section */}
          <section id="popular-substitutes" className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">
              Commercial Egg Replacers
            </h2>
            <div className="prose dark:prose-invert max-w-none space-y-6">
              <p>
                Commercial egg replacers have become increasingly sophisticated, offering
                convenience and consistency to vegan bakers. These products are specifically
                formulated to mimic eggs in baking, taking the guesswork out of substitution ratios
                and preparation methods.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Popular Options</h3>
              <div className="space-y-4">
                <p>
                  <a
                    href="https://amzn.to/4hWdfgX"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <strong>JUST Egg</strong>
                  </a>
                  , made primarily from mung bean protein, has revolutionized the commercial egg
                  replacement market. Each 16oz carton provides about 10 egg equivalents and
                  contains 50g of protein with zero cholesterol.
                </p>
                <p>
                  While it's best known for savory applications like scrambles and omelets, it also
                  works well in baking recipes that call for whole eggs. For baking, use 3
                  tablespoons of JUST Egg per whole egg called for in your recipe.
                </p>
                <p>
                  <a
                    href="https://amzn.to/41p9H0R"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <strong>Bob's Red Mill Egg Replacer</strong>
                  </a>
                  combines potato starch, tapioca flour, baking soda, and psyllium husk fiber. This
                  shelf-stable powder activates when mixed with water, creating a neutral-tasting
                  substitute that works well in most baked goods.
                </p>
                <p>
                  <a
                    href="https://amzn.to/3XenUva"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <strong>Ener-G Egg Replacer</strong>
                  </a>
                  , one of the oldest commercial options, uses potato and tapioca starch along with
                  leavening agents. It's particularly effective in recipes where eggs primarily
                  serve as a binder.
                </p>
              </div>

              <h3 className="text-2xl font-semibold mt-8 mb-4">
                Working with Commercial Replacers
              </h3>
              <p>
                Most powdered egg replacers follow a similar preparation method: combine the powder
                with water, whisk until smooth, and let stand briefly before using. However, each
                brand has specific ratios and standing times that should be followed for optimal
                results.
              </p>

              <p>Commercial replacers offer several advantages:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Consistent results across batches</li>
                <li>Long shelf life</li>
                <li>Pre-measured ratios for easy substitution</li>
                <li>Neutral flavor that won't impact your final product</li>
                <li>
                  Allergen-friendly options for those avoiding common ingredients like soy or nuts
                </li>
              </ul>

              <p>
                The main drawback is cost - commercial replacers are typically more expensive than
                whole-food alternatives. They also contain processed ingredients, which may not
                align with your preferences if you're trying to avoid processed foods.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Storage and Shelf Life</h3>
              <p>
                Powdered egg replacers typically last 2-3 years when stored in a cool, dry place.
                Once mixed with water, they should be used immediately for best results. Liquid
                products like JUST Egg require refrigeration and usually last about a month when
                unopened, with a shorter window once opened.
              </p>
            </div>
          </section>

          {/* Seed-Based Substitutes Section */}
          <section id="seed-substitutes" className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">
              Understanding Seed-Based Egg Substitutes: Flax and Chia
            </h2>
            <div className="prose dark:prose-invert max-w-none space-y-6">
              <p>
                If you're new to vegan baking, you've probably seen recipes calling for "flax eggs"
                or "chia eggs." These seeds are some of the most versatile egg replacers in
                plant-based baking, and for good reason. When mixed with water, they create a
                gel-like mixture that mimics many properties of eggs in baking. Let's dive into how
                these magical ingredients work and how to use them effectively in your kitchen.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">How Seed Eggs Work</h3>
              <p>
                The science behind seed eggs is fascinating. Both flax and chia seeds contain
                soluble fiber that, when mixed with liquid, creates a gel-like substance called
                mucilage. This gel helps bind ingredients together and adds moisture to your bakes,
                similar to how eggs function in traditional recipes. While they won't create the
                same protein structure as eggs, they provide enough binding power to hold most baked
                goods together beautifully.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Choosing Between Flax and Chia</h3>
              <p>
                While both seeds work similarly, they each have their own characteristics that make
                them suited for different types of baking. Flaxseeds have a slightly nutty flavor
                that can add depth to whole grain bakes like breakfast muffins or oatmeal cookies.
                Golden flax offers a milder flavor than brown flax, making it perfect for more
                delicate bakes where you don't want the egg replacer to stand out.
              </p>
              <p>
                Chia seeds, on the other hand, have an almost neutral flavor, making them incredibly
                versatile. They come in both black and white varieties, with white chia seeds being
                particularly useful in lighter-colored bakes where you don't want visible specks.
                The gel they create tends to be slightly stronger than flax, which can be beneficial
                in recipes that need extra binding power.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Making the Perfect Seed Egg</h3>
              <p>
                Creating a seed egg is simple, but there are a few key steps that make the
                difference between success and failure. Start with freshly ground seeds - this is
                crucial for flax especially, as pre-ground flax can become rancid and lose its
                binding power. A clean coffee grinder or spice mill works perfectly for grinding.
              </p>
              <p>
                For one egg replacement, mix one tablespoon of ground seeds with three tablespoons
                of warm water. The temperature of the water matters - it should be warm but not hot,
                as this helps activate the gel-forming properties. Whisk the mixture immediately to
                prevent clumping, then let it stand for about 10-15 minutes. You'll know it's ready
                when it has a consistency similar to raw egg white - thick and slightly goopy.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">
                Common Pitfalls and How to Avoid Them
              </h3>
              <p>
                Even experienced bakers sometimes run into issues with seed eggs. If your mixture
                isn't thickening, your seeds might be old or the water wasn't warm enough. Another
                common problem is ending up with a crumbly final product - this usually means you
                either needed more binding power or should have let the mixture gel longer.
              </p>
              <p>
                Some bakers find their batters become too thick when using seed eggs. This happens
                because the seeds continue to absorb moisture over time. You can compensate by
                adding a touch more liquid to your recipe or using the seed egg immediately after it
                gels.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Storage and Shelf Life</h3>
              <p>
                To keep your seeds fresh, store them in an airtight container in the refrigerator.
                Whole seeds last much longer than ground - up to six months for flax and a year for
                chia. Once ground, try to use them within a few weeks. You can tell if ground seeds
                have gone bad by their smell - they should have a mild, pleasant aroma with no hint
                of bitterness or rancidity.
              </p>
              <p>
                While you can prepare seed eggs in advance, they work best when used right away. If
                you do need to make them ahead, they'll keep in an airtight container in the
                refrigerator for about a week, though you may need to give them a quick whisk before
                using.
              </p>
            </div>
          </section>

          {/* Fruit-Based Substitutes Section */}
          <section id="fruit-substitutes" className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">
              Understanding Fruit-Based Egg Substitutes: Bananas and Applesauce
            </h2>
            <div className="prose dark:prose-invert max-w-none space-y-6">
              <p>
                When you're new to vegan baking, fruit-based egg substitutes might seem too simple
                to be effective. However, these kitchen staples can create incredibly moist,
                flavorful bakes when used correctly. Let's explore how these fruit alternatives work
                and how to use them to their full potential.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">
                Why Fruit Works as an Egg Replacer
              </h3>
              <p>
                Fruits like bananas and applesauce work well as egg substitutes because they provide
                moisture and natural binding properties. They contain pectin and other natural
                starches that help hold ingredients together, while their moisture content helps
                create tender baked goods. While they won't provide the same structure as eggs, they
                excel at keeping your bakes moist and tender.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">
                Mastering Banana as an Egg Replacer
              </h3>
              <p>
                Bananas are particularly effective in baking, offering both binding power and
                natural sweetness. The key to success lies in choosing the right bananas - you want
                them properly ripened with plenty of brown spots. These overripe bananas not only
                mash more easily but also provide better binding power and sweetness.
              </p>
              <p>
                To replace one egg, mash one medium-sized ripe banana until it's completely smooth -
                any chunks will create dense spots in your baking. A fork works well for small
                amounts, but for larger batches, consider using a blender or food processor to
                achieve a smooth consistency.
              </p>
              <p>
                The catch with bananas is their distinct flavor. While this can be wonderful in
                recipes like banana bread or chocolate cakes where the flavor complements the other
                ingredients, it might not work in every recipe. They tend to shine in:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Chocolate-based recipes where the cocoa masks the banana flavor</li>
                <li>Spiced bakes like carrot cake or zucchini bread</li>
                <li>Breakfast items like muffins and pancakes</li>
                <li>Dense, moist cakes and quick breads</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Working with Applesauce</h3>
              <p>
                Applesauce offers a more neutral flavor profile than bananas, making it incredibly
                versatile. Use unsweetened applesauce to maintain better control over your recipe's
                sweetness level. One-quarter cup of applesauce replaces one egg in most recipes.
              </p>
              <p>
                However, applesauce adds significant moisture to your bakes. To compensate, you'll
                often need to make some adjustments:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Reduce other liquid ingredients by about 2-3 tablespoons per egg replaced</li>
                <li>
                  Consider increasing your leavening agents slightly (about 1/4 teaspoon extra
                  baking powder per egg)
                </li>
                <li>Extend baking time by 3-5 minutes, watching carefully for doneness</li>
              </ul>

              <p>Applesauce works particularly well in:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Light cakes and cupcakes</li>
                <li>Muffins and quick breads</li>
                <li>Cookie bars</li>
                <li>Recipes where you want to reduce fat content</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Fine-Tuning Your Recipes</h3>
              <p>
                When working with fruit-based substitutes, remember that they're adding both
                moisture and sugar to your recipe. Here's how to adjust:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Reduce sugar content slightly, especially when using ripe bananas</li>
                <li>
                  Watch baking time carefully - fruit-based substitutes often need a few extra
                  minutes
                </li>
                <li>
                  Test for doneness with a toothpick inserted in the center - it should come out
                  mostly clean
                </li>
                <li>
                  Let baked goods cool completely before cutting, as they're often more delicate
                  when warm
                </li>
              </ul>
            </div>
          </section>

          {/* Bean-Based Substitutes Section */}
          <section id="bean-substitutes" className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">
              Understanding Bean-Based Egg Substitutes: Aquafaba
            </h2>
            <div className="prose dark:prose-invert max-w-none space-y-6">
              <p>
                If someone told you the liquid from a can of chickpeas could replace eggs in baking,
                you might be skeptical. Yet aquafaba has revolutionized vegan baking, offering
                properties that no other egg substitute can match.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">What Makes Aquafaba Special?</h3>
              <p>
                Aquafaba (literally "bean water") is the cooking liquid from chickpeas or other
                legumes. What makes it extraordinary is its ability to not just bind ingredients,
                but also to whip up into stable foams and meringues - something most other egg
                substitutes can't do. This unique property comes from its combination of proteins
                and starches that mimic egg whites' structure-building abilities.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Getting Started with Aquafaba</h3>
              <p>
                The easiest way to obtain aquafaba is from canned chickpeas. The liquid should be
                slightly thick and viscous - if it's too watery, you can reduce it on the stovetop
                until it reaches the consistency of egg whites. Three tablespoons of aquafaba equals
                one egg white.
              </p>
              <p>
                For best results, you'll want to strain the liquid to remove any solid particles.
                Let it come to room temperature before using, especially if you plan to whip it.
                While homemade aquafaba (from cooking dried chickpeas) can work, canned versions
                tend to be more consistent in their properties.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Using Aquafaba as a Basic Binder</h3>
              <p>
                In its simplest form, aquafaba can replace eggs in recipes where they primarily
                serve as a binder. Use it straight from the can for:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Cookie doughs</li>
                <li>Brownies</li>
                <li>Quick breads</li>
                <li>Pancake batters</li>
              </ul>
              <p>
                The liquid adds moisture without affecting flavor, making it incredibly versatile.
                Unlike fruit substitutes, aquafaba won't change the taste of your baked goods.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Creating Aquafaba Meringue</h3>
              <p>This is where aquafaba truly shines. To create a meringue, you'll need:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Clean, grease-free equipment (any fat will prevent proper whipping)</li>
                <li>Room temperature aquafaba</li>
                <li>
                  A stand mixer or electric hand mixer (it takes longer than egg whites to whip)
                </li>
                <li>Patience - expect to whip for 8-10 minutes</li>
              </ul>
              <p>
                Start whipping on medium speed until foamy, then increase to high. Add cream of
                tartar or a tiny pinch of xanthan gum to help stabilize the foam. Gradually add
                sugar while whipping if making a sweet meringue. The mixture will eventually form
                stiff, glossy peaks that hold their shape.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Troubleshooting Your Aquafaba</h3>
              <p>Common issues and solutions:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Not whipping properly: Check for any traces of fat in your bowl or beaters</li>
                <li>Deflating quickly: Add stabilizers like cream of tartar</li>
                <li>Too watery: Reduce the liquid on the stovetop until thickened</li>
                <li>Meringue weeping: Ensure sugar is fully dissolved before stopping whipping</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Storage and Preparation</h3>
              <p>
                Fresh aquafaba keeps in an airtight container in the refrigerator for 4-5 days. For
                longer storage, freeze it in ice cube trays - each cube is usually about 1
                tablespoon. Once frozen, transfer to a freezer bag for up to 3 months.
              </p>
              <p>
                When using frozen aquafaba, thaw it completely and bring to room temperature before
                whipping. Give it a quick whisk to recombine if any separation has occurred.
              </p>
            </div>
          </section>

          {/* Vegetable-Based Substitutes Section */}
          <section id="vegetable-substitutes" className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">
              Understanding Vegetable-Based Egg Substitutes: Pumpkin and Sweet Potato
            </h2>
            <div className="prose dark:prose-invert max-w-none space-y-6">
              <p>
                While fruit purees often get the spotlight, vegetable purees can be equally
                effective egg substitutes in baking. Pumpkin and sweet potato purees offer unique
                benefits: they're less sweet than fruit alternatives, add beautiful color to baked
                goods, and contribute beneficial nutrients. Let's explore how to make these
                vegetables work magic in your baking.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Why Choose Vegetable Purees?</h3>
              <p>
                Vegetable purees work as egg substitutes thanks to their high starch content and
                natural moisture. They provide structure and binding power while adding subtle
                flavor that complements many baked goods. Unlike fruit substitutes, they won't
                significantly increase the sweetness of your recipe, giving you more control over
                the final taste.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Making Perfect Vegetable Purees</h3>
              <p>
                While canned pumpkin puree is readily available, making your own purees opens up
                more possibilities. Here's how:
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">For Sweet Potato:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Bake whole sweet potatoes at 400°F (200°C) until completely tender</li>
                    <li>Let cool, then peel</li>
                    <li>Blend until perfectly smooth in a food processor</li>
                    <li>Strain through a fine-mesh sieve if needed for extra smoothness</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">For Pumpkin:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Cut a small sugar pumpkin in half, remove seeds</li>
                    <li>Roast cut-side down until tender</li>
                    <li>Scoop out flesh and blend until smooth</li>
                    <li>Strain to remove any fibrous bits</li>
                    <li>Cook down if too watery</li>
                  </ul>
                </div>
              </div>

              <p>
                The key is achieving a very smooth consistency - any chunks will create dense spots
                in your baking.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Using Vegetable Purees in Baking</h3>
              <p>
                Replace one egg with ¼ cup of puree. When working with vegetable purees, remember:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>They add significant moisture, so reduce other liquids slightly</li>
                <li>The natural sugars are less concentrated than in fruit purees</li>
                <li>Their earthy flavors work particularly well with warm spices</li>
                <li>The color will affect your final bake - embrace the warm orange hue</li>
              </ul>

              <p>These purees excel in:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Spiced cakes and breads</li>
                <li>Muffins and quick breads</li>
                <li>Dense, moist cakes</li>
                <li>Cookie bars and brownies</li>
                <li>Seasonal baked goods</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Getting the Best Results</h3>
              <p>
                Temperature matters - always bring your puree to room temperature before baking.
                Cold puree can affect how your other ingredients blend and how your leavening agents
                work.
              </p>
              <p>
                Watch the moisture content carefully. If your puree seems watery, cook it down
                slightly in a saucepan over low heat, stirring frequently. The thicker consistency
                will provide better binding power and won't make your batter too wet.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Storage and Preparation Tips</h3>
              <p>Homemade purees keep well:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Refrigerate in an airtight container for up to 5 days</li>
                <li>Freeze in measured portions for up to 6 months</li>
                <li>Thaw completely and bring to room temperature before using</li>
                <li>Drain any excess liquid that separates during storage</li>
                <li>Stir well before using to ensure consistent texture</li>
              </ul>

              <p>For canned pumpkin:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Transfer unused portion to an airtight container</li>
                <li>Refrigerate for up to a week</li>
                <li>Freeze in measured portions if needed</li>
                <li>Always check for any signs of spoilage before using</li>
              </ul>
            </div>
          </section>

          {/* Comparison Guide Section */}
          <section id="comparison-guide" className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">
              Choosing the Right Egg Substitute: A Comparison Guide
            </h2>
            <div className="prose dark:prose-invert max-w-none space-y-6">
              <p>
                We just covered a lot of different substitutions. How do you know which one you
                should use?
              </p>
              <p>
                Let's break down when to use each option based on what you're baking, and the
                results you're looking to achieve in your bake.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">For Structure and Binding</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Flax and chia eggs excel in heartier bakes and when you need reliable binding
                </li>
                <li>Commercial egg replacers provide consistent results and neutral flavor</li>
                <li>
                  Aquafaba works well in most recipes, especially where a light texture is desired
                </li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4">For Moisture and Tenderness</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Bananas add moisture and natural sweetness, perfect for denser bakes</li>
                <li>Applesauce creates tender crumb with minimal flavor impact</li>
                <li>
                  Pumpkin and sweet potato purees provide moisture while keeping sweetness in check
                </li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4">For Special Techniques</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Aquafaba is unique in its ability to create meringues and light, airy textures
                </li>
                <li>Commercial replacers often work best for recipes requiring multiple eggs</li>
                <li>Fruit and vegetable purees are excellent when you want to reduce added fats</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Quick Selection Guide</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-4 px-4 font-semibold">Substitute</th>
                      <th className="text-left py-4 px-4 font-semibold">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    <tr>
                      <td className="py-4 px-4 font-medium">Bananas</td>
                      <td className="py-4 px-4">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Making chocolate or spiced bakes</li>
                          <li>When you want natural sweetness</li>
                          <li>When banana flavor complements the recipe</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-medium">Applesauce</td>
                      <td className="py-4 px-4">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>When you need a neutral flavor</li>
                          <li>Making light-colored bakes</li>
                          <li>Reducing fat content</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-medium">Flax or Chia</td>
                      <td className="py-4 px-4">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Making breakfast bakes or hearty goods</li>
                          <li>When you want added nutrition</li>
                          <li>When recipe needs reliable binding</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-medium">Aquafaba</td>
                      <td className="py-4 px-4">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Creating meringues or light textures</li>
                          <li>When you need a completely neutral flavor</li>
                          <li>Making delicate bakes</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-medium">Vegetable Purees</td>
                      <td className="py-4 px-4">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Making spiced or seasonal bakes</li>
                          <li>When you want to control sweetness</li>
                          <li>Adding natural color to bakes</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Final Thoughts</h3>
              <p>
                Vegan egg substitutes have come a long way, offering solutions for every type of
                bake. Don't be afraid to experiment - sometimes combining different substitutes can
                give you the best results.
              </p>
              <p>
                Remember that each substitute brings its own characteristics to your baking, and
                what works perfectly in one recipe might need adjustment in another. With this guide
                as your foundation, you're ready to create delicious vegan baked goods that everyone
                will enjoy.
              </p>
            </div>
          </section>

          {/* Closing CTA */}
          <section className="mt-16 border-t border-slate-200 dark:border-slate-700 pt-12">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Learn More About Eggs */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white flex flex-col">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Explore Egg Functions</h3>
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
                    Learn More
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
                <li>Free Vegan Baking Guide</li>
                <li>Newsletter Signup</li>
                <li>Premium Vegan Recipes</li>
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
