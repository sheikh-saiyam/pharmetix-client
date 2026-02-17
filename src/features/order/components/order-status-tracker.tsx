"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, ShoppingBag, Truck, XCircle } from "lucide-react";
import { OrderStatus } from "../order.type";

interface OrderStatusTrackerProps {
  status: string;
}

const statusSteps = [
  {
    status: OrderStatus.PLACED,
    label: "Order Placed",
    icon: ShoppingBag,
    description: "Your order has been received",
  },
  {
    status: OrderStatus.PROCESSING,
    label: "Processing",
    icon: Clock,
    description: "Preparing your items",
  },
  {
    status: OrderStatus.SHIPPED,
    label: "Shipped",
    icon: Truck,
    description: "On its way to you",
  },
  {
    status: OrderStatus.DELIVERED,
    label: "Delivered",
    icon: CheckCircle2,
    description: "Packet received",
  },
];

export function OrderStatusTracker({ status }: OrderStatusTrackerProps) {
  const isCancelled = status === OrderStatus.CANCELLED;

  // Find current step index
  const currentStepIndex = statusSteps.findIndex(
    (step) => step.status === status,
  );

  // If status is not in steps (e.g. CANCELLED), we handle it specially
  if (isCancelled) {
    return (
      <div className="bg-red-50 border border-red-100 rounded-[2rem] p-8 flex items-center justify-center gap-6">
        <div className="p-4 bg-red-100 rounded-full">
          <XCircle className="h-10 w-10 text-red-600" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-black text-red-900 leading-none">
            Order Cancelled
          </h3>
          <p className="text-red-700/70 font-medium">
            This order was cancelled and will not be processed further.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full py-8">
      {/* Progress Line */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 rounded-full overflow-hidden hidden md:block">
        <div
          className="h-full bg-primary/60 transition-all duration-1000 ease-out"
          style={{
            width: `${(Math.max(0, currentStepIndex) / (statusSteps.length - 1)) * 100}%`,
          }}
        />
      </div>

      <div className="relative flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
        {statusSteps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted =
            index < currentStepIndex ||
            (index === currentStepIndex && status === OrderStatus.DELIVERED);
          const isActive = index === currentStepIndex;

          return (
            <div
              key={step.status}
              className="flex flex-col items-center text-center space-y-3 relative z-10 w-full md:w-auto px-4"
            >
              <div
                className={cn(
                  "h-14 w-14 rounded-full flex items-center justify-center border-4 transition-all duration-500 shadow-xl",
                  isCompleted
                    ? "bg-primary/20 border-primary/20 text-primary animate-pulse"
                    : isActive
                      ? "bg-white border-primary/40 text-primary scale-110 ring-4 ring-primary/5"
                      : "bg-white border-slate-100 text-slate-300",
                )}
              >
                {isCompleted && index !== currentStepIndex ? (
                  <CheckCircle2 className="h-6 w-6 stroke-[3px]" />
                ) : (
                  <Icon
                    className={cn(
                      "h-6 w-6",
                      isActive ? "stroke-[2.5px]" : "stroke-[2px]",
                    )}
                  />
                )}
              </div>

              <div className="space-y-1 max-w-[150px]">
                <p
                  className={cn(
                    "text-[10px] font-black tracking-widest uppercase",
                    isActive || isCompleted ? "text-primary" : "text-slate-400",
                  )}
                >
                  {step.label}
                </p>
                <p className="text-[10px] text-slate-400 font-medium leading-tight">
                  {step.description}
                </p>
              </div>

              {/* Mobile connecting line */}
              {index < statusSteps.length - 1 && (
                <div className="md:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-100" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
