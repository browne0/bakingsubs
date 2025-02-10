import { Database } from '@/database.types';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { slugify } from '../app/utils/slugify';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function updateSubstitutionIds() {
  try {
    // Fetch all substitutions with their original ingredients
    const { data: substitutions, error: fetchError } = await supabase.from('substitutions').select(`
        id,
        name,
        original_ingredient_id,
        ingredients!original_ingredient_id (
          name
        )
      `);

    if (fetchError) throw fetchError;

    console.log(`Found ${substitutions.length} substitutions to update`);

    for (const substitution of substitutions) {
      try {
        // Generate new ID format
        const newId = slugify(`${substitution.ingredients.name}-to-${substitution.name}`);

        if (newId === substitution.id) {
          console.log(`Skipping ${substitution.id} - already in correct format`);
          continue;
        }

        // Start a transaction to update all related records
        const { error: updateError } = await supabase.rpc('update_substitution_id', {
          old_id: substitution.id,
          new_id: newId,
        });

        if (updateError) {
          console.error(`Error updating ${substitution.id}:`, updateError);
          continue;
        }

        console.log(`✓ Updated ${substitution.id} to ${newId}`);
      } catch (error) {
        console.error(`Failed to update ${substitution.id}:`, error);
      }
    }

    console.log('Finished updating substitution IDs');
  } catch (error) {
    console.error('Script failed:', error);
  }
}

updateSubstitutionIds()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
