'use client';

import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { QueryData } from '@supabase/supabase-js';
import { getSubstitutionById } from '@/app/services/substitutionService';
import { Database } from '@/database.types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFieldArray } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import ReactSelect from 'react-select';
import { BEST_FOR_OPTIONS, UNIT_OPTIONS } from '@/app/admin/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EditableStarRating } from '@/components/EditableStarRating';

const schema = z.object({
  name: z.string(),
  amount: z.number(),
  unit: z.string() as z.ZodType<Database['public']['Enums']['unit_type']>,
  ingredients: z
    .array(
      z.object({
        ingredientName: z.string(),
        amount: z.number().min(0, 'Amount must be positive'),
        unit: z.string() as z.ZodType<Database['public']['Enums']['unit_type']>,
        notes: z.string().optional(),
      })
    )
    .min(1, 'At least one ingredient is required'),
  rating: z.number().min(1).max(5),
  effects: z.object({
    texture: z.string().optional(),
    flavor: z.string().optional(),
    structure: z.string().optional(),
  }),
  bestFor: z
    .array(z.string() as z.ZodType<Database['public']['Enums']['substitution_best_for']>)
    .min(1, 'Select at least one use case'),
});

type EditSubstitutionFormValues = z.infer<typeof schema>;

interface EditSubstitutionFormProps {
  substitution: QueryData<ReturnType<typeof getSubstitutionById>>;
}

export function EditSubstitutionForm({ substitution }: EditSubstitutionFormProps) {
  const router = useRouter();
  const form = useForm<EditSubstitutionFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: substitution.name,
      amount: substitution.amount,
      unit: substitution.unit,
      rating: substitution.rating,
      bestFor: substitution.best_for,
      effects: substitution.effects as EditSubstitutionFormValues['effects'],
      ingredients: substitution.substitution_ingredients.map((si) => ({
        ingredientName: si.ingredient.name,
        amount: si.amount,
        unit: si.unit,
        notes: si.notes || '',
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'ingredients',
  });

  async function onSubmit(data: EditSubstitutionFormValues) {
    try {
      const response = await fetch(`/api/admin/substitutions/${substitution.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update substitution');
      }

      toast.success('Substitution updated successfully');
      router.push('/admin/substitutions');
      router.refresh();
    } catch (error) {
      toast.error('Failed to update substitution');
    }
  }

  const loadIngredientOptions = async (inputValue: string) => {
    try {
      const response = await fetch(`/api/ingredients?query=${encodeURIComponent(inputValue)}`);
      const ingredients = await response.json();
      return ingredients.map((ingredient: { id: string; name: string }) => ({
        value: ingredient.name,
        label: ingredient.name,
      }));
    } catch (error) {
      console.error('Error loading ingredients:', error);
      return [];
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <BreadcrumbNav
        items={[
          { label: 'Admin', href: '/admin' },
          { label: 'Substitutions', href: '/admin/substitutions' },
          { label: 'Edit' },
        ]}
      />

      <h1 className="text-3xl font-bold mb-8">Edit Substitution</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="p-6 space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
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
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <EditableStarRating rating={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <ReactSelect
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
            </div>

            <div>
              <FormField
                control={form.control}
                name="bestFor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Best For</FormLabel>
                    <FormControl>
                      <ReactSelect
                        closeMenuOnSelect={false}
                        isMulti
                        value={field.value.map((value) => ({
                          value,
                          label: BEST_FOR_OPTIONS.find((o) => o.value === value)?.label,
                        }))}
                        onChange={(newValue) => {
                          field.onChange(newValue.map((v) => v.value));
                        }}
                        options={BEST_FOR_OPTIONS}
                        className="react-select"
                        classNamePrefix="react-select"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Ingredients</h3>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    append({
                      ingredientName: '',
                      amount: 1,
                      unit: 'cup',
                      notes: '',
                    })
                  }
                >
                  Add Ingredient
                </Button>
              </div>

              {fields.map((field, index) => (
                <Card key={field.id} className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h6 className="text-sm font-medium">Ingredient {index + 1}</h6>
                      <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                        Remove
                      </Button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name={`ingredients.${index}.ingredientName`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <AsyncSelect
                                  cacheOptions
                                  defaultOptions
                                  loadOptions={loadIngredientOptions}
                                  value={
                                    field.value ? { value: field.value, label: field.value } : null
                                  }
                                  onChange={(newValue) => field.onChange(newValue?.value)}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div>
                        <FormField
                          control={form.control}
                          name={`ingredients.${index}.amount`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Amount</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div>
                        <FormField
                          control={form.control}
                          name={`ingredients.${index}.unit`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Unit</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select unit" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {UNIT_OPTIONS.map((unit) => (
                                    <SelectItem key={unit.value} value={unit.value}>
                                      {unit.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name={`ingredients.${index}.notes`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="effects.texture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Texture Effects</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="effects.flavor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Flavor Effects</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="effects.structure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Structure Effects</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/substitutions')}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
