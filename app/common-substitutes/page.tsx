import { WorkInProgress } from '@/components/WorkInProgress';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Common Substitutes',
  description: 'Most frequently used baking substitutions',
};

export default function CommonSubstitutesPage() {
  return <WorkInProgress />;
}
