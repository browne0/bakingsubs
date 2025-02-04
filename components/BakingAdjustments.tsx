import { Clock, Lightbulb, ThermometerSun } from 'lucide-react';

interface BakingAdjustmentsProps {
  temperature: {
    change: number | null;
    note?: string;
  };
  time: {
    change: string;
    note?: string;
  };
  tips: string[];
}

export function BakingAdjustments({ temperature, time, tips }: BakingAdjustmentsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {temperature.change && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-2">
              <ThermometerSun className="w-5 h-5 text-orange-500" />
              <h3 className="font-medium">Temperature Adjustment</h3>
            </div>
            <p className="text-lg font-semibold mb-1">
              {temperature.change > 0 ? '+' : ''}
              {temperature.change}°F
            </p>
            {temperature.note && (
              <p className="text-sm text-gray-600 dark:text-gray-400">{temperature.note}</p>
            )}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <h3 className="font-medium">Baking Time</h3>
          </div>
          <p className="text-lg font-semibold mb-1">{time.change}</p>
          {time.note && <p className="text-sm text-gray-600 dark:text-gray-400">{time.note}</p>}
        </div>
      </div>

      {tips && tips.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <h3 className="font-medium">Pro Tips</h3>
          </div>
          <ul className="space-y-2">
            {tips.map((tip, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
