"use client";

import DashboardPageHeader from "@/components/shared/dashboard-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useDeleteUser,
  useUpdateUserRole,
  useUpdateUserStatus,
  useUsers,
} from "@/features/admin/hooks/use-users";
import { UserRole } from "@/features/auth/schemas/auth.schema";
import { UserStatus } from "@/types/user.type";
import { MoreHorizontal, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "@/types/user.type";
import { useState } from "react";
import useDebounce from "@/hooks/use-debounce";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
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
  const updateRole = useUpdateUserRole();
  const deleteUser = useDeleteUser();

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.original.role}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.status === UserStatus.ACTIVE
              ? "default"
              : "destructive"
          }
          className="capitalize"
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Action</div>,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() =>
                    updateStatus.mutate({
                      userId: user.id,
                      isActive: user.status !== UserStatus.ACTIVE,
                    })
                  }
                >
                  {user.status === UserStatus.ACTIVE
                    ? "Ban User"
                    : "Activate User"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  disabled={user.role === UserRole.ADMIN}
                  onClick={() =>
                    updateRole.mutate({
                      userId: user.id,
                      role: UserRole.ADMIN,
                    })
                  }
                >
                  Make Admin
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={user.role === UserRole.SELLER}
                  onClick={() =>
                    updateRole.mutate({
                      userId: user.id,
                      role: UserRole.SELLER,
                    })
                  }
                >
                  Make Seller
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={user.role === UserRole.CUSTOMER}
                  onClick={() =>
                    updateRole.mutate({
                      userId: user.id,
                      role: UserRole.CUSTOMER,
                    })
                  }
                >
                  Make Customer
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive font-medium"
                  onClick={() => deleteUser.mutate(user.id)}
                >
                  Delete User
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
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                  <SelectItem value={UserRole.SELLER}>Seller</SelectItem>
                  <SelectItem value={UserRole.CUSTOMER}>Customer</SelectItem>
                </SelectContent>
              </Select>

              <Select value={status ?? "all"} onValueChange={setStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value={UserStatus.ACTIVE}>Active</SelectItem>
                  <SelectItem value={UserStatus.INACTIVE}>Inactive</SelectItem>
                  <SelectItem value={UserStatus.BANNED}>Banned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      />
    </div>
  );
}
