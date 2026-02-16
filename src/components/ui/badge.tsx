import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-border",
        // --- Custom Status Variants ---
        success:
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200/50",
        warning:
          "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200/50",
        info: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200/50",
        error:
          "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-200/50",
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

const getStatusVariant = (
  status: string,
): {
  variant:
    | "success"
    | "warning"
    | "info"
    | "error"
    | "default"
    | "secondary"
    | "destructive"
    | "outline";
} => {
  switch (status) {
    case "ACTIVE":
    case "DELIVERED":
    case "PLACED":
      return { variant: "success" };
    case "PROCESSING":
    case "SHIPPED":
      return { variant: "info" };
    case "INACTIVE":
      return { variant: "secondary" };
    case "CANCELLED":
    case "BANNED":
      return { variant: "error" };
    default:
      return { variant: "default" };
  }
};

export { Badge, badgeVariants, getStatusVariant };
