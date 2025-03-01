'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface NavigationItem {
  id: string;
  label: string;
}

interface NavigationMenuProps {
  items?: NavigationItem[];
}

const defaultNavItems: NavigationItem[] = [
  { id: 'start-here', label: 'Start Here' },
  { id: 'science', label: 'The Science' },
  { id: 'substitutes', label: 'Substitutes' },
  { id: 'how-to', label: 'How To' },
  { id: 'faq', label: 'FAQ' },
];

export default function NavigationMenu({ items = defaultNavItems }: NavigationMenuProps) {
  const [activeSection, setActiveSection] = useState('start-here');

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map((item) => document.getElementById(item.id));
      const currentSection = sections.find((section) => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 56 && rect.bottom >= 56;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  return (
    <nav className="sticky top-0 bg-white dark:bg-gray-900 w-full z-30 shadow-md">
      <div className="container mx-auto px-4">
        <ul className="flex overflow-x-auto whitespace-nowrap md:justify-between py-4 gap-6 md:gap-8">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  'text-sm md:text-base font-medium transition-colors font-bold uppercase',
                  activeSection === item.id
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
