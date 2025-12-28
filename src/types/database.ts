export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
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
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}

export type Reading = Database["public"]["Tables"]["readings"]["Row"];
export type ReadingInsert = Database["public"]["Tables"]["readings"]["Insert"];
export type ReadingUpdate = Database["public"]["Tables"]["readings"]["Update"];
