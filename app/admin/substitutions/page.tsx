import { searchSubstitutions } from '@/app/services/substitutionService';
import { SubstitutionsManagementClient } from './components/SubstitutionsManagementClient';

export default async function ManageSubstitutionsPage() {
  const { data: substitutions = [], error } = await searchSubstitutions('');

  if (error) {
    throw error;
  }

  return <SubstitutionsManagementClient initialSubstitutions={substitutions ?? []} />;
}
