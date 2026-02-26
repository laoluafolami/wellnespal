/**
 * Environment Configuration Module
 * Centralizes environment variable validation and provides type-safe access
 */

export interface EnvironmentConfig {
  supabaseUrl: string | undefined;
  supabaseAnonKey: string | undefined;
  isConfigured: boolean;
  missing: string[];
}

export interface ValidationResult {
  isValid: boolean;
  missing: string[];
  message: string;
}

/**
 * Get current environment configuration
 */
export function getEnvironmentConfig(): EnvironmentConfig {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const missing: string[] = [];
  if (!supabaseUrl) missing.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!supabaseAnonKey) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');

  return {
    supabaseUrl,
    supabaseAnonKey,
    isConfigured: missing.length === 0,
    missing,
  };
}

/**
 * Validate environment variables and return detailed results
 */
export function validateEnvironment(): ValidationResult {
  const config = getEnvironmentConfig();

  if (config.isConfigured) {
    return {
      isValid: true,
      missing: [],
      message: 'Environment configuration is valid',
    };
  }

  const message = `Missing Supabase configuration: ${config.missing.join(', ')}`;

  return {
    isValid: false,
    missing: config.missing,
    message,
  };
}
