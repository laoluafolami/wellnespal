"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { z } from "zod";

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    // Check if we have the required tokens from the email link
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    
    if (!accessToken || !refreshToken) {
      setError("Invalid reset link. Please request a new password reset.");
    }
  }, [searchParams]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setError(null);

    const supabase = createClient();
    if (!supabase) {
      setError("Service unavailable. Please try again later.");
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    setIsSuccess(true);
    setIsLoading(false);
    
    // Redirect to dashboard after 3 seconds
    setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
  };

  return (
    <>
      {isSuccess ? (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Password Updated!</h1>
          <p className="text-zinc-400 mb-6">
            Your password has been successfully updated. You&apos;ll be redirected to your dashboard shortly.
          </p>
          <Link href="/dashboard" className="btn-primary inline-block px-6 py-3">
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Set New Password</h1>
            <p className="text-zinc-400">Enter your new password below</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm fade-in">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                New Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your new password"
                className={`input-modern ${errors.password ? 'border-red-500/50' : ''}`}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-300">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                className={`input-modern ${errors.confirmPassword ? 'border-red-500/50' : ''}`}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-400 mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Updating password...
                </span>
              ) : (
                "Update Password"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-400">
            Remember your password?{" "}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </>
      )}
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-2 text-zinc-400">
        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        Loading...
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated gradient background */}
      <div className="gradient-bg" />

      {/* Floating orbs */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 w-full max-w-md slide-up">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white">WellnessPal</span>
        </Link>

        {/* Card */}
        <div className="glass rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />

          <div className="relative">
            <Suspense fallback={<LoadingFallback />}>
              <ResetPasswordForm />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}