interface EggFunction {
  function: string;
  howProvided: string;
  importantIn: string;
}

const eggFunctions: EggFunction[] = [
  {
    function: 'Structure',
    howProvided: 'Protein coagulation',
    importantIn: 'Angel food cake, meringues, custards',
  },
  {
    function: 'Moisture',
    howProvided: '75% water content',
    importantIn: 'Cookies, muffins, quick breads',
  },
  {
    function: 'Richness',
    howProvided: 'Fats in yolks',
    importantIn: 'Pound cakes, brioche, pastry cream',
  },
  {
    function: 'Emulsification',
    howProvided: 'Lecithin in yolks',
    importantIn: 'Smooth batters, mayonnaise, hollandaise',
  },
  {
    function: 'Binding',
    howProvided: 'Proteins that coagulate',
    importantIn: 'Meatloaf, fritters, veggie burgers',
  },
];

export default function QuickReferenceTable() {
  return (
    <div className="mt-8 overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-slate-800 shadow-md rounded-lg">
        <thead className="bg-slate-100 dark:bg-slate-700">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Function</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">How Eggs Provide It</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Most Important In</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-600">
          {eggFunctions.map((item) => (
            <tr key={item.function} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
              <td className="px-6 py-4 text-sm font-medium">{item.function}</td>
              <td className="px-6 py-4 text-sm">{item.howProvided}</td>
              <td className="px-6 py-4 text-sm">{item.importantIn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
