"use client";

import { useCreateProductMutation, useGetProductsQuery } from "../state/api";
import {
  PlusCircleIcon,
  SearchIcon,
  AlertCircle,
  PackageCheck,
} from "lucide-react";
import { useState } from "react";
import Header from "../(components)/Header/index";
import Rating from "../(components)/Rating/index";
import CreateProductModal from "./CreateProductModal";
import Image from "next/image";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

// Helper function to pick a consistent image (prevents re-render flicker)
const getProductImageUrl = (productId: string) => {
  const imageIndex =
    (productId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      3) +
    1;
  return `https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/product${imageIndex}.png`;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  const [createProduct] = useCreateProductMutation();

  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };

  return (
    <div className="mx-auto pb-8 w-full flex flex-col gap-6">
      {/* ─── SEARCH & ACTION HEADER BAR ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Header name="Products" subtitle="Manage and view catalog items" />

        <button
          className="inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-600 text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm transition-all duration-150 active:scale-95 cursor-pointer shrink-0"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 text-white" />
          <span>Create Product</span>
        </button>
      </div>

      {/* ─── SEARCH INPUT ─── */}
      <div className="relative w-full max-w-md">
        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ─── ERROR STATE ─── */}
      {isError && (
        <div className="flex flex-col items-center justify-center min-h-[300px] p-6 text-center bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="p-3 rounded-full bg-rose-50 text-rose-500 mb-2">
            <AlertCircle className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-gray-900">
            Failed to fetch products
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Please check your API connection or search term.
          </p>
        </div>
      )}

      {/* ─── SKELETON LOADING GRID ─── */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm animate-pulse flex flex-col items-center"
            >
              <div className="w-32 h-32 bg-gray-100 rounded-2xl mb-4" />
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
              <div className="h-3 w-1/2 bg-gray-100 rounded mb-3" />
              <div className="h-3 w-1/3 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* ─── PRODUCT CARDS GRID ─── */}
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.productId}
                className="group bg-white border border-gray-100 shadow-sm hover:shadow-md rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Image Container */}
                  <div className="relative w-36 h-36 mb-4 overflow-hidden rounded-2xl bg-gray-50 flex items-center justify-center p-2">
                    <Image
                      src={""}
                      alt={product.name}
                      fill
                      sizes="144px"
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Title & Price */}
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-base font-bold text-gray-950">
                    ${product.price.toFixed(2)}
                  </p>

                  {/* Rating Stars */}
                  {product.rating !== undefined && product.rating !== null && (
                    <div className="flex items-center mt-2">
                      <Rating rating={product.rating} />
                    </div>
                  )}
                </div>

                {/* Stock Footer Badge */}
                <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span>Stock Quantity</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      product.stockQuantity > 20
                        ? "bg-emerald-50 text-emerald-600"
                        : product.stockQuantity > 0
                          ? "bg-amber-50 text-amber-600"
                          : "bg-rose-50 text-rose-600"
                    }`}
                  >
                    {product.stockQuantity} remaining
                  </span>
                </div>
              </div>
            ))
          ) : (
            /* Empty Search Result State */
            <div className="col-span-full flex flex-col items-center justify-center min-h-[250px] p-6 text-center bg-white border border-dashed border-gray-200 rounded-2xl">
              <PackageCheck className="w-8 h-8 text-gray-300 mb-2" />
              <p className="text-sm font-medium text-gray-600">
                No products found
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Try searching for a different keyword or create a new product.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ─── CREATE PRODUCT MODAL ─── */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;
