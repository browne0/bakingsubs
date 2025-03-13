'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
});

type FormValues = z.infer<typeof formSchema>;

export function NewsletterSignup() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

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
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to subscribe');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl mt-0 font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Never miss a substitution
          </h2>

          <p className="text-base text-muted-foreground max-w-lg mx-auto">
            Subscribe to our newsletter for community-tested substitutions, baking tips, and weekly
            updates about our favorite recipes.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
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
          </form>
        </Form>

        <p className="text-sm text-muted-foreground">
          Join 100+ home bakers who never let a missing ingredient stop their baking.
        </p>
      </div>
    </div>
  );
}
