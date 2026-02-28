import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  className?: string;
  /** Size variant – "sm" fits inside small card sections, "md" (default) for larger areas */
  size?: "sm" | "md";
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  className,
  size = "md",
}: EmptyStateProps) {
  const isSm = size === "sm";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        isSm ? "py-6 gap-2" : "py-12 gap-3",
        className,
      )}
    >
      <div
        className={cn(
          "rounded-full bg-muted flex items-center justify-center",
          isSm ? "h-10 w-10" : "h-16 w-16",
        )}
      >
        <Icon
          className={cn("text-muted-foreground", isSm ? "h-5 w-5" : "h-7 w-7")}
          strokeWidth={1.5}
        />
      </div>
      <div className="space-y-1">
        <p
          className={cn(
            "font-semibold text-foreground",
            isSm ? "text-sm" : "text-base",
          )}
        >
          {title}
        </p>
        {description && (
          <p
            className={cn(
              "text-muted-foreground",
              isSm ? "text-xs" : "text-sm",
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
