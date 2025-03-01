import { WorkInProgress } from '@/components/WorkInProgress';
import { ogImage } from '@/lib/metadata';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about baking substitutions',
  openGraph: {
    title: 'FAQ - BakingSubs',
    description:
      'Frequently asked questions about baking substitutions and ingredient alternatives',
    ...ogImage,
  },
};

export default function FAQPage() {
  return <WorkInProgress />;
}
