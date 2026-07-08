"use client";

import Rating from "../(components)/Rating";
import { useGetDashboardMetricsQuery } from "../state/api";
import { ShoppingBag, Star } from "lucide-react";

const CardPopularProducts = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16 transition-colors duration-200">
      {isLoading ? (
        <div className="m-5 text-gray-500 font-medium">Loading...</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2 text-gray-900">
            Popular Products
          </h3>
          <hr className="border-gray-100" />
          
          <div className="overflow-auto h-full custom-scrollbar">
            {dashboardMetrics?.popularProducts.map((product) => (
              <div
                key={product.productId}
                className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
              >
                {/* Left Section: Image & Meta */}
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    {/* <Image
                      src={product.imageUrl || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=100&auto=format&fit=crop"}
                      alt={product.name}
                      fill
                      sizes="48px"
                      className="rounded-lg object-cover ring-1 ring-gray-100"
                    /> */}img
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <div className="font-bold text-gray-800 text-sm truncate max-w-35 sm:max-w-50">
                      {product.name}
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="font-semibold text-gray-900">
                        ${product.price}
                      </span>
                      <span className="mx-0.5">•</span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Rating rating={product.rating || 0}/>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section: Sales/Stock Metric Badge */}
                <div className="flex items-center text-xs text-gray-500">
                  <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors mr-2">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  <span className="font-semibold text-xs text-gray-700">
                    {Math.round(product.stockQuantity / 1000)}k Sold
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;