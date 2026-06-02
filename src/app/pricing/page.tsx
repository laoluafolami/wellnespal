"use client";

import { useState } from "react";
import { NavHeader } from "@/components/nav-header";
import Link from "next/link";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, annual: 0 },
      description: "Perfect for getting started with health tracking",
      features: [
        "Blood pressure tracking",
        "Glucose monitoring",
        "Up to 3 medications",
        "30-day history",
        "Basic charts and graphs",
        "Browser notifications",
      ],
      limitations: [
        "Ads displayed",
        "No PDF reports",
        "No AI insights",
        "No family sharing",
      ],
      cta: "Get Started",
      popular: false,
      color: "zinc",
    },
    {
      name: "Basic",
      price: { monthly: 1500, annual: 15000 },
      description: "For individuals who want more features",
      features: [
        "Everything in Free",
        "Unlimited medications",
        "1-year history",
        "PDF reports (monthly)",
        "Export data (CSV, PDF)",
        "Ad-free experience",
        "Symptom tracker",
        "Appointment manager",
        "Email support",
      ],
      limitations: [],
      cta: "Start 14-Day Free Trial",
      popular: false,
      color: "indigo",
    },
    {
      name: "Premium",
      price: { monthly: 3500, annual: 35000 },
      description: "Complete health management solution",
      features: [
        "Everything in Basic",
        "Unlimited history (lifetime)",
        "AI-powered health insights",
        "Trend analysis & predictions",
        "Family sharing (up to 3)",
        "PDF reports (weekly)",
        "Doctor sharing portal",
        "Advanced analytics",
        "Pharmacy integration",
        "Medication interaction checker",
        "24/7 priority support",
      ],
      limitations: [],
      cta: "Start 30-Day Free Trial",
      popular: true,
      color: "purple",
    },
    {
      name: "Family",
      price: { monthly: 6000, annual: 60000 },
      description: "Perfect for families and caregivers",
      features: [
        "Everything in Premium",
        "Up to 5 family members",
        "Caregiver dashboard",
        "Emergency alerts",
        "Shared medication calendar",
        "Family health reports",
        "Multi-user management",
        "Dedicated account manager",
        "Custom reminders per person",
      ],
      limitations: [],
      cta: "Start 30-Day Free Trial",
      popular: false,
      color: "emerald",
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateSavings = (monthly: number, annual: number) => {
    const monthlyCost = monthly * 12;
    const savings = monthlyCost - annual;
    return savings;
  };

  return (
    <div className="min-h-screen relative">
      {/* Animated gradient background */}
      <div className="gradient-bg" />

      <NavHeader />

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 slide-up">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-zinc-400 mb-8">
            Start free. Upgrade when you need more features.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 glass rounded-full p-2">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-indigo-600 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === "annual"
                  ? "bg-indigo-600 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Annual
              <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`glass rounded-2xl p-6 relative overflow-hidden slide-up ${
                plan.popular ? "ring-2 ring-purple-500" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                  ⭐ MOST POPULAR
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-white mb-2 mt-4">
                {plan.name}
              </h3>
              <p className="text-zinc-400 text-sm mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">
                    {formatPrice(plan.price[billingCycle])}
                  </span>
                  <span className="text-zinc-400">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
                {billingCycle === "annual" && plan.price.monthly > 0 && (
                  <p className="text-sm text-green-400 mt-2">
                    Save {formatPrice(calculateSavings(plan.price.monthly, plan.price.annual))} per year
                  </p>
                )}
              </div>

              {/* CTA Button */}
              <Link
                href={plan.price.monthly === 0 ? "/signup" : "/signup?plan=" + plan.name.toLowerCase()}
                className={`btn-primary w-full mb-6 text-center block ${
                  plan.popular ? "bg-gradient-to-r from-purple-500 to-pink-500" : ""
                }`}
              >
                {plan.cta}
              </Link>

              {/* Features */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-white">What&apos;s included:</p>
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-zinc-300">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-zinc-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="text-sm text-zinc-500">{limitation}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Section */}
        <div className="glass rounded-2xl p-8 mb-16 slide-up" style={{ opacity: 0, animationDelay: "400ms" }}>
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Enterprise Solution</h2>
            <p className="text-zinc-400 mb-6">
              For hospitals, clinics, and corporate wellness programs. Get custom features, dedicated support, and volume pricing.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Unlimited patients
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                White-label option
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                API access
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Dedicated support
              </div>
            </div>
            <p className="text-2xl font-bold text-white mb-6">
              Starting at ₦50,000/month
            </p>
            <Link href="/contact" className="btn-primary inline-block">
              Contact Sales
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto slide-up" style={{ opacity: 0, animationDelay: "500ms" }}>
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Can I cancel anytime?",
                a: "Yes! You can cancel your subscription at any time with no penalties. Your data will remain accessible even after cancellation.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major payment methods including Visa, Mastercard, Bank Transfer, USSD, and Mobile Money through Paystack.",
              },
              {
                q: "Is my health data secure?",
                a: "Absolutely! We use bank-level encryption and comply with healthcare data protection standards. Your data is stored securely and never shared without your permission.",
              },
              {
                q: "Can I upgrade or downgrade my plan?",
                a: "Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the end of your current billing period.",
              },
              {
                q: "Do you offer refunds?",
                a: "We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, contact us for a full refund.",
              },
              {
                q: "What happens to my data if I downgrade to Free?",
                a: "Your data is never deleted. If you downgrade, you'll only be able to view the last 30 days of history, but all your data is preserved and accessible if you upgrade again.",
              },
            ].map((faq, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-zinc-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 glass rounded-2xl p-8 slide-up" style={{ opacity: 0, animationDelay: "600ms" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">🔒</div>
              <p className="text-sm font-semibold text-white">Secure Payment</p>
              <p className="text-xs text-zinc-400">Bank-level encryption</p>
            </div>
            <div>
              <div className="text-3xl mb-2">💳</div>
              <p className="text-sm font-semibold text-white">Paystack</p>
              <p className="text-xs text-zinc-400">Trusted payment gateway</p>
            </div>
            <div>
              <div className="text-3xl mb-2">↩️</div>
              <p className="text-sm font-semibold text-white">30-Day Refund</p>
              <p className="text-xs text-zinc-400">Money-back guarantee</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🇳🇬</div>
              <p className="text-sm font-semibold text-white">Made in Nigeria</p>
              <p className="text-xs text-zinc-400">For Nigerians</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center slide-up" style={{ opacity: 0, animationDelay: "700ms" }}>
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to take control of your health?
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Join thousands of Nigerians managing their health with WellnessPal
          </p>
          <Link href="/signup" className="btn-primary inline-block text-lg px-8 py-4">
            Get Started Free
          </Link>
        </div>
      </main>
    </div>
  );
}
