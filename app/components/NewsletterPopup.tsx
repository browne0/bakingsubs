'use client';

import Image from 'next/image';
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
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
});

type FormValues = z.infer<typeof formSchema>;

export function NewsletterPopup() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

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

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      toast.success('Successfully subscribed to newsletter!');
      form.reset();
      setIsOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to subscribe');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[90vw] md:max-w-[700px] p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-[45%] h-[200px] md:h-auto">
            <Image
              src={BakedGoodsImg.src}
              alt="Baking newsletter"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex-1 p-6 md:p-8">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-serif">Never miss a substitution</DialogTitle>
              <DialogDescription className="text-base">
                Join 100+ home bakers who never let a missing ingredient stop their baking.
                <span className="block mt-2">Get weekly insights and exclusive recipes.</span>
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Your name" className="h-11 px-4" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Your email"
                          className="h-11 px-4"
                          required
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isLoading} className="w-full h-11">
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  By subscribing, you agree to our{' '}
                  <a href="/privacy" className="underline hover:text-foreground">
                    privacy policy
                  </a>
                  .
                </p>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
