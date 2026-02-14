"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  HeartPulse,
  Baby,
  Sparkles,
  Stethoscope,
  Tablet,
  Thermometer,
  Trees,
  User,
} from "lucide-react";

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const categories = [
    { name: "Medicines", icon: Tablet, href: "/medicines" },
    {
      name: "Women's Choice",
      icon: HeartPulse,
      href: "/category/womens-choice",
    },
    { name: "Baby Care", icon: Baby, href: "/category/baby-care" },
    { name: "Beauty & Care", icon: Sparkles, href: "/category/beauty-care" },
    {
      name: "Health & Wellness",
      icon: Stethoscope,
      href: "/category/health-wellness",
    },
    {
      name: "Medical Devices",
      icon: Thermometer,
      href: "/category/medical-devices",
    },
    { name: "Herbal & Homeopathy", icon: Trees, href: "/category/herbal" },
    { name: "Personal Care", icon: User, href: "/category/personal-care" },
  ];

  return (
    <div className={cn("hidden lg:block w-64 shrink-0 pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Categories
          </h2>
          <ScrollArea className="h-[calc(100vh-10rem)] px-1">
            <div className="space-y-1 p-2">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant="ghost"
                  className="w-full justify-start font-normal hover:bg-muted/50 hover:text-primary transition-colors"
                  asChild
                >
                  <Link href={category.href}>
                    <category.icon className="mr-2 h-4 w-4" />
                    {category.name}
                  </Link>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
