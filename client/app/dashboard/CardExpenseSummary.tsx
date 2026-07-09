 "use client";

import { useGetDashboardMetricsQuery } from "../state/api";
import { TrendingDown, TrendingUp, PieChart as PieIcon } from "lucide-react";
import numeral from "numeral";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// Modern, high-contrast palette matching the app's aesthetic
const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

const CardExpenseSummary = () => {
  const { data, isLoading, isError } = useGetDashboardMetricsQuery();

  const expenseSummary = data?.expenseSummary || [];
  const expenseByCategory = data?.expenseByCategorySummary || [];

  // Calculate total expense sum from categories or summary API
  const totalExpenseSum = expenseByCategory.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  return (
    <div className="row-span-3 xl:row-span-6 flex flex-col justify-between bg-white border border-gray-100 shadow-sm rounded-2xl p-6 transition-all duration-200 hover:shadow-md">
      {isLoading ? (
        /* ─── SKELETON LOADING STATE ─── */
        <div className="animate-pulse flex flex-col justify-between h-full min-h-[300px]">
          <div>
            <div className="h-4 w-36 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-48 bg-gray-100 rounded" />
          </div>
          <div className="relative h-44 w-44 rounded-full bg-gray-100 mx-auto my-4 flex items-center justify-center">
            <div className="h-28 w-28 rounded-full bg-white" />
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-50">
            <div className="h-3 bg-gray-100 rounded" />
            <div className="h-3 bg-gray-100 rounded" />
            <div className="h-3 bg-gray-100 rounded" />
            <div className="h-3 bg-gray-100 rounded" />
          </div>
        </div>
      ) : isError ? (
        /* ─── ERROR STATE ─── */
        <div className="flex flex-col items-center justify-center p-8 min-h-[300px] text-center">
          <div className="p-3 rounded-full bg-rose-50 text-rose-500 mb-2">
            <PieIcon className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-gray-900">
            Unable to load expenses
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Please check your network connection
          </p>
        </div>
      ) : (
        <>
          {/* ─── HEADER ─── */}
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Expense Summary
            </h2>
            <p className="mt-0.5 text-xs text-gray-400">
              Category distribution breakdown
            </p>
          </div>

          {/* ─── DONUT CHART WITH CENTERED STAT ─── */}
          <div className="relative w-full h-48 my-2">
            <ResponsiveContainer width="100%" height="100%">
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
                    fontSize: "13px",
                    fontWeight: 700,
                  }}
                />
                <Pie
                  data={expenseByCategory}
                  innerRadius={58}
                  outerRadius={78}
                  paddingAngle={4}
                  dataKey="amount"
                  nameKey="category"
                  stroke="none"
                >
                  {expenseByCategory.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Centered Summary Text inside the Donut hole */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[11px] font-medium text-gray-400">
                Total Expenses
              </span>
              <span className="text-xl font-bold tracking-tight text-gray-950">
                {numeral(
                  expenseSummary[0]?.totalExpenses || totalExpenseSum
                )
                  .format("$0.0a")
                  .toUpperCase()}
              </span>
            </div>
          </div>

          {/* ─── LEGEND GRID ─── */}
          <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-gray-50">
            {expenseByCategory.slice(0, 4).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                />
                <span className="text-xs font-medium text-gray-600 truncate">
                  {item.category}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardExpenseSummary;