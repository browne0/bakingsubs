'use client';

import BakedGoodsImg from '@/app/images/baked_goods.jpg';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function NewsletterPopup() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (hasShown) return;

      const scrollPercentage =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      if (scrollPercentage >= 25) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
      setIsOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to subscribe');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[90vw] md:max-w-[800px] flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1 md:p-6">
            <img
              src={BakedGoodsImg.src}
              alt="Baking newsletter"
              className="w-full h-auto md:rounded-lg object-cover"
            />
          </div>
          <div className="flex-1 p-6 pt-0">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif">Never miss a substitution</DialogTitle>
              <DialogDescription className="text-base">
                Join 100+ home bakers who never let a missing ingredient stop their baking.
                <span className="block mt-2">Get weekly insights and exclusive recipes.</span>
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                By subscribing, you agree to our{' '}
                <a href="/privacy" className="underline hover:text-foreground">
                  privacy policy
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
