// app/page.tsx (for Next.js 13+ with App Router)
"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/dashboard"); // Change this to your desired route
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-4">
      <h1 className="text-4xl font-bold text-green-800 mb-6">
        Welcome to CropChain
      </h1>
      <p className="text-lg text-green-700 mb-8 text-center max-w-md">
        The easiest way to manage your crops, track growth, and connect with the agriculture community.
      </p>
      <button
        onClick={handleGetStarted}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors"
      >
        Get Started
      </button>
    </div>
  );
}
