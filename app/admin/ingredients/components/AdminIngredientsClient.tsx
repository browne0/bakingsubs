'use client';

import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import debounce from 'lodash/debounce';
import { ChevronDown, ChevronUp, MoreHorizontal, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { CATEGORY_OPTIONS } from '../../constants';

interface AdminIngredientsClientProps {
  initialIngredients: Tables<'ingredients'>[];
}

export function AdminIngredientsClient({ initialIngredients }: AdminIngredientsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const hasNutritionData = (ingredient: Tables<'ingredients'>) => {
    return (
      ingredient.calories !== null ||
      ingredient.protein !== null ||
      ingredient.fat !== null ||
      ingredient.carbohydrates !== null ||
      ingredient.fiber !== null ||
      ingredient.sugar !== null ||
      ingredient.sodium !== null
    );
  };

  const toggleRow = (id: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

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
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Functions</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ingredients.map((ingredient) => (
              <React.Fragment key={ingredient.id}>
                <TableRow>
                  <TableCell>
                    {ingredient.image_url ? (
                      <img
                        src={ingredient.image_url}
                        alt={ingredient.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                        <span className="text-xs text-center text-muted-foreground">No image</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{ingredient.name}</TableCell>
                  <TableCell>
                    {CATEGORY_OPTIONS.find((cat) => cat.value === ingredient.category)?.label}
                  </TableCell>
                  <TableCell>{ingredient.functions?.join(', ')}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => toggleRow(ingredient.id)}
                        disabled={!hasNutritionData(ingredient)}
                        title={
                          hasNutritionData(ingredient)
                            ? 'Show nutrition information'
                            : 'No nutrition information available'
                        }
                      >
                        {expandedRows.has(ingredient.id) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown
                            className={`h-4 w-4 ${!hasNutritionData(ingredient) ? 'text-muted-foreground/50' : ''}`}
                          />
                        )}
                      </Button>
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
                    </div>
                  </TableCell>
                </TableRow>
                {expandedRows.has(ingredient.id) && (
                  <TableRow className="bg-muted/50">
                    <TableCell colSpan={5} className="py-2 px-4">
                      <div className="py-2">
                        <h4 className="font-semibold mb-2">Nutrition Information (per 100g)</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {ingredient.calories !== null && (
                            <div>
                              <span className="text-sm font-medium">Calories:</span>{' '}
                              <span className="text-sm">{ingredient.calories} kcal</span>
                            </div>
                          )}
                          {ingredient.protein !== null && (
                            <div>
                              <span className="text-sm font-medium">Protein:</span>{' '}
                              <span className="text-sm">{ingredient.protein}g</span>
                            </div>
                          )}
                          {ingredient.fat !== null && (
                            <div>
                              <span className="text-sm font-medium">Fat:</span>{' '}
                              <span className="text-sm">{ingredient.fat}g</span>
                            </div>
                          )}
                          {ingredient.carbohydrates !== null && (
                            <div>
                              <span className="text-sm font-medium">Carbohydrates:</span>{' '}
                              <span className="text-sm">{ingredient.carbohydrates}g</span>
                            </div>
                          )}
                          {ingredient.fiber !== null && (
                            <div>
                              <span className="text-sm font-medium">Fiber:</span>{' '}
                              <span className="text-sm">{ingredient.fiber}g</span>
                            </div>
                          )}
                          {ingredient.sugar !== null && (
                            <div>
                              <span className="text-sm font-medium">Sugar:</span>{' '}
                              <span className="text-sm">{ingredient.sugar}g</span>
                            </div>
                          )}
                          {ingredient.sodium !== null && (
                            <div>
                              <span className="text-sm font-medium">Sodium:</span>{' '}
                              <span className="text-sm">{ingredient.sodium}mg</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
