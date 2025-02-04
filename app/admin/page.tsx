'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Database } from '@/database.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import * as z from 'zod';

type UnitType = Database['public']['Enums']['unit_type'];

const ingredientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  category: z.string().min(1, 'Category is required'),
  functions: z.array(z.string()).min(1, 'At least one function is required'),
  common_in: z.array(z.string()).min(1, 'At least one common use is required'),
  dietary_flags: z.array(z.string()),
  allergens: z.array(z.string()),
  default_unit: z.string() as z.ZodType<UnitType>,
  notes: z.string(),
  search_count: z.number().default(0),
});

type IngredientFormValues = z.infer<typeof ingredientSchema>;

// Define options outside component to prevent recreating on each render
const FUNCTION_OPTIONS = [
  { value: 'structure', label: 'Structure' },
  { value: 'binding', label: 'Binding' },
  { value: 'moisture', label: 'Moisture' },
  { value: 'tenderness', label: 'Tenderness' },
  { value: 'leavening', label: 'Leavening' },
  { value: 'flavor', label: 'Flavor' },
];

const COMMON_IN_OPTIONS = [
  { value: 'cookies', label: 'Cookies' },
  { value: 'cakes', label: 'Cakes' },
  { value: 'breads', label: 'Breads' },
  { value: 'pastries', label: 'Pastries' },
  { value: 'pizza dough', label: 'Pizza Dough' },
  { value: 'quick breads', label: 'Quick Breads' },
  { value: 'gluten-free baking', label: 'Gluten-Free Baking' },
];

const DIETARY_FLAGS_OPTIONS = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten-free', label: 'Gluten-Free' },
  { value: 'dairy-free', label: 'Dairy-Free' },
  { value: 'nut-free', label: 'Nut-Free' },
];

const ALLERGENS_OPTIONS = [
  { value: 'wheat', label: 'Wheat' },
  { value: 'gluten', label: 'Gluten' },
  { value: 'dairy', label: 'Dairy' },
  { value: 'eggs', label: 'Eggs' },
  { value: 'tree nuts', label: 'Tree Nuts' },
  { value: 'peanuts', label: 'Peanuts' },
  { value: 'soy', label: 'Soy' },
];

const CATEGORY_OPTIONS = [
  { value: 'flour', label: 'Flour' },
  { value: 'fat', label: 'Fat' },
  { value: 'sweetener', label: 'Sweetener' },
  { value: 'leavener', label: 'Leavener' },
  { value: 'binder', label: 'Binder' },
];

const UNIT_OPTIONS = [
  { value: 'g', label: 'Grams (g)' },
  { value: 'ml', label: 'Milliliters (ml)' },
  { value: 'cup', label: 'Cups' },
  { value: 'tbsp', label: 'Tablespoons' },
  { value: 'tsp', label: 'Teaspoons' },
  { value: 'piece', label: 'Pieces' },
];

export default function AdminPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<IngredientFormValues>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: {
      name: '',
      category: '',
      functions: [],
      common_in: [],
      dietary_flags: [],
      allergens: [],
      default_unit: 'g',
      notes: '',
    },
  });

  async function onSubmit(data: IngredientFormValues) {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/admin/ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create ingredient');
      }

      form.reset();
    } catch (error) {
      console.error('Error creating ingredient:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid gap-8">
        <div className="p-6 bg-card rounded-lg border">
          <h2 className="text-xl font-semibold mb-6">Add New Ingredient</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        options={CATEGORY_OPTIONS}
                        value={CATEGORY_OPTIONS.find((option) => option.value === field.value)}
                        onChange={(newValue) => field.onChange(newValue?.value)}
                        className="react-select"
                        classNamePrefix="react-select"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="functions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Functions</FormLabel>
                    <FormControl>
                      <Select
                        isMulti
                        options={FUNCTION_OPTIONS}
                        value={FUNCTION_OPTIONS.filter((option) =>
                          field.value.includes(option.value)
                        )}
                        onChange={(newValue) => {
                          field.onChange(newValue.map((item) => item.value));
                        }}
                        className="react-select"
                        classNamePrefix="react-select"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="common_in"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Common Uses</FormLabel>
                    <FormControl>
                      <Select
                        isMulti
                        options={COMMON_IN_OPTIONS}
                        value={COMMON_IN_OPTIONS.filter((option) =>
                          field.value.includes(option.value)
                        )}
                        onChange={(newValue) => {
                          field.onChange(newValue.map((item) => item.value));
                        }}
                        className="react-select"
                        classNamePrefix="react-select"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dietary_flags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dietary Flags</FormLabel>
                    <FormControl>
                      <Select
                        isMulti
                        options={DIETARY_FLAGS_OPTIONS}
                        value={DIETARY_FLAGS_OPTIONS.filter((option) =>
                          field.value.includes(option.value)
                        )}
                        onChange={(newValue) => {
                          field.onChange(newValue.map((item) => item.value));
                        }}
                        className="react-select"
                        classNamePrefix="react-select"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="allergens"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allergens</FormLabel>
                    <FormControl>
                      <Select
                        isMulti
                        options={ALLERGENS_OPTIONS}
                        value={ALLERGENS_OPTIONS.filter((option) =>
                          field.value.includes(option.value)
                        )}
                        onChange={(newValue) => {
                          field.onChange(newValue.map((item) => item.value));
                        }}
                        className="react-select"
                        classNamePrefix="react-select"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="default_unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Unit</FormLabel>
                    <FormControl>
                      <Select
                        options={UNIT_OPTIONS}
                        value={UNIT_OPTIONS.find((option) => option.value === field.value)}
                        onChange={(newValue) => field.onChange(newValue?.value)}
                        className="react-select"
                        classNamePrefix="react-select"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription>Additional information about the ingredient</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Ingredient'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
