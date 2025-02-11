'use client';

import { Card } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const adminActions = [
  {
    title: 'Ingredients',
    items: [
      {
        label: 'Create New Ingredient',
        href: '/admin/ingredients/new',
        description: 'Add a new ingredient to the database',
      },
      {
        label: 'Manage Ingredients',
        href: '/admin/ingredients',
        description: 'Edit or delete existing ingredients',
      },
    ],
  },
  {
    title: 'Substitutions',
    items: [
      {
        label: 'Create New Substitution',
        href: '/admin/substitutions/new',
        description: 'Add a new substitution for an existing ingredient',
      },
      {
        label: 'Manage Substitutions',
        href: '/admin/substitutions',
        description: 'Edit or delete existing substitutions',
      },
    ],
  },
];

export default function AdminPage() {
  return (
    <div className="container max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="space-y-8">
        {adminActions.map((section) => (
          <div key={section.title}>
            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {section.items.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Card className="p-6 hover:bg-muted transition-colors group cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium mb-2">{item.label}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
