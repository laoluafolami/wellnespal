"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { ClientOnly } from "./client-only";
import dynamic from "next/dynamic";

// Dynamically import PWA components to avoid SSR issues
const PWAInstall = dynamic(() => import("./pwa-install").then(mod => ({ default: mod.PWAInstall })), {
  ssr: false,
});

const ServiceWorkerProvider = dynamic(() => import("@/hooks/use-service-worker").then(mod => {
  function ServiceWorkerWrapper() {
    mod.useServiceWorker();
    return null;
  }
  return { default: ServiceWorkerWrapper };
}), {
  ssr: false,
});

function PWAWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ClientOnly>
        <ServiceWorkerProvider />
        <PWAInstall />
      </ClientOnly>
    </>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <PWAWrapper>
          {children}
        </PWAWrapper>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
