'use client';

interface Section {
  id: string;
  title: string;
}

interface Props {
  sections: Section[];
}

export default function TableOfContents({ sections }: Props) {
  return (
    <nav className="mt-8 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        {sections.map(({ id, title }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="block py-1 px-2 rounded transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
