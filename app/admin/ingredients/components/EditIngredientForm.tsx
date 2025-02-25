'use client';

import { FileUpload } from '@/app/components/ui/file-upload';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
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
import { Textarea } from '@/components/ui/textarea';
import { Tables } from '@/database.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { toast } from 'sonner';
import * as z from 'zod';
import {
  ALLERGENS_OPTIONS,
  CATEGORY_OPTIONS,
  COMMON_IN_OPTIONS,
  DIETARY_FLAGS_OPTIONS,
  FUNCTION_OPTIONS,
  UNIT_OPTIONS,
} from '../../constants';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  category: z.string().min(1, 'Please select a category'),
  functions: z.array(z.string()).optional(),
  common_in: z.array(z.string()).optional(),
  dietary_flags: z.array(z.string()).optional(),
  allergens: z.array(z.string()).optional(),
  default_unit: z.string().optional(),
  notes: z.string().optional(),
  image: z.instanceof(File).optional(),
});

interface EditIngredientFormProps {
  ingredient: Tables<'ingredients'>;
}

export function EditIngredientForm({ ingredient }: EditIngredientFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: ingredient.name,
      category: ingredient.category || '',
      functions: ingredient.functions || [],
      common_in: ingredient.common_in || [],
      dietary_flags: ingredient.dietary_flags || [],
      allergens: ingredient.allergens || [],
      default_unit: ingredient.default_unit || 'g',
      notes: ingredient.notes || '',
    },
  });

  const handleImageUpload = (file: File | null) => {
    setImageFile(file);
    form.setValue('image', file || undefined);
  };

  async function onSubmit(data: z.infer<typeof schema>) {
    try {
      setIsSubmitting(true);
      form.clearErrors();

      const formData = new FormData();
      // Add all form data
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== 'image') {
          formData.append(key, Array.isArray(value) ? JSON.stringify(value) : value.toString());
        }
      });

      // Add image if there's a new one
      if (imageFile) {
        formData.append('file', imageFile);
      }

      const response = await fetch(`/api/admin/ingredients/${ingredient.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save');
      }

      toast.success(`${data.name} updated successfully`);
      router.push('/admin/ingredients');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update ingredient');
      form.setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'Failed to save',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container max-w-4xl mx-auto py-10">
      <BreadcrumbNav
        items={[
          { label: 'Admin', href: '/admin' },
          { label: 'Ingredients', href: '/admin/ingredients' },
          { label: `Edit ${ingredient.name}` },
        ]}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="p-6 space-y-4">
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
                      instanceId="category-select"
                      options={CATEGORY_OPTIONS}
                      value={CATEGORY_OPTIONS.find((option) => option.value === field.value)}
                      onChange={(option) => field.onChange(option?.value)}
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
                  <FormDescription>
                    What roles does this ingredient serve in recipes?
                  </FormDescription>
                  <FormControl>
                    <Select
                      instanceId="functions-select"
                      options={FUNCTION_OPTIONS}
                      value={FUNCTION_OPTIONS.filter((option) =>
                        field.value?.includes(option.value)
                      )}
                      onChange={(options) => field.onChange(options.map((option) => option.value))}
                      isMulti
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
                  <FormLabel>Common In</FormLabel>
                  <FormDescription>
                    What types of recipes commonly use this ingredient?
                  </FormDescription>
                  <FormControl>
                    <Select
                      instanceId="common-in-select"
                      options={COMMON_IN_OPTIONS}
                      value={COMMON_IN_OPTIONS.filter((option) =>
                        field.value?.includes(option.value)
                      )}
                      onChange={(options) => field.onChange(options.map((option) => option.value))}
                      isMulti
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
                  <FormDescription>Mark any relevant dietary characteristics</FormDescription>
                  <FormControl>
                    <Select
                      instanceId="dietary-flags-select"
                      options={DIETARY_FLAGS_OPTIONS}
                      value={DIETARY_FLAGS_OPTIONS.filter((option) =>
                        field.value?.includes(option.value)
                      )}
                      onChange={(options) => field.onChange(options.map((option) => option.value))}
                      isMulti
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
                  <FormDescription>Select any allergens present in this ingredient</FormDescription>
                  <FormControl>
                    <Select
                      instanceId="allergens-select"
                      options={ALLERGENS_OPTIONS}
                      value={ALLERGENS_OPTIONS.filter((option) =>
                        field.value?.includes(option.value)
                      )}
                      onChange={(options) => field.onChange(options.map((option) => option.value))}
                      isMulti
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
                  <FormDescription>
                    The most common unit of measurement for this ingredient
                  </FormDescription>
                  <FormControl>
                    <Select
                      instanceId="default-unit-select"
                      options={UNIT_OPTIONS}
                      value={UNIT_OPTIONS.find((option) => option.value === field.value)}
                      onChange={(option) => field.onChange(option?.value)}
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
                  <FormDescription>
                    Any additional information about this ingredient
                  </FormDescription>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormDescription>Upload an image of the ingredient (optional)</FormDescription>
                    <FormControl>
                      <FileUpload
                        onChange={handleImageUpload}
                        value={imageFile}
                        existingUrl={ingredient.image_url ?? undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
