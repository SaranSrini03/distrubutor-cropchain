// app/products/page.tsx
"use client";

import Head from "next/head";
import { useState } from "react";
import EmptyState from "../component/EmptyState";
import FooterCount from "../component/FooterCount";
import HeaderBar from "../component/HeaderBar";
import QRPopup from "../component/popup/QrPopup";
import ProductTable from "../component/ProductTable";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isQROpen, setIsQROpen] = useState(false);

  const products = [
    { id: 1, name: "Tomato", farmer: "Naveen", status: "Ready", action: "completed" },
    { id: 2, name: "Rice", farmer: "Rajesh", status: "In transit", action: "completed" },
    { id: 3, name: "Wheat", farmer: "Amit", status: "Processing", action: "view" },
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (product: { id: number }) => {
    console.log("VIEW", product.id);
  };

  const handleEdit = (product: { id: number }) => {
    console.log("EDIT", product.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 font-mono flex flex-col">
      <Head>
        <title>Products</title>
        <meta name="description" content="Products management" />
      </Head>

      {/* Header Section */}
      <header className="w-full bg-gradient-to-r from-green-600 to-emerald-500 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            🌾 Product Management
          </h1>
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
          {/* Header Bar */}
          <div className="mb-6">
            <HeaderBar
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
              onOpenQR={() => setIsQROpen(true)}
            />
          </div>

          {/* Product Table or Empty State */}
          {filteredProducts.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <ProductTable
                products={filteredProducts}
                onView={handleView}
                onEdit={handleEdit}
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

      {/* QR Popup */}
      <QRPopup
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
        qrData="https://cropchain.example.com"
      />

      {/* Footer Bar */}
      <footer className="text-center text-sm py-4 text-gray-500 bg-green-50">
        © {new Date().getFullYear()} CropChain — Built with 🌿
      </footer>
    </div>
  );
}
