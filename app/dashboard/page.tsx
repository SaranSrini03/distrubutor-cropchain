// app/products/page.tsx
"use client";

import Head from "next/head";
import { useState } from "react";
import EmptyState from "../component/EmptyState";
import FooterCount from "../component/FooterCount";
import HeaderBar from "../component/HeaderBar";
import QRPopup from "../component/popup/QrPopup";
import ProductTable from "../component/ProductTable";
import ProductModal from "../component/popup/ProductModal";
import { Leaf } from "lucide-react";


export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isQROpen, setIsQROpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | {
    id: number;
    name: string;
    farmer: string;
    status: string;
    action: string;
  }>(null);

  const products = [
    { id: 1, name: "Tomato", farmer: "Naveen", status: "Ready", action: "completed" },
    { id: 2, name: "Rice", farmer: "Rajesh", status: "In transit", action: "completed" },
    { id: 3, name: "Wheat", farmer: "Amit", status: "Processing", action: "view" },
    { id: 4, name: "Potato", farmer: "Suresh", status: "Ready", action: "completed" },
    { id: 5, name: "Corn", farmer: "Rahul", status: "Processing", action: "view" },
  ];

  const filteredProducts = products.filter(
    (product) =>
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.farmer.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || product.status === statusFilter)
  );

  const stats = {
    total: products.length,
    ready: products.filter(p => p.status === "Ready").length,
    inTransit: products.filter(p => p.status === "In transit").length,
    processing: products.filter(p => p.status === "Processing").length,
    showing: filteredProducts.length
  };

  const handleView = (product: typeof selectedProduct) => setSelectedProduct(product);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 font-mono flex flex-col">
      <Head>
        <title>Products</title>
        <meta name="description" content="Products management" />
      </Head>

      {/* Header */}
      <header className="w-full bg-gradient-to-r from-green-600 to-emerald-500 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-green-900" />
            <h1 className="text-2xl font-bold text-white tracking-wide">Product Management</h1>
          </div>
          <button
            onClick={() => setIsQROpen(true)}
            className="px-4 py-2 bg-white text-green-700 font-semibold rounded-xl shadow-sm hover:bg-green-100 transition-all"
          >
            📱 Show QR
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-start py-8 px-4">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
          <HeaderBar
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            onOpenQR={() => setIsQROpen(true)}
          />

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-700">{stats.total}</div>
              <div className="text-sm text-green-600 mt-1">Total Products</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-700">{stats.ready}</div>
              <div className="text-sm text-blue-600 mt-1">Ready</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-amber-700">{stats.inTransit}</div>
              <div className="text-sm text-amber-600 mt-1">In Transit</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-700">{stats.processing}</div>
              <div className="text-sm text-purple-600 mt-1">Processing</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 text-center col-span-2 md:col-span-1">
              <div className="text-2xl font-bold text-emerald-700">{stats.showing}</div>
              <div className="text-sm text-emerald-600 mt-1">Now Showing</div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <input
              type="text"
              placeholder="Search products or farmers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all"
            >
              <option value="all">All Status</option>
              <option value="Ready">Ready</option>
              <option value="In transit">In Transit</option>
              <option value="Processing">Processing</option>
            </select>
          </div>

          {/* Product Table */}
          {filteredProducts.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <ProductTable
                products={filteredProducts}
                onView={handleView}
              />
            </div>
          ) : (
            <EmptyState visible={true} />
          )}

          {/* Footer */}
          <div className="mt-6 border-t pt-4">
            <FooterCount filtered={filteredProducts.length} total={products.length} />
          </div>
        </div>
      </main>

      {/* Popups */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <QRPopup
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
        qrData="https://cropchain.example.com"
      />

      <footer className="text-center text-sm py-4 text-gray-500 bg-green-50">
        © {new Date().getFullYear()} CropChain — Built with 🌿
      </footer>
    </div>
  );
}
