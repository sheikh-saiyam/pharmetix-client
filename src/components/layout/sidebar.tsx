"use client";

import Logo from "@/assets/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { signOut } from "@/lib/auth-client";
import { UserRole } from "@/types/user.type";
import {
  ChevronsUpDown,
  Home,
  LayoutDashboard,
  ListOrdered,
  LogOut,
  Package,
  Pill,
  ShoppingBag,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function AppSidebar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  if (!user) return null;
  const role = user.role;

  const managementItems = [
    {
      title: "Dashboard",
      href: `/dashboard/${role?.toLowerCase()}`,
      icon: LayoutDashboard,
      roles: [UserRole.SELLER, UserRole.ADMIN],
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
  ].filter((item) => item.roles.includes(role as UserRole));

  const publicItems = [
    { title: "Home", href: "/", icon: Home },
    { title: "All Medicines", href: "/medicines", icon: Pill },
    { title: "Shop", href: "/medicines", icon: ShoppingBag },
  ];

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="border-r">
      <SidebarHeader>
        <div className="flex flex-col gap-3 px-4 py-4">
          <Link
            href="/"
            className="flex items-center justify-center rounded-lg w-full object-cover select-none"
          >
            <Image
              src={Logo}
              alt="Logo"
              width={1080}
              height={720}
              className="rounded-sm w-full h-[60px]"
            />
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarMenu>
            {managementItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={pathname === item.href}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Public Routes Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Quick Links</SidebarGroupLabel>
          <SidebarMenu>
            {publicItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={pathname === item.href}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-slate-200 text-slate-700 font-bold text-xs">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold">
                      {user.email?.split("@")[0]}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-slate-200 text-slate-700 font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold text-black">
                        My Account
                      </span>
                      <span className="truncate text-sm text-muted-foreground">
                        {role}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard/profile"
                      className="cursor-pointer w-full flex items-center"
                    >
                      <User className="mr-0.5 size-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    router.push("/");
                    router.refresh();
                    signOut();
                  }}
                  className="text-destructive cursor-pointer focus:bg-destructive/10 focus:text-destructive"
                >
                  <LogOut className="mr-0.5 size-4 mt-0.5 focus:text-destructive" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
