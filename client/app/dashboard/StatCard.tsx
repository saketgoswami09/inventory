"use client";

import { LucideIcon } from "lucide-react";
import React from "react";

type StatDetail = {
  title: string;
  amount: string;
  changePercentage: number;
  IconComponent: LucideIcon;
};

type StatCardProps = {
  title: string;
  primaryIcon: JSX.Element;
  details: StatDetail[];
  dateRange: string;
};

const StatCard = ({
  title,
  primaryIcon,
  details,
  dateRange,
}: StatCardProps) => {
  const formatPercentage = (value: number) => {
    const signal = value >= 0 ? "+" : "";
    return `${signal}${value.toFixed()}%`;
  };

  return (
    <div className="md:row-span-1 xl:row-span-2 bg-white border border-gray-100 col-span-1 shadow-sm rounded-2xl flex flex-col justify-between transition-all duration-200 hover:shadow-md">
      {/* ─── HEADER ─── */}
      <div>
        <div className="flex justify-between items-center px-5 pt-4 pb-3">
          <h2 className="font-semibold text-base text-gray-900 truncate">
            {title}
          </h2>
          <span className="text-xs text-gray-400 font-medium shrink-0 ml-2">
            {dateRange}
          </span>
        </div>
        <hr className="border-gray-100" />
      </div>

      {/* ─── BODY ─── */}
      <div className="flex my-auto items-center justify-between gap-4 p-5">
        {/* Left Primary Icon Box - Fixed Square Dimensions */}
        <div className="w-14 h-14 rounded-2xl bg-blue-50/80 border border-blue-100 text-blue-600 shrink-0 flex items-center justify-center">
          {primaryIcon}
        </div>

        {/* Right Details List */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          {details.map((detail, index) => {
            const isPositive = detail.changePercentage >= 0;
            const Icon = detail.IconComponent;

            return (
              <React.Fragment key={index}>
                <div className="flex items-center justify-between py-2 gap-2">
                  <span className="text-xs font-medium text-gray-500 truncate">
                    {detail.title}
                  </span>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-bold text-sm text-gray-950">
                      {detail.amount}
                    </span>

                    {/* Trend Badge with strict shrink-0 & icon constraints */}
                    <span
                      className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                        isPositive
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 mr-0.5 shrink-0 stroke-[2.5]" />
                      <span>{formatPercentage(detail.changePercentage)}</span>
                    </span>
                  </div>
                </div>

                {index < details.length - 1 && (
                  <hr className="border-gray-100" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatCard;