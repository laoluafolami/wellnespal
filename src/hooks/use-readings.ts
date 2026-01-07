"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createBrowserClient } from "@supabase/ssr";
import type { Reading, ReadingInsert } from "@/types";

// Create a non-typed client to avoid complex generic inference issues
function getSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export function useReadings() {
  const supabase = getSupabaseClient();

  return useQuery({
    queryKey: ["readings"],
    queryFn: async (): Promise<Reading[]> => {
      const { data, error } = await supabase
        .from("readings")
        .select("*")
        .order("measured_at", { ascending: false });

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

      // Convert datetime-local format to ISO string for database
      const measured_at = reading.measured_at
        ? new Date(reading.measured_at).toISOString()
        : new Date().toISOString();

      const insertData = {
        systolic: reading.systolic,
        diastolic: reading.diastolic,
        pulse: reading.pulse,
        measured_at,
        arm: reading.arm,
        position: reading.position,
        notes: reading.notes,
        user_id: user.id,
      };

      const { data, error } = await supabase
        .from("readings")
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
