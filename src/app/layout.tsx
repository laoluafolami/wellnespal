import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "BP Tracker - Blood Pressure Monitor",
  description: "Track and monitor your blood pressure readings over time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--background)] antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
