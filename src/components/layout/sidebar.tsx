"use client";

import Link from "next/link";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { UserRole } from "@/features/auth/schemas/auth.schema";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  ListOrdered,
  Star,
  ShieldAlert,
  Settings,
  Pill,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const role = user.role;

  const links = [
    {
      title: "Dashboard",
      href: "/customer",
      icon: LayoutDashboard,
      roles: [UserRole.CUSTOMER],
    },
    {
      title: "My Orders",
      href: "/customer/orders",
      icon: ShoppingBag,
      roles: [UserRole.CUSTOMER],
    },
    {
      title: "Dashboard",
      href: "/dashboard/seller",
      icon: LayoutDashboard,
      roles: [UserRole.SELLER],
    },
    {
      title: "Manage Medicines",
      href: "/dashboard/seller/medicines",
      icon: Pill,
      roles: [UserRole.SELLER],
    },
    {
      title: "Seller Orders",
      href: "/dashboard/seller/orders",
      icon: ListOrdered,
      roles: [UserRole.SELLER],
    },
    {
      title: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
      roles: [UserRole.ADMIN],
    },
    {
      title: "Manage Users",
      href: "/dashboard/admin/users",
      icon: Users,
      roles: [UserRole.ADMIN],
    },
    {
      title: "Categories",
      href: "/dashboard/admin/categories",
      icon: Package,
      roles: [UserRole.ADMIN],
    },
  ];

  const filteredLinks = links.filter((link) =>
    link.roles.includes(role as any),
  );

  return (
    <aside className="w-64 border-r bg-muted/20 min-h-screen p-4">
      <div className="mb-8 px-4 py-2">
        <h2 className="text-xl font-bold tracking-tight text-primary">
          Pharmetix
        </h2>
        <p className="text-sm text-muted-foreground capitalize">
          {role?.toLowerCase()} Panel
        </p>
      </div>
      <nav className="space-y-1">
        {filteredLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
              pathname === link.href
                ? "bg-muted text-foreground"
                : "text-muted-foreground",
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
