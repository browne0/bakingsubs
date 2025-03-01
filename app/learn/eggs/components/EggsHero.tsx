import EggsImg from '@/app/images/learn/eggs/eggs.jpg';
import HeroSection from '@/components/learn/shared/HeroSection';

export default function EggsHero() {
  return (
    <HeroSection
      title="Eggs"
      subtitle="HOW TO SUBSTITUTE"
      image={EggsImg.src}
      imageAlt="Various baked goods made with egg substitutes"
    />
  );
}
