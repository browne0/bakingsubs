'use client';

import { BEST_FOR_OPTIONS } from '@/app/admin/constants';
import { searchSubstitutions } from '@/app/services/substitutionService';
import { StarRating } from '@/components/StarRating';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { QueryData } from '@supabase/supabase-js';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

type SortField = 'from_ingredient' | 'name' | 'rating' | 'best_for';
type SortOrder = 'asc' | 'desc';

interface SubstitutionsTableProps {
  substitutions: QueryData<ReturnType<typeof searchSubstitutions>>;
  isLoading?: boolean;
}

export function SubstitutionsTable({ substitutions, isLoading }: SubstitutionsTableProps) {
  const router = useRouter();
  const [sortField, setSortField] = useState<SortField>('from_ingredient');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedSubstitutions = [...substitutions].sort((a, b) => {
    const multiplier = sortOrder === 'asc' ? 1 : -1;

    switch (sortField) {
      case 'from_ingredient':
        return multiplier * a.from_ingredient.name.localeCompare(b.from_ingredient.name);
      case 'name':
        return multiplier * a.name.localeCompare(b.name);
      case 'rating':
        return multiplier * ((a.rating || 0) - (b.rating || 0));
      case 'best_for':
        return multiplier * a.best_for[0]?.localeCompare(b.best_for[0] || '');
      default:
        return 0;
    }
  });

  const handleDelete = async (
    id: string,
    substitution: QueryData<ReturnType<typeof searchSubstitutions>>[0]
  ) => {
    const message =
      `Are you sure you want to delete this substitution?\n\n` +
      `Name: ${substitution.name}\n` +
      `Original Ingredient: ${substitution.from_ingredient.name}\n` +
      `Substitution: ${substitution.substitution_ingredients
        ?.map((si) => `${si.amount} ${si.unit} ${si.ingredient.name}`)
        .join(', ')}`;

    if (!confirm(message)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/substitutions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete substitution');
      }

      toast.success('Substitution deleted successfully');
      router.refresh();
    } catch (error) {
      toast.error('Failed to delete substitution');
    }
  };

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort(field)}>
      <div className="flex items-center justify-between gap-1">
        <span>{children}</span>
        <ArrowUpDown
          className={`h-4 w-4 flex-shrink-0 ${sortField === field ? 'opacity-100' : 'opacity-50'}`}
        />
      </div>
    </TableHead>
  );

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHeader field="from_ingredient">Original Ingredient</SortableHeader>
            <SortableHeader field="name">Name</SortableHeader>
            <TableHead>Substitution Ingredients</TableHead>
            <SortableHeader field="rating">Rating</SortableHeader>
            <SortableHeader field="best_for">Best For</SortableHeader>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : sortedSubstitutions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No substitutions found
              </TableCell>
            </TableRow>
          ) : (
            sortedSubstitutions.map((substitution) => (
              <TableRow key={substitution.id}>
                <TableCell>{substitution.from_ingredient.name}</TableCell>
                <TableCell>{substitution.name}</TableCell>
                <TableCell>
                  {substitution.substitution_ingredients?.map((si) => (
                    <div key={si.ingredient.id}>
                      - {si.amount} {si.unit} {si.ingredient.name}
                      {si.notes && <span className="text-muted-foreground"> ({si.notes})</span>}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  <StarRating rating={substitution.rating} />
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({substitution.rating_count || 0})
                  </span>
                </TableCell>
                <TableCell>
                  {substitution.best_for
                    .map(
                      (value) =>
                        BEST_FOR_OPTIONS.find((option) => option.value === value)?.label ?? value
                    )
                    .join(', ')}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/substitutions/edit/${substitution.id}`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDelete(substitution.id, substitution)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
