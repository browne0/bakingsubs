import Image from 'next/image';

interface Props {
  title: string;
  description: string;
  imageUrl: string;
  tips: string[];
}

export default function RecipeTypeCard({ title, description, imageUrl, tips }: Props) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image src={imageUrl} alt={title} fill className="object-cover" unoptimized />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300 mb-4">{description}</p>
        <ul className="space-y-2">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span className="text-sm text-slate-700 dark:text-slate-200">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
