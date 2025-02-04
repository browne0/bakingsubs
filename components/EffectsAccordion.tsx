'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface EffectsAccordionProps {
  effects: {
    flavor: string[];
    texture: string[];
    structure: string[];
  };
}

export function EffectsAccordion({ effects }: EffectsAccordionProps) {
  const [openSection, setOpenSection] = useState<string | null>('flavor');

  const sections = [
    { id: 'flavor', title: 'Flavor', content: effects.flavor },
    { id: 'texture', title: 'Texture', content: effects.texture },
    { id: 'structure', title: 'Structure', content: effects.structure },
  ];

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700 rounded-lg border border-gray-200 dark:border-gray-700">
      {sections.map((section) => (
        <div key={section.id} className="bg-white dark:bg-gray-800">
          <button
            onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
            className="w-full px-4 py-3 text-left flex justify-between items-center"
          >
            <span className="font-medium">{section.title}</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                openSection === section.id ? 'transform rotate-180' : ''
              }`}
            />
          </button>

          {openSection === section.id && (
            <div className="px-4 pb-4">
              <ul className="list-disc list-inside space-y-2">
                {section.content &&
                  section.content.map((item, index) => (
                    <li key={index} className="text-gray-600 dark:text-gray-300">
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
