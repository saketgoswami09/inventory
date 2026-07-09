"use client";

import { useGetDashboardMetricsQuery } from "../state/api";
import { TrendingDown, TrendingUp, DollarSign } from "lucide-react";
import numeral from "numeral";
import React, { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const CardSalesSummary = () => {
  const { data, isLoading, isError } = useGetDashboardMetricsQuery();
  const salesData = data?.salesSummary || [];

  const [timeframe, setTimeframe] = useState("weekly");

  // Get latest sales data entry
  const lastDataPoint = salesData[salesData.length - 1] || null;

  // Calculate average or highest sale value for summary
  const totalSalesCount = salesData.length;
  const totalSalesSum = salesData.reduce((acc, curr) => acc + curr.totalValue, 0);
  const averageSales = totalSalesCount ? totalSalesSum / totalSalesCount : 0;

  return (
    <div className="flex flex-col justify-between row-span-3 col-span-1 md:col-span-2 xl:col-span-2 bg-white border border-gray-100 shadow-sm rounded-2xl transition-all duration-200 hover:shadow-md">
      {isLoading ? (
        /* ─── SKELETON LOADING STATE ─── */
        <div className="p-6 animate-pulse flex flex-col justify-between h-full min-h-[320px]">
          <div className="flex justify-between items-center mb-4">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-8 w-24 bg-gray-200 rounded-lg" />
          </div>
          <div className="my-2">
            <div className="h-3 w-20 bg-gray-100 rounded mb-2" />
            <div className="h-8 w-36 bg-gray-200 rounded" />
          </div>
          <div className="h-48 w-full bg-gray-100 rounded-xl mt-auto" />
        </div>
      ) : isError ? (
        /* ─── ERROR STATE ─── */
        <div className="flex flex-col items-center justify-center p-8 min-h-[320px] text-center">
          <div className="p-3 rounded-full bg-rose-50 text-rose-500 mb-2">
            <DollarSign className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-gray-900">Unable to load sales metrics</p>
          <p className="text-xs text-gray-400 mt-1">Check your network connection and try again</p>
        </div>
      ) : (
        <>
          {/* ─── HEADER & TIMEFRAME SELECTOR ─── */}
          <div className="p-6 pb-2 flex items-center justify-between border-b border-gray-50">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Sales Summary
              </h2>
              <p className="mt-0.5 text-xs text-gray-400">
                Total revenue trends over time
              </p>
            </div>

            {/* Timeframe Dropdown Select */}
            <select
              className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl p-2 focus:outline-none focus:border-gray-400 transition-colors cursor-pointer"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="daily font-medium">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* ─── BODY METRICS ─── */}
          <div className="flex-1 flex flex-col justify-between pt-4">
            <div className="px-6 mb-2 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-gray-400">Total Sales Value</p>
                <div className="flex items-center gap-2.5 mt-1">
                  <p className="text-3xl font-bold tracking-tight text-gray-950">
                    {lastDataPoint
                      ? numeral(lastDataPoint.totalValue).format("$0.00a").toUpperCase()
                      : "$0.00"}
                  </p>

                  {/* TREND BADGE */}
                  {lastDataPoint?.changePercentage !== undefined && (
                    <span
                      className={`flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        lastDataPoint.changePercentage >= 0
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      {lastDataPoint.changePercentage >= 0 ? (
                        <TrendingUp className="w-3.5 h-3.5 mr-1" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5 mr-1" />
                      )}
                      {Math.abs(lastDataPoint.changePercentage).toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>

              {/* Secondary Metric Highlight */}
              <div className="text-right hidden sm:block">
                <p className="text-xs font-medium text-gray-400">Average Sale</p>
                <p className="text-sm font-semibold text-gray-700 mt-0.5">
                  {numeral(averageSales).format("$0.0a").toUpperCase()}
                </p>
              </div>
            </div>

            {/* ─── RECHARTS AREA CHART ─── */}
            <div className="w-full h-52 mt-auto px-2 pb-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={salesData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  {/* EMERALD GREEN GRADIENT ACCENT */}
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />

                  <XAxis dataKey="date" tick={false} axisLine={false} />
                  <YAxis tickLine={false} tick={false} axisLine={false} />

                  <Tooltip
                    formatter={(value: number) => [
                      `$${value.toLocaleString("en")}`,
                      "Sales Value",
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

                  {/* SMOOTH CURVED EMERALD LINE */}
                  <Area
                    type="monotone"
                    dataKey="totalValue"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fill="url(#salesGradient)"
                    fillOpacity={1}
                    activeDot={{
                      r: 6,
                      strokeWidth: 3,
                      fill: "#10b981",
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

export default CardSalesSummary;