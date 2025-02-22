import EggsImg from '@/app/images/learn/eggs/eggs.jpg';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="relative">
      {/* Hero Image with Overlay */}
      <div className="relative h-[40vh] min-h-[400px] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 z-10" />
        <Image
          src={EggsImg}
          alt="Various baked goods made with egg substitutes"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Egg Substitutions in Baking
            </h1>
            <p className="text-lg md:text-xl text-gray-100">
              Master the art of egg-free baking with our comprehensive guide. Whether you're vegan,
              managing allergies, or just ran out of eggs, learn how to achieve perfect results with
              the right substitutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
