import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "WellnessPal - Your Complete Health Companion",
  description: "Track your blood pressure, glucose levels, and medication reminders. A comprehensive health monitoring app.",
  keywords: ["blood pressure", "glucose", "health", "medication", "tracker", "monitor", "medical"],
  authors: [{ name: "WellnessPal Team" }],
  creator: "WellnessPal",
  publisher: "WellnessPal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "WellnessPal",
  },
  openGraph: {
    type: "website",
    siteName: "WellnessPal",
    title: "WellnessPal - Your Complete Health Companion",
    description: "Track your blood pressure, glucose levels, and medication reminders",
  },
  twitter: {
    card: "summary",
    title: "WellnessPal - Your Complete Health Companion",
    description: "Track your blood pressure, glucose levels, and medication reminders",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#6366f1" },
    { media: "(prefers-color-scheme: dark)", color: "#6366f1" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="alternate icon" href="/favicon.ico" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.svg" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon.svg" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon.svg" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.svg" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon.svg" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon.svg" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon.svg" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon.svg" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon.svg" />
        
        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="msapplication-TileImage" content="/icon-512.svg" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Safari Pinned Tab */}
        <link rel="mask-icon" href="/favicon.svg" color="#6366f1" />
        
        {/* PWA iOS Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="WellnessPal" />
        
        {/* PWA Android Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="WellnessPal" />
      </head>
      <body className="min-h-screen bg-[var(--background)] antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
