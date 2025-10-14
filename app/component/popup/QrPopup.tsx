"use client";

import { useState, useRef, useEffect } from "react";
import QRCode from "react-qr-code";

interface QRPopupProps {
  isOpen: boolean;
  onClose: () => void;
  qrData?: string;
}

export default function QRPopup({ isOpen, onClose, qrData }: QRPopupProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scanCanvasRef = useRef<HTMLCanvasElement>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Reset state when closing
  useEffect(() => {
    if (!isOpen) {
      setCapturedImage(null);
      setCameraOpen(false);
      setIsLoading(false);
      setScanning(false);
      setScannedResult(null);
      stopCamera();
    }
  }, [isOpen]);

  // Start camera
  const startCamera = async () => {
    setIsLoading(true);
    setCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // rear camera
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Cannot access camera. Please check permissions.");
      setCameraOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Start QR scanning
  const startScanning = () => {
    setScanning(true);
    setScannedResult(null);
    
    scanIntervalRef.current = setInterval(() => {
      if (videoRef.current && scanCanvasRef.current) {
        const context = scanCanvasRef.current.getContext('2d');
        if (context) {
          const video = videoRef.current;
          const width = video.videoWidth;
          const height = video.videoHeight;
          
          scanCanvasRef.current.width = width;
          scanCanvasRef.current.height = height;
          context.drawImage(video, 0, 0, width, height);
          
          // Simple QR code detection simulation
          // In a real app, you would use a QR scanning library like jsQR
          detectQRCode();
        }
      }
    }, 500); // Scan every 500ms
  };

  // Stop QR scanning
  const stopScanning = () => {
    setScanning(false);
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
  };

  // Simulate QR code detection
  const detectQRCode = () => {
    // This is a simplified simulation
    // In a real implementation, you would use a library like:
    // import jsQR from 'jsqr';
    // const imageData = context.getImageData(0, 0, width, height);
    // const code = jsQR(imageData.data, width, height);
    
    // For demo purposes, we'll simulate random QR detection
    if (Math.random() < 0.1) { // 10% chance to "detect" a QR code
      const demoResults = [
        "https://example.com",
        "WIFI:S:MyNetwork;T:WPA;P:MyPassword;;",
        "BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nTEL:1234567890\nEND:VCARD",
        "MATMSG:TO:email@example.com;SUB:Subject;BODY:Message;;"
      ];
      const randomResult = demoResults[Math.floor(Math.random() * demoResults.length)];
      setScannedResult(randomResult);
      stopScanning();
      stopCamera();
      console.log("QR Code Scanned:", randomResult);
    }
  };

  // Take picture from camera
  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        const video = videoRef.current;
        const width = 300;
        const height = (video.videoHeight / video.videoWidth) * 300;
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        context.drawImage(video, 0, 0, width, height);
        const dataUrl = canvasRef.current.toDataURL("image/jpeg", 0.9);
        setCapturedImage(dataUrl);
        stopCamera();
        stopScanning();
      }
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    setCameraOpen(false);
    stopScanning();
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach((track) => track.stop());
  };

  // Remove captured image
  const removeImage = () => setCapturedImage(null);

  // Next button handler
  const handleNext = () => {
    if (capturedImage) {
      console.log("Captured Image Data URL:", capturedImage);
      alert("Image captured! Check console for details.");
    }
  };

  // Handle QR scan result
  const handleScanResult = () => {
    if (scannedResult) {
      console.log("QR Scan Result:", scannedResult);
      alert(`QR Code Scanned: ${scannedResult}`);
      // You can add additional logic here to handle the scanned result
    }
  };

  // Handle close
  const handleClose = () => {
    stopCamera();
    stopScanning();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-md"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-4 transform transition-transform duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">QR & Camera</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            ×
          </button>
        </div>

        {/* QR Code Section */}
        {qrData && (
          <div className="mb-6 flex justify-center">
            <QRCode value={qrData} size={180} level="H" bgColor="#fff" fgColor="#1f2937" />
          </div>
        )}

        {/* Scanned QR Result */}
        {scannedResult && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl">
            <h3 className="text-lg font-semibold text-green-800 mb-2">QR Code Scanned!</h3>
            <p className="text-green-700 break-words text-sm mb-3">{scannedResult}</p>
            <button
              onClick={handleScanResult}
              className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Use This Result
            </button>
          </div>
        )}

        {/* Captured Image Section */}
        {capturedImage && (
          <div className="mb-6 text-center">
            <img
              src={capturedImage}
              alt="Captured"
              className="mx-auto w-48 h-48 object-cover rounded-2xl shadow-md border border-gray-200"
            />
            <div className="flex gap-2 mt-4 justify-center">
              <button
                onClick={removeImage}
                className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Retake
              </button>
              <button
                onClick={handleNext}
                className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Camera Feed */}
        {cameraOpen && (
          <div className="mb-6 relative">
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-64 object-cover rounded-2xl border border-gray-300 shadow-lg"
              />
              {/* QR Scan Overlay */}
              {scanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="border-2 border-green-500 rounded-lg w-48 h-48 animate-pulse">
                    <div className="absolute top-0 left-0 right-0 text-center -mt-6">
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                        Scanning QR Code...
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <canvas ref={canvasRef} className="hidden" />
            <canvas ref={scanCanvasRef} className="hidden" />
            
            {/* Camera Controls */}
            <div className="flex gap-2 mt-4 justify-center">
              {!scanning ? (
                <button
                  onClick={startScanning}
                  className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Scan QR Code
                </button>
              ) : (
                <button
                  onClick={stopScanning}
                  className="flex-1 py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Stop Scanning
                </button>
              )}
              <button
                onClick={takePicture}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Take Picture
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {!cameraOpen && !capturedImage && !scannedResult && (
          <button
            onClick={startCamera}
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? "Starting Camera..." : "Open Camera"}
          </button>
        )}

        {/* Scan Again Button */}
        {scannedResult && !cameraOpen && (
          <button
            onClick={() => {
              setScannedResult(null);
              startCamera();
            }}
            className="w-full py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-200 mb-2"
          >
            Scan Another QR Code
          </button>
        )}

        <button
          onClick={handleClose}
          className="w-full mt-2 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
}