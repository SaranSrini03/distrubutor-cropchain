"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-100 px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 relative z-10"
      >


        <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-[#10b981] bg-clip-text text-transparent">
          CropChain
        </h1>
        
        <p className="text-gray-400 max-w-md mx-auto text-lg leading-relaxed">
          Streamline your crop distribution process and connect with your agricultural network effortlessly.
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onClick={handleGetStarted}
        className="mt-12 relative z-10 bg-gradient-to-br from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-medium px-8 py-4 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 hover:shadow-xl active:scale-95 group"
      >
        <span className="flex items-center justify-center">
          Get Started
          <svg 
            className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </motion.button>

      {/* Feature highlights */}
  

      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute bottom-6 text-sm text-gray-500"
      >
        © {new Date().getFullYear()} CropChain. All rights reserved.
      </motion.footer>
    </div>
  );
}