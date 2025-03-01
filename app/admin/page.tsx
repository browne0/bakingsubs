'use client';

import { Card } from '@/components/ui/card';
import {
  Check,
  ChevronRight,
  Copy,
  Ghost,
  Image,
  ImageDown,
  Newspaper,
  Search,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const adminActions = [
  {
    title: 'Ingredients',
    items: [
      {
        label: 'Create New Ingredient',
        href: '/admin/ingredients/new',
        description: 'Add a new ingredient to the database',
      },
      {
        label: 'Manage Ingredients',
        href: '/admin/ingredients',
        description: 'Edit or delete existing ingredients',
      },
    ],
  },
  {
    title: 'Substitutions',
    items: [
      {
        label: 'Create New Substitution',
        href: '/admin/substitutions/new',
        description: 'Add a new substitution for an existing ingredient',
      },
      {
        label: 'Manage Substitutions',
        href: '/admin/substitutions',
        description: 'Edit or delete existing substitutions',
      },
    ],
  },
];

const gptPrompts = [
  {
    title: 'Ingredient Analysis Prompt',
    prompt: `i'm going to give you an ingredient, and you're going to say which category the ingredient fits into, the functions, common uses, relevant dietary flags, allergens, and default unit, from the following selected lists. If it doesn't fit into any, tell me what to add. Keep your response concise.

Lists:

export const FUNCTION_OPTIONS = [
  { value: 'structure', label: 'Structure' },
  { value: 'binding', label: 'Binding' },
  { value: 'moisture', label: 'Moisture' },
  { value: 'tenderness', label: 'Tenderness' },
  { value: 'leavening', label: 'Leavening' },
  { value: 'flavor', label: 'Flavor' },
];

export const COMMON_IN_OPTIONS = [
  { value: 'cookies', label: 'Cookies' },
  { value: 'cakes', label: 'Cakes' },
  { value: 'breads', label: 'Breads' },
  { value: 'pastries', label: 'Pastries' },
  { value: 'pizza dough', label: 'Pizza Dough' },
  { value: 'quick breads', label: 'Quick Breads' },
  { value: 'gluten-free baking', label: 'Gluten-Free Baking' },
];

export const DIETARY_FLAGS_OPTIONS = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten-free', label: 'Gluten-Free' },
  { value: 'dairy-free', label: 'Dairy-Free' },
  { value: 'nut-free', label: 'Nut-Free' },
];

export const ALLERGENS_OPTIONS = [
  { value: 'wheat', label: 'Wheat' },
  { value: 'gluten', label: 'Gluten' },
  { value: 'dairy', label: 'Dairy' },
  { value: 'eggs', label: 'Eggs' },
  { value: 'tree nuts', label: 'Tree Nuts' },
  { value: 'peanuts', label: 'Peanuts' },
  { value: 'soy', label: 'Soy' },
];

export const CATEGORY_OPTIONS = [
  {
    value: 'flour',
    label: 'Flour',
    description: 'Primary structure builder in baked goods (wheat, almond, coconut flour etc.)',
  },
  {
    value: 'fat',
    label: 'Fat',
    description: 'Provides tenderness and moisture (butter, oil, shortening etc.)',
  },
  {
    value: 'sweetener',
    label: 'Sweetener',
    description: 'Adds sweetness and affects texture (sugar, honey, maple syrup etc.)',
  },
  {
    value: 'leavener',
    label: 'Leavener',
    description: 'Creates rise and lightness (baking powder, yeast, baking soda etc.)',
  },
  {
    value: 'binder',
    label: 'Binder',
    description: 'Holds ingredients together (eggs, flax, chia etc.)',
  },
  {
    value: 'dairy',
    label: 'Dairy',
    description: 'Provides moisture, richness, and structure (milk, buttermilk, cream, water etc.)',
  },
  {
    value: 'flavoring',
    label: 'Flavoring',
    description: 'Adds taste and aroma (vanilla, spices, extracts etc.)',
  },
  {
    value: 'protein',
    label: 'Protein',
    description:
      'Adds structure and nutritional value (eggs, protein powder, vital wheat gluten etc.)',
  },
  {
    value: 'salt',
    label: 'Salt & Minerals',
    description:
      'Enhances flavor and affects yeast/chemical reactions (table salt, kosher salt etc.)',
  },
];

export const UNIT_OPTIONS = [
  { value: 'g', label: 'Grams (g)' },
  { value: 'ml', label: 'Milliliters (ml)' },
  { value: 'cup', label: 'Cups' },
  { value: 'tbsp', label: 'Tablespoons' },
  { value: 'tsp', label: 'Teaspoons' },
  { value: 'piece', label: 'Pieces' },
];

export const BEST_FOR_OPTIONS = [
  { value: 'cookies', label: 'Cookies' },
  { value: 'cakes', label: 'Cakes' },
  { value: 'breads', label: 'Breads' },
  { value: 'pastries', label: 'Pastries' },
  { value: 'muffins', label: 'Muffins' },
  { value: 'pie_crusts', label: 'Pie Crusts' },
];

if you understand the prompt, please confirm and I will send ingredients.`,
  },
  {
    title: 'Substitution Analysis Prompt',
    prompt: `I'm going to give you a baking substitution. Answer the questions in a way  that's easy to understand for beginner to advanced bakers alike. If you understand please confirm, and I will start sending substitutions.

How would this substitution change the following things:

texture
flavor
structure

out of cookies, cakes, pie crusts, muffins, pastries, breads, which options would this be best for

What would you rate this from 1 to 5?`,
  },
];

const adminResources = [
  {
    title: 'Ghost Blog Dashboard',
    href: 'https://blog.bakingsubs.com/ghost',
    description:
      'Add blog posts to the BakingSubs blog. Sign in with your email. Password: bakingsubs. Remember to add tags, excerpt (SEO description) and a good title. Use Claude for assistance if needed.',
    icon: 'Ghost',
  },
  {
    title: 'AI Image Generator',
    href: 'https://deepai.org/machine-learning-model/text2img',
    description: "Create AI-generated images for blog posts using DeepAI's text-to-image model.",
    icon: 'Image',
  },
  {
    title: 'Image Compression Tool',
    href: 'https://tinyjpg.com/',
    description: 'Compress images before adding them to blog posts to maintain site performance.',
    icon: 'ImageDown',
  },
  {
    title: 'Google Keyword Planner',
    href: 'https://business.google.com/us/ad-tools/keyword-planner/',
    description:
      'Research keywords for blog posts. Filter for 1k-10k+ volume and "Low" competition.',
    icon: 'Search',
  },
  {
    title: 'Journalist AI',
    href: 'https://tryjournalist.com',
    description: "Generate blog post content. Sign in with Malik's Google account.",
    icon: 'Newspaper',
  },
];

export default function AdminPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="container max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Admin Resources</h2>
          <div className="grid gap-4">
            {adminResources.map((resource, index) => {
              const Icon =
                resource.icon === 'Ghost'
                  ? Ghost
                  : resource.icon === 'Image'
                    ? Image
                    : resource.icon === 'ImageDown'
                      ? ImageDown
                      : resource.icon === 'Search'
                        ? Search
                        : Newspaper;

              return (
                <a
                  key={index}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="p-6 hover:bg-muted transition-colors group cursor-pointer">
                    <div className="flex items-start gap-4">
                      <Icon className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-1" />
                      <div className="flex-grow">
                        <h3 className="font-medium mb-2 flex items-center gap-2">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-1" />
                    </div>
                  </Card>
                </a>
              );
            })}
          </div>
        </div>

        {adminActions.map((section) => (
          <div key={section.title}>
            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {section.items.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Card className="p-6 hover:bg-muted transition-colors group cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium mb-2">{item.label}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h2 className="text-xl font-semibold mb-4">ChatGPT Prompts</h2>
          <div className="grid gap-4 md:grid-cols-1">
            {gptPrompts.map((item, index) => (
              <Card key={index} className="p-6 bg-muted/5">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{item.title}</h3>
                    <button
                      onClick={() => copyToClipboard(item.prompt, index)}
                      className="flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors"
                    >
                      {copiedIndex === index ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span className="text-sm">{copiedIndex === index ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
