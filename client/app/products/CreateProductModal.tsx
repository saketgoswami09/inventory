"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { X, PackagePlus } from "lucide-react";

type ProductFormData = {
  productId?: string;
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  const [formData, setFormData] = useState({
    productId: uuidv4(),
    name: "",
    price: "",
    stockQuantity: "",
    rating: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onCreate({
      productId: formData.productId || uuidv4(),
      name: formData.name,
      price: parseFloat(formData.price as string) || 0,
      stockQuantity: parseInt(formData.stockQuantity as string, 10) || 0,
      rating: parseFloat(formData.rating as string) || 0,
    });

    // Reset form after submission
    setFormData({
      productId: uuidv4(),
      name: "",
      price: "",
      stockQuantity: "",
      rating: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  const labelCssStyles = "block text-xs font-semibold text-gray-700 mb-1.5";
  const inputCssStyles =
    "w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all";

  return (
    <div
      className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-200"
      onClick={onClose}
    >
      {/* Modal Card Container */}
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6 transition-all transform animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pr-6">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 shrink-0">
            <PackagePlus className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Create New Product
            </h2>
            <p className="text-xs text-gray-500">
              Add a new item to your store catalog
            </p>
          </div>
        </div>

        <hr className="border-gray-100 -mx-6 mb-5" />

        {/* Form Controls */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* PRODUCT NAME */}
          <div>
            <label htmlFor="name" className={labelCssStyles}>
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="e.g. Wireless Mechanical Keyboard"
              onChange={handleChange}
              value={formData.name}
              className={inputCssStyles}
              required
            />
          </div>

          {/* PRICE */}
          <div>
            <label htmlFor="price" className={labelCssStyles}>
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              id="price"
              step="0.01"
              min="0"
              placeholder="0.00"
              onChange={handleChange}
              value={formData.price}
              className={inputCssStyles}
              required
            />
          </div>

          {/* STOCK QUANTITY */}
          <div>
            <label htmlFor="stockQuantity" className={labelCssStyles}>
              Stock Quantity
            </label>
            <input
              type="number"
              name="stockQuantity"
              id="stockQuantity"
              min="0"
              placeholder="100"
              onChange={handleChange}
              value={formData.stockQuantity}
              className={inputCssStyles}
              required
            />
          </div>

          {/* RATING */}
          <div>
            <label htmlFor="rating" className={labelCssStyles}>
              Rating (0.0 – 5.0)
            </label>
            <input
              type="number"
              name="rating"
              id="rating"
              step="0.1"
              min="0"
              max="5"
              placeholder="4.5"
              onChange={handleChange}
              value={formData.rating}
              className={inputCssStyles}
              required
            />
          </div>

          {/* MODAL ACTIONS */}
          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 text-xs font-semibold text-white bg-black hover:bg-black rounded-xl shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;