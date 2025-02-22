import QuickReferenceTable from '@/components/learn/QuickReferenceTable';
import RecipeTypeCard from '@/components/learn/RecipeTypeCard';
import ScienceSpotlight from '@/components/learn/ScienceSpotlight';
import TableOfContents from '@/components/learn/TableOfContents';
import type { Metadata } from 'next';
import Image from 'next/image';

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

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-xl leading-relaxed">
            Eggs are often called the 'Swiss Army knife' of baking – they provide structure,
            moisture, richness, color, and binding properties all in one ingredient. Understanding
            these functions is key to successful baking and finding effective substitutes when
            needed.
          </p>
        </div>

        {/* Table of Contents */}
        <TableOfContents
          sections={[
            { id: 'structure', title: 'Structure (Proteins)' },
            { id: 'moisture', title: 'Moisture' },
            { id: 'richness', title: 'Richness (Fats and Emulsification)' },
            { id: 'properties', title: 'Properties in Action' },
            { id: 'substitution', title: 'Common Substitution Challenges' },
            { id: 'practical', title: 'Practical Applications' },
          ]}
        />

        {/* Content Sections */}
        <section id="structure" className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Structure (Proteins)</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              Eggs contain two types of proteins that are crucial for structure: albumins in the
              whites and various proteins in the yolks. When heated, these proteins denature
              (unfold) and then coagulate (connect), forming a complex network that gives baked
              goods their structure.
            </p>

            <ScienceSpotlight
              title="Temperature Control"
              content="Egg whites begin to coagulate at approximately 144°F (62°C), while yolks set at around 158°F (70°C). This temperature difference is why custards need precise temperature control."
            />
          </div>
        </section>

        {/* Moisture Section */}
        <section id="moisture" className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Moisture</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              Despite their seemingly solid appearance, eggs are about 75% water. This moisture
              content is crucial in creating the tender crumb found in many baked goods.
            </p>

            <div className="bg-amber-50 dark:bg-amber-900/30 p-6 rounded-lg my-6">
              <h3 className="text-xl font-semibold mb-3">In Action</h3>
              <p>
                In cookies, the moisture from eggs helps dissolve sugar and creates steam during
                baking that contributes to rise. After baking, this moisture remains in the final
                product, preventing cookies from becoming too dry and crumbly.
              </p>
            </div>

            <p className="font-semibold">Balance matters:</p>
            <p>
              Too much moisture can lead to a gummy texture, while too little results in dry,
              crumbly bakes. Eggs help maintain this delicate balance, particularly in recipes with
              high flour content.
            </p>
          </div>
        </section>

        {/* Richness Section */}
        <section id="richness" className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Richness (Fats and Emulsification)</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              Egg yolks contain about 33% fat, contributing richness and a velvety mouthfeel to
              baked goods. Beyond just adding fat, eggs are natural emulsifiers – they help combine
              ingredients that wouldn't normally mix well.
            </p>

            <ScienceSpotlight
              title="The Emulsification Magic"
              content="Lecithin in egg yolks acts as a mediator between water and fats. One end of the lecithin molecule bonds with water while the other bonds with fat, allowing them to mix smoothly instead of separating."
            />

            <div className="bg-amber-50 dark:bg-amber-900/30 p-6 rounded-lg my-6">
              <h3 className="text-xl font-semibold mb-3">In Action</h3>
              <p>
                In a pound cake, eggs help create a smooth, even batter by emulsifying the butter
                with other liquid ingredients. This results in a fine, tender crumb rather than a
                greasy or uneven texture.
              </p>
            </div>
          </div>
        </section>

        {/* Properties in Action Section */}
        <section id="properties" className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Properties in Action</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>The versatility of eggs is best understood through different preparation methods:</p>

            <ul className="space-y-4 mt-4">
              <li className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                <strong>Whipping egg whites:</strong> Incorporating air creates a foam where
                proteins surround air bubbles. These tiny bubbles provide the lift in soufflés and
                angel food cakes.
              </li>
              <li className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                <strong>Whole eggs in batters:</strong> When whole eggs are beaten into a batter,
                they provide emulsification, structure, and moisture all at once – the perfect
                balance for layer cakes and muffins.
              </li>
              <li className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                <strong>Egg wash on bread:</strong> A simple brush of beaten egg creates the golden,
                shiny crust on breads and pastries through protein coagulation and Maillard browning
                reactions.
              </li>
            </ul>
          </div>
        </section>

        {/* Substitution Challenges Section */}
        <section id="substitution" className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Common Substitution Challenges</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              Finding a single ingredient that replicates all of an egg's functions is practically
              impossible. This is why effective egg substitution often requires a combination
              approach:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Structure challenges</h3>
                <p className="text-sm">
                  Plant proteins (like aquafaba or flax gel) can create some structure but typically
                  don't set as firmly as egg proteins.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Emulsification hurdles</h3>
                <p className="text-sm">
                  Commercial emulsifiers like soy lecithin can help, but they don't contribute the
                  same richness as egg yolks.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">The moisture balance</h3>
                <p className="text-sm">
                  While many substitutes add moisture, they often don't evaporate at the same rate
                  as the water in eggs, potentially affecting baking time and texture.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Table */}
        <QuickReferenceTable />

        {/* Add this section to the main content area */}
        <section id="practical" className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Practical Applications</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecipeTypeCard
              title="Cakes"
              description="How eggs create rise and structure in cakes"
              imageUrl="https://placehold.co/400x300"
              tips={[
                'Use room temperature eggs for better volume',
                'Beat whole eggs until light and fluffy for maximum lift',
                'Separate eggs carefully to avoid any yolk in whites for meringues',
              ]}
            />

            <RecipeTypeCard
              title="Cookies"
              description="The role of eggs in spread and chewiness"
              imageUrl="https://placehold.co/400x300"
              tips={[
                'Extra yolks create fudgier cookies',
                'Whole eggs provide structure and moisture',
                'Egg whites alone can create crispier cookies',
              ]}
            />
          </div>

          <QuickReferenceTable />
        </section>
      </main>
    </div>
  );
}
