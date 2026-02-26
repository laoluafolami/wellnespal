"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";
import type { Reading, ReadingInsert } from "@/types";

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}

export function useReadings() {
  const supabase = getSupabaseClient();

  return useQuery({
    queryKey: ["readings"],
    queryFn: async (): Promise<Reading[]> => {
      const { data, error } = await supabase
        .from("readings")
        .select("*")
        .order("measured_at", { ascending: false});

      if (error) throw error;
      return (data as Reading[]) || [];
    },
  });
}

export function useCreateReading() {
  const queryClient = useQueryClient();
  const supabase = getSupabaseClient();

  return useMutation({
    mutationFn: async (reading: Omit<ReadingInsert, "user_id">) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const measured_at = reading.measured_at
        ? new Date(reading.measured_at).toISOString()
        : new Date().toISOString();

      const insertData: any = {
        systolic: reading.systolic,
        diastolic: reading.diastolic,
        pulse: reading.pulse,
        measured_at,
        arm: reading.arm,
        position: reading.position,
        notes: reading.notes,
        user_id: user.id,
      };

      const { data, error } = await (supabase
        .from("readings") as any)
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      return data as Reading;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["readings"] });
    },
  });
}

export function useDeleteReading() {
  const queryClient = useQueryClient();
  const supabase = getSupabaseClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("readings").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["readings"] });
    },
  });
}
