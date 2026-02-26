import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";
import { getEnvironmentConfig } from "@/lib/env";

export type SupabaseClient = ReturnType<typeof createBrowserClient<Database>>;

export interface ClientOptions {
  throwOnMissing?: boolean;  // Default: false
}

/**
 * Detect if we're running during build time (SSG/SSR)
 */
export function isBuildTime(): boolean {
  return typeof window === 'undefined' && process.env.NODE_ENV !== 'test';
}

/**
 * Create Supabase client with graceful fallback behavior
 */
export function createClient(options?: ClientOptions): SupabaseClient | null {
  const config = getEnvironmentConfig();

  // During build time, return null to prevent build failures
  if (!config.isConfigured && isBuildTime()) {
    return null;
  }

  // At runtime, handle missing configuration
  if (!config.isConfigured) {
    if (options?.throwOnMissing) {
      throw new Error(`Missing Supabase environment variables: ${config.missing.join(', ')}`);
    }
    return null;
  }

  return createBrowserClient<Database>(config.supabaseUrl!, config.supabaseAnonKey!);
}
