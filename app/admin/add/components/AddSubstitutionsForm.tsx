'use client';

import { FormProgress } from '@/app/components/FormProgress';
import { slugify } from '@/app/utils/slugify';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Database } from '@/database.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { toast } from 'sonner';
import * as z from 'zod';
import { SubstitutionFields } from './SubstitutionFields';

const steps = [
  {
    id: 'select',
    title: 'Select Ingredient',
    description: 'Choose an ingredient to add substitutions for',
    fields: ['ingredientName'] as const,
  },
  {
    id: 'substitutions',
    title: 'Add Substitutions',
    description: 'Add substitution options for this ingredient',
    fields: ['substitutions'] as const,
  },
] as const;

const schema = z.object({
  ingredientName: z.string().min(1, 'Please select an ingredient'),
  substitutions: z.array(
    z.object({
      name: z.string(),
      amount: z.number(),
      unit: z.string() as z.ZodType<Database['public']['Enums']['unit_type']>,
      ingredients: z
        .array(
          z.object({
            ingredientName: z.string().min(2, 'Name must be at least 2 characters'),
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
    })
  ),
});

export type AddSubstitutionFormValues = z.infer<typeof schema>;

interface Props {
  onBack: () => void;
}

export function AddSubstitutionsForm({ onBack }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AddSubstitutionFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ingredientName: '',
      substitutions: [
        {
          name: '',
          amount: 1,
          unit: 'cup',
          ingredients: [],
          rating: 3,
          effects: {},
          bestFor: [],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'substitutions',
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

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

  async function onSubmit(data: AddSubstitutionFormValues) {
    try {
      setIsSubmitting(true);
      form.clearErrors();

      const substitutions = data.substitutions.map((sub) => ({
        name: sub.name,
        rating: sub.rating,
        amount: sub.amount,
        unit: sub.unit,
        bestFor: sub.bestFor,
        effects: sub.effects,
        ingredients: sub.ingredients,
      }));

      const response = await fetch('/api/admin/substitutions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromIngredientId: slugify(data.ingredientName),
          substitutions,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save');
      }

      toast.success('Substitutions added successfully');
      form.reset();
      setCurrentStep(0);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save substitutions');
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
                  name="ingredientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Ingredient</FormLabel>
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
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    Substitutions for {form.watch('ingredientName')}
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      append({
                        name: '',
                        amount: 1,
                        unit: 'cup',
                        ingredients: [],
                        rating: 3,
                        effects: {},
                        bestFor: [],
                      })
                    }
                  >
                    Add Substitution
                  </Button>
                </div>

                {fields.map((field, index) => (
                  <SubstitutionFields
                    key={field.id}
                    index={index}
                    control={form.control}
                    onRemove={() => remove(index)}
                  />
                ))}
              </div>
            )}
          </Card>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onBack}>
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
                  {isSubmitting ? 'Adding...' : 'Add Substitutions'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
