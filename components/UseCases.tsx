import { BEST_FOR_OPTIONS, COMMON_IN_OPTIONS } from '@/app/admin/constants';
import { Cake, Check, Cookie, Croissant, Pizza, Wheat } from 'lucide-react';

interface UseCasesProps {
  bestFor: string[];
  commonUses: string[] | null;
}

const ICON_MAP = {
  cookies: Cookie,
  cakes: Cake,
  breads: Wheat,
  pastries: Croissant,
  pie_crusts: Pizza,
  muffins: Cake,
} as const;

export function UseCases({ bestFor, commonUses }: UseCasesProps) {
  const getBestForLabel = (value: string) =>
    BEST_FOR_OPTIONS.find((option) => option.value === value)?.label || value;

  const getCommonUseLabel = (value: string) =>
    COMMON_IN_OPTIONS.find((option) => option.value === value)?.label || value;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {bestFor.map((use) => {
          const IconComponent = ICON_MAP[use as keyof typeof ICON_MAP] || Check;
          return (
            <div
              key={use}
              className="flex items-center gap-3 rounded-lg bg-white/50 dark:bg-gray-800/50 p-3 
                          transition-all hover:scale-105 hover:bg-white dark:hover:bg-gray-800
                          ring-1 ring-gray-900/5 dark:ring-gray-800/50"
            >
              <IconComponent className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
              <span className="text-sm font-medium">{getBestForLabel(use)}</span>
            </div>
          );
        })}
      </div>

      {commonUses && commonUses.length > 0 && (
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 p-6">
          <h3 className="text-lg font-semibold mb-4">Also Great In</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {commonUses.map((use) => (
              <div key={use} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <div className="h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
                <span className="text-sm">{getCommonUseLabel(use)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
