import { getCommonIngredients } from '@/app/services/ingredientService';
import { ogImage } from '@/lib/metadata';
import { Metadata } from 'next';
import { HomePageClient } from './HomePageClient';
import Logo from '@/app/images/logo.png';

// Define the structured data
const jsonLd = {
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BakingSubs',
    url: 'https://bakingsubs.com',
    description: 'Your Definitive Baking Substitution Guide',
  },
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BakingSubs',
    url: 'https://bakingsubs.com',
    logo: Logo.src,
    sameAs: [
      'https://www.facebook.com/bakingsubs',
      'https://www.pinterest.com/bakingsubs',
      'https://www.instagram.com/bakingsubs',
      'https://www.tiktok.com/@bakingsubs',
      'https://www.youtube.com/@bakingsubs',
      'https://www.linkedin.com/company/bakingsubs',
      'https://www.x.com/bakingsubs',
      'https://www.reddit.com/r/bakingsubs',
      'https://www.quora.com/profile/BakingSubs',
    ],
  },
  breadcrumb: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      // Home
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://bakingsubs.com',
      },
      // Ingredients Section
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Ingredients',
        item: 'https://bakingsubs.com/ingredients',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Ingredient Details',
        item: 'https://bakingsubs.com/ingredients/{ingredient-id}',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Substitutions',
        item: 'https://bakingsubs.com/ingredients/{ingredient-id}/substitutions',
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Substitution Details',
        item: 'https://bakingsubs.com/ingredients/{ingredient-id}/substitutions/{substitution-id}',
      },
      // Learn Section
      {
        '@type': 'ListItem',
        position: 6,
        name: 'Learn',
        item: 'https://bakingsubs.com/learn',
      },
      {
        '@type': 'ListItem',
        position: 7,
        name: 'Learn About Eggs',
        item: 'https://bakingsubs.com/learn/eggs',
      },
      {
        '@type': 'ListItem',
        position: 8,
        name: 'Learn About Milk',
        item: 'https://bakingsubs.com/learn/milk',
      },
      {
        '@type': 'ListItem',
        position: 9,
        name: 'Learn About Sugar',
        item: 'https://bakingsubs.com/learn/sugar',
      },
      {
        '@type': 'ListItem',
        position: 10,
        name: 'Learn About Butter',
        item: 'https://bakingsubs.com/learn/butter',
      },
      {
        '@type': 'ListItem',
        position: 11,
        name: 'Learn About Flour',
        item: 'https://bakingsubs.com/learn/flour',
      },
      {
        '@type': 'ListItem',
        position: 12,
        name: 'Learn About Leaveners',
        item: 'https://bakingsubs.com/learn/leaveners',
      },
      {
        '@type': 'ListItem',
        position: 13,
        name: 'Learn About Oils & Fats',
        item: 'https://bakingsubs.com/learn/oils-fats',
      },
      {
        '@type': 'ListItem',
        position: 14,
        name: 'Learn About Flavorings',
        item: 'https://bakingsubs.com/learn/flavorings',
      },
      // Blog Section
      {
        '@type': 'ListItem',
        position: 15,
        name: 'Blog',
        item: 'https://bakingsubs.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 16,
        name: 'Blog Post',
        item: 'https://bakingsubs.com/blog/{post-slug}',
      },
      {
        '@type': 'ListItem',
        position: 17,
        name: 'Blog Tag',
        item: 'https://bakingsubs.com/blog/tags/{tag-slug}',
      },
    ],
  },
  faqs: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is BakingSubs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'BakingSubs is the definitive resource for baking substitutions, helping you find the perfect ingredient alternatives for your recipes.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many ingredients do you have substitutions for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We currently offer substitutions for over 50 common baking ingredients, with our database growing regularly.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are your baking substitutions tested and verified?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all our substitutions are community-tested and verified by experienced bakers. Each alternative includes detailed information about how it affects texture, taste, and the final result of your baked goods.',
        },
      },
      {
        '@type': 'Question',
        name: 'What can I substitute for eggs in baking?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Common egg substitutes include mashed bananas, applesauce, ground flaxseed mixed with water, commercial egg replacers, or silken tofu. The best substitute depends on your specific recipe and dietary needs.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I substitute butter in a recipe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Butter can be substituted with oil, margarine, applesauce, Greek yogurt, or coconut oil depending on the recipe. Each substitute will affect the texture and taste differently, and our detailed guides help you choose the best option for your specific bake.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is BakingSubs free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, BakingSubs is completely free to use. You can access all our substitution guides, community recommendations, and detailed explanations without any cost.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you determine substitution ratios?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our substitution ratios are based on extensive testing, community feedback, and food science principles. We consider factors like moisture content, binding properties, and leavening effects to provide accurate conversion rates.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I find gluten-free baking substitutions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer comprehensive guides for gluten-free substitutions, including different flour alternatives and binding agents. Each substitute comes with specific measurements and tips for successful gluten-free baking.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I know which substitute will work best in my recipe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our platform provides detailed information about how each substitute affects texture, taste, and structure. We categorize substitutes by recipe type (cookies, cakes, breads, etc.) and include success rates and community tips to help you make the best choice.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I contribute my own substitution experiences?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! BakingSubs is community-driven, and we encourage users to share their successful substitution experiences and tips. All contributions are reviewed and verified before being added to our database.',
        },
      },
    ],
  },
};

export const metadata: Metadata = {
  title: 'BakingSubs - Your Definitive Baking Substitution Guide',
  description:
    'Discover expert baking substitutions with detailed explanations of how each alternative affects your baked goods. Find the perfect ingredient swap based on your recipe type and needs.',
  openGraph: {
    title: 'BakingSubs - Your Definitive Baking Substitution Guide',
    description:
      'Discover expert baking substitutions with detailed explanations of how each alternative affects your baked goods. Find the perfect ingredient swap based on your recipe type and needs.',
    ...ogImage,
  },
};

export default async function HomePage() {
  const commonIngredients = await getCommonIngredients();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqs) }}
      />
      <HomePageClient initialCommonIngredients={commonIngredients} />
    </>
  );
}
