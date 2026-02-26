import { z } from "zod";

export const readingSchema = z.object({
  systolic: z
    .number()
    .min(60, "Systolic must be at least 60")
    .max(250, "Systolic must be at most 250"),
  diastolic: z
    .number()
    .min(40, "Diastolic must be at least 40")
    .max(150, "Diastolic must be at most 150"),
  pulse: z
    .number()
    .min(30, "Pulse must be at least 30")
    .max(220, "Pulse must be at most 220")
    .optional()
    .nullable(),
  measured_at: z.string().optional(),
  arm: z.enum(["left", "right"]).default("left"),
  position: z.enum(["sitting", "standing", "lying"]).default("sitting"),
  notes: z.string().max(500, "Notes must be 500 characters or less").optional().nullable(),
});

export type ReadingFormData = z.infer<typeof readingSchema>;

export const glucoseReadingSchema = z.object({
  glucose_value: z
    .number()
    .min(20, "Glucose value must be at least 20 mg/dL")
    .max(600, "Glucose value must be at most 600 mg/dL"),
  measurement_type: z.enum(["fasting", "post_meal", "random", "bedtime", "pre_meal"]),
  measured_at: z.string().optional(),
  notes: z.string().max(500, "Notes must be 500 characters or less").optional().nullable(),
});

export type GlucoseReadingFormData = z.infer<typeof glucoseReadingSchema>;

export const medicationSchema = z.object({
  name: z.string().min(1, "Medication name is required").max(100, "Name must be 100 characters or less"),
  dosage: z.string().min(1, "Dosage is required").max(50, "Dosage must be 50 characters or less"),
  frequency: z.enum(["once_daily", "twice_daily", "three_times_daily", "four_times_daily", "as_needed", "custom"]),
  times: z.array(z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format")).min(0).max(10),
  start_date: z.string().optional(),
  end_date: z.string().optional().nullable(),
  notes: z.string().max(500, "Notes must be 500 characters or less").optional().nullable(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format").optional(),
});

export type MedicationFormData = z.infer<typeof medicationSchema>;

export const medicationLogSchema = z.object({
  medication_id: z.string().uuid("Invalid medication ID"),
  scheduled_time: z.string(),
  taken_at: z.string().optional().nullable(),
  status: z.enum(["pending", "taken", "missed", "skipped"]),
  notes: z.string().max(200, "Notes must be 200 characters or less").optional().nullable(),
});

export type MedicationLogFormData = z.infer<typeof medicationLogSchema>;

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
