import { Database } from '@/database.types';
import { createBrowserClient } from '@supabase/ssr';

function createClient() {
  // Create a supabase client on the browser with project's credentials
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export const supabase = createClient();
