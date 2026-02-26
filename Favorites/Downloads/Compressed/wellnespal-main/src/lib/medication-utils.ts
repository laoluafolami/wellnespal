import type { MedicationFrequency } from "@/types";

export function getFrequencyLabel(frequency: MedicationFrequency): string {
  const labels: Record<MedicationFrequency, string> = {
    once_daily: "Once daily",
    twice_daily: "Twice daily",
    three_times_daily: "Three times daily",
    four_times_daily: "Four times daily",
    as_needed: "As needed",
    custom: "Custom schedule",
  };
  return labels[frequency];
}

export function getDefaultTimes(frequency: MedicationFrequency): string[] {
  const defaults: Record<MedicationFrequency, string[]> = {
    once_daily: ["08:00"],
    twice_daily: ["08:00", "20:00"],
    three_times_daily: ["08:00", "14:00", "20:00"],
    four_times_daily: ["08:00", "12:00", "16:00", "20:00"],
    as_needed: [],
    custom: [],
  };
  return defaults[frequency];
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
}

export function formatTimeRange(times: string[]): string {
  if (times.length === 0) return "As needed";
  if (times.length === 1) return formatTime(times[0]);
  
  const sortedTimes = [...times].sort();
  return `${formatTime(sortedTimes[0])} - ${formatTime(sortedTimes[sortedTimes.length - 1])}`;
}

export function getMedicationColors(): string[] {
  return [
    "#6366f1", // indigo
    "#10b981", // emerald
    "#f59e0b", // amber
    "#ef4444", // red
    "#8b5cf6", // violet
    "#06b6d4", // cyan
    "#84cc16", // lime
    "#f97316", // orange
    "#ec4899", // pink
    "#6b7280", // gray
  ];
}

export function getNextMedicationColor(existingColors: string[]): string {
  const availableColors = getMedicationColors();
  const unusedColor = availableColors.find(color => !existingColors.includes(color));
  return unusedColor || availableColors[0];
}

export function isTimeInPast(time: string, date: Date = new Date()): boolean {
  const [hours, minutes] = time.split(':').map(Number);
  const timeToday = new Date(date);
  timeToday.setHours(hours, minutes, 0, 0);
  return timeToday < date;
}

export function getAdherenceColor(percentage: number): string {
  if (percentage >= 90) return "#10b981"; // green
  if (percentage >= 70) return "#f59e0b"; // amber
  return "#ef4444"; // red
}

export function getAdherenceLabel(percentage: number): string {
  if (percentage >= 90) return "Excellent";
  if (percentage >= 70) return "Good";
  if (percentage >= 50) return "Fair";
  return "Poor";
}