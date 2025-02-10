import { WorkInProgress } from '@/components/WorkInProgress';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guides',
  description: 'Comprehensive guides about baking substitutions and techniques',
};

export default function GuidesPage() {
  return <WorkInProgress />;
}
