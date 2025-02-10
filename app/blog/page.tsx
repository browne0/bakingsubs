import { WorkInProgress } from '@/components/WorkInProgress';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read our latest articles about baking substitutions and techniques',
};

export default function BlogPage() {
  return <WorkInProgress />;
}
