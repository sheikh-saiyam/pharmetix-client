"use client";

import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  BarChart3,
  Box,
  CheckCircle2,
  DollarSign,
  Package,
  ShoppingBag,
  TrendingUp,
  Truck,
} from "lucide-react";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { dashboardService } from "@/features/dashboard/services/dashboard.service";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ISellerStatsData } from "@/features/dashboard/dashboard.type";

export default function SellerDashboardPage() {
  const { data: response, isLoading } = useQuery({
    queryKey: ["seller-stats"],
    queryFn: dashboardService.getSellerStats,
  });

  const stats: ISellerStatsData | undefined = response?.data;

  // Process chart data
  const revenueData = useMemo(() => {
    return stats?.orderItemsPerDay.map((item) => ({
      name: new Date(item.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      }),
      revenue: item.revenue,
      items: item.ordersCount,
    }));
  }, [stats]);

  if (isLoading) return <SellerDashboardSkeleton />;
  if (!stats)
    return (
      <div className="p-8 text-center text-destructive">
        Failed to load seller analytics.
      </div>
    );

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Seller Hub</h2>
          <p className="text-muted-foreground">
            Manage your pharmacy inventory and track sales performance.
          </p>
        </div>
        <Badge
          variant="secondary"
          className="h-8 px-4 py-1 flex gap-2 items-center bg-blue-50 text-blue-700"
        >
          <CheckCircle2 className="h-4 w-4" />
          Verified Seller Account
        </Badge>
      </div>

      {/* --- KPI SECTION --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SellerStatCard
          title="Total Earnings"
          value={`৳${stats.orderItemsStats.totalRevenue.toLocaleString()}`}
          description="Lifetime sales revenue"
          icon={<DollarSign className="h-4 w-4 text-emerald-600" />}
          color="bg-emerald-50"
        />
        <SellerStatCard
          title="Total Orders"
          value={stats.orderItemsStats.totalOrderItems.toString()}
          description="Total items ordered"
          icon={<ShoppingBag className="h-4 w-4 text-blue-600" />}
          color="bg-blue-50"
        />
        <SellerStatCard
          title="Stock Alerts"
          value={(
            stats.medicineStats.lowStockMedicines.length +
            stats.medicineStats.outOfStockMedicines.length
          ).toString()}
          description="Critical items needing attention"
          icon={<AlertTriangle className="h-4 w-4 text-amber-600" />}
          color="bg-amber-50"
        />
        <SellerStatCard
          title="Active Medicines"
          value={stats.medicineStats.totalActiveMedicines.toString()}
          description={`${stats.medicineStats.totalMedicines} total listed`}
          icon={<Box className="h-4 w-4 text-purple-600" />}
          color="bg-purple-50"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        {/* --- REVENUE CHART --- */}
        <Card className="md:col-span-4 shadow-lg shadow-muted">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Sales Trend</CardTitle>
                <CardDescription>
                  Daily revenue performance for the current month.
                </CardDescription>
              </div>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="sellerRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="name"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `৳${val}`}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#sellerRev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* --- ORDER STATUS SUMMARY --- */}
        <Card className="md:col-span-3 shadow-lg shadow-muted">
          <CardHeader>
            <CardTitle>Logistics Overview</CardTitle>
            <CardDescription>Current state of pending items.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-blue-500" /> Shipped Items
                </span>
                <span className="font-bold">
                  {stats.orderItemsStats.totalShippedOrderItems}
                </span>
              </div>
              <Progress
                value={
                  (stats.orderItemsStats.totalShippedOrderItems /
                    stats.orderItemsStats.totalOrderItems) *
                  100
                }
                className="h-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-orange-500" /> Processing
                </span>
                <span className="font-bold">
                  {stats.orderItemsStats.totalProcessingOrderItems}
                </span>
              </div>
              <Progress
                value={
                  (stats.orderItemsStats.totalProcessingOrderItems /
                    stats.orderItemsStats.totalOrderItems) *
                  100
                }
                className="h-2"
              />
            </div>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-semibold mb-3">
                Top Product Performance
              </h4>
              {stats.medicineStats.topSellingMedicines
                .slice(0, 3)
                .map((med) => (
                  <div
                    key={`seller-dashboard-medicine-id-1-${med.id}`}
                    className="flex items-center justify-between mb-3 last:mb-0"
                  >
                    <div className="text-sm">
                      <p className="font-medium">{med.brandName}</p>
                      <p className="text-xs text-muted-foreground">
                        {med.genericName}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {med._count.orderItems} sales
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- BOTTOM SECTION: INVENTORY TABLE --- */}
      <Card className="shadow-lg shadow-muted">
        <CardHeader>
          <CardTitle>Top Selling Medicines</CardTitle>
          <CardDescription>
            Inventory ranking based on order frequency.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 font-semibold">Medicine</th>
                  <th className="px-6 py-3 font-semibold">Generic Name</th>
                  <th className="px-6 py-3 text-center font-semibold">
                    Price (Full/Piece)
                  </th>
                  <th className="px-6 py-3 text-right font-semibold">
                    Total Sold
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {stats.medicineStats.topSellingMedicines.map((med) => (
                  <tr
                    key={med.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-primary/70">
                      {med.brandName}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground italic">
                      {med.genericName}
                    </td>
                    <td className="px-6 py-4 text-center">
                      ৳{med.price} /{" "}
                      <span className="text-xs">৳{med.piecePrice}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2 font-bold">
                        {med._count.orderItems}
                        <TrendingUp className="h-3 w-3 text-emerald-500" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/** * UI Sub-components */
function SellerStatCard({
  title,
  value,
  description,
  icon,
  color,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Card className="border-none shadow-lg shadow-muted ring-1 ring-slate-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

function SellerDashboardSkeleton() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[400px]" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[120px]" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-7">
        <Skeleton className="col-span-4 h-[350px]" />
        <Skeleton className="col-span-3 h-[350px]" />
      </div>
    </div>
  );
}
