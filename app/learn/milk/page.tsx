import NavigationMenu from '@/components/learn/shared/NavigationMenu';
import { ogImage } from '@/lib/metadata';
import { Metadata } from 'next';
import MilkFaq from './components/MilkFaq';
import MilkHero from './components/MilkHero';
import MilkHowTo from './components/MilkHowTo';
import MilkRelated from './components/MilkRelated';
import MilkScience from './components/MilkScience';
import MilkStartHere from './components/MilkStartHere';
import MilkSubstitutes from './components/MilkSubstitutes';

export const metadata: Metadata = {
  title: 'Milk Substitutions in Baking | BakingSubs',
  description:
    'Learn everything about milk substitutions in baking - from plant-based alternatives to dairy-free options. Discover which substitutes work best for different recipes.',
  openGraph: {
    title: 'Milk Substitutions in Baking - BakingSubs',
    description:
      'Learn everything about milk substitutions in baking - from plant-based alternatives to dairy-free options. Discover which substitutes work best for different recipes.',
    ...ogImage,
  },
};

export default function MilkSubstitutionsHub() {
  return (
    <main className="min-h-screen">
      <MilkHero />
      <NavigationMenu />
      <div className="container mx-auto px-4 py-8 space-y-16 max-w-6xl [&>section]:scroll-mt-20">
        <MilkStartHere />
        <MilkScience />
        <MilkSubstitutes />
        <MilkHowTo />
        <MilkFaq />
        <MilkRelated />
      </div>
    </main>
  );
}
