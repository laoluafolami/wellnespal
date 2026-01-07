import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Health Tracker - BP & Glucose Monitor",
  description: "Track your blood pressure, glucose levels, and medication reminders. A comprehensive health monitoring app.",
  keywords: ["blood pressure", "glucose", "health", "medication", "tracker", "monitor", "medical"],
  authors: [{ name: "Health Tracker Team" }],
  creator: "Health Tracker",
  publisher: "Health Tracker",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Health Tracker",
  },
  openGraph: {
    type: "website",
    siteName: "Health Tracker",
    title: "Health Tracker - BP & Glucose Monitor",
    description: "Track your blood pressure, glucose levels, and medication reminders",
  },
  twitter: {
    card: "summary",
    title: "Health Tracker - BP & Glucose Monitor",
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
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-placeholder.svg" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-placeholder.svg" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/icon-placeholder.svg" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/icon-placeholder.svg" />
        <link rel="apple-touch-icon" sizes="114x114" href="/icons/icon-placeholder.svg" />
        <link rel="apple-touch-icon" sizes="76x76" href="/icons/icon-placeholder.svg" />
        <link rel="apple-touch-icon" sizes="72x72" href="/icons/icon-placeholder.svg" />
        <link rel="apple-touch-icon" sizes="60x60" href="/icons/icon-placeholder.svg" />
        <link rel="apple-touch-icon" sizes="57x57" href="/icons/icon-placeholder.svg" />
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/icons/icon-placeholder.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-placeholder.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-placeholder.svg" />
        
        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="msapplication-TileImage" content="/icons/icon-placeholder.svg" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Safari Pinned Tab */}
        <link rel="mask-icon" href="/icons/icon-placeholder.svg" color="#6366f1" />
        
        {/* PWA iOS Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Health Tracker" />
        
        {/* PWA Android Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Health Tracker" />
      </head>
      <body className="min-h-screen bg-[var(--background)] antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
