'use client';

import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { SubstitutionCard } from '@/components/SubstitutionCard';
import { Tables } from '@/database.types';

interface SubstitutionsPageClientProps {
  ingredient: Tables<'ingredients'>;
  substitutions: Tables<'substitutions'>[];
}

export function SubstitutionsPageClient({
  ingredient,
  substitutions,
}: SubstitutionsPageClientProps) {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <BreadcrumbNav
        items={[
          { label: 'Home', href: '/' },
          { label: 'Ingredients', href: '/ingredients' },
          { label: ingredient.name, href: `/ingredients/${ingredient.id}` },
          { label: 'Substitutions' },
        ]}
      />
      <h1 className="text-3xl font-bold mb-2">{ingredient.name}</h1>
      <p className="text-muted-foreground mb-8">Top substitution options</p>

      <div className="grid gap-6 md:grid-cols-3">
        {substitutions.map((substitution) => (
          <SubstitutionCard key={substitution.id} substitution={substitution} />
        ))}
      </div>
    </div>
  );
}
