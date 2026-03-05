export * from "./database";

export type BPCategory =
  | "normal"
  | "elevated"
  | "hypertension-1"
  | "hypertension-2"
  | "crisis";

export interface BPCategoryInfo {
  category: BPCategory;
  label: string;
  color: string;
  description: string;
}

export type GlucoseMeasurementType = 
  | "fasting"
  | "post_meal"
  | "random"
  | "bedtime"
  | "pre_meal";

export type GlucoseCategory =
  | "low"
  | "normal"
  | "prediabetic"
  | "diabetic"
  | "high";

export interface GlucoseCategoryInfo {
  category: GlucoseCategory;
  label: string;
  color: string;
  description: string;
}

export type MedicationFrequency = 
  | "once_daily"
  | "twice_daily" 
  | "three_times_daily"
  | "four_times_daily"
  | "as_needed"
  | "custom";

export type MedicationStatus = 
  | "pending"
  | "taken"
  | "missed"
  | "skipped";

export interface MedicationScheduleItem {
  medication_id: string;
  medication_name: string;
  dosage: string;
  scheduled_time: string;
  color: string;
  status?: MedicationStatus;
  log_id?: string;
}
