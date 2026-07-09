"use client";

import {
  ExpenseByCategorySummary,
  useGetDashboardMetricsQuery,
} from "../state/api";
import { TrendingUp } from "lucide-react";
import numeral from "numeral";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type ExpenseSums = {
  [category: string]: number;
};

// Vibrant, modern & minimalist color palette
const VIBRANT_COLORS = [
  "#3B82F6", // Electric Blue
  "#10B981", // Emerald Green
  "#F59E0B", // Vibrant Amber
  "#8B5CF6", // Purple
  "#EC4899", // Neon Pink
];

const CardExpenseSummary = () => {
  const { data: dashboardMetrics, isLoading, isError } = useGetDashboardMetricsQuery();

  const expenseSummary = dashboardMetrics?.expenseSummary?.[0];
  const expenseByCategorySummary = dashboardMetrics?.expenseByCategorySummary || [];

  const expenseSums = expenseByCategorySummary.reduce(
    (acc: ExpenseSums, item: ExpenseByCategorySummary) => {
      const category = item.category;
      const amount = parseInt(item.amount, 10);
      if (!acc[category]) acc[category] = 0;
      acc[category] += amount;
      return acc;
    },
    {}
  );

  const expenseCategories = Object.entries(expenseSums).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const totalExpenses = expenseCategories.reduce(
    (acc, category: { value: number }) => acc + category.value,
    0
  );

  return (
    <div className="row-span-3 flex flex-col justify-between bg-white border border-gray-100 shadow-sm rounded-2xl transition-all duration-200 hover:shadow-md">
      {isLoading ? (
        /* ─── SKELETON LOADER ─── */
        <div className="p-6 animate-pulse flex flex-col justify-between h-full min-h-[300px]">
          <div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-48 bg-gray-100 rounded" />
          </div>
          <div className="relative h-36 w-36 rounded-full bg-gray-100 mx-auto my-4 flex items-center justify-center">
            <div className="h-24 w-24 rounded-full bg-white" />
          </div>
          <div className="h-4 w-full bg-gray-100 rounded mt-4" />
        </div>
      ) : isError ? (
        /* ─── ERROR STATE ─── */
        <div className="flex flex-col items-center justify-center p-8 min-h-[300px] text-center text-rose-500">
          <p className="text-sm font-semibold">Unable to load expense summary</p>
        </div>
      ) : (
        <>
          {/* ─── HEADER ─── */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 px-7 pt-5 mb-2">
              Expense Summary
            </h2>
            <hr className="border-gray-100" />
          </div>

          {/* ─── BODY ─── */}
          <div className="xl:flex justify-between items-center px-7 py-3 gap-4">
            {/* VIBRANT DONUT CHART */}
            <div className="relative basis-3/5 flex justify-center items-center">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Tooltip
                    formatter={(value: number) => [
                      `$${value.toLocaleString("en")}`,
                      "Expense",
                    ]}
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #f1f5f9",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                      padding: "8px 12px",
                    }}
                    itemStyle={{
                      color: "#0f172a",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  />
                  <Pie
                    data={expenseCategories}
                    innerRadius={52}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    stroke="none"
                  >
                    {expenseCategories.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={VIBRANT_COLORS[index % VIBRANT_COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* MINIMALIST OVERLAY IN CENTER */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <span className="block text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
                  Total
                </span>
                <span className="font-bold text-lg text-gray-950 tracking-tight">
                  {numeral(totalExpenses).format("$0.0a").toUpperCase()}
                </span>
              </div>
            </div>

            {/* MINIMALIST LEGEND LIST */}
            <ul className="flex flex-col justify-center py-2 gap-2.5 basis-2/5">
              {expenseCategories.map((entry, index) => (
                <li
                  key={`legend-${index}`}
                  className="flex items-center text-xs text-gray-600 font-medium"
                >
                  <span
                    className="mr-2.5 w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                    style={{
                      backgroundColor:
                        VIBRANT_COLORS[index % VIBRANT_COLORS.length],
                    }}
                  />
                  <span className="truncate">{entry.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── FOOTER ─── */}
          <div>
            <hr className="border-gray-100" />
            {expenseSummary && (
              <div className="flex justify-between items-center px-7 py-3 text-xs text-gray-500">
                <div>
                  <p className="text-gray-400 font-medium">Average Expense</p>
                  <p className="font-bold text-gray-900 text-sm mt-0.5">
                    ${expenseSummary.totalExpenses.toFixed(2)}
                  </p>
                </div>

                <span className="flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" />
                  30%
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CardExpenseSummary;