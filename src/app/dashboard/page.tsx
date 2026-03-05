import { ClientOnly } from "@/components/client-only";
import { DashboardClient } from "@/components/dashboard-client";

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  return (
    <ClientOnly>
      <DashboardClient />
    </ClientOnly>
  );
}