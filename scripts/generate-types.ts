import { execSync } from 'child_process';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.PROJECT_REF) {
  console.error('❌ PROJECT_REF not found in environment variables');
  process.exit(1);
}

try {
  execSync(
    `npx supabase gen types typescript --project-id "${process.env.PROJECT_REF}" > src/types/database.types.ts`,
    { stdio: 'inherit' }
  );
  console.log('\x1b[32m✅ Types generated successfully\x1b[0m');
} catch (error) {
  console.error('\x1b[31m❌ Error generating types:', error, '\x1b[0m');
  process.exit(1);
}
