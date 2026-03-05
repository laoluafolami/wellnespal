/**
 * Configuration Error Boundary
 * Wraps components and displays error UI when Supabase credentials are missing
 */

'use client';

import { getEnvironmentConfig } from '@/lib/env';
import { ConfigurationError } from './configuration-error';

interface ConfigErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ConfigErrorBoundary({ 
  children, 
  fallback 
}: ConfigErrorBoundaryProps) {
  const config = getEnvironmentConfig();

  if (!config.isConfigured) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return <ConfigurationError missingVars={config.missing} />;
  }

  return <>{children}</>;
}
