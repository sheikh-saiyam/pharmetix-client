import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 overflow-hidden",
  {
    variants: {
      variant: {
        // --- Standard Shadcn UI Variants ---
        default:
          "bg-primary text-primary-foreground hover:bg-primary/80 border-transparent",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent",
        destructive:
          "bg-destructive text-white hover:bg-destructive/80 border-transparent",
        outline: "text-foreground border-border",

        // --- Legacy/Generic Semantic Variants (Kept for compatibility) ---
        success:
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200/50",
        warning:
          "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200/50",
        info: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200/50",
        error:
          "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-200/50",

        // --- New Custom Order Specific Variants ---
        placed:
          "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400",
        processing:
          "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400",
        shipped:
          "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400",
        delivered:
          "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400",
        cancelled:
          "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400",
        banned:
          "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

/**
 * Maps a status string to a specific badge variant.
 * Designed to handle both User and Order statuses.
 */
const getStatusVariant = (
  status: string,
): {
  variant:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "warning"
    | "info"
    | "error"
    | "placed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "banned";
} => {
  const normalizedStatus = status?.toUpperCase();

  switch (normalizedStatus) {
    // Order Statuses
    case "PLACED":
      return { variant: "placed" };
    case "PROCESSING":
      return { variant: "processing" };
    case "SHIPPED":
      return { variant: "shipped" };
    case "DELIVERED":
      return { variant: "delivered" };
    case "CANCELLED":
      return { variant: "cancelled" };

    // User / Account Statuses
    case "ACTIVE":
      return { variant: "success" };
    case "INACTIVE":
      return { variant: "secondary" };
    case "BANNED":
      return { variant: "banned" };
    case "ERROR":
      return { variant: "error" };

    default:
      return { variant: "default" };
  }
};

export { Badge, badgeVariants, getStatusVariant };
