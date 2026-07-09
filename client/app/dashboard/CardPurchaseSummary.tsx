"use client";

import { useGetDashboardMetricsQuery } from "../state/api";
import { TrendingDown, TrendingUp, ShoppingBag } from "lucide-react";
import numeral from "numeral";
import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const CardPurchaseSummary = () => {
  const { data, isLoading } = useGetDashboardMetricsQuery();
  const purchaseData = data?.purchaseSummary || [];

  const lastDataPoint = purchaseData[purchaseData.length - 1] || null;

  return (
    <div className="flex flex-col justify-between row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white border border-gray-100 shadow-sm rounded-2xl transition-all duration-200 hover:shadow-md">
      {isLoading ? (
        /* SKELETON LOADING STATE */
        <div className="p-6 animate-pulse flex flex-col justify-between h-full min-h-[280px]">
          <div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-48 bg-gray-100 rounded" />
          </div>
          <div className="my-4">
            <div className="h-3 w-20 bg-gray-100 rounded mb-2" />
            <div className="h-8 w-36 bg-gray-200 rounded" />
          </div>
          <div className="h-40 w-full bg-gray-100 rounded-xl" />
        </div>
      ) : (
        <>
          {/* HEADER */}
          <div className="p-6 pb-0">
            <h2 className="text-base font-semibold text-gray-900">
              Purchase Summary
            </h2>
            <p className="mt-0.5 text-xs text-gray-400">
              Purchase performance over time
            </p>
          </div>

          {/* BODY */}
          <div className="flex-1 flex flex-col justify-between pt-4">
            {/* BODY HEADER */}
            <div className="px-6 mb-2">
              <p className="text-xs font-medium text-gray-400">Purchased</p>
              
              <div className="flex flex-wrap items-center gap-2.5 mt-1">
                <p className="text-3xl font-bold tracking-tight text-gray-950">
                  {lastDataPoint
                    ? numeral(lastDataPoint.totalPurchased).format("$0.00a").toUpperCase()
                    : "$0.00"}
                </p>

                {/* TREND BADGE */}
                {lastDataPoint && (
                  <span
                    className={`flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      lastDataPoint.changePercentage! >= 0
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-rose-50 text-rose-600"
                    }`}
                  >
                    {lastDataPoint.changePercentage! >= 0 ? (
                      <TrendingUp className="w-3.5 h-3.5 mr-1" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 mr-1" />
                    )}
                    {Math.abs(lastDataPoint.changePercentage!)}%
                  </span>
                )}
              </div>
            </div>

            {/* CHART CONTAINER */}
            <div className="w-full h-48 mt-auto px-2 pb-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={purchaseData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  {/* SMOOTH BLUE FADE GRADIENT */}
                  <defs>
                    <linearGradient id="purchaseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>

                  {/* LIGHT HORIZONTAL GRID LINES */}
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />

                  <XAxis dataKey="date" tick={false} axisLine={false} />
                  <YAxis tickLine={false} tick={false} axisLine={false} />

                  {/* CUSTOM HOVER TOOLTIP */}
                  <Tooltip
                    formatter={(value: number) => [
                      `$${value.toLocaleString("en")}`,
                      "Purchased",
                    ]}
                    labelFormatter={(label) => {
                      const date = new Date(label);
                      return date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      });
                    }}
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #f1f5f9",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                      padding: "8px 12px",
                    }}
                    labelStyle={{
                      color: "#64748b",
                      fontSize: "12px",
                      fontWeight: 500,
                      marginBottom: "4px",
                    }}
                    itemStyle={{
                      color: "#0f172a",
                      fontSize: "13px",
                      fontWeight: 700,
                    }}
                  />

                  {/* SMOOTH CURVED AREA WAVE */}
                  <Area
                    type="monotone"
                    dataKey="totalPurchased"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    fill="url(#purchaseGradient)"
                    fillOpacity={1}
                    activeDot={{
                      r: 6,
                      strokeWidth: 3,
                      fill: "#2563eb",
                      stroke: "#ffffff",
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardPurchaseSummary;