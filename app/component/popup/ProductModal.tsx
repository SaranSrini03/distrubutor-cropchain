// app/products/component/popup/ProductModal.tsx
"use client";
import { AlertCircle, CheckCircle, Leaf, User, X } from "lucide-react";

interface Product {
  id: number;
  name: string;
  farmer: string;
  status: string;
  action: string;
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "available":
        return "bg-green-50 border-green-200";
      case "inactive":
      case "unavailable":
        return "bg-red-50 border-red-200";
      case "pending":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "available":
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <CheckCircle size={16} />
            {status}
          </div>
        );
      case "inactive":
      case "unavailable":
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            <AlertCircle size={16} />
            {status}
          </div>
        );
      case "pending":
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
            <AlertCircle size={16} />
            {status}
          </div>
        );
      default:
        return (
          <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {status}
          </div>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-11/12 max-w-md overflow-hidden transform transition-all duration-300 hover:shadow-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-8">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-all duration-200"
              aria-label="Close modal"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <h2 className="text-2xl font-bold text-white">Product Details</h2>
          </div>
          <p className="text-green-50 text-sm">ID: {product.id}</p>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-5">
          {/* Product Name */}
          <div>
            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide block mb-2">
              Product Name
            </label>
            <p className="text-lg font-bold text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">
              {product.name}
            </p>
          </div>

          {/* Farmer Info */}
          <div>
            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide block mb-2">
              Farmer
            </label>
            <div className="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-lg border border-blue-100">
              <User size={18} className="text-blue-600 flex-shrink-0" />
              <p className="font-medium text-gray-900">{product.farmer}</p>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide block mb-2">
              Status
            </label>
            <div className={`px-4 py-3 rounded-lg border ${getStatusColor(product.status)}`}>
              {getStatusBadge(product.status)}
            </div>
          </div>

          {/* Action Info */}
          {product.action && (
            <div>
              <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide block mb-2">
                Action
              </label>
              <p className="text-gray-700 bg-purple-50 px-4 py-3 rounded-lg border border-purple-100">
                {product.action}
              </p>
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-6 py-4 flex gap-3 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Done
          </button>
          <button
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
          >
            add details
          </button>
        </div>
      </div>
    </div>
  );
}