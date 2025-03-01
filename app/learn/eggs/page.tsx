import { ogImage } from '@/lib/metadata';
import { Metadata } from 'next';
import FaqSection from './components/FaqSection';
import HeroSection from './components/HeroSection';
import HowToSection from './components/HowToSection';
import NavigationMenu from './components/NavigationMenu';
import RelatedContent from './components/RelatedContent';
import ScienceSection from './components/ScienceSection';
import StartHereSection from './components/StartHereSection';
import SubstitutesGrid from './components/SubstitutesGrid';
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
      <HeroSection />
      <NavigationMenu />
      <div className="container mx-auto px-4 py-8 space-y-16 max-w-6xl [&>section]:scroll-mt-20">
        <StartHereSection />
        <ScienceSection />
        <SubstitutesGrid />
        <HowToSection />
        {/* <RecipeSection /> */}
        <FaqSection />
        <RelatedContent />
      </div>
    </main>
  );
}
