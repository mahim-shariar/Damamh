import React, { useEffect, useState } from "react";
import { FaPencilRuler } from "react-icons/fa";
import {
  FiPocket,
  FiScissors,
  FiShield,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
} from "react-icons/fi";

const SolutionSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    address: "",
    size: "",
    quantity: "1",
  });

  const features = [
    {
      icon: FiScissors,
      title: "সুন্দর ডিজাইন",
      description: "সামনে ও পেছনে ইলিগেন্ট কুঁচি ডিটেইল",
    },
    {
      icon: FiPocket,
      title: "হিডেন সাইড পকেট",
      description: "চেইনসহ গোপন পকেট, মোবাইল নিরাপদ",
    },
    {
      icon: FiShield,
      title: "ফুল কভারেজ",
      description: "লং হিজাব ও ২ পার্টের লং নিকাব",
    },
    {
      icon: FaPencilRuler,
      title: "সঠিক সাইজ",
      description: "৪৮/৫০/৫২/৫৪/৫৬/৫৮ - ৬টি সাইজ",
    },
  ];

  // Product slides for the slider
  const productSlides = [
    {
      id: 1,
      title: "Front View",
      description: "সামনের ইলিগেন্ট ডিজাইন",
      gradient: "from-purple-400 to-blue-400",
      features: ["সুন্দর কুঁচি ডিটেইল", "নরম ফ্যাব্রিক", "পূর্ণ কভারেজ"],
    },
    {
      id: 2,
      title: "Side View",
      description: "পাশের হিডেন পকেট",
      gradient: "from-blue-400 to-purple-400",
      features: ["গোপন পকেট", "মোবাইল সুরক্ষা", "চেইন সুবিধা"],
    },
    {
      id: 3,
      title: "Back View",
      description: "পিছনের ডিজাইন",
      gradient: "from-purple-500 to-pink-400",
      features: ["লং হিজাব", "আরামদায়ক ফিট", "প্রিমিয়াম কোয়ালিটি"],
    },
    {
      id: 4,
      title: "Fabric Close-up",
      description: "রঞ্জিত সুপার চেরি ফ্যাব্রিক",
      gradient: "from-pink-400 to-purple-400",
      features: ["ব্রিদেবল", "নরম", "দীর্ঘস্থায়ী"],
    },
  ];

  const sizes = ["৪৮", "৫০", "৫২", "৫৪", "৫৬", "৫৮"];

  useEffect(() => {
    // Scroll animation for feature items
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    // Observe all feature items and special elements
    const featureItems = document.querySelectorAll(".feature-item");
    const productShowcase = document.querySelectorAll(".product-showcase");
    const specialFeatures = document.querySelectorAll(".special-features");
    const ctaButton = document.querySelectorAll(".cta-button");

    featureItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";
      item.style.transition = "all 0.6s ease-out";
      observer.observe(item);
    });

    productShowcase.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateX(20px)";
      item.style.transition = "all 0.8s ease-out";
      observer.observe(item);
    });

    specialFeatures.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "scale(0.95)";
      item.style.transition = "all 0.5s ease-out";
      observer.observe(item);
    });

    ctaButton.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(10px)";
      item.style.transition = "all 0.4s ease-out 0.3s";
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % productSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + productSlides.length) % productSlides.length
    );
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();

    // Simulate order processing
    setShowOrderModal(false);

    // Show success message after a small delay
    setTimeout(() => {
      setShowSuccessMessage(true);

      // Reset form
      setOrderForm({
        name: "",
        phone: "",
        address: "",
        size: "",
        quantity: "1",
      });
    }, 300);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  return (
    <>
      <section
        id="solution"
        className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-fade-in">
                Damaham Sonnoti Burka –{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                  আরাম, পূর্ণ কভারেজ ও মার্জিত লুক একসাথে
                </span>
              </h2>

              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="feature-item flex items-start space-x-4 bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Special Features */}
              <div className="special-features bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
                <h4 className="font-bold text-gray-900 text-lg mb-3">
                  বিশেষ বৈশিষ্ট্য:
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    "Ultra-soft Cherry Fabric",
                    "Breathable & আরামদায়ক",
                    "Premium সেলাই ফিনিশিং",
                    "Long-lasting রঙ",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowOrderModal(true)}
                className="cta-button w-full mt-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                👗 আমি এখনই বুক করতে চাই
              </button>
            </div>

            {/* Product Showcase with Slider */}
            <div className="product-showcase relative">
              <div className="bg-white rounded-3xl shadow-2xl p-6">
                {/* Slider Container */}
                <div className="relative bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-6 aspect-square overflow-hidden">
                  {/* Slides */}
                  {productSlides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div
                        className={`h-full bg-gradient-to-br ${slide.gradient} rounded-xl flex flex-col items-center justify-center text-white p-6`}
                      >
                        {/* Product Silhouette */}
                        <div className="w-32 h-40 bg-white/20 rounded-2xl mx-auto mb-4 shadow-2xl backdrop-blur-sm border border-white/30 relative">
                          {/* Hidden Pocket Indicator - Show only on side view */}
                          {index === 1 && (
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                              <div className="w-6 h-8 bg-yellow-400 rounded-lg border-2 border-white shadow-lg flex items-center justify-center">
                                <FiPocket className="text-white text-xs" />
                              </div>
                            </div>
                          )}

                          {/* Front View Details */}
                          {index === 0 && (
                            <div className="absolute left-3 top-4 w-2 h-16 bg-white/30 rounded-full"></div>
                          )}

                          {/* Back View Details */}
                          {index === 2 && (
                            <div className="absolute right-3 top-4 w-2 h-16 bg-white/30 rounded-full"></div>
                          )}

                          {/* Fabric Texture */}
                          {index === 3 && (
                            <div className="absolute inset-2 bg-white/10 rounded-lg backdrop-blur-sm"></div>
                          )}
                        </div>

                        {/* Slide Content */}
                        <div className="text-center">
                          <h3 className="text-xl font-black mb-2">
                            {slide.title}
                          </h3>
                          <p className="text-white/90 mb-3">
                            {slide.description}
                          </p>

                          {/* Features List */}
                          <div className="flex flex-wrap justify-center gap-2">
                            {slide.features.map((feature, featureIndex) => (
                              <span
                                key={featureIndex}
                                className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/20 z-10"
                  >
                    <FiChevronLeft className="text-gray-800 text-lg" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/20 z-10"
                  >
                    <FiChevronRight className="text-gray-800 text-lg" />
                  </button>

                  {/* Slide Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                    {productSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? "bg-white scale-125"
                            : "bg-white/50 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Slide Counter */}
                  <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 z-10">
                    <span className="text-white text-sm font-bold">
                      {currentSlide + 1} / {productSlides.length}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="text-center mt-4">
                  <p className="text-gray-700 font-semibold text-lg">
                    3D প্রোডাক্ট ভিউ
                  </p>
                </div>
              </div>

              {/* Size Chart */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-purple-200">
                <h4 className="font-bold text-gray-900 mb-3">সাইজ চার্ট</h4>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <div key={size} className="text-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center font-bold text-purple-700">
                        {size}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in {
            animation: fadeIn 1s ease-out;
          }
        `}</style>
      </section>

      {/* Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-black">অর্ডার ফর্ম</h3>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <FiX className="text-white" />
                </button>
              </div>
              <p className="text-white/90 mt-2">
                Damaham Sonnoti Burka - আপনার অর্ডার সম্পূর্ণ করুন
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    আপনার নাম *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={orderForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="আপনার পূর্ণ নাম লিখুন"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    মোবাইল নম্বর *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={orderForm.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="01XXXXXXXXX"
                  />
                </div>

                {/* Size Selection */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    সাইজ নির্বাচন করুন *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() =>
                          setOrderForm((prev) => ({ ...prev, size }))
                        }
                        className={`py-3 rounded-xl border-2 font-bold transition-all ${
                          orderForm.size === size
                            ? "bg-purple-600 text-white border-purple-600"
                            : "bg-gray-100 text-gray-700 border-gray-200 hover:border-purple-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    পরিমাণ
                  </label>
                  <select
                    name="quantity"
                    value={orderForm.quantity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num.toString()}>
                        {num} টি
                      </option>
                    ))}
                  </select>
                </div>

                {/* Address Field */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    সম্পূর্ণ ঠিকানা *
                  </label>
                  <textarea
                    name="address"
                    value={orderForm.address}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                    placeholder="বাড়ি নং, রোড নং, এলাকা, জেলা"
                  />
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    অর্ডার সামারি
                  </h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>পণ্য:</span>
                      <span>Damaham Sonnoti Burka</span>
                    </div>
                    <div className="flex justify-between">
                      <span>সাইজ:</span>
                      <span>{orderForm.size || "নির্বাচন করুন"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>পরিমাণ:</span>
                      <span>{orderForm.quantity} টি</span>
                    </div>
                    <div className="border-t pt-1 mt-1">
                      <div className="flex justify-between font-bold text-purple-600">
                        <span>মোট:</span>
                        <span>ক্যাশ অন ডেলিভারি</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={
                    !orderForm.name ||
                    !orderForm.phone ||
                    !orderForm.address ||
                    !orderForm.size
                  }
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ✅ অর্ডার কনফার্ম করুন
                </button>

                {/* Additional Info */}
                <p className="text-center text-xs text-gray-500">
                  অর্ডার কনফার্ম করলে আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবে
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-500 scale-100">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-t-3xl text-center">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <FiCheckCircle className="text-white text-4xl" />
                </div>
              </div>
              <h3 className="text-3xl font-black mb-2">অর্ডার সফল!</h3>
              <p className="text-white/90 text-lg">
                আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে
              </p>
            </div>

            {/* Success Body */}
            <div className="p-8 text-center">
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <FiCheckCircle className="text-xl" />
                  <span className="font-bold text-lg">অর্ডার কনফার্মেশন</span>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  ধন্যবাদ! <strong>{orderForm.name}</strong> আপনার অর্ডারটি
                  সফলভাবে জমা হয়েছে। আমাদের প্রতিনিধি{" "}
                  <strong>২৪ ঘন্টার মধ্যে</strong> আপনার প্রদত্ত নম্বর{" "}
                  {orderForm.phone} এ যোগাযোগ করবে।
                </p>

                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <h4 className="font-bold text-green-800 mb-2">
                    অর্ডার ডিটেইলস:
                  </h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <div className="flex justify-between">
                      <span>পণ্য:</span>
                      <span className="font-bold">Damaham Sonnoti Burka</span>
                    </div>
                    <div className="flex justify-between">
                      <span>সাইজ:</span>
                      <span className="font-bold">{orderForm.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>পরিমাণ:</span>
                      <span className="font-bold">{orderForm.quantity} টি</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ডেলিভারি:</span>
                      <span className="font-bold">ক্যাশ অন ডেলিভারি</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 mb-6">
                <h4 className="font-bold text-blue-800 mb-2">পরবর্তী ধাপ:</h4>
                <ul className="text-sm text-blue-700 space-y-1 text-left">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবে</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>অর্ডার ভেরিফিকেশন</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>১-৩ কর্মদিবসের মধ্যে ডেলিভারি</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={closeSuccessMessage}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  👍 ঠিক আছে, ধন্যবাদ!
                </button>
                <button
                  onClick={() => {
                    closeSuccessMessage();
                    setShowOrderModal(true);
                  }}
                  className="w-full border-2 border-green-500 text-green-600 py-3 rounded-xl font-bold hover:bg-green-50 transition-all duration-300"
                >
                  ➕ আরেকটি অর্ডার করুন
                </button>
              </div>

              {/* Contact Info */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  কোনো প্রশ্ন থাকলে কল করুন: <strong>০১৭XX-XXXXXX</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SolutionSection;
