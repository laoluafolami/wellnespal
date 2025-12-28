"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Reading, ReadingInsert } from "@/types";

export function useReadings() {
  const supabase = createClient();

  return useQuery({
    queryKey: ["readings"],
    queryFn: async (): Promise<Reading[]> => {
      const { data, error } = await supabase
        .from("readings")
        .select("*")
        .order("measured_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
}

export function useCreateReading() {
  const queryClient = useQueryClient();
  const supabase = createClient();

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

      const { data, error } = await supabase
        .from("readings")
        .insert({ ...reading, measured_at, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["readings"] });
    },
  });
}

export function useDeleteReading() {
  const queryClient = useQueryClient();
  const supabase = createClient();

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
