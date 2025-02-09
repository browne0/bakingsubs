'use client';

import { COMMON_FRACTIONS } from '@/app/utils/fractions';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import debounce from 'lodash/debounce';
import { HelpCircle } from 'lucide-react';
import { useMemo } from 'react';
import { Control, useWatch } from 'react-hook-form';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { BEST_FOR_OPTIONS, UNIT_OPTIONS } from '../constants';
import { AddSubstitutionFormValues } from './AddSubstitutionsForm';

interface Props {
  index: number;
  control: Control<AddSubstitutionFormValues>;
  onRemove: () => void;
}

export function SubstitutionFields({ index, control, onRemove }: Props) {
  const substitutionName = useWatch({
    control,
    name: `substitutions.${index}.name`,
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

  const debouncedLoadOptions = useMemo(
    () =>
      debounce(
        (inputValue: string, callback: (options: { value: string; label: string }[]) => void) => {
          loadIngredientOptions(inputValue).then(callback);
        },
        300
      ),
    []
  );

  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div className="space-y-1">
          <h4 className="text-lg font-medium">{substitutionName || `Substitution ${index + 1}`}</h4>
          <p className="text-sm text-muted-foreground">Define the ingredients and their effects</p>
        </div>
        <Button type="button" variant="destructive" size="sm" onClick={onRemove}>
          Remove
        </Button>
      </div>

      <FormField
        control={control}
        name={`substitutions.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2">
              <FormLabel>Substitution Name</FormLabel>
              <Popover>
                <PopoverTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </PopoverTrigger>
                <PopoverContent>
                  Give this substitution a descriptive name that explains its purpose
                </PopoverContent>
              </Popover>
            </div>
            <FormControl>
              <Input {...field} placeholder="e.g., Vegan Egg Replacement" />
            </FormControl>
            <FormDescription>
              This name will help users identify the purpose of this substitution
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <FormLabel>Amount & Unit</FormLabel>
        <div className="flex gap-2 items-start">
          <FormField
            control={control}
            name={`substitutions.${index}.amount`}
            render={({ field }) => (
              <FormItem className="w-24">
                <FormControl>
                  <Select
                    options={COMMON_FRACTIONS}
                    value={COMMON_FRACTIONS.find((option) => option.value === field.value)}
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
            control={control}
            name={`substitutions.${index}.unit`}
            render={({ field }) => (
              <FormItem className="w-32">
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
        </div>
        <FormDescription>
          Amount and unit of the original ingredient this substitution replaces
        </FormDescription>
      </div>

      <div className="space-y-6">
        {/* Ingredients Section */}
        <FormField
          control={control}
          name={`substitutions.${index}.ingredients`}
          render={({ field }) => (
            <FormItem>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <FormLabel>Ingredients</FormLabel>
                    <FormDescription>
                      List all ingredients needed for this substitution
                    </FormDescription>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      field.onChange([
                        ...(field.value || []),
                        { ingredientName: '', amount: 1, unit: 'g' },
                      ])
                    }
                  >
                    Add Ingredient
                  </Button>
                </div>

                <div className="space-y-4">
                  {field.value?.map((_, ingredientIndex) => (
                    <Card key={ingredientIndex} className="p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h6 className="text-sm font-medium">Ingredient {ingredientIndex + 1}</h6>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newValue = [...field.value];
                              newValue.splice(ingredientIndex, 1);
                              field.onChange(newValue);
                            }}
                          >
                            Remove
                          </Button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-4">
                          <div className="md:col-span-2">
                            <FormField
                              control={control}
                              name={`substitutions.${index}.ingredients.${ingredientIndex}.ingredientName`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <AsyncSelect
                                      cacheOptions
                                      defaultOptions
                                      loadOptions={debouncedLoadOptions}
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
                            control={control}
                            name={`substitutions.${index}.ingredients.${ingredientIndex}.amount`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                  <Select
                                    options={COMMON_FRACTIONS}
                                    value={COMMON_FRACTIONS.find(
                                      (option) => option.value === field.value
                                    )}
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
                            control={control}
                            name={`substitutions.${index}.ingredients.${ingredientIndex}.unit`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Unit</FormLabel>
                                <FormControl>
                                  <Select
                                    options={UNIT_OPTIONS}
                                    value={UNIT_OPTIONS.find(
                                      (option) => option.value === field.value
                                    )}
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
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </FormItem>
          )}
        />

        {/* Rating Section */}
        <FormField
          control={control}
          name={`substitutions.${index}.rating`}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>Rating</FormLabel>
                <Popover>
                  <PopoverTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </PopoverTrigger>
                  <PopoverContent>
                    Rate how well this substitution works (1 = Poor, 5 = Excellent)
                  </PopoverContent>
                </Popover>
              </div>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>Rate from 1 (Poor) to 5 (Excellent)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Effects Section */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h5 className="font-medium">Effects on Final Product</h5>
            <p className="text-sm text-muted-foreground">
              Describe how this substitution affects different aspects of the baked good
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <FormField
              control={control}
              name={`substitutions.${index}.effects.texture`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Texture Effects</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="e.g., Makes the cake more dense" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`substitutions.${index}.effects.flavor`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flavor Effects</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="e.g., Adds slight nutty taste" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`substitutions.${index}.effects.structure`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Structure Effects</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="e.g., May not rise as much" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Best For Section */}
        <FormField
          control={control}
          name={`substitutions.${index}.bestFor`}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>Best For</FormLabel>
                <Popover>
                  <PopoverTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </PopoverTrigger>
                  <PopoverContent>
                    Select the types of baked goods where this substitution works best
                  </PopoverContent>
                </Popover>
              </div>
              <FormControl>
                <Select
                  isMulti
                  closeMenuOnSelect={false}
                  options={BEST_FOR_OPTIONS}
                  value={BEST_FOR_OPTIONS.filter((option) => field.value?.includes(option.value))}
                  onChange={(newValue) => field.onChange(newValue.map((item) => item.value))}
                  className="react-select"
                  classNamePrefix="react-select"
                />
              </FormControl>
              <FormDescription>Choose all applicable baked goods</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Card>
  );
}
