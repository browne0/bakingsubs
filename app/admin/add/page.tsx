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
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AddSubstitutionsForm } from './components/AddSubstitutionsForm';
import { NewIngredientForm } from './components/NewIngredientForm';
import {
  ALLERGENS_OPTIONS,
  CATEGORY_OPTIONS,
  COMMON_IN_OPTIONS,
  DIETARY_FLAGS_OPTIONS,
  FUNCTION_OPTIONS,
  UNIT_OPTIONS,
} from './constants';

type ModeFormValues = {
  mode: 'new' | 'existing';
};

export default function AdminPage() {
  const [mode, setMode] = useState<'new' | 'existing' | null>(null);
  const [showSubstitutionPrompt, setShowSubstitutionPrompt] = useState(false);
  const [showNewIngredientPrompt, setShowNewIngredientPrompt] = useState(false);

  const substitutionPrompt = `I'm going to give you a baking substitution. Answer the questions in a way that's easy to understand for beginner to advanced bakers alike. If you understand please confirm, and I will start sending substitutions.

how would this substitution change the following things:

texture
flavor
structure

out of cookies, cakes, pie crusts, muffins, pastries, breads, which options would this be best for

What would you rate this from 1 to 5?`;

  const newIngredientPrompt = `i'm going to give you an ingredient, and you're going to say which category the ingredient fits into, the functions, common uses, relevant dietary flags, allergens, and default unit, from the following selected lists. If it doesn't fit into any, tell me what to add. Keep your response concise.

Lists:

${JSON.stringify(CATEGORY_OPTIONS, null, 2)}
${JSON.stringify(FUNCTION_OPTIONS, null, 2)}
${JSON.stringify(COMMON_IN_OPTIONS, null, 2)}
${JSON.stringify(DIETARY_FLAGS_OPTIONS, null, 2)}
${JSON.stringify(ALLERGENS_OPTIONS, null, 2)}
${JSON.stringify(UNIT_OPTIONS, null, 2)}

if you understand the prompt, please confirm and I will send ingredients.`;

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    toast.success(`${type} prompt copied to clipboard!`);
  };

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
      <div className="space-y-6 mb-6">
        <Card className="p-6 mx-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Substitution Prompt</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSubstitutionPrompt(!showSubstitutionPrompt)}
              >
                {showSubstitutionPrompt ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                {showSubstitutionPrompt ? 'Show Less' : 'Show More'}
              </Button>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => copyToClipboard(substitutionPrompt, 'Substitution')}
            >
              Copy
            </Button>
          </div>
          {showSubstitutionPrompt && (
            <div className="bg-muted p-4 rounded-md">
              <pre className="whitespace-pre-wrap text-sm">{substitutionPrompt}</pre>
            </div>
          )}
        </Card>

        <Card className="p-6 mx-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">New Ingredient Prompt</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNewIngredientPrompt(!showNewIngredientPrompt)}
              >
                {showNewIngredientPrompt ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                {showNewIngredientPrompt ? 'Show Less' : 'Show More'}
              </Button>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => copyToClipboard(newIngredientPrompt, 'New Ingredient')}
            >
              Copy
            </Button>
          </div>
          {showNewIngredientPrompt && (
            <div className="bg-muted p-4 rounded-md">
              <pre className="whitespace-pre-wrap text-sm">{newIngredientPrompt}</pre>
            </div>
          )}
        </Card>
      </div>

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
