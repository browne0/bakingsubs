import { JsonLd, generateCommonSubstitutesJsonLd } from '@/app/utils/jsonLd';
import { WorkInProgress } from '@/components/WorkInProgress';
import { ogImage } from '@/lib/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Common Substitutes',
  description: 'Most frequently used baking substitutions',
  openGraph: {
    title: 'Common Baking Substitutes - BakingSubs',
    description: 'Discover the most frequently used baking substitutions for your recipes',
    ...ogImage,
  },
};

export default function CommonSubstitutesPage() {
  // Generate JSON-LD structured data for the common substitutes page
  const jsonLdData = generateCommonSubstitutesJsonLd();

  return (
    <>
      {/* Add JSON-LD structured data */}
      <JsonLd data={jsonLdData} />
      <WorkInProgress />
    </>
  );
}
