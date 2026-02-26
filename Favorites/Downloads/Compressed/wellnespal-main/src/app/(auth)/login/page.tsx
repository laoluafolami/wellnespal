"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { loginSchema, type LoginFormData } from "@/lib/validations";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    const supabase = createClient();
    if (!supabase) {
      setError("Service unavailable. Please try again later.");
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);
    setError(null);

    const supabase = createClient();
    if (!supabase) {
      setError("Service unavailable. Please try again later.");
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    setResetEmailSent(true);
    setIsLoading(false);
  };

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
            {!showForgotPassword ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
                  <p className="text-zinc-400">Sign in to continue tracking your health</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm fade-in">
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className={`input-modern ${errors.email ? 'border-red-500/50' : ''}`}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className={`input-modern ${errors.password ? 'border-red-500/50' : ''}`}
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
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
                        Signing in...
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-zinc-400">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                    Create one
                  </Link>
                </p>
              </>
            ) : (
              <>
                {/* Forgot Password Form */}
                <div className="text-center mb-8">
                  <button
                    onClick={() => setShowForgotPassword(false)}
                    className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-4"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to sign in
                  </button>
                  <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
                  <p className="text-zinc-400">Enter your email to receive a password reset link</p>
                </div>

                {resetEmailSent ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white">Check your email</h3>
                    <p className="text-zinc-400 text-sm">
                      We&apos;ve sent a password reset link to <strong>{resetEmail}</strong>
                    </p>
                    <p className="text-zinc-500 text-xs">
                      Didn&apos;t receive the email? Check your spam folder or try again.
                    </p>
                    <button
                      onClick={() => {
                        setResetEmailSent(false);
                        setResetEmail("");
                      }}
                      className="btn-secondary px-6 py-3 mt-4"
                    >
                      Try different email
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {error && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm fade-in">
                        {error}
                      </div>
                    )}

                    <div className="space-y-2">
                      <label htmlFor="reset-email" className="block text-sm font-medium text-zinc-300">
                        Email Address
                      </label>
                      <input
                        id="reset-email"
                        type="email"
                        placeholder="you@example.com"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="input-modern"
                      />
                    </div>

                    <button
                      onClick={handleForgotPassword}
                      disabled={isLoading || !resetEmail}
                      className="btn-primary w-full py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending reset link...
                        </span>
                      ) : (
                        "Send Reset Link"
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
