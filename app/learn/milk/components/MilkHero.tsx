import MilkImg from '@/app/images/learn/milk/hero.jpg';
import HeroSection from '@/components/learn/shared/HeroSection';

export default function MilkHero() {
  return (
    <HeroSection
      title="Milk"
      subtitle="HOW TO SUBSTITUTE"
      image={MilkImg.src}
      imageAlt="Various dairy-free milk alternatives used in baking"
    />
  );
}
