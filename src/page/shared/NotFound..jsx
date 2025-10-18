import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiArrowLeft, FiAlertTriangle } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Animated 404 Graphic */}
        <div className="relative mb-8">
          <div className="w-48 h-48 mx-auto bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-2xl">
            <FiAlertTriangle className="text-white text-6xl" />
          </div>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
        </div>

        {/* Error Message */}
        <h1 className="text-9xl font-black text-gray-800 mb-4">404</h1>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            পেজটি পাওয়া যায়নি!
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি মুছে ফেলা হয়েছে, নাম পরিবর্তন
            করা হয়েছে বা সাময়িকভাবে অনুপলব্ধ।
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <FiHome className="text-xl" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center space-x-3 border-2 border-purple-600 text-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
          >
            <FiArrowLeft className="text-xl" />
            <span>পেছনে ফিরে যান</span>
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-xl p-4">
          <p className="text-gray-600 text-sm">
            সমস্যা হচ্ছে?{" "}
            <Link
              to="/contact"
              className="text-purple-600 font-semibold hover:underline"
            >
              আমাদের সাথে যোগাযোগ করুন
            </Link>
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-8 h-8 bg-purple-300 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute top-20 right-16 w-6 h-6 bg-pink-300 rounded-full opacity-40 animate-bounce delay-500"></div>
        <div className="absolute bottom-20 left-20 w-4 h-4 bg-blue-300 rounded-full opacity-40 animate-bounce delay-1000"></div>
        <div className="absolute bottom-10 right-10 w-10 h-10 bg-yellow-300 rounded-full opacity-40 animate-bounce delay-1500"></div>
      </div>
    </div>
  );
};

export default NotFound;
