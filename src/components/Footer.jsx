import React from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiTwitter,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white">
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
              – সব একসাথে আপনার日常生活ের জন্য।
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
                { icon: FiPhone, text: "০১৭XXXXXXXX", href: "tel:017XXXXXXXX" },
                {
                  icon: FiMail,
                  text: "support@damaham.com",
                  href: "mailto:support@damaham.com",
                },
                { icon: FiMapPin, text: "ঢাকা, বাংলাদেশ", href: "#" },
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
                "প্রোডাক্ট ডিটেইল",
                "সাইজ চার্ট",
                "অর্ডার ট্র্যাক",
                "সাপোর্ট",
              ].map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="block text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-2 transform"
                >
                  {link}
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
            <p className="text-gray-400 text-center md:text-left">
              © ২০২৫ Damaham Sonnoti Burka. সমস্ত অধিকার সংরক্ষিত।
            </p>

            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              🚀 আমি এখনই বুক করতে চাই
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
