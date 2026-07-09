"use client";

import { useGetProductsQuery } from "../state/api";
import Header from "@/app/(components)/Header";
import {
  DataGrid,
  GridColDef,
  useGridApiContext,
  useGridSelector,
  gridPageSelector,
  gridPageCountSelector,
  gridPageSizeSelector,
} from "@mui/x-data-grid";
import { LoaderIcon, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

// ─── CUSTOM PAGINATION FOOTER ───
const CustomPagination = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);

  const handlePageChange = (newPage: number) => {
    apiRef.current.setPage(newPage);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    apiRef.current.setPageSize(Number(event.target.value));
  };

  const pages = Array.from({ length: pageCount }, (_, i) => i);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-100 bg-white rounded-b-2xl">
      {/* LEFT: PREVIOUS / NEXT BUTTONS */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed transition-all duration-150 shadow-sm"
        >
          <ChevronLeft className="w-4 h-4 text-gray-500" />
          <span>Previous</span>
        </button>

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= pageCount - 1}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed transition-all duration-150 shadow-sm"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* RIGHT: PAGE NUMBERS & ROWS PER PAGE */}
      <div className="flex items-center gap-4">
        {/* Page Number Pills */}
        <div className="flex items-center gap-1">
          {pages.map((p) => {
            const isActive = p === page;
            return (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`w-8 h-8 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {p + 1}
              </button>
            );
          })}
        </div>

        {/* Rows Per Page Dropdown */}
        <div className="flex items-center gap-2 border-l border-gray-100 pl-4">
          <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
            Rows per page:
          </span>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-gray-400 transition-colors cursor-pointer font-medium"
          >
            {[10, 25, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

// ─── COLUMN DEFINITIONS ───
const columns: GridColDef[] = [
  {
    field: "productId",
    headerName: "ID",
    width: 120,
    renderCell: (params) => (
      <span className="font-mono text-xs text-gray-500">{params.value}</span>
    ),
  },
  {
    field: "name",
    headerName: "Product Name",
    width: 220,
    renderCell: (params) => (
      <span className="font-semibold text-gray-900">{params.value}</span>
    ),
  },
  {
    field: "price",
    headerName: "Price",
    width: 120,
    type: "number",
    valueGetter: (value, row) => row?.price ?? value ?? 0,
    renderCell: (params) => (
      <span className="font-medium text-gray-800">
        ${Number(params.value).toFixed(2)}
      </span>
    ),
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 120,
    type: "number",
    valueGetter: (value, row) => row?.rating ?? value ?? null,
    renderCell: (params) => (
      <span className="inline-flex items-center gap-1 font-medium text-amber-600">
        ★ {params.value ? Number(params.value).toFixed(1) : "N/A"}
      </span>
    ),
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 150,
    type: "number",
    valueGetter: (value, row) => row?.stockQuantity ?? value ?? 0,
    renderCell: (params) => {
      const stock = Number(params.value);
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
            stock > 20
              ? "bg-emerald-50 text-emerald-600"
              : stock > 0
              ? "bg-amber-50 text-amber-600"
              : "bg-rose-50 text-rose-600"
          }`}
        >
          {stock} in stock
        </span>
      );
    },
  },
];

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();

  /* ─── LOADING STATE ─── */
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <LoaderIcon className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-xs font-medium text-gray-400">Loading inventory products...</p>
      </div>
    );
  }

  /* ─── ERROR STATE ─── */
  if (isError || !products) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
        <div className="p-3 rounded-full bg-rose-50 text-rose-500 mb-2">
          <AlertCircle className="w-6 h-6" />
        </div>
        <p className="text-sm font-semibold text-gray-900">Failed to fetch products</p>
        <p className="text-xs text-gray-400 mt-1">
          Please check your API backend connection and refresh the page.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Header name="Inventory" />

      {/* ─── DATA GRID CARD CONTAINER ─── */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl transition-all duration-200 hover:shadow-md overflow-hidden">
        <DataGrid
          rows={products}
          columns={columns}
          getRowId={(row) => row.productId}
          checkboxSelection
          slots={{
            footer: CustomPagination,
          }}
          className="bg-white border-none text-gray-700"
          sx={{
            border: "none",
            "& .MuiDataGrid-cell": {
              borderColor: "#f1f5f9",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f8fafc",
              color: "#475569",
              borderColor: "#f1f5f9",
              fontWeight: 600,
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f8fafc",
            },
          }}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default Inventory;