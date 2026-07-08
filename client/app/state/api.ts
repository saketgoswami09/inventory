import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  productId: string;
  name: string;
  price: number;
  rating: number | null;
  stockQuantity: number;
}

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage: number | null;
  date: string;
}

export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage: number | null;
  date: string;
}

export interface ExpenseSummary {
  expenseSummaryId: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummary {
  expenseByCategoryId: string;
  expenseSummaryId: string;
  category: string;
  amount: string;
  date: string;
}

export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),

  tagTypes: ["DashboardMetrics"],

  endpoints: (builder) => ({
    getDashboardMetrics: builder.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),
  }),
});

export const { useGetDashboardMetricsQuery } = api;
