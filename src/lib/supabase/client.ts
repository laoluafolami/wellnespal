import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // During build time, return a mock client to prevent build failures
    if (typeof window === 'undefined') {
      return null as any;
    }
    throw new Error('Missing Supabase environment variables');
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}
