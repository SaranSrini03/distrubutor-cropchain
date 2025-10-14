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
    <div className="min-h-screen bg-green-50 font-mono flex items-center justify-center">
      <Head>
        <title>Products</title>
        <meta name="description" content="Products management" />
      </Head>

      <div className="w-full max-w-6xl px-4 py-6">
        <HeaderBar
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onOpenQR={() => setIsQROpen(true)}
        />

        <ProductTable products={filteredProducts} onView={handleView} onEdit={handleEdit} />
        <EmptyState visible={filteredProducts.length === 0} />

        <FooterCount filtered={filteredProducts.length} total={products.length} />
      </div>

      {/* QR Popup */}
      <QRPopup
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
        qrData="https://cropchain.example.com"
      />
    </div>
  );
}
