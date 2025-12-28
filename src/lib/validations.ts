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
