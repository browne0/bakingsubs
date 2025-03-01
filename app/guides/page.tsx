import { WorkInProgress } from '@/components/WorkInProgress';
import { ogImage } from '@/lib/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guides',
  description: 'Comprehensive guides about baking substitutions and techniques',
  openGraph: {
    title: 'Baking Guides - BakingSubs',
    description: 'Comprehensive guides about baking substitutions and techniques',
    ...ogImage,
  },
};

export default function GuidesPage() {
  return <WorkInProgress />;
}
