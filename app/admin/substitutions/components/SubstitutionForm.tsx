'use client';

import { FileUpload } from '@/app/components/ui/file-upload';
import { COMMON_FRACTIONS } from '@/app/utils/fractions';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { EditableStarRating } from '@/components/EditableStarRating';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import AsyncSelect from 'react-select/async';
import { toast } from 'sonner';
import { BEST_FOR_OPTIONS, UNIT_OPTIONS } from '../../constants';
import { SubstitutionFormValues, substitutionSchema } from '../schema';

interface SubstitutionFormProps {
  initialData?: SubstitutionFormValues;
  mode: 'create' | 'edit';
  id?: string;
}

export function SubstitutionForm({ initialData, mode, id }: SubstitutionFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      image: undefined,
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

  const validateImageAspectRatio = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        resolve(img.width > img.height); // true if horizontal
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageUpload = async (file: File | null) => {
    if (!file) {
      form.setValue('image', undefined);
      return;
    }

    const isHorizontal = await validateImageAspectRatio(file);
    if (!isHorizontal) {
      form.setError('image', {
        type: 'manual',
        message: 'Please upload an image with horizontal aspect ratio',
      });
      form.setValue('image', undefined);
      return;
    }

    form.clearErrors('image');
    form.setValue('image', file);
  };

  async function onSubmit(data: SubstitutionFormValues) {
    try {
      setIsSubmitting(true);
      form.clearErrors();

      const formData = new FormData();

      // Add all form data
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== 'image') {
          if (key === 'effects' || key === 'bestFor' || key === 'ingredients') {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      // Add image if there's a new one
      if (data.image) {
        formData.append('file', data.image);
      }

      const endpoint =
        mode === 'create' ? '/api/admin/substitutions' : `/api/admin/substitutions/${id}`;
      const response = await fetch(endpoint, {
        method: mode === 'create' ? 'POST' : 'PUT',
        body: formData,
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

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { onChange, value } }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormDescription>
                        Upload a horizontal image of the substitution (optional)
                      </FormDescription>
                      <FormControl>
                        <FileUpload onChange={handleImageUpload} value={value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !form.formState.isValid}>
              {mode === 'create' ? 'Create Substitution' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
