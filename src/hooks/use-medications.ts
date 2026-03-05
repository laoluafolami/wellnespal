"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";
import type { Medication, MedicationInsert, MedicationUpdate, MedicationLog, MedicationLogInsert, MedicationScheduleItem } from "@/types";

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}

export function useMedications() {
  const supabase = getSupabaseClient();

  return useQuery({
    queryKey: ["medications"],
    queryFn: async (): Promise<Medication[]> => {
      const { data, error } = await supabase
        .from("medications")
        .select("*")
        .eq("is_active", true)
        .order("name");

      if (error) throw error;
      return (data as Medication[]) || [];
    },
  });
}

export function useCreateMedication() {
  const queryClient = useQueryClient();
  const supabase = getSupabaseClient();

  return useMutation({
    mutationFn: async (medication: Omit<MedicationInsert, "user_id">) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const insertData: any = {
        ...medication,
        user_id: user.id,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await (supabase
        .from("medications") as any)
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      return data as Medication;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medications"] });
      queryClient.invalidateQueries({ queryKey: ["medication-schedule"] });
    },
  });
}

export function useUpdateMedication() {
  const queryClient = useQueryClient();
  const supabase = getSupabaseClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<MedicationUpdate> }) => {
      const updateData: any = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await (supabase
        .from("medications") as any)
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as Medication;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medications"] });
      queryClient.invalidateQueries({ queryKey: ["medication-schedule"] });
    },
  });
}

export function useDeleteMedication() {
  const queryClient = useQueryClient();
  const supabase = getSupabaseClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const updateData: any = { 
        is_active: false, 
        updated_at: new Date().toISOString() 
      };

      const { error } = await (supabase
        .from("medications") as any)
        .update(updateData)
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medications"] });
      queryClient.invalidateQueries({ queryKey: ["medication-schedule"] });
    },
  });
}

export function useMedicationSchedule(date: Date = new Date()) {
  const supabase = getSupabaseClient();
  const dateStr = date.toISOString().split('T')[0];

  return useQuery({
    queryKey: ["medication-schedule", dateStr],
    queryFn: async (): Promise<MedicationScheduleItem[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const { data: schedule, error: scheduleError } = await (supabase
        .rpc as any)('generate_medication_schedule', {
          p_user_id: user.id,
          p_start_date: dateStr,
          p_end_date: dateStr
        });

      if (scheduleError) throw scheduleError;

      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const { data: logs, error: logsError } = await supabase
        .from("medication_logs")
        .select("*")
        .gte("scheduled_time", startOfDay.toISOString())
        .lte("scheduled_time", endOfDay.toISOString());

      if (logsError) throw logsError;

      const scheduleWithLogs: MedicationScheduleItem[] = (schedule || []).map((item: any) => {
        const log: any = (logs || []).find((log: MedicationLog) => 
          log.medication_id === item.medication_id &&
          new Date(log.scheduled_time).getTime() === new Date(item.scheduled_time).getTime()
        );

        return {
          medication_id: item.medication_id,
          medication_name: item.medication_name,
          dosage: item.dosage,
          scheduled_time: item.scheduled_time,
          color: item.color,
          status: log?.status || 'pending',
          log_id: log?.id,
        };
      });

      return scheduleWithLogs.sort((a, b) => 
        new Date(a.scheduled_time).getTime() - new Date(b.scheduled_time).getTime()
      );
    },
  });
}

export function useLogMedication() {
  const queryClient = useQueryClient();
  const supabase = getSupabaseClient();

  return useMutation({
    mutationFn: async (log: Omit<MedicationLogInsert, "user_id">) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const insertData: any = {
        ...log,
        user_id: user.id,
      };

      const { data, error } = await (supabase
        .from("medication_logs") as any)
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      return data as MedicationLog;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medication-schedule"] });
      queryClient.invalidateQueries({ queryKey: ["medication-adherence"] });
    },
  });
}

export function useUpdateMedicationLog() {
  const queryClient = useQueryClient();
  const supabase = getSupabaseClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<MedicationLogInsert> }) => {
      const updateData: any = updates;

      const { data, error } = await (supabase
        .from("medication_logs") as any)
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as MedicationLog;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medication-schedule"] });
      queryClient.invalidateQueries({ queryKey: ["medication-adherence"] });
    },
  });
}

export function useMedicationAdherence(days: number = 7) {
  const supabase = getSupabaseClient();

  return useQuery({
    queryKey: ["medication-adherence", days],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const { data, error } = await (supabase
        .rpc as any)('get_medication_adherence', {
          p_user_id: user.id,
          p_days: days
        });

      if (error) throw error;
      return data || [];
    },
  });
}
