'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AsyncSelect from 'react-select/async';
import ReactSelect from 'react-select';
import { BEST_FOR_OPTIONS, UNIT_OPTIONS } from '../../constants';
import { EditableStarRating } from '@/components/EditableStarRating';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { SubstitutionFormValues, substitutionSchema } from '../schema';
import { COMMON_FRACTIONS } from '@/app/utils/fractions';
import { slugify } from '@/app/utils/slugify';

interface SubstitutionFormProps {
  initialData?: SubstitutionFormValues;
  mode: 'create' | 'edit';
  id?: string;
}

export function SubstitutionForm({ initialData, mode, id }: SubstitutionFormProps) {
  const router = useRouter();
  const form = useForm<SubstitutionFormValues>({
    resolver: zodResolver(substitutionSchema),
    defaultValues: initialData || {
      ingredientName: '',
      name: '',
      amount: 1,
      unit: 'cup',
      ingredients: [{ ingredientName: '', amount: 1, unit: 'cup', notes: '' }],
      rating: 3,
      effects: {},
      bestFor: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'ingredients',
  });

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

  async function onSubmit(data: SubstitutionFormValues) {
    try {
      const endpoint =
        mode === 'create' ? '/api/admin/substitutions' : `/api/admin/substitutions/${id}`;
      const response = await fetch(endpoint, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          mode === 'create'
            ? {
                fromIngredientId: slugify(data.ingredientName),
                name: data.name,
                amount: data.amount,
                unit: data.unit,
                rating: data.rating,
                effects: data.effects,
                bestFor: data.bestFor,
                ingredients: data.ingredients.map((ing) => ({
                  ingredientName: ing.ingredientName,
                  amount: ing.amount,
                  unit: ing.unit,
                  notes: ing.notes,
                })),
              }
            : data
        ),
      });

      if (!response.ok) {
        throw new Error('Failed to save substitution');
      }

      toast.success(`Substitution ${mode === 'create' ? 'created' : 'updated'} successfully`);
      router.push('/admin/substitutions');
      router.refresh();
    } catch (error) {
      toast.error('Failed to save substitution');
    }
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <BreadcrumbNav
        items={[
          { label: 'Admin', href: '/admin' },
          { label: 'Substitutions', href: '/admin/substitutions' },
          { label: mode === 'create' ? 'New Substitution' : 'Edit Substitution' },
        ]}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="p-6">
            <div className="grid gap-6">
              {/* Original Ingredient */}
              <FormField
                control={form.control}
                name="ingredientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Original Ingredient</FormLabel>
                    <FormControl>
                      <AsyncSelect
                        cacheOptions
                        defaultOptions
                        loadOptions={loadIngredientOptions}
                        value={field.value ? { value: field.value, label: field.value } : null}
                        onChange={(newValue) => field.onChange(newValue?.value)}
                        className="react-select"
                        classNamePrefix="react-select"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Basic Information */}
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Substitution Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., Applesauce" />
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
                      <FormLabel>Effectiveness Rating</FormLabel>
                      <FormControl>
                        <EditableStarRating rating={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Amount and Unit */}
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(parseFloat(value))}
                        value={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select amount" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {COMMON_FRACTIONS.map((fraction) => (
                            <SelectItem key={fraction.value} value={fraction.value.toString()}>
                              {fraction.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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

              {/* Ingredients */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <FormLabel>Ingredients</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      append({ ingredientName: '', amount: 1, unit: 'cup', notes: '' })
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Ingredient
                  </Button>
                </div>

                {fields.map((field, index) => (
                  <Card key={field.id} className="p-4">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">Ingredient {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4" />
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
                                      field.value
                                        ? { value: field.value, label: field.value }
                                        : null
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

                        <FormField
                          control={form.control}
                          name={`ingredients.${index}.amount`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Amount</FormLabel>
                              <Select
                                onValueChange={(value) => field.onChange(parseFloat(value))}
                                value={field.value.toString()}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select amount" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {COMMON_FRACTIONS.map((fraction) => (
                                    <SelectItem
                                      key={fraction.value}
                                      value={fraction.value.toString()}
                                    >
                                      {fraction.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

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

                      <FormField
                        control={form.control}
                        name={`ingredients.${index}.notes`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Optional notes about this ingredient"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}
              </div>

              {/* Effects */}
              <div className="space-y-4">
                {['texture', 'flavor', 'structure'].map((effect) => (
                  <FormField
                    key={effect}
                    control={form.control}
                    name={`effects.${effect}` as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {effect.charAt(0).toUpperCase() + effect.slice(1)} Effects
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder={`How does it affect ${effect}?`}
                            className="min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              {/* Best For */}
              <FormField
                control={form.control}
                name="bestFor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Best For</FormLabel>
                    <FormControl>
                      <ReactSelect
                        isMulti
                        closeMenuOnSelect={false}
                        options={BEST_FOR_OPTIONS}
                        value={BEST_FOR_OPTIONS.filter((option) =>
                          field.value?.includes(option.value)
                        )}
                        onChange={(newValue) => field.onChange(newValue.map((item) => item.value))}
                        className="react-select"
                        classNamePrefix="react-select"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'create' ? 'Create Substitution' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
