import { WorkInProgress } from '@/components/WorkInProgress';
import { ogImage } from '@/lib/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support',
  description: 'Get help with using BakingSubs',
  openGraph: {
    title: 'Support - BakingSubs',
    description: 'Get help with using BakingSubs and find answers to your questions',
    ...ogImage,
  },
};

export default function SupportPage() {
  return <WorkInProgress />;
}
