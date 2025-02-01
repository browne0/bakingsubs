'use client';

import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { SearchDialog } from '@/components/search-dialog';

// You can replace these with your actual ingredient images
const ingredients = [
  { id: 1, name: 'Eggs', image: 'https://placehold.co/400x600' },
  { id: 2, name: 'Butter', image: 'https://placehold.co/400x600' },
  { id: 3, name: 'Milk', image: 'https://placehold.co/400x600' },
  { id: 4, name: 'Flour', image: 'https://placehold.co/400x600' },
  { id: 5, name: 'Sugar', image: 'https://placehold.co/400x600' },
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-2xl mx-auto mt-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
          {isDesktop ? (
            <Input type="search" placeholder="Search for ingredient" className="pl-10 h-12" />
          ) : (
            <>
              <Button
                variant="outline"
                className="w-full pl-10 h-12 justify-start font-normal text-muted-foreground"
                onClick={() => setOpen(true)}
              >
                Search for ingredient
              </Button>
              <SearchDialog open={open} onOpenChange={setOpen} />
            </>
          )}
        </div>

        <div className="mt-8">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {ingredients.map((ingredient) => (
                <CarouselItem key={ingredient.id} className="pl-2 md:pl-4 basis-2/3 md:basis-1/3">
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden">
                    <img
                      src={ingredient.image}
                      alt={ingredient.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <h3 className="text-white font-medium">{ingredient.name}</h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
