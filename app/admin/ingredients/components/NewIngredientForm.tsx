'use client';

import { FormProgress } from '@/app/components/FormProgress';
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
import { Database } from '@/database.types';
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

const steps = [
  {
    id: 'basic',
    title: 'Basic Information',
    description: 'Enter the basic details about the ingredient',
    fields: ['name', 'category'] as const,
  },
  {
    id: 'properties',
    title: 'Properties',
    description: 'Define the properties and characteristics',
    fields: [
      'functions',
      'common_in',
      'dietary_flags',
      'allergens',
      'default_unit',
      'notes',
    ] as const,
  },
] as const;

const schema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .refine(async (name) => {
      if (!name) return true;
      const response = await fetch(`/api/ingredients?query=${encodeURIComponent(name)}`);
      const ingredients = await response.json();
      return !ingredients.some(
        (i: { name: string }) => i.name.toLowerCase() === name.toLowerCase()
      );
    }, 'An ingredient with this name already exists'),
  category: z.string().min(1, 'Category is required'),
  functions: z.array(z.string()).min(1, 'At least one function is required'),
  common_in: z.array(z.string()).min(1, 'At least one common use is required'),
  dietary_flags: z.array(z.string()),
  allergens: z.array(z.string()),
  default_unit: z.string() as z.ZodType<Database['public']['Enums']['unit_type']>,
  notes: z.string(),
  image: z.instanceof(File).optional(),
});

export type NewIngredientFormValues = z.infer<typeof schema>;

export function NewIngredientForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      category: '',
      functions: [],
      common_in: [],
      dietary_flags: [],
      allergens: [],
      default_unit: 'g',
      notes: '',
      image: undefined as File | undefined,
    },
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  // Check if current step is valid
  const isCurrentStepValid = async () => {
    const currentFields = steps[currentStep].fields;
    const result = await form.trigger(currentFields);
    return result;
  };

  const handleNext = async (e: React.MouseEvent) => {
    e.preventDefault();
    const isValid = await isCurrentStepValid();
    if (!isValid) return;

    form.clearErrors();
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    form.clearErrors();
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  async function onSubmit(data: z.infer<typeof schema>) {
    try {
      setIsSubmitting(true);
      form.clearErrors();

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, Array.isArray(value) ? JSON.stringify(value) : value.toString());
        }
      });

      if (data.image) {
        formData.append('file', data.image);
      }

      const response = await fetch('/api/admin/ingredients', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save');
      }

      toast.success(`${data.name} added successfully`);
      form.reset();
      setCurrentStep(0);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save ingredient');
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
      <BreadcrumbNav items={[{ label: 'Admin', href: '/admin' }, { label: 'New Ingredient' }]} />

      <div className="mb-8">
        <FormProgress steps={steps} currentStep={currentStep} progress={progress} />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="p-6">
            {currentStep === 0 && (
              <div className="space-y-4">
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
                  name="image"
                  render={({ field: { onChange, value } }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormDescription>
                        Upload an image of the ingredient (optional)
                      </FormDescription>
                      <FormControl>
                        <FileUpload onChange={(file) => onChange(file)} value={value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="functions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Functions</FormLabel>
                      <FormControl>
                        <Select
                          instanceId="functions-select"
                          isMulti
                          closeMenuOnSelect={false}
                          options={FUNCTION_OPTIONS}
                          value={FUNCTION_OPTIONS.filter((option) =>
                            field.value?.includes(option.value)
                          )}
                          onChange={(newValue) =>
                            field.onChange(newValue.map((item) => item.value))
                          }
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
                          instanceId="common-in-select"
                          isMulti
                          closeMenuOnSelect={false}
                          options={COMMON_IN_OPTIONS}
                          value={COMMON_IN_OPTIONS.filter((option) =>
                            field.value?.includes(option.value)
                          )}
                          onChange={(newValue) =>
                            field.onChange(newValue.map((item) => item.value))
                          }
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
                          instanceId="dietary-flags-select"
                          isMulti
                          closeMenuOnSelect={false}
                          options={DIETARY_FLAGS_OPTIONS}
                          value={DIETARY_FLAGS_OPTIONS.filter((option) =>
                            field.value?.includes(option.value)
                          )}
                          onChange={(newValue) =>
                            field.onChange(newValue.map((item) => item.value))
                          }
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
                          instanceId="allergens-select"
                          isMulti
                          closeMenuOnSelect={false}
                          options={ALLERGENS_OPTIONS}
                          value={ALLERGENS_OPTIONS.filter((option) =>
                            field.value?.includes(option.value)
                          )}
                          onChange={(newValue) =>
                            field.onChange(newValue.map((item) => item.value))
                          }
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
                          instanceId="default-unit-select"
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
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </Card>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push('/admin')}>
              Back to Selection
            </Button>

            <div className="flex gap-4">
              {currentStep > 0 && (
                <Button type="button" variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
              )}

              {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Adding...' : 'Add Ingredient'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
