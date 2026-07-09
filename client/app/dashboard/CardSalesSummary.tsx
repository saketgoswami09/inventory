"use client";

import { useGetDashboardMetricsQuery } from "../state/api";
import { TrendingDown, TrendingUp, DollarSign } from "lucide-react";
import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CardSalesSummary = () => {
  const { data, isLoading, isError } = useGetDashboardMetricsQuery();
  const salesData = data?.salesSummary || [];

  const [timeframe, setTimeframe] = useState("weekly");

  const totalValueSum =
    salesData.reduce((acc, curr) => acc + curr.totalValue, 0) || 0;

  const averageChangePercentage =
    salesData.reduce((acc, curr, _, array) => {
      return acc + (curr.changePercentage || 0) / array.length;
    }, 0) || 0;

  const highestValueData = salesData.reduce((acc, curr) => {
    return (acc.totalValue || 0) > (curr.totalValue || 0) ? acc : curr;
  }, salesData[0] || {});

  const highestValueDate = highestValueData.date
    ? new Date(highestValueData.date).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
      })
    : "N/A";

  return (
    <div className="row-span-3 xl:row-span-6 flex flex-col justify-between bg-white border border-gray-100 shadow-sm rounded-2xl transition-all duration-200 hover:shadow-md">
      {isLoading ? (
        /* ─── SKELETON LOADING STATE ─── */
        <div className="p-6 animate-pulse flex flex-col justify-between h-full min-h-[350px]">
          <div className="flex justify-between items-center mb-4">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-8 w-24 bg-gray-200 rounded-lg" />
          </div>
          <div className="my-2">
            <div className="h-3 w-20 bg-gray-100 rounded mb-2" />
            <div className="h-8 w-36 bg-gray-200 rounded" />
          </div>
          <div className="h-52 w-full bg-gray-100 rounded-xl my-auto" />
          <div className="h-4 w-full bg-gray-100 rounded mt-4" />
        </div>
      ) : isError ? (
        /* ─── ERROR STATE ─── */
        <div className="flex flex-col items-center justify-center p-8 min-h-[350px] text-center">
          <div className="p-3 rounded-full bg-rose-50 text-rose-500 mb-2">
            <DollarSign className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-gray-900">
            Failed to fetch sales summary
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Please check your server connection or try again.
          </p>
        </div>
      ) : (
        <>
          {/* ─── HEADER ─── */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 px-7 pt-5 mb-2">
              Sales Summary
            </h2>
            <hr className="border-gray-100" />
          </div>

          {/* ─── BODY ─── */}
          <div className="flex-1 flex flex-col justify-between">
            {/* BODY HEADER */}
            <div className="flex justify-between items-center mb-4 px-7 mt-5">
              <div>
                <p className="text-xs font-medium text-gray-400">Value</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-2xl font-extrabold tracking-tight text-gray-950">
                    $
                    {(totalValueSum / 1000000).toLocaleString("en", {
                      maximumFractionDigits: 2,
                    })}
                    m
                  </span>
                  
                  {/* TREND BADGE */}
                  <span
                    className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
                      averageChangePercentage >= 0
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-rose-50 text-rose-600"
                    }`}
                  >
                    {averageChangePercentage >= 0 ? (
                      <TrendingUp className="w-3.5 h-3.5 mr-1" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 mr-1" />
                    )}
                    {averageChangePercentage.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* TIMEFRAME SELECTOR */}
              <select
                className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl p-2 focus:outline-none focus:border-gray-400 transition-colors cursor-pointer"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            {/* BAR CHART */}
            <div className="w-full h-64 px-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}/${date.getDate()}`;
                    }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                    tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}m`}
                  />
                  <Tooltip
                    formatter={(value: any) => [
                      `$${Number(value || 0).toLocaleString("en")}`,
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
                    cursor={{ fill: "#f8fafc", radius: 8 }}
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
                  <Bar
                    dataKey="totalValue"
                    fill="#2563eb"
                    barSize={10}
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ─── FOOTER ─── */}
          <div>
            <hr className="border-gray-100" />
            <div className="flex justify-between items-center py-4 px-7 text-xs text-gray-500">
              <p className="font-medium">{salesData.length || 0} days recorded</p>
              <p>
                Highest Sales Date:{" "}
                <span className="font-bold text-gray-900">{highestValueDate}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardSalesSummary;