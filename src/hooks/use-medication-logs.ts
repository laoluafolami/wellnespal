"use client";

import { useQuery } from "@tanstack/react-query";
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";
import type { MedicationLog } from "@/types";

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}

export function useMedicationLogs(medicationId?: string, days: number = 30) {
  const supabase = getSupabaseClient();

  return useQuery({
    queryKey: ["medication-logs", medicationId, days],
    queryFn: async (): Promise<MedicationLog[]> => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      let query = supabase
        .from("medication_logs")
        .select(`
          *,
          medications!inner(name, dosage, color)
        `)
        .gte("scheduled_time", startDate.toISOString())
        .order("scheduled_time", { ascending: false });

      if (medicationId) {
        query = query.eq("medication_id", medicationId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return (data as any[]) || [];
    },
    enabled: !!medicationId || medicationId === undefined,
  });
}
