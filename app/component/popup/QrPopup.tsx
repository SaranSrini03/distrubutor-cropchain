// app/products/component/popup/QrPopup.tsx
"use client";

import { useState, useRef } from "react";
import QRCode from "react-qr-code"; // ✅ use this instead

interface QRPopupProps {
  isOpen: boolean;
  onClose: () => void;
  qrData?: string;
}

export default function QRPopup({ isOpen, onClose, qrData }: QRPopupProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setUploadedImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleBrowseClick = () => fileInputRef.current?.click();

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-6 w-96 max-w-[90vw] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">QR Code</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            ×
          </button>
        </div>

        {/* QR Code Display */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">
            Scan QR Code
          </h3>
          <div className="flex justify-center">
            <div className="w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center p-4">
              {qrData ? (
                <QRCode
                  value={qrData}
                  size={160} // size in px
                  level="H"   // high error correction
                  bgColor="#ffffff"
                  fgColor="#000000"
                />
              ) : (
                <p className="text-gray-400 text-sm text-center">No QR data available</p>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="mx-4 text-sm text-gray-500">or</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Image Upload Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">Upload Image</h3>
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 mb-4"
            onClick={handleBrowseClick}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            {uploadedImage ? (
              <div className="relative">
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="w-32 h-32 object-cover rounded-lg mx-auto shadow-md"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            ) : (
              <p className="text-gray-400 text-sm text-center">Click to browse image</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            Close
          </button>
          {uploadedImage && (
            <button
              onClick={() => {
                console.log("Processing uploaded image:", uploadedImage);
                alert("Image uploaded successfully!");
              }}
              className="flex-1 py-3 px-4 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors duration-200"
            >
              Process Image
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
