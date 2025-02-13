'use client';

import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tables } from '@/database.types';
import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash/debounce';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { SubstitutionsTable } from './SubstitutionsTable';

interface SubstitutionsManagementClientProps {
  initialSubstitutions: Tables<'substitutions'>[];
}

export function SubstitutionsManagementClient({
  initialSubstitutions,
}: SubstitutionsManagementClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setSearchQuery(query);
      }, 300),
    []
  );

  const { data: substitutions = initialSubstitutions, isLoading } = useQuery({
    queryKey: ['substitutions', searchQuery],
    queryFn: async () => {
      if (!searchQuery) return initialSubstitutions;
      const response = await fetch(`/api/substitutions?query=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch substitutions');
      }
      return response.json();
    },
    initialData: initialSubstitutions,
  });

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <BreadcrumbNav items={[{ label: 'Admin', href: '/admin' }, { label: 'Substitutions' }]} />

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Substitutions</h1>
        <Link href="/admin/substitutions/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search substitutions..."
          onChange={(e) => debouncedSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      <SubstitutionsTable substitutions={substitutions} isLoading={isLoading} />
    </div>
  );
}
