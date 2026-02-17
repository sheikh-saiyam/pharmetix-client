export interface IAdminStatsResponse {
  success: boolean;
  message: string;
  data: IAdminStatsData;
}

export interface IAdminStatsData {
  userStats: IUserStats;
  categoryStats: ICategoryStats;
  medicineStats: IMedicineStats;
  orderStats: IOrderStats;
  revenueStats: IRevenueStats;
  ordersPerDay: IOrdersPerDay[];
}

export interface IUserStats {
  totalUsers: number;
  totalAdmins: number;
  totalSellers: number;
  totalCustomers: number;
  totalActiveUsers: number;
  totalBannedUsers: number;
}

export interface ICategoryStats {
  totalCategories: number;
  totalActiveCategories: number;
  totalInactiveCategories: number;
  totalDeletedCategories: number;
  totalFeaturedCategories: number;
  topCategories: ITopCategory[];
}

export interface ITopCategory {
  id: string;
  name: string;
  _count: {
    medicines: number;
  };
}

export interface IMedicineStats {
  totalMedicines: number;
  totalActiveMedicines: number;
  totalInactiveMedicines: number;
  totalDeletedMedicines: number;
  outOfStockMedicines: ITopSellingMedicine[];
  lowStockMedicines: ITopSellingMedicine[];
  topSellingMedicines: ITopSellingMedicine[];
  topRatedMedicines: ITopRatedMedicine[];
}

export interface ITopSellingMedicine {
  id: string;
  brandName: string;
  genericName: string;
  price: number;
  piecePrice: number;
  _count: {
    orderItems: number;
  };
}

export interface ITopRatedMedicine {
  id: string;
  brandName: string;
  genericName: string;
  price: number;
  piecePrice: number;
}

export interface IOrderStats {
  totalOrders: number;
  totalPlacedOrders: number;
  totalCancelledOrders: number;
  totalProcessingOrders: number;
  totalShippedOrders: number;
  totalDeliveredOrders: number;
}

export interface IRevenueStats {
  totalRevenue: number;
  totalRevenueForToday: number | null;
  totalRevenueForThisWeek: number;
  totalRevenueForThisMonth: number;
  totalRevenueForThisYear: number;
}

export interface IOrdersPerDay {
  date: string; // ISO Date string
  ordersCount: number;
  revenue: number;
}

export interface IAdminStats {
  userStats: IUserStats;
  categoryStats: ICategoryStats;
  medicineStats: IMedicineStats;
  orderStats: IOrderStats;
  revenueStats: IRevenueStats;
  ordersPerDay: IOrdersPerDay[];
}
