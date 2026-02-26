import type { GlucoseCategory, GlucoseCategoryInfo, GlucoseMeasurementType } from "@/types";

export function classifyGlucose(value: number, measurementType: GlucoseMeasurementType): GlucoseCategoryInfo {
  // Based on American Diabetes Association guidelines (mg/dL)
  
  if (value < 70) {
    return {
      category: "low",
      label: "Low",
      color: "#dc2626", // red-600
      description: "Hypoglycemia - treat immediately",
    };
  }

  switch (measurementType) {
    case "fasting":
    case "pre_meal":
      if (value <= 99) {
        return {
          category: "normal",
          label: "Normal",
          color: "#16a34a", // green-600
          description: "Healthy fasting glucose",
        };
      }
      if (value <= 125) {
        return {
          category: "prediabetic",
          label: "Prediabetic",
          color: "#ca8a04", // yellow-600
          description: "Impaired fasting glucose",
        };
      }
      return {
        category: "diabetic",
        label: "Diabetic Range",
        color: "#dc2626", // red-600
        description: "Consult your healthcare provider",
      };

    case "post_meal":
      if (value < 140) {
        return {
          category: "normal",
          label: "Normal",
          color: "#16a34a", // green-600
          description: "Healthy post-meal glucose",
        };
      }
      if (value <= 199) {
        return {
          category: "prediabetic",
          label: "Prediabetic",
          color: "#ca8a04", // yellow-600
          description: "Impaired glucose tolerance",
        };
      }
      return {
        category: "diabetic",
        label: "Diabetic Range",
        color: "#dc2626", // red-600
        description: "Consult your healthcare provider",
      };

    case "random":
    case "bedtime":
      if (value < 140) {
        return {
          category: "normal",
          label: "Normal",
          color: "#16a34a", // green-600
          description: "Healthy glucose level",
        };
      }
      if (value <= 199) {
        return {
          category: "prediabetic",
          label: "Elevated",
          color: "#ca8a04", // yellow-600
          description: "Monitor closely",
        };
      }
      return {
        category: "diabetic",
        label: "High",
        color: "#dc2626", // red-600
        description: "Consult your healthcare provider",
      };

    default:
      return {
        category: "normal",
        label: "Normal",
        color: "#16a34a",
        description: "Healthy glucose level",
      };
  }
}

export function formatGlucoseReading(value: number): string {
  return `${value} mg/dL`;
}

export function getGlucoseCategoryStyles(category: GlucoseCategory): string {
  const styles: Record<GlucoseCategory, string> = {
    low: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    normal: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    prediabetic: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    diabetic: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    high: "bg-red-200 text-red-900 dark:bg-red-950 dark:text-red-100",
  };
  return styles[category];
}

export function getMeasurementTypeLabel(type: GlucoseMeasurementType): string {
  const labels: Record<GlucoseMeasurementType, string> = {
    fasting: "Fasting",
    post_meal: "Post-Meal",
    pre_meal: "Pre-Meal",
    random: "Random",
    bedtime: "Bedtime",
  };
  return labels[type];
}