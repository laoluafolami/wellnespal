"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";
import type { UserSettings, UserSettingsUpdate } from "@/types";

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}

export function useUserSettings() {
  const supabase = getSupabaseClient();

  return useQuery({
    queryKey: ["user-settings"],
    queryFn: async (): Promise<UserSettings> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const { data: settings, error } = await supabase
        .from("user_settings")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code === 'PGRST116') {
        const defaultSettings: any = {
          user_id: user.id,
          glucose_monitoring_enabled: false,
          medication_reminders_enabled: true,
          bp_reminder_enabled: true,
          bp_reminder_frequency: 'daily',
          bp_reminder_times: ['09:00', '21:00'],
          glucose_reminder_enabled: true,
          glucose_reminder_frequency: 'daily',
          glucose_reminder_times: ['08:00', '12:00', '18:00'],
          browser_notifications_enabled: false,
          email_reminders_enabled: false,
          sound_alerts_enabled: true,
          vibration_enabled: true,
          reminder_lead_time: 5,
        };

        const { data: newSettings, error: insertError } = await (supabase
          .from("user_settings") as any)
          .insert(defaultSettings)
          .select()
          .single();

        if (insertError) {
          console.error('Failed to create default settings:', insertError);
          throw insertError;
        }
        
        return newSettings as UserSettings;
      }

      if (error) throw error;
      return settings as UserSettings;
    },
  });
}

export function useUpdateUserSettings() {
  const queryClient = useQueryClient();
  const supabase = getSupabaseClient();

  return useMutation({
    mutationFn: async (updates: Partial<UserSettingsUpdate>) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const updateData: any = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await (supabase
        .from("user_settings") as any)
        .update(updateData)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      return data as UserSettings;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-settings"] });
    },
  });
}
