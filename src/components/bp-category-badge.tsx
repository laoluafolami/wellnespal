import { cn } from "@/lib/utils";
import { classifyBP, getBPCategoryStyles } from "@/lib/bp-utils";

interface BPCategoryBadgeProps {
  systolic: number;
  diastolic: number;
  showDescription?: boolean;
  className?: string;
}

export function BPCategoryBadge({
  systolic,
  diastolic,
  showDescription = false,
  className,
}: BPCategoryBadgeProps) {
  const info = classifyBP(systolic, diastolic);

  return (
    <div className={cn("inline-flex flex-col", className)}>
      <span
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
          getBPCategoryStyles(info.category)
        )}
      >
        {info.label}
      </span>
      {showDescription && (
        <span className="mt-1 text-xs text-[var(--muted-foreground)]">
          {info.description}
        </span>
      )}
    </div>
  );
}
