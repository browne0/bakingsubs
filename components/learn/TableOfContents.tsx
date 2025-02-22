'use client';

import { useEffect, useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';

interface Section {
  id: string;
  title: string;
}

interface Props {
  sections: Section[];
}

export default function TableOfContents({ sections }: Props) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  // Desktop version
  const DesktopNav = () => (
    <nav className="p-6 overflow-y-auto h-full">
      <h2 className="text-lg font-semibold mb-4">Contents</h2>
      <ul className="space-y-2">
        {sections.map(({ id, title }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`block py-1.5 px-3 rounded-md transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 ${
                activeSection === id
                  ? 'bg-slate-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  // Mobile version
  const MobileNav = () => (
    <div className="bg-white dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
      >
        <span className="text-slate-700 dark:text-slate-200">
          {activeSection
            ? sections.find((s) => s.id === activeSection)?.title
            : sections[0]?.title || 'Select section'}
        </span>
        <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <ul className="mx-4 my-2">
            {sections.map(({ id, title }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 ${
                    activeSection === id
                      ? 'bg-slate-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="md:hidden">
        <MobileNav />
      </div>
      <div className="hidden md:block">
        <DesktopNav />
      </div>
    </>
  );
}
