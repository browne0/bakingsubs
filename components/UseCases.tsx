import { Check } from 'lucide-react';

interface UseCasesProps {
  bestFor: string[];
  commonUses: string[];
}

export function UseCases({ bestFor, commonUses }: UseCasesProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="font-medium mb-3">Best For</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {bestFor.map((use, index) => (
            <div key={index} className="flex items-center gap-2 text-green-700 dark:text-green-400">
              <Check className="w-4 h-4" />
              <span>{use}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
        <h3 className="font-medium mb-3">Common Uses</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
          {commonUses.map((use, index) => (
            <li key={index}>{use}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
