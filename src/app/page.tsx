import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="gradient-bg" />

      {/* Enhanced floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-40 right-20 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-40 left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-5xl mx-auto mb-12 slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-zinc-400">Complete Health Management Platform</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
            <span className="text-white">Your Complete</span>
            <br />
            <span className="gradient-text">Health Companion</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Track blood pressure, monitor glucose levels, manage medications, and get smart reminders. 
            Your all-in-one health management platform with PWA support for native app experience.
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/signup" className="btn-primary text-lg px-8 py-4 rounded-xl pulse-ring">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Start Free Today
              </span>
            </Link>
            <Link href="/login" className="btn-secondary text-lg px-8 py-4 rounded-xl">
              Sign In
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <div className="px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-300 dark:border-indigo-500/20 text-indigo-900 dark:text-indigo-300 text-sm font-medium">
              📊 Blood Pressure Tracking
            </div>
            <div className="px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 text-emerald-900 dark:text-emerald-300 text-sm font-medium">
              🩸 Glucose Monitoring
            </div>
            <div className="px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-500/10 border border-purple-300 dark:border-purple-500/20 text-purple-900 dark:text-purple-300 text-sm font-medium">
              💊 Medication Management
            </div>
            <div className="px-4 py-2 rounded-full bg-pink-100 dark:bg-pink-500/10 border border-pink-300 dark:border-pink-500/20 text-pink-900 dark:text-pink-300 text-sm font-medium">
              🔔 Smart Reminders
            </div>
            <div className="px-4 py-2 rounded-full bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-300 dark:border-cyan-500/20 text-cyan-900 dark:text-cyan-300 text-sm font-medium">
              📱 PWA App
            </div>
          </div>
        </div>

        {/* Enhanced Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mt-8 mb-16">
          {/* Blood Pressure Monitoring */}
          <div className="glass glass-hover rounded-2xl p-6 slide-up stagger-1" style={{ opacity: 0 }}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">BP Tracking</h3>
            <p className="text-zinc-400 text-sm">Smart analytics with AHA guidelines, trends, and beautiful charts for cardiovascular health.</p>
          </div>

          {/* Glucose Monitoring */}
          <div className="glass glass-hover rounded-2xl p-6 slide-up stagger-2" style={{ opacity: 0 }}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Glucose Monitor</h3>
            <p className="text-zinc-400 text-sm">Track blood sugar levels with ADA standards, meal timing, and diabetes management insights.</p>
          </div>

          {/* Medication Management */}
          <div className="glass glass-hover rounded-2xl p-6 slide-up stagger-3" style={{ opacity: 0 }}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Med Manager</h3>
            <p className="text-zinc-400 text-sm">Complete medication tracking with schedules, adherence monitoring, and dosage history.</p>
          </div>

          {/* Smart Reminders */}
          <div className="glass glass-hover rounded-2xl p-6 slide-up stagger-4" style={{ opacity: 0 }}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 4.828A4 4 0 015.5 4H9v1H5.5a3 3 0 00-2.121.879l-1.06 1.06A3 3 0 002 8.5V12H1V8.5a4 4 0 011.172-2.828L4.828 4.828zM14 1h5v5l-5-5zM1 14h3v5a3 3 0 003 3h5v1H7a4 4 0 01-4-4v-5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Smart Alerts</h3>
            <p className="text-zinc-400 text-sm">Multi-channel reminders with sound, vibration, email, and browser notifications.</p>
          </div>
        </div>

        {/* Advanced Features Section */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {/* PWA Features */}
          <div className="glass rounded-3xl p-8 slide-up stagger-5" style={{ opacity: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white">Progressive Web App</h3>
            </div>
            <p className="text-zinc-400 mb-4">Install as a native app on any device for enhanced performance and reliability.</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Offline access to your health data
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Enhanced notification reliability
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Native app-like experience
              </div>
            </div>
          </div>

          {/* Analytics & Export */}
          <div className="glass rounded-3xl p-8 slide-up stagger-6" style={{ opacity: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white">Analytics & Reports</h3>
            </div>
            <p className="text-zinc-400 mb-4">Comprehensive health insights with medical-grade reporting for healthcare providers.</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Interactive charts and trends
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                CSV export for doctors
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Medical guideline compliance
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Live Demo Preview */}
        <div className="w-full max-w-5xl mx-auto slide-up stagger-7" style={{ opacity: 0 }}>
          <div className="glass rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10" />
            <div className="relative">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-white mb-2">Live Health Dashboard</h3>
                <p className="text-zinc-400">See how your comprehensive health data comes together</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* BP Reading */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-zinc-500 text-sm">Latest BP</p>
                    <div className="badge badge-normal">Normal</div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white bp-number">120</span>
                    <span className="text-2xl font-bold text-zinc-500">/</span>
                    <span className="text-3xl font-bold text-white bp-number">80</span>
                    <span className="text-zinc-500 ml-2 text-sm">mmHg</span>
                  </div>
                </div>

                {/* Glucose Reading */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-zinc-500 text-sm">Glucose</p>
                    <div className="badge badge-normal">Normal</div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white bp-number">95</span>
                    <span className="text-zinc-500 ml-2 text-sm">mg/dL</span>
                  </div>
                  <p className="text-zinc-600 text-xs mt-2">Fasting</p>
                </div>

                {/* Medication Status */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-zinc-500 text-sm">Today&apos;s Meds</p>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">3</span>
                    <span className="text-zinc-500 text-sm">/ 3</span>
                  </div>
                  <p className="text-green-400 text-xs mt-2">All taken ✓</p>
                </div>
              </div>

              {/* Mini Chart Preview */}
              <div className="flex items-end gap-1 h-20 bg-white/5 rounded-xl p-4">
                {[65, 72, 58, 80, 75, 68, 82, 70, 76, 72, 68, 74, 78, 69, 73, 77].map((height, i) => (
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

        {/* Bottom Section */}
        <div className="mt-16 text-center slide-up stagger-8" style={{ opacity: 0 }}>
          <p className="text-zinc-600 text-sm mb-4">
            Trusted by thousands for comprehensive health management
          </p>
          <div className="flex justify-center items-center gap-6 text-zinc-700">
            <span className="text-xs">🔒 HIPAA Compliant</span>
            <span className="text-xs">📱 PWA Ready</span>
            <span className="text-xs">🌐 Works Offline</span>
            <span className="text-xs">📊 Medical Grade</span>
          </div>
        </div>
      </div>
    </main>
  );
}
