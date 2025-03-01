interface IngredientFunction {
  function: string;
  howProvided: string;
  importantIn: string;
}

interface QuickReferenceTableProps {
  ingredientType: 'eggs' | 'milk' | 'butter' | 'flour';
  customData?: IngredientFunction[];
}

// Default data for different ingredients
const eggFunctions: IngredientFunction[] = [
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

const milkFunctions: IngredientFunction[] = [
  {
    function: 'Moisture',
    howProvided: '87% water content',
    importantIn: 'Cakes, muffins, quick breads',
  },
  {
    function: 'Structure',
    howProvided: 'Protein content (casein and whey)',
    importantIn: 'Custards, enriched breads, cakes',
  },
  {
    function: 'Tenderness',
    howProvided: 'Fat content',
    importantIn: 'Cakes, muffins, enriched breads',
  },
  {
    function: 'Browning',
    howProvided: 'Lactose and proteins (Maillard reaction)',
    importantIn: 'Breads, pastries, cookies',
  },
  {
    function: 'Flavor',
    howProvided: 'Milk fats and sugars',
    importantIn: 'Custards, ice cream, puddings',
  },
];

const butterFunctions: IngredientFunction[] = [
  {
    function: 'Tenderness',
    howProvided: 'Fat interfering with gluten development',
    importantIn: 'Cakes, cookies, pastries',
  },
  {
    function: 'Flavor',
    howProvided: 'Milk fats and compounds',
    importantIn: 'Pound cake, shortbread, buttercream',
  },
  {
    function: 'Structure',
    howProvided: 'Air incorporation during creaming',
    importantIn: 'Cakes, cookies, buttercream',
  },
  {
    function: 'Moisture',
    howProvided: '15-18% water content',
    importantIn: 'Cakes, muffins',
  },
  {
    function: 'Flakiness',
    howProvided: 'Solid fat layers',
    importantIn: 'Pie crusts, puff pastry, croissants',
  },
];

const flourFunctions: IngredientFunction[] = [
  {
    function: 'Structure',
    howProvided: 'Gluten formation',
    importantIn: 'Breads, pizza dough, pasta',
  },
  {
    function: 'Texture',
    howProvided: 'Starch gelatinization',
    importantIn: 'Cakes, cookies, quick breads',
  },
  {
    function: 'Thickening',
    howProvided: 'Starch absorption of liquids',
    importantIn: 'Sauces, gravies, puddings',
  },
  {
    function: 'Volume',
    howProvided: 'Bulk and structure',
    importantIn: 'All baked goods',
  },
  {
    function: 'Browning',
    howProvided: 'Starch caramelization',
    importantIn: 'Breads, cookies, pastries',
  },
];

export default function QuickReferenceTable({
  ingredientType,
  customData,
}: QuickReferenceTableProps) {
  // Select the appropriate data based on ingredient type
  const getFunctionsData = () => {
    if (customData) return customData;

    switch (ingredientType) {
      case 'eggs':
        return eggFunctions;
      case 'milk':
        return milkFunctions;
      case 'butter':
        return butterFunctions;
      case 'flour':
        return flourFunctions;
      default:
        return eggFunctions;
    }
  };

  const data = getFunctionsData();

  // Get the appropriate header text based on ingredient type
  const getHeaderText = () => {
    switch (ingredientType) {
      case 'eggs':
        return 'How Eggs Provide It';
      case 'milk':
        return 'How Milk Provides It';
      case 'butter':
        return 'How Butter Provides It';
      case 'flour':
        return 'How Flour Provides It';
      default:
        return "How It's Provided";
    }
  };

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-slate-800 shadow-md rounded-lg">
        <thead className="bg-slate-100 dark:bg-slate-700">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Function</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">{getHeaderText()}</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Most Important In</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-600">
          {data.map((item) => (
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
