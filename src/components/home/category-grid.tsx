import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pill,
  Baby,
  Sparkles,
  Heart,
  Activity,
  Apple,
  Dumbbell,
} from "lucide-react";

export function CategoryGrid() {
  const categories = [
    {
      name: "Medicines",
      icon: Pill,
      color: "text-blue-500",
      bg: "bg-blue-100",
      href: "/medicines",
    },
    {
      name: "Women's Choice",
      icon: Heart,
      color: "text-pink-500",
      bg: "bg-pink-100",
      href: "/category/womens-choice",
    },
    {
      name: "Baby Care",
      icon: Baby,
      color: "text-purple-500",
      bg: "bg-purple-100",
      href: "/category/baby-care",
    },
    {
      name: "Beauty & Care",
      icon: Sparkles,
      color: "text-amber-500",
      bg: "bg-amber-100",
      href: "/category/beauty-care",
    },
    {
      name: "Health Devices",
      icon: Activity,
      color: "text-red-500",
      bg: "bg-red-100",
      href: "/category/devices",
    },
    {
      name: "Nutrition",
      icon: Apple,
      color: "text-green-500",
      bg: "bg-green-100",
      href: "/category/nutrition",
    },
    {
      name: "Fitness",
      icon: Dumbbell,
      color: "text-cyan-500",
      bg: "bg-cyan-100",
      href: "/category/fitness",
    },
  ];

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Shop by Category</h2>
        <Link
          href="/categories"
          className="text-sm font-medium text-primary hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-none shadow-sm bg-muted/20 hover:bg-muted/40">
              <CardContent className="flex flex-col items-center justify-center p-6 gap-3 text-center">
                <div
                  className={`p-3 rounded-full ${category.bg} ${category.color}`}
                >
                  <category.icon className="h-6 w-6" />
                </div>
                <span className="font-medium text-sm">{category.name}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
