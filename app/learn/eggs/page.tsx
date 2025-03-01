import NavigationMenu from '@/components/learn/shared/NavigationMenu';
import { ogImage } from '@/lib/metadata';
import { Metadata } from 'next';
import EggsFaq from './components/EggsFaq';
import EggsHero from './components/EggsHero';
import EggsHowTo from './components/EggsHowTo';
import EggsRelated from './components/EggsRelated';
import EggsScience from './components/EggsScience';
import EggsStartHere from './components/EggsStartHere';
import EggsSubstitutes from './components/EggsSubstitutes';

export const metadata: Metadata = {
  title: 'Egg Substitutions in Baking | BakingSubs',
  description:
    'Learn everything about egg substitutions in baking - from flax eggs to commercial replacers. Discover which substitutes work best for different recipes.',
  openGraph: {
    title: 'Egg Substitutions in Baking - BakingSubs',
    description:
      'Learn everything about egg substitutions in baking - from flax eggs to commercial replacers. Discover which substitutes work best for different recipes.',
    ...ogImage,
  },
};

export default function EggSubstitutionsHub() {
  return (
    <main className="min-h-screen">
      <EggsHero />
      <NavigationMenu />
      <div className="container mx-auto px-4 py-8 space-y-16 max-w-6xl [&>section]:scroll-mt-20">
        <EggsStartHere />
        <EggsScience />
        <EggsSubstitutes />
        <EggsHowTo />
        <EggsFaq />
        <EggsRelated />
      </div>
    </main>
  );
}
