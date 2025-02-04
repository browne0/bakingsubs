'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface SubstitutionCardProps {
  fromSlug: string;
  toSlug: string;
  name: string;
  rating: number;
  bestFor: string[];
  dietaryFlags: string[];
  effects: {
    texture?: string;
    flavor?: string;
    structure?: string;
  };
}

export function SubstitutionCard({
  name,
  fromSlug,
  toSlug,
  rating,
  bestFor,
  dietaryFlags,
  effects,
}: SubstitutionCardProps) {
  const router = useRouter();

  return (
    <Card
      className="h-full hover:bg-accent/50 transition-colors cursor-pointer"
      onClick={() => router.push(`/substitutions/${fromSlug}/${toSlug}`)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <StarFilledIcon
              key={i}
              className={cn('h-4 w-4', i < rating ? 'text-yellow-500' : 'text-muted')}
            />
          ))}
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Best for</h4>
          <div className="flex flex-wrap gap-2">
            {bestFor.map((use) => (
              <Badge key={use} variant="secondary">
                {use}
              </Badge>
            ))}
          </div>
        </div>
        {dietaryFlags.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Dietary Notes</h4>
            <div className="flex flex-wrap gap-2">
              {dietaryFlags.map((flag) => (
                <Badge key={flag} variant="outline">
                  {flag}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {Object.keys(effects).length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Effects</h4>
            <ul className="text-sm space-y-1">
              {Object.entries(effects).map(([key, value]) => (
                <li key={key} className="text-muted-foreground">
                  <span className="capitalize">{key}</span>: {value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
