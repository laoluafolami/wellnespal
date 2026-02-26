# Implementation Plan: Environment Variable Handling

## Overview

This implementation plan breaks down the environment variable handling feature into discrete coding tasks. The approach is incremental: we'll start with core environment validation, then update the client factory, add error UI components, update hooks, and finally add tests. Each task builds on previous work to ensure no orphaned code.

## Tasks

- [x] 1. Create environment configuration module
  - Create `src/lib/env.ts` with environment validation functions
  - Implement `getEnvironmentConfig()` to read and validate env vars
  - Implement `validateEnvironment()` to return validation results
  - Export TypeScript interfaces for configuration state
  - _Requirements: 1.1, 1.2, 3.3_

- [ ]* 1.1 Write unit tests for environment validation
  - Test validation with missing variables
  - Test validation with present variables
  - Test configuration state structure
  - _Requirements: 1.1, 1.2_

- [x] 2. Update Supabase client factory with graceful fallbacks
  - Modify `src/lib/supabase/client.ts` to use environment validation
  - Implement `isBuildTime()` detection function
  - Update `createClient()` to return null during build when credentials missing
  - Add optional `ClientOptions` parameter for behavior control
  - Ensure type safety with proper return types
  - _Requirements: 1.1, 1.3, 4.1, 4.2_

- [ ]* 2.1 Write property test for client factory safety
  - **Property 2: Runtime Safety Without Credentials**
  - **Validates: Requirements 1.2, 1.3, 2.1**
  - Test that createClient() never throws during build time
  - Test that createClient() returns safe fallback when credentials missing

- [ ]* 2.2 Write unit tests for build-time detection
  - Test `isBuildTime()` correctly identifies build context
  - Test client creation during build vs runtime
  - _Requirements: 1.1, 4.1_

- [ ] 3. Create configuration error UI components
  - [x] 3.1 Create `src/components/configuration-error.tsx`
    - Implement error message component with missing variables list
    - Include setup instructions in the error message
    - Style component to be user-friendly and clear
    - _Requirements: 2.1, 2.2_

  - [ ]* 3.2 Write property test for error message completeness
    - **Property 3: Error Message Completeness**
    - **Validates: Requirements 2.2**
    - Test that all error messages include missing variable names
    - Test that all error messages include setup instructions

  - [x] 3.3 Create `src/components/config-error-boundary.tsx`
    - Implement error boundary component
    - Check environment configuration on mount
    - Render ConfigurationError when credentials missing
    - Render children when credentials present
    - _Requirements: 1.2, 2.1_

  - [ ]* 3.4 Write unit tests for error boundary
    - Test boundary renders error UI when config missing
    - Test boundary renders children when config present
    - _Requirements: 2.1, 2.3_

- [ ] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Update existing hooks to use safe client creation
  - [x] 5.1 Update `src/hooks/use-medications.ts`
    - Replace direct client creation with safe createClient()
    - Handle null client gracefully in all hook functions
    - _Requirements: 1.2, 1.3_

  - [x] 5.2 Update `src/hooks/use-medication-logs.ts`
    - Replace direct client creation with safe createClient()
    - Handle null client gracefully
    - _Requirements: 1.2, 1.3_

  - [x] 5.3 Update `src/hooks/use-glucose-readings.ts`
    - Replace direct client creation with safe createClient()
    - Handle null client gracefully
    - _Requirements: 1.2, 1.3_

  - [x] 5.4 Update `src/hooks/use-readings.ts`
    - Replace direct client creation with safe createClient()
    - Handle null client gracefully
    - _Requirements: 1.2, 1.3_

  - [ ] 5.5 Update `src/hooks/use-settings.ts`
    - Replace direct client creation with safe createClient()
    - Handle null client gracefully
    - _Requirements: 1.2, 1.3_

- [ ]* 5.6 Write property test for hook safety
  - **Property 2: Runtime Safety Without Credentials**
  - **Validates: Requirements 1.2, 1.3, 2.1**
  - Test that hooks don't crash when client is null
  - Test across multiple hook types

- [ ] 6. Wrap pages with configuration error boundary
  - [ ] 6.1 Update `src/app/medications/page.tsx`
    - Wrap page content with ConfigErrorBoundary
    - _Requirements: 1.4, 2.1_

  - [ ] 6.2 Update `src/app/medications/history/page.tsx`
    - Wrap page content with ConfigErrorBoundary
    - _Requirements: 1.4, 2.1_

  - [ ] 6.3 Update other Supabase-dependent pages
    - Identify and wrap all pages that use Supabase
    - Apply ConfigErrorBoundary consistently
    - _Requirements: 1.4, 2.1_

- [ ]* 6.4 Write integration tests for page rendering
  - Test pages render error UI when credentials missing
  - Test pages render normally when credentials present
  - _Requirements: 1.4, 2.1, 2.3_

- [ ] 7. Add environment validation on startup
  - Create or update app initialization code
  - Call `validateEnvironment()` on startup
  - Log helpful messages about configuration status
  - _Requirements: 3.3_

- [ ]* 7.1 Write unit test for startup validation
  - Test that validation runs on app start
  - Test that helpful logs are produced
  - _Requirements: 3.3_

- [ ] 8. Update documentation
  - [ ] 8.1 Verify `.env.example` contains required variables
    - Ensure NEXT_PUBLIC_SUPABASE_URL is documented
    - Ensure NEXT_PUBLIC_SUPABASE_ANON_KEY is documented
    - Add comments explaining each variable
    - _Requirements: 3.1_

  - [ ] 8.2 Update README.md with environment setup section
    - Add clear instructions for copying .env.example
    - Explain where to get Supabase credentials
    - Document the development workflow
    - _Requirements: 3.2_

- [ ]* 8.3 Write tests for documentation completeness
  - Test that .env.example exists and contains required vars
  - Test that README contains environment setup section
  - _Requirements: 3.1, 3.2_

- [ ] 9. Run build test without environment variables
  - Remove or unset environment variables
  - Run `npm run build` command
  - Verify build completes successfully with exit code 0
  - _Requirements: 1.1, 4.1, 4.2, 4.3_

- [ ]* 9.1 Write property test for build success
  - **Property 1: Build Success Without Credentials**
  - **Validates: Requirements 1.1, 4.1, 4.2, 4.3**
  - Test that build command succeeds without env vars
  - Test that export command succeeds without env vars

- [ ] 10. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
  - Verify build succeeds without credentials
  - Verify app shows helpful errors at runtime without credentials
  - Verify app works normally with credentials

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- The implementation follows a bottom-up approach: core utilities first, then UI components, then integration
