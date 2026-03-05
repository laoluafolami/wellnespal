"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";
import type { GlucoseReading, GlucoseReadingInsert } from "@/types";

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}

export function useGlucoseReadings() {
  const supabase = getSupabaseClient();

  return useQuery({
    queryKey: ["glucose-readings"],
    queryFn: async (): Promise<GlucoseReading[]> => {
      const { data, error } = await supabase
        .from("glucose_readings")
        .select("*")
        .order("measured_at", { ascending: false });

      if (error) throw error;
      return (data as GlucoseReading[]) || [];
    },
  });
}

export function useCreateGlucoseReading() {
  const queryClient = useQueryClient();
  const supabase = getSupabaseClient();

  return useMutation({
    mutationFn: async (reading: Omit<GlucoseReadingInsert, "user_id">) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const measured_at = reading.measured_at
        ? new Date(reading.measured_at).toISOString()
        : new Date().toISOString();

      const insertData: any = {
        glucose_value: reading.glucose_value,
        measurement_type: reading.measurement_type,
        measured_at,
        notes: reading.notes,
        user_id: user.id,
      };

      const { data, error } = await supabase
        .from("glucose_readings")
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      return data as GlucoseReading;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["glucose-readings"] });
    },
  });
}

export function useDeleteGlucoseReading() {
  const queryClient = useQueryClient();
  const supabase = getSupabaseClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("glucose_readings").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["glucose-readings"] });
    },
  });
}
