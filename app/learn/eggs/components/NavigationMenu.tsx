'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const navItems = [
  { id: 'start', label: 'Start Here' },
  { id: 'substitutes', label: 'Common Substitutes' },
  { id: 'how-to', label: 'How To' },
  { id: 'faq', label: 'FAQ' },
  { id: 'science', label: 'The Science' },
  { id: 'recipes', label: 'Recipes' },
];

export default function NavigationMenu() {
  const [activeSection, setActiveSection] = useState('start');

  useEffect(() => {
    const handleScroll = () => {
      // Only handle active section updates
      const sections = navItems.map((item) => document.getElementById(item.id));
      const currentSection = sections.find((section) => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 76 && rect.bottom >= 76; // Adjust threshold as needed
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 bg-white dark:bg-gray-900 w-full z-30 shadow-md">
      <div className="container mx-auto px-4">
        <ul className="flex overflow-x-auto whitespace-nowrap md:justify-between py-4 gap-6 md:gap-8">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'text-sm md:text-base font-medium transition-colors font-bold uppercase',
                  activeSection === item.id
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
