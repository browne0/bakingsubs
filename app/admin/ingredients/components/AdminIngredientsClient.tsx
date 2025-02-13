'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tables } from '@/database.types';
import { useQuery } from '@tanstack/react-query';
import { MoreHorizontal, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CATEGORY_OPTIONS } from '../../constants';
import debounce from 'lodash/debounce';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';

interface AdminIngredientsClientProps {
  initialIngredients: Tables<'ingredients'>[];
}

export function AdminIngredientsClient({ initialIngredients }: AdminIngredientsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const { data: ingredients = initialIngredients, isLoading } = useQuery({
    queryKey: ['admin-ingredients', searchQuery],
    queryFn: async () => {
      if (!searchQuery) return initialIngredients;
      const response = await fetch(`/api/ingredients?query=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch ingredients');
      }
      return response.json() as Promise<Tables<'ingredients'>[]>;
    },
    initialData: initialIngredients,
  });

  const handleSearch = debounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/ingredients/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete ingredient');
      }

      toast.success('Ingredient deleted successfully');
      location.reload();
    } catch (error) {
      toast.error('Failed to delete ingredient');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <BreadcrumbNav items={[{ label: 'Admin', href: '/admin' }, { label: 'Ingredients' }]} />

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Ingredients</h1>
        <Link href="/admin/ingredients/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Ingredient
          </Button>
        </Link>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="search"
          placeholder="Search ingredients..."
          className="pl-10"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Functions</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ingredients.map((ingredient) => (
              <TableRow key={ingredient.id}>
                <TableCell>{ingredient.name}</TableCell>
                <TableCell>
                  {CATEGORY_OPTIONS.find((cat) => cat.value === ingredient.category)?.label}
                </TableCell>
                <TableCell>{ingredient.functions?.join(', ')}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/ingredients/${ingredient.id}`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDelete(ingredient.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
