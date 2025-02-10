import { WorkInProgress } from '@/components/WorkInProgress';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about baking substitutions',
};

export default function FAQPage() {
  return <WorkInProgress />;
}
