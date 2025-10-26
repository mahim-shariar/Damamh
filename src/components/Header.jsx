import React, { useState, useEffect, useRef } from "react";
import {
  FiShoppingBag,
  FiPhone,
  FiMail,
  FiMenu,
  FiX,
  FiUser,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: "support@damaham.com",
    phoneNumber: "০১৭XXXXXXXX",
  });

  const { admin, isAuthenticated, logout } = useAuth();
  const { get } = useFetch();
  const hasFetchedRef = useRef(false); // Use ref to track API calls

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch contact information from API - only once
  useEffect(() => {
    const fetchContactInfo = async () => {
      // Prevent multiple calls using ref
      if (hasFetchedRef.current) return;

      try {
        hasFetchedRef.current = true; // Set immediately to prevent concurrent calls
        const response = await get("/website-content/contact");
        if (response.success) {
          setContactInfo(response.data.contact);
        }
      } catch (error) {
        console.error("Failed to fetch contact info:", error);
      }
    };

    fetchContactInfo();
  }, []); // Empty dependency array - only run once on mount

  const menuItems = [
    { name: "হোম", href: "#home" },
    { name: "বিশেষত্ব", href: "#features" },
    { name: "সাইজ", href: "#sizes" },
    { name: "রিভিউ", href: "#reviews" },
    { name: "জিজ্ঞাসা", href: "#faq" },
  ];

  const handleLogout = async () => {
    await logout();
    setIsProfileMenuOpen(false);
  };

  const handleDashboard = () => {
    window.location.href = "/dashboard";
    setIsProfileMenuOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const profileMenuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-white/20 py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <motion.div
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -10, 10, 0],
                }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                  <FiShoppingBag className="text-white text-xl" />
                </div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                />
              </motion.div>
              <div className="flex flex-col">
                <motion.h1
                  className="text-xl font-black bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.02 }}
                >
                  Damaham Sonnoti
                </motion.h1>
                <motion.p
                  className="text-xs text-gray-600 font-medium"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Premium Burka Collection
                </motion.p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav
              variants={containerVariants}
              className="hidden lg:flex items-center space-x-8"
            >
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    color: "#7c3aed",
                  }}
                  className="text-gray-700 font-semibold text-sm hover:text-purple-600 transition-colors duration-300 relative py-2"
                >
                  {item.name}
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </motion.nav>

            {/* Contact Info & Auth */}
            <motion.div
              variants={containerVariants}
              className="hidden md:flex items-center space-x-6"
            >
              {/* Contact Info */}
              <div className="flex items-center space-x-4">
                <motion.a
                  href={`tel:${contactInfo.phoneNumber}`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center space-x-2 group"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <FiPhone className="text-white text-sm" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-600 font-medium">কল করুন</p>
                    <p className="text-sm font-bold text-gray-800">
                      {contactInfo.phoneNumber}
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href={`mailto:${contactInfo.email}`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center space-x-2 group"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <FiMail className="text-white text-sm" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-600 font-medium">ইমেইল</p>
                    <p className="text-sm font-bold text-gray-800">
                      {contactInfo.email}
                    </p>
                  </div>
                </motion.a>
              </div>

              {/* Auth Section */}
              <div className="relative">
                {!isAuthenticated ? (
                  <div></div>
                ) : (
                  <motion.div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                      className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg text-white relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <FiUser className="text-lg" />
                    </motion.button>

                    {/* Profile Dropdown */}
                    <AnimatePresence>
                      {isProfileMenuOpen && (
                        <motion.div
                          variants={profileMenuVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                          className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50"
                        >
                          <div className="p-2">
                            <div className="px-3 py-2 border-b border-gray-100">
                              <p className="text-sm font-semibold text-gray-800">
                                {admin?.name || "Admin"}
                              </p>
                              <p className="text-xs text-gray-600 truncate">
                                {admin?.email}
                              </p>
                            </div>

                            <motion.button
                              whileHover={{
                                backgroundColor: "rgba(124, 58, 237, 0.1)",
                              }}
                              onClick={handleDashboard}
                              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:text-purple-600 transition-colors duration-200 rounded-lg"
                            >
                              ড্যাশবোর্ড
                            </motion.button>

                            <motion.button
                              whileHover={{
                                backgroundColor: "rgba(239, 68, 68, 0.1)",
                              }}
                              onClick={handleLogout}
                              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:text-red-700 transition-colors duration-200 rounded-lg"
                            >
                              লগআউট
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg text-white"
            >
              {isMobileMenuOpen ? (
                <FiX className="text-lg" />
              ) : (
                <FiMenu className="text-lg" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-80 bg-white/95 backdrop-blur-xl shadow-2xl border-l border-white/20 z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                      <FiShoppingBag className="text-white text-lg" />
                    </div>
                    <div>
                      <h2 className="font-black text-gray-800">
                        Damaham Sonnoti
                      </h2>
                      <p className="text-xs text-gray-600">
                        Premium Collection
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
                  >
                    <FiX className="text-gray-600" />
                  </button>
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-4 mb-8">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 px-4 text-gray-700 font-semibold rounded-2xl hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 border border-transparent hover:border-purple-100"
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </nav>

                {/* Mobile Contact Info */}
                <div className="space-y-4 mb-8">
                  <motion.a
                    href={`tel:${contactInfo.phoneNumber}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center space-x-3 p-4 bg-green-50 rounded-2xl border border-green-100 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <FiPhone className="text-white text-lg" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">কল করুন</p>
                      <p className="font-bold text-gray-800">
                        {contactInfo.phoneNumber}
                      </p>
                    </div>
                  </motion.a>

                  <motion.a
                    href={`mailto:${contactInfo.email}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center space-x-3 p-4 bg-blue-50 rounded-2xl border border-blue-100 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <FiMail className="text-white text-lg" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">ইমেইল করুন</p>
                      <p className="font-bold text-gray-800">
                        {contactInfo.email}
                      </p>
                    </div>
                  </motion.a>
                </div>

                {/* Mobile Auth Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  {!isAuthenticated ? (
                    <div></div>
                  ) : (
                    <div className="space-y-2">
                      <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
                        <p className="text-sm font-semibold text-gray-800">
                          {admin?.name || "Admin"}
                        </p>
                        <p className="text-xs text-gray-600">{admin?.email}</p>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDashboard}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        ড্যাশবোর্ড
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogout}
                        className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        লগআউট
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
