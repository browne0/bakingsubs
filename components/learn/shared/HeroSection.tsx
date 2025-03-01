'use client';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
}

export default function HeroSection({
  title,
  subtitle = 'HOW TO SUBSTITUTE',
  image,
  imageAlt,
}: HeroSectionProps) {
  return (
    <div className="relative">
      {/* Hero Image with Overlay */}
      <div className="relative h-[45vh] min-h-[400px] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 z-10" />
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
              <span className="h-[1px] w-4 border-t border-rose-500"></span>
              <p className="text-base font-medium tracking-wider text-white uppercase">
                {subtitle}
              </p>
              <span className="h-[1px] w-4 border-t border-rose-500"></span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-white">{title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
