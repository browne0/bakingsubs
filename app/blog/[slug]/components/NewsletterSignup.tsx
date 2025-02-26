'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to subscribe');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Never miss a substitution
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
          Subscribe for community-tested substitutions, baking tips, and weekly updates about our
          favorite recipes.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-4">
          <div className="flex gap-3">
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" disabled={isLoading} variant="default">
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </div>
        </form>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Join 100+ home bakers who never let a missing ingredient stop their baking.
        </p>
      </div>
    </div>
  );
}
