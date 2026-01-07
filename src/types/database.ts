export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
  public: {
    Tables: {
      readings: {
        Row: {
          id: string;
          user_id: string;
          systolic: number;
          diastolic: number;
          pulse: number | null;
          measured_at: string;
          arm: string;
          position: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          systolic: number;
          diastolic: number;
          pulse?: number | null;
          measured_at?: string;
          arm?: string;
          position?: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          systolic?: number;
          diastolic?: number;
          pulse?: number | null;
          measured_at?: string;
          arm?: string;
          position?: string;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "readings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      glucose_readings: {
        Row: {
          id: string;
          user_id: string;
          glucose_value: number;
          measurement_type: string;
          measured_at: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          glucose_value: number;
          measurement_type: string;
          measured_at?: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          glucose_value?: number;
          measurement_type?: string;
          measured_at?: string;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "glucose_readings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_settings: {
        Row: {
          id: string;
          user_id: string;
          glucose_monitoring_enabled: boolean;
          medication_reminders_enabled: boolean;
          bp_reminder_enabled: boolean;
          bp_reminder_frequency: string;
          bp_reminder_times: string[];
          glucose_reminder_enabled: boolean;
          glucose_reminder_frequency: string;
          glucose_reminder_times: string[];
          browser_notifications_enabled: boolean;
          email_reminders_enabled: boolean;
          sound_alerts_enabled: boolean;
          vibration_enabled: boolean;
          reminder_lead_time: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          glucose_monitoring_enabled?: boolean;
          medication_reminders_enabled?: boolean;
          bp_reminder_enabled?: boolean;
          bp_reminder_frequency?: string;
          bp_reminder_times?: string[];
          glucose_reminder_enabled?: boolean;
          glucose_reminder_frequency?: string;
          glucose_reminder_times?: string[];
          browser_notifications_enabled?: boolean;
          email_reminders_enabled?: boolean;
          sound_alerts_enabled?: boolean;
          vibration_enabled?: boolean;
          reminder_lead_time?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          glucose_monitoring_enabled?: boolean;
          medication_reminders_enabled?: boolean;
          bp_reminder_enabled?: boolean;
          bp_reminder_frequency?: string;
          bp_reminder_times?: string[];
          glucose_reminder_enabled?: boolean;
          glucose_reminder_frequency?: string;
          glucose_reminder_times?: string[];
          browser_notifications_enabled?: boolean;
          email_reminders_enabled?: boolean;
          sound_alerts_enabled?: boolean;
          vibration_enabled?: boolean;
          reminder_lead_time?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_settings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      medications: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          dosage: string;
          frequency: string;
          times: string[];
          start_date: string;
          end_date: string | null;
          notes: string | null;
          color: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          dosage: string;
          frequency: string;
          times: string[];
          start_date?: string;
          end_date?: string | null;
          notes?: string | null;
          color?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          dosage?: string;
          frequency?: string;
          times?: string[];
          start_date?: string;
          end_date?: string | null;
          notes?: string | null;
          color?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "medications_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      medication_logs: {
        Row: {
          id: string;
          user_id: string;
          medication_id: string;
          scheduled_time: string;
          taken_at: string | null;
          status: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          medication_id: string;
          scheduled_time: string;
          taken_at?: string | null;
          status?: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          medication_id?: string;
          scheduled_time?: string;
          taken_at?: string | null;
          status?: string;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "medication_logs_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "medication_logs_medication_id_fkey";
            columns: ["medication_id"];
            isOneToOne: false;
            referencedRelation: "medications";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Reading = Database["public"]["Tables"]["readings"]["Row"];
export type ReadingInsert = Database["public"]["Tables"]["readings"]["Insert"];
export type ReadingUpdate = Database["public"]["Tables"]["readings"]["Update"];

export type GlucoseReading = Database["public"]["Tables"]["glucose_readings"]["Row"];
export type GlucoseReadingInsert = Database["public"]["Tables"]["glucose_readings"]["Insert"];
export type GlucoseReadingUpdate = Database["public"]["Tables"]["glucose_readings"]["Update"];

export type UserSettings = Database["public"]["Tables"]["user_settings"]["Row"];
export type UserSettingsInsert = Database["public"]["Tables"]["user_settings"]["Insert"];
export type UserSettingsUpdate = Database["public"]["Tables"]["user_settings"]["Update"];

export type Medication = Database["public"]["Tables"]["medications"]["Row"];
export type MedicationInsert = Database["public"]["Tables"]["medications"]["Insert"];
export type MedicationUpdate = Database["public"]["Tables"]["medications"]["Update"];

export type MedicationLog = Database["public"]["Tables"]["medication_logs"]["Row"];
export type MedicationLogInsert = Database["public"]["Tables"]["medication_logs"]["Insert"];
export type MedicationLogUpdate = Database["public"]["Tables"]["medication_logs"]["Update"];
