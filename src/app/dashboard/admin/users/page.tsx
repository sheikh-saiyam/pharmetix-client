"use client";

import DashboardPageHeader from "@/components/shared/dashboard-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge, getStatusVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useUpdateUserStatus,
  useUsers,
} from "@/features/admin/hooks/use-users";
import { UserRole } from "@/features/auth/schemas/auth.schema";
import useDebounce from "@/hooks/use-debounce";
import { IUser, UserStatus } from "@/types/user.type";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  Copy,
  MoreHorizontal,
  ShieldAlert,
  ShieldCheck,
  Store,
  User,
  UserMinus,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    undefined,
  );

  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isLoading } = useUsers({
    page,
    limit,
    role: role === "all" ? undefined : role,
    status: status === "all" ? undefined : status,
    searchTerm: debouncedSearch,
    sortBy,
    sortOrder,
  });

  const updateStatus = useUpdateUserStatus();

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const name = row.original.name;
        const imageUrl = row.original.image;

        const initials = name
          ?.split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);

        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={imageUrl || "https://ui-avatars.com/api/?name=" + name}
                alt={name}
                className="object-cover"
              />
              <AvatarFallback className="bg-muted text-xs font-semibold">
                {initials || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-sm leading-none">{name}</span>
              {/* Optional: Add email below for better UX */}
              <span className="text-xs text-muted-foreground">
                {row.original.email}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.original.role.toUpperCase();

        const roleConfig = {
          ADMIN: {
            icon: <ShieldCheck className="w-4 h-4" />,
            color:
              "text-rose-600 bg-rose-50 dark:bg-rose-950/30 border border-rose-100",
            label: "Admin",
          },
          SELLER: {
            icon: <Store className="w-4 h-4" />,
            color:
              "text-amber-600 bg-amber-50 dark:bg-amber-950/30 border border-amber-100",
            label: "Seller",
          },
          CUSTOMER: {
            icon: <User className="w-4 h-4" />,
            color:
              "text-blue-600 bg-blue-50 dark:bg-blue-950/30 border border-blue-100",
            label: "Customer",
          },
        };

        // Fallback for unexpected roles
        const config = roleConfig[role as keyof typeof roleConfig] || {
          icon: <User className="w-4 h-4" />,
          color: "text-gray-600 bg-gray-50",
          label: role,
        };

        return (
          <div
            className={`flex items-center gap-2 w-fit px-2 py-1 rounded-md font-medium text-xs ${config.color}`}
          >
            {config.icon}
            {config.label}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={getStatusVariant(row.original.status).variant}
          className="capitalize"
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Joined At" />
      ),
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => (
        <div className="text-right pr-4 font-semibold">Actions</div>
      ),
      cell: ({ row }) => {
        const user = row.original;

        const onStatusChange = (newStatus: UserStatus) => {
          // 1. Create a loading toast and capture its ID
          const toastId = toast.loading("Updating user status...");

          updateStatus.mutate(
            {
              userId: user.id,
              status: newStatus,
            },
            {
              onSuccess: () => {
                toast.success("User status updated", { id: toastId });
              },
            },
          );
        };

        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 hover:bg-muted data-[state=open]:bg-muted"
                >
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>User Management</DropdownMenuLabel>

                <DropdownMenuItem
                  onClick={() => {
                    navigator.clipboard.writeText(user.id);
                    toast.success("User ID copied");
                  }}
                  className="cursor-pointer"
                >
                  <Copy className="mr-2 h-4 w-4 text-muted-foreground" />
                  Copy User ID
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Set to Active */}
                <DropdownMenuItem
                  disabled={user.status === UserStatus.ACTIVE}
                  onClick={() => onStatusChange(UserStatus.ACTIVE)}
                  className="cursor-pointer text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50 dark:focus:bg-emerald-950/30"
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Activate Account
                </DropdownMenuItem>

                {/* Set to Inactive */}
                <DropdownMenuItem
                  disabled={user.status === UserStatus.INACTIVE}
                  onClick={() => onStatusChange(UserStatus.INACTIVE)}
                  className="cursor-pointer text-amber-600 focus:text-amber-600 focus:bg-amber-50 dark:focus:bg-amber-950/30"
                >
                  <UserMinus className="mr-2 h-4 w-4" />
                  Deactivate Account
                </DropdownMenuItem>

                {/* Set to Banned */}
                <DropdownMenuItem
                  disabled={user.status === UserStatus.BANNED}
                  onClick={() => onStatusChange(UserStatus.BANNED)}
                  className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                  <ShieldAlert className="mr-2 h-4 w-4" />
                  Ban User
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Manage Users"
        description="Manage all users in the Pharmetix platform"
        Icon={Users}
      />

      <DataTable
        columns={columns}
        data={data?.data || []}
        meta={data?.meta}
        isLoading={isLoading}
        onPageChange={setPage}
        onLimitChange={setLimit}
        onSearch={setSearchTerm}
        onSort={(sortBy, sortOrder) => {
          setSortBy(sortBy);
          setSortOrder(sortOrder);
        }}
        renderTopContent={() => (
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Select value={role ?? "all"} onValueChange={setRole}>
                <SelectTrigger className="w-[150px] text-xs font-medium">
                  <SelectValue placeholder="Filter by Role" />
                </SelectTrigger>
                <SelectContent className="text-xs font-medium">
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                  <SelectItem value={UserRole.SELLER}>Seller</SelectItem>
                  <SelectItem value={UserRole.CUSTOMER}>Customer</SelectItem>
                </SelectContent>
              </Select>

              <Select value={status ?? "all"} onValueChange={setStatus}>
                <SelectTrigger className="w-[150px] text-xs font-medium">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent className="text-xs font-medium">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value={UserStatus.ACTIVE}>Active</SelectItem>
                  <SelectItem value={UserStatus.INACTIVE}>Inactive</SelectItem>
                  <SelectItem value={UserStatus.BANNED}>Banned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        emptyState={{
          icon: Users,
          title: "No users found",
          description:
            "No users match your current filters. Try adjusting your search or filters.",
        }}
      />
    </div>
  );
}
