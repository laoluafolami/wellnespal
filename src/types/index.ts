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
