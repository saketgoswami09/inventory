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

// Data required while creating a new product
export interface NewProduct {
  productId: string;
  name: string;
  price: number;
  rating?: number | null;
  stockQuantity: number;
}

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),

  tagTypes: ["DashboardMetrics", "Products"],

  endpoints: (builder) => ({
    // GET /dashboard
    getDashboardMetrics: builder.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),

    // GET /products or GET /products?search=mouse
    getProducts: builder.query<Product[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search } : undefined,
      }),

      providesTags: ["Products"],
    }),

    // POST /products
    createProduct: builder.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),

      invalidatesTags: ["Products", "DashboardMetrics"],
    }),
  }),
});

export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
} = api;