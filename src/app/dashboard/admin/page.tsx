"use client";

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
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { IAdminStatsData } from "@/features/dashboard/dashboard.type";
import { getAdminStats } from "@/features/dashboard/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Layers,
  ShoppingBag,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import React, { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function AdminDashboardPage() {
  const { data: response, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => getAdminStats(),
  });

  const stats: IAdminStatsData | undefined = response?.data;

  // Memoized Chart Data for Performance
  const chartData = useMemo(() => {
    return stats?.ordersPerDay.map((item) => ({
      date: new Date(item.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      }),
      revenue: item.revenue,
      orders: item.ordersCount,
    }));
  }, [stats]);

  if (isLoading) return <DashboardSkeleton />;
  if (!stats) return <div>Error loading statistics.</div>;

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Platform Insights
          </h2>
          <p className="text-muted-foreground">
            Real-time overview of pharmacy operations and revenue.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge
            variant="outline"
            className="px-3 py-1 bg-green-50 text-green-700 border-green-200"
          >
            Live System Status: Healthy
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        {/* <TabsList className="grid w-full max-w-[400px] grid-cols-1">
          <TabsTrigger value="overview">Executive Summary</TabsTrigger>
        </TabsList> */}

        <TabsContent value="overview" className="space-y-4">
          {/* --- KPI SECTION: TOP ROW --- */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Revenue"
              value={`$${stats.revenueStats.totalRevenue.toLocaleString()}`}
              description="Gross revenue this year"
              icon={<DollarSign className="h-4 w-4 text-emerald-600" />}
              trend="+18% from last month"
              trendUp={true}
            />
            <MetricCard
              title="Active Customers"
              value={stats.userStats.totalCustomers.toString()}
              description={`${stats.userStats.totalActiveUsers} online now`}
              icon={<UserCheck className="h-4 w-4 text-blue-600" />}
              trend={`${stats.userStats.totalSellers} Registered Sellers`}
              trendUp={true}
            />
            <MetricCard
              title="Order Fulfillment"
              value={stats.orderStats.totalOrders.toString()}
              description={`${stats.orderStats.totalDeliveredOrders} orders delivered`}
              icon={<ShoppingBag className="h-4 w-4 text-orange-600" />}
              trend={`${stats.orderStats.totalCancelledOrders} cancellations`}
              trendUp={false}
            />
            <MetricCard
              title="Inventory Health"
              value={stats.medicineStats.totalActiveMedicines.toString()}
              description="Active pharmaceutical listings"
              icon={<Layers className="h-4 w-4 text-purple-600" />}
              trend={`${stats.medicineStats.totalDeletedMedicines} archived`}
              trendUp={true}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* --- REVENUE TREND ANALYSIS --- */}
            <Card className="lg:col-span-4 shadow-lg shadow-muted">
              <CardHeader>
                <CardTitle>Financial Performance</CardTitle>
                <CardDescription>
                  Daily revenue vs Order volume correlation.
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient
                          id="colorRevenue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10b981"
                            stopOpacity={0.1}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10b981"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f0f0f0"
                      />
                      <XAxis
                        dataKey="date"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#10b981"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* --- TOP PERFORMING CATEGORIES --- */}
            <Card className="lg:col-span-3 shadow-lg shadow-muted">
              <CardHeader>
                <CardTitle>Market Share by Category</CardTitle>
                <CardDescription>
                  Top therapeutic classes by inventory volume.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {stats.categoryStats.topCategories.slice(0, 6).map((cat) => (
                    <div
                      key={`admin-dashboard-category-id-${cat.id}`}
                      className="group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-sm font-medium leading-none group-hover:underline">
                            {cat.name}
                          </span>
                        </div>
                        <span className="text-xs font-bold">
                          {cat._count.medicines} SKUs
                        </span>
                      </div>
                      <Progress
                        value={
                          (cat._count.medicines /
                            stats.medicineStats.totalMedicines) *
                          100
                        }
                        className="h-1.5"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* --- USER SEGMENTATION PIE CHART --- */}
            <Card className="flex flex-col shadow-lg shadow-muted">
              <CardHeader className="items-center pb-0">
                <CardTitle>User Demographics</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 pb-0 pt-4">
                <div className="flex flex-col items-center gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold">
                      {stats.userStats.totalUsers}
                    </p>
                    <p className="text-base text-muted-foreground uppercase tracking-wider">
                      Total Ecosystem Members
                    </p>{" "}
                    <div className="flex justify-center mt-2 gap-4">
                      <Badge className="bg-blue-500">
                        {stats.userStats.totalCustomers} Customers
                      </Badge>
                      <Badge className="bg-orange-500">
                        {stats.userStats.totalSellers} Sellers
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="mt-6 border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Active Members
                    </span>
                    <span className="text-green-600 font-semibold">
                      {stats.userStats.totalActiveUsers}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Security Flags
                    </span>
                    <span className="text-red-600 font-semibold">
                      {stats.userStats.totalBannedUsers} Banned
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* --- TOP PRODUCTS HIGHLIGHT --- */}
            <Card className="md:col-span-2 shadow-lg shadow-muted">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Top Selling Medicines
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground uppercase bg-slate-50">
                      <tr>
                        <th className="px-4 py-2">Brand Name</th>
                        <th className="px-4 py-2">Generic</th>
                        <th className="px-4 py-2 text-right">Unit Price</th>
                        <th className="px-4 py-2 text-right">Orders</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.medicineStats.topSellingMedicines
                        .slice(0, 5)
                        .map((med) => (
                          <tr
                            key={med.id}
                            className="border-b hover:bg-slate-50/50 transition-colors"
                          >
                            <td className="px-4 py-3 font-semibold text-primary">
                              {med.brandName}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground italic">
                              {med.genericName}
                            </td>
                            <td className="px-4 py-3 text-right">
                              ${med.price}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <Badge variant="secondary">
                                {med._count.orderItems} sold
                              </Badge>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* Sub-components and Helpers for cleaner code */

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
}

function MetricCard({
  title,
  value,
  description,
  icon,
  trend,
  trendUp,
}: MetricCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-lg shadow-muted bg-white hover:shadow-xl hover:shadow-muted transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-tight">
          {title}
        </CardTitle>
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        <p className="text-xs text-muted-foreground mt-1 font-medium">
          {description}
        </p>
        <div
          className={`mt-4 flex items-center text-xs font-bold ${trendUp ? "text-emerald-600" : "text-amber-600"}`}
        >
          {trendUp ? (
            <ArrowUpRight className="mr-1 h-3 w-3" />
          ) : (
            <ArrowDownRight className="mr-1 h-3 w-3" />
          )}
          {trend}
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardSkeleton() {
  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-4 w-[500px]" />
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[140px] rounded-xl" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-7">
        <Skeleton className="col-span-4 h-[400px] rounded-xl" />
        <Skeleton className="col-span-3 h-[400px] rounded-xl" />
      </div>
    </div>
  );
}
