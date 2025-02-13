import { getSubstitutionById } from '@/app/services/substitutionService';
import { notFound } from 'next/navigation';
import { EditSubstitutionForm } from '../../components/EditSubstitutionForm';

export default async function EditSubstitutionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: substitution, error } = await getSubstitutionById(id);

  if (error || !substitution) {
    notFound();
  }

  return <EditSubstitutionForm substitution={substitution} />;
}
