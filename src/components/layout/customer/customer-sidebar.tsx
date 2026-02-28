"use client";

import { cn } from "@/lib/utils";
import { IUser } from "@/types/user.type";
import {
  FileText,
  Lock,
  ShieldCheck,
  ShoppingBag,
  Stethoscope,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

const sidebarItems = [
  {
    title: "My Profile",
    href: "/customer/profile",
    icon: User,
  },
  {
    title: "My Orders",
    href: "/customer/orders",
    icon: ShoppingBag,
  },
  {
    title: "My Cart",
    href: "/cart",
    icon: ShoppingBag,
  },
  {
    title: "Health Tips",
    href: "/blogs",
    icon: Stethoscope,
  },
  {
    title: "Legal & Support",
    href: "/support",
    icon: ShieldCheck,
  },
  {
    title: "Terms & Conditions",
    href: "/terms",
    icon: FileText,
  },
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
    icon: Lock,
  },
];

export function CustomerSidebar({ user }: { user: IUser }) {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 lg:sticky h-fit top-36 space-y-2">
      <div className="bg-white shadow-lg shadow-muted rounded-md border overflow-hidden">
        <div className="p-4 border-b mb-4 flex items-center gap-3">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={user.image || ""} />
            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-slate-800">{user.name}</p>
            <p className="font-bold text-slate-700 text-xs -mt-0.5">
              {user.email}
            </p>
          </div>
        </div>
        <nav className="flex flex-col">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-slate-50 border-b last:border-0",
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "bg-primary/5 text-primary border-l-4 border-l-primary"
                  : "text-slate-600 border-l-4 border-l-transparent hover:border-l-slate-200",
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4",
                  pathname === item.href ? "text-primary" : "text-slate-400",
                )}
              />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
