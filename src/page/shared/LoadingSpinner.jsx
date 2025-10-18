import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-4">
      <div className="relative mb-8">
        {/* Main Spinner */}
        <motion.div
          className="w-20 h-20 rounded-full border-4 border-purple-200 border-t-purple-600"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 w-24 h-24 -translate-x-2 -translate-y-2 rounded-full border-2 border-pink-500 opacity-20"
          animate={{ rotate: -360, scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Inner Dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating Particles */}
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"
          animate={{
            y: [0, -8, 0],
            x: [0, -2, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-500 rounded-full"
          animate={{
            y: [0, 8, 0],
            x: [0, 2, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
        />
      </div>

      {/* Loading Text */}
      <div className="text-center space-y-3">
        <motion.p
          className="text-gray-700 font-medium text-lg"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          লোড হচ্ছে...
        </motion.p>

        <motion.div
          className="w-40 h-1.5 bg-gray-200 rounded-full overflow-hidden mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            animate={{
              x: ["-100%", "100%"],
              width: ["20%", "30%", "20%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
