'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function WorkInProgress() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-3xl font-bold text-center mb-4">Work in Progress</h1>
      <p className="text-lg text-muted-foreground text-center mb-8">
        This page is a work in progress, come back later
      </p>
      <Button onClick={() => router.push('/')}>Return Home</Button>
    </div>
  );
}
