import React, { useState, useEffect, useRef } from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiUser,
  FiLogIn,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import useFetch from "../hooks/useFetch";

const Footer = () => {
  const [contactInfo, setContactInfo] = useState({
    email: "support@damaham.com",
    phoneNumber: "০১৭XXXXXXXX",
  });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  const { get } = useFetch();
  const hasFetchedContactRef = useRef(false); // Use ref instead of state

  // Check if admin is already logged in
  useEffect(() => {
    const checkAdminStatus = () => {
      const token = localStorage.getItem("adminToken");
      const userData = localStorage.getItem("adminUser");

      if (token && userData) {
        try {
          setIsAdminLoggedIn(true);
          setAdminUser(JSON.parse(userData));
        } catch (error) {
          console.error("Error parsing admin user data:", error);
          logoutAdmin();
        }
      }
    };

    checkAdminStatus();
  }, []);

  // Fetch contact information - only once
  useEffect(() => {
    const fetchContactInfo = async () => {
      if (hasFetchedContactRef.current) return;

      try {
        console.log("Fetching contact information...");
        hasFetchedContactRef.current = true;
        const response = await get("/website-content/contact");

        if (response.success && response.data.contact) {
          const { email, phoneNumber } = response.data.contact;
          setContactInfo({
            email: email || "support@damaham.com",
            phoneNumber: phoneNumber || "০১৭XXXXXXXX",
          });
        }
      } catch (error) {
        console.error("Failed to fetch contact information:", error);
        // Keep default values if fetch fails
      }
    };

    fetchContactInfo();
  }, [get]);

  const handleBookNowClick = () => {
    const orderSection = document.getElementById("solution");
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAdminLoginClick = () => {
    // Redirect to login page
    window.location.href = "/login";
  };

  const handleAdminLogout = () => {
    logoutAdmin();
  };

  const logoutAdmin = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setIsAdminLoggedIn(false);
    setAdminUser(null);
  };

  const handleAdminPanelClick = () => {
    // Navigate to admin panel
    window.location.href = "/admin";
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white relative">
      {/* Admin Indicator */}
      {isAdminLoggedIn && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-2">
            <FiUser className="text-xs" />
            <span>Admin</span>
          </div>
        </div>
      )}

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">DS</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Damaham Sonnoti</h3>
                <p className="text-gray-400">Premium Burka Collection</p>
              </div>
            </div>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              <span className="font-semibold text-white">
                আরাম + শালীনতা + মার্জিত লুক
              </span>{" "}
              – সবকিছু একসাথে আপনার দৈনন্দিন জীবনের জন্য।
            </p>
            <div className="flex space-x-4">
              {[FiFacebook, FiInstagram, FiTwitter].map((Icon, index) => (
                <button
                  key={index}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors duration-300"
                >
                  <Icon className="text-white" />
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">যোগাযোগ</h4>
            <div className="space-y-4">
              {[
                {
                  icon: FiPhone,
                  text: contactInfo.phoneNumber,
                  href: `tel:${contactInfo.phoneNumber}`,
                },
                {
                  icon: FiMail,
                  text: contactInfo.email,
                  href: `mailto:${contactInfo.email}`,
                },
                {
                  icon: FiMapPin,
                  text: "ঢাকা, বাংলাদেশ",
                  href: "#",
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300"
                >
                  <item.icon className="text-purple-400 flex-shrink-0" />
                  <span>{item.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">দ্রুত লিংক</h4>
            <div className="space-y-3">
              {[
                { name: "প্রোডাক্ট ডিটেইল", href: "#solution" },
                { name: "সাইজ চার্ট", href: "#solution" },
                { name: "অর্ডার ট্র্যাক", href: "#" },
                { name: "সাপোর্ট", href: "#" },
                // Admin link - only show if logged in
                ...(isAdminLoggedIn
                  ? [{ name: "এডমিন প্যানেল", href: "/admin", isAdmin: true }]
                  : []),
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className={`block transition-colors duration-300 hover:translate-x-2 transform ${
                    link.isAdmin
                      ? "text-green-400 hover:text-green-300 font-semibold"
                      : "text-gray-300 hover:text-white"
                  }`}
                  onClick={link.isAdmin ? handleAdminPanelClick : undefined}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 text-center md:text-left">
                © ২০২৫ Damaham Sonnoti Burka. সমস্ত অধিকার সংরক্ষিত।
              </p>

              {/* Admin Login/Logout Button */}
              <button
                onClick={
                  isAdminLoggedIn ? handleAdminLogout : handleAdminLoginClick
                }
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isAdminLoggedIn
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {isAdminLoggedIn ? (
                  <>
                    <FiLogOut className="text-sm" />
                    <span>লগআউট</span>
                  </>
                ) : (
                  <>
                    <FiLogIn className="text-sm" />
                    <span>এডমিন লগইন</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={handleBookNowClick}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              🚀 আমি এখনই বুক করতে চাই
            </button>
          </div>

          {/* Admin User Info */}
          {isAdminLoggedIn && adminUser && (
            <div className="mt-4 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-full">
                <FiUser className="text-green-400 text-sm" />
                <span className="text-green-400 text-sm">
                  লগড ইন: {adminUser.name || adminUser.email}
                </span>
                <FiSettings
                  className="text-blue-400 text-sm cursor-pointer hover:text-blue-300"
                  onClick={handleAdminPanelClick}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
