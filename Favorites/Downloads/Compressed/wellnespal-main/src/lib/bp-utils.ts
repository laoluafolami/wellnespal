import type { BPCategory, BPCategoryInfo } from "@/types";

export function classifyBP(systolic: number, diastolic: number): BPCategoryInfo {
  // Based on American Heart Association guidelines
  if (systolic > 180 || diastolic > 120) {
    return {
      category: "crisis",
      label: "Hypertensive Crisis",
      color: "#7f1d1d", // red-900
      description: "Seek emergency care immediately",
    };
  }

  if (systolic >= 140 || diastolic >= 90) {
    return {
      category: "hypertension-2",
      label: "High BP Stage 2",
      color: "#dc2626", // red-600
      description: "Consult your doctor",
    };
  }

  if (systolic >= 130 || diastolic >= 80) {
    return {
      category: "hypertension-1",
      label: "High BP Stage 1",
      color: "#ea580c", // orange-600
      description: "Lifestyle changes recommended",
    };
  }

  if (systolic >= 120 && diastolic < 80) {
    return {
      category: "elevated",
      label: "Elevated",
      color: "#ca8a04", // yellow-600
      description: "Monitor and maintain healthy habits",
    };
  }

  return {
    category: "normal",
    label: "Normal",
    color: "#16a34a", // green-600
    description: "Keep up the good work!",
  };
}

export function formatBPReading(systolic: number, diastolic: number): string {
  return `${systolic}/${diastolic}`;
}

export function getBPCategoryStyles(category: BPCategory): string {
  const styles: Record<BPCategory, string> = {
    normal: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    elevated: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    "hypertension-1": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    "hypertension-2": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    crisis: "bg-red-200 text-red-900 dark:bg-red-950 dark:text-red-100",
  };
  return styles[category];
}
