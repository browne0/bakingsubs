'use client';

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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AddSubstitutionsForm } from './components/AddSubstitutionsForm';
import { NewIngredientForm } from './components/NewIngredientForm';

type ModeFormValues = {
  mode: 'new' | 'existing';
};

export default function AdminPage() {
  const [mode, setMode] = useState<'new' | 'existing' | null>(null);

  const form = useForm<ModeFormValues>({
    defaultValues: {
      mode: 'new',
    },
  });

  function onSubmit(data: ModeFormValues) {
    setMode(data.mode);
  }

  if (mode === 'new') {
    return <NewIngredientForm onBack={() => setMode(null)} />;
  }

  if (mode === 'existing') {
    return <AddSubstitutionsForm onBack={() => setMode(null)} />;
  }

  return (
    <div className="container max-w-4xl mx-auto py-10">
      <Card className="p-6 mx-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="mode"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>What would you like to do?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="new" />
                        </FormControl>
                        <FormLabel className="font-normal">Create a new ingredient</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="existing" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Add substitutions to an existing ingredient
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">Continue</Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
