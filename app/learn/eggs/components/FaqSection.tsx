'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

const faqs = [
  {
    question: 'Will my baked goods taste different with egg substitutes?',
    answer:
      "The taste difference depends on the substitute used. Some, like commercial egg replacers, are nearly undetectable. Others, like banana or applesauce, may add subtle flavors. Choose neutral-tasting substitutes like flax eggs or commercial replacers when you don't want to affect the taste.",
  },
  {
    question: 'Can I substitute just egg whites or just yolks?',
    answer:
      "Yes, you can! For egg whites, aquafaba is an excellent substitute, especially for meringues and light bakes. For yolk replacement, try silken tofu or commercial egg replacers specifically designed for yolks. The key is matching the function of the part you're replacing.",
  },
  {
    question: 'How does egg substitution affect shelf life?',
    answer:
      "Baked goods made with egg substitutes generally have a slightly shorter shelf life than those made with eggs. Store them properly in airtight containers and consider refrigerating items that you'd normally leave at room temperature.",
  },
  {
    question: 'Can I use different substitutes in the same recipe?',
    answer:
      "While it's possible to use multiple substitutes, it's generally better to stick to one type per recipe until you're familiar with how each performs. This makes it easier to troubleshoot if something goes wrong.",
  },
  {
    question: 'How do I know which substitute works best for my recipe?',
    answer:
      'Consider the role eggs play in your recipe. For binding, try flax or chia eggs. For moisture, use applesauce or banana. For structure in cakes, commercial egg replacers often work best. For whipping, aquafaba is your best bet.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Add schema markup
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-6 py-4 flex justify-between items-center"
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                <span className="ml-6 flex-shrink-0">
                  <svg
                    className={cn(
                      'w-6 h-6 transition-transform',
                      openIndex === index ? 'transform rotate-180' : ''
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>

              <div
                className={cn(
                  'overflow-hidden transition-all duration-200',
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                )}
              >
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
