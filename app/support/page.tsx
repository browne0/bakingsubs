import { WorkInProgress } from '@/components/WorkInProgress';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support',
  description: 'Get help with using BakingSubs',
};

export default function SupportPage() {
  return <WorkInProgress />;
}
