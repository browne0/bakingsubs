'use client';

import { BEST_FOR_OPTIONS } from '@/app/admin/constants';
import { StarRating } from '@/components/StarRating';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { QueryData } from '@supabase/supabase-js';
import { searchSubstitutions } from '@/app/services/substitutionService';

interface SubstitutionsTableProps {
  substitutions: QueryData<ReturnType<typeof searchSubstitutions>>;
  isLoading?: boolean;
}

export function SubstitutionsTable({ substitutions, isLoading }: SubstitutionsTableProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this substitution?')) {
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

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Original Ingredient</TableHead>
            <TableHead>Substitution Ingredients</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Best For</TableHead>
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
          ) : substitutions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No substitutions found
              </TableCell>
            </TableRow>
          ) : (
            substitutions.map((substitution) => (
              <TableRow key={substitution.id}>
                <TableCell>{substitution.name}</TableCell>
                <TableCell>{substitution.from_ingredient.name}</TableCell>
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
                        onClick={() => handleDelete(substitution.id)}
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
