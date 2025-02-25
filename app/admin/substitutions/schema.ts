import { Database } from '@/database.types';
import * as z from 'zod';

export const substitutionSchema = z.object({
  ingredientName: z.string().min(1, 'Original ingredient is required'),
  name: z.string().min(1, 'Name is required'),
  amount: z.number().min(0.1, 'Amount must be greater than 0'),
  unit: z.string() as z.ZodType<Database['public']['Enums']['unit_type']>,
  ingredients: z
    .array(
      z.object({
        ingredientName: z.string().min(1, 'Ingredient name is required'),
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
  image: z.instanceof(File).optional(),
});

export type SubstitutionFormValues = z.infer<typeof substitutionSchema>;
