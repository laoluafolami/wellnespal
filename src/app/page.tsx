import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="gradient-bg" />

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-12 slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-zinc-400">Track your health journey</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-white">Monitor Your</span>
            <br />
            <span className="gradient-text">Blood Pressure</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            The intelligent way to track, analyze, and understand your cardiovascular health.
            Get insights that matter.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup" className="btn-primary text-lg px-8 py-4 rounded-xl pulse-ring">
              Get Started Free
            </Link>
            <Link href="/login" className="btn-secondary text-lg px-8 py-4 rounded-xl">
              Sign In
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-8">
          <div className="glass glass-hover rounded-2xl p-6 slide-up stagger-1" style={{ opacity: 0 }}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Smart Analytics</h3>
            <p className="text-zinc-400">Beautiful charts and trends to visualize your health progress over time.</p>
          </div>

          <div className="glass glass-hover rounded-2xl p-6 slide-up stagger-2" style={{ opacity: 0 }}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Health Insights</h3>
            <p className="text-zinc-400">Automatic classification based on medical guidelines with personalized alerts.</p>
          </div>

          <div className="glass glass-hover rounded-2xl p-6 slide-up stagger-3" style={{ opacity: 0 }}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Export Reports</h3>
            <p className="text-zinc-400">Share detailed reports with your healthcare provider in seconds.</p>
          </div>
        </div>

        {/* Live Demo Preview */}
        <div className="mt-20 w-full max-w-4xl mx-auto slide-up stagger-4" style={{ opacity: 0 }}>
          <div className="glass rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10" />
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-zinc-500 text-sm mb-1">Latest Reading</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white bp-number">120</span>
                    <span className="text-3xl font-bold text-zinc-500 bp-number">/</span>
                    <span className="text-5xl font-bold text-white bp-number">80</span>
                    <span className="text-zinc-500 ml-2">mmHg</span>
                  </div>
                </div>
                <div className="badge badge-normal">Normal</div>
              </div>

              {/* Mini Chart Preview */}
              <div className="flex items-end gap-1 h-24">
                {[65, 72, 58, 80, 75, 68, 82, 70, 76, 72, 68, 74].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-indigo-500 to-purple-500 opacity-60 transition-all hover:opacity-100"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tag */}
        <p className="mt-16 text-zinc-600 text-sm slide-up stagger-5" style={{ opacity: 0 }}>
          Trusted by thousands for better heart health
        </p>
      </div>
    </main>
  );
}
