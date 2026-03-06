import { ClientOnly } from "@/components/client-only";
import { DashboardClient } from "@/components/dashboard-client";

export default function DashboardPage() {
  return (
    <ClientOnly>
      <DashboardClient />
    </ClientOnly>
  );
}