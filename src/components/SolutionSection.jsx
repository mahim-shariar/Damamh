import React, { useState, useRef } from "react";
import { FaPencilRuler } from "react-icons/fa";
import {
  FiPocket,
  FiScissors,
  FiShield,
  FiChevronLeft,
  FiChevronRight,
  FiImage,
} from "react-icons/fi";
import OrderModal from "./OrderModal";
import SuccessMessage from "./SuccessMesage";
import useFetch from "../hooks/useFetch";

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
  const [product, setProduct] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const { get } = useFetch();
  const hasFetchedProductRef = useRef(false); // Use ref instead of state

  // Fetch product data - FIXED: Run only once
  React.useEffect(() => {
    const fetchProduct = async () => {
      // Prevent multiple calls using ref
      if (hasFetchedProductRef.current) return;

      try {
        console.log("Fetching product data...");
        hasFetchedProductRef.current = true; // Set immediately to prevent concurrent calls
        const response = await get("/products");
        if (response.success && response.data.product) {
          setProduct(response.data.product);
        } else {
          console.log("No product found in response");
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [get]); // Remove hasFetchedProduct from dependencies

  // Handle image load errors
  const handleImageError = (slideId) => {
    setImageErrors((prev) => ({
      ...prev,
      [slideId]: true,
    }));
  };

  // Generate features from product data or use defaults
  const features =
    product?.features?.length > 0
      ? product.features.map((feature, index) => ({
          icon: getFeatureIcon(index),
          title: feature.title,
          description: feature.description,
        }))
      : [
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

  // Helper function for feature icons
  function getFeatureIcon(index) {
    const icons = [FiScissors, FiPocket, FiShield, FaPencilRuler];
    return icons[index] || FiScissors;
  }

  // Product slides from product images or use defaults
  const productSlides =
    product?.images?.length > 0
      ? product.images.map((image, index) => ({
          id: index + 1,
          image: image,
          color: getSlideColor(index),
        }))
      : [
          {
            id: 1,
            image: "/images/default-front.jpg",
            color: "from-purple-400 to-blue-400",
          },
          {
            id: 2,
            image: "/images/default-side.jpg",
            color: "from-blue-400 to-purple-400",
          },
          {
            id: 3,
            image: "/images/default-back.jpg",
            color: "from-purple-500 to-pink-400",
          },
          {
            id: 4,
            image: "/images/default-details.jpg",
            color: "from-pink-400 to-purple-400",
          },
        ];

  // Helper function for slide colors
  function getSlideColor(index) {
    const colors = [
      "from-purple-400 to-blue-400",
      "from-blue-400 to-purple-400",
      "from-purple-500 to-pink-400",
      "from-pink-400 to-purple-400",
    ];
    return colors[index] || "from-purple-400 to-blue-400";
  }

  // Sizes from product data or use defaults
  const sizes =
    product?.sizes?.length > 0
      ? product.sizes
      : ["৪৮", "৫০", "৫২", "৫৪", "৫৬", "৫৮"];

  // Special features from product data or use defaults
  const specialFeatures =
    product?.features?.length > 0
      ? product.features.slice(0, 4).map((feature) => feature.title)
      : [
          "Ultra-soft Cherry Fabric",
          "Breathable & আরামদায়ক",
          "Premium সেলাই ফিনিশিং",
          "Long-lasting রঙ",
        ];

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
    setShowOrderModal(false);
    setTimeout(() => {
      setShowSuccessMessage(true);
      setOrderForm({
        name: "",
        phone: "",
        address: "",
        size: "",
        quantity: "1",
      });
    }, 300);
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
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {product?.name || "Damaham Sonnoti Burka"} –{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                  আরাম, পূর্ণ কভারেজ ও মার্জিত লুক একসাথে
                </span>
              </h2>

              <p className="text-gray-600 text-lg mb-6">
                {product?.description ||
                  "প্রিমিয়াম কোয়ালিটি বারকা যা আপনার স্টাইল এবং কমফোর্ট দুটোই নিশ্চিত করে"}
              </p>

              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
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

              {/* Price Display */}
              {product && (
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-6 shadow-lg text-white mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-lg">বিশেষ মূল্য</h4>
                      <div className="flex items-center space-x-3 mt-2">
                        <span className="text-2xl font-bold">
                          ৳{product.price}
                        </span>
                        {product.originalPrice > product.price && (
                          <>
                            <span className="text-lg line-through opacity-70">
                              ৳{product.originalPrice}
                            </span>
                            <span className="bg-red-500 px-2 py-1 rounded-full text-sm font-bold">
                              -
                              {Math.round(
                                ((product.originalPrice - product.price) /
                                  product.originalPrice) *
                                  100
                              )}
                              %
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm opacity-90">স্টক আছে</div>
                      <div className="text-lg font-bold">
                        {product.stock}+ পিস
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Special Features */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 mb-6">
                <h4 className="font-bold text-gray-900 text-lg mb-3">
                  বিশেষ বৈশিষ্ট্য:
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {specialFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowOrderModal(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                👗 আমি এখনই বুক করতে চাই
              </button>
            </div>

            {/* Product Showcase with Slider */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-6">
                {/* Slider Container */}
                <div className="relative bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-6 aspect-square overflow-hidden">
                  {/* Slides */}
                  {productSlides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="h-full rounded-xl flex items-center justify-center p-6 relative">
                        {/* Actual Product Image or Fallback */}
                        {!imageErrors[slide.id] ? (
                          <img
                            src={slide.image}
                            alt={`${product?.name || "Product"} view ${
                              slide.id
                            }`}
                            className="w-full h-full object-cover rounded-xl"
                            onError={() => handleImageError(slide.id)}
                          />
                        ) : (
                          <div
                            className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${slide.color} rounded-xl`}
                          >
                            <FiImage className="text-white text-6xl opacity-70 mb-2" />
                            <span className="text-white text-sm opacity-80">
                              Image not available
                            </span>
                          </div>
                        )}

                        {/* Gradient Overlay */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${slide.color} opacity-10 rounded-xl`}
                        ></div>
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
                    {product?.name || "3D প্রোডাক্ট ভিউ"}
                  </p>
                  {product?.tags && (
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      {product.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Size Chart */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-purple-200 z-10">
                <h4 className="font-bold text-gray-900 mb-3 text-sm">
                  সাইজ চার্ট
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <div key={size} className="text-center">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center font-bold text-purple-700 text-sm">
                        {size}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Modal */}
      <OrderModal
        showOrderModal={showOrderModal}
        setShowOrderModal={setShowOrderModal}
        orderForm={orderForm}
        setOrderForm={setOrderForm}
        handleOrderSubmit={handleOrderSubmit}
        sizes={sizes}
        product={product}
      />

      {/* Success Message */}
      <SuccessMessage
        showSuccessMessage={showSuccessMessage}
        closeSuccessMessage={closeSuccessMessage}
        orderForm={orderForm}
        setShowOrderModal={setShowOrderModal}
        product={product}
      />
    </>
  );
};

export default SolutionSection;
