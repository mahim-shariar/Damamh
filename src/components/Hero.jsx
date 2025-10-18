import React, { useEffect, useRef, useState } from "react";
import {
  FiPlay,
  FiShield,
  FiHeart,
  FiStar,
  FiShoppingBag,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiImage,
} from "react-icons/fi";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import SuccessMessage from "./SuccessMesage";
import OrderModal from "./OrderModal";
import useFetch from "../hooks/useFetch";

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    address: "",
    size: "",
    quantity: "1",
  });
  const [heroContent, setHeroContent] = useState({
    heroTitle: "ঝিনুকের মধ্যে মুক্তা তেমন সুরক্ষিত",
    heroSubtitle:
      "তেমনই আপনার পর্দাও – Ronjit Super Cherry ফ্যাব্রিক দিয়ে তৈরি Damamah Sonnoti Burka",
    youtubeVideoUrl: "",
  });
  const [product, setProduct] = useState(null);
  const [hasFetchedContent, setHasFetchedContent] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const { get } = useFetch();
  const sizes = ["৪৮", "৫০", "৫২", "৫৪", "৫৬", "৫৮"];

  // Fetch all website content and product data
  useEffect(() => {
    const fetchWebsiteContent = async () => {
      if (hasFetchedContent) return;

      try {
        // Fetch website content
        const contentResponse = await get("/website-content");
        if (contentResponse.success && contentResponse.data.content) {
          const content = contentResponse.data.content;
          setHeroContent({
            heroTitle:
              content.heroTitle || "ঝিনুকের মধ্যে মুক্তা তেমন সুরক্ষিত",
            heroSubtitle:
              content.heroSubtitle ||
              "তেমনই আপনার পর্দাও – Ronjit Super Cherry ফ্যাব্রিক দিয়ে তৈরি Damamah Sonnoti Burka",
            youtubeVideoUrl: content.youtubeVideoUrl || "",
          });
        }

        // Fetch product data
        const productResponse = await get("/products");
        if (productResponse.success && productResponse.data.product) {
          setProduct(productResponse.data.product);
        }

        setHasFetchedContent(true);
      } catch (error) {
        console.error("Failed to fetch website content or product:", error);
        setHasFetchedContent(true);
      }
    };

    fetchWebsiteContent();
  }, [get, hasFetchedContent]);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;

    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(heroContent.youtubeVideoUrl);

  // Handle image load errors
  const handleImageError = (slideId) => {
    setImageErrors((prev) => ({
      ...prev,
      [slideId]: true,
    }));
  };

  // Generate product slides from product data or use defaults
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
            color: "from-purple-500 to-pink-500",
          },
          {
            id: 2,
            image: "/images/default-side.jpg",
            color: "from-blue-500 to-cyan-500",
          },
          {
            id: 3,
            image: "/images/default-back.jpg",
            color: "from-green-500 to-emerald-500",
          },
          {
            id: 4,
            image: "/images/default-details.jpg",
            color: "from-orange-500 to-red-500",
          },
        ];

  // Helper function for slide colors
  function getSlideColor(index) {
    const colors = [
      "from-purple-500 to-pink-500",
      "from-blue-500 to-cyan-500",
      "from-green-500 to-emerald-500",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-purple-500",
      "from-rose-500 to-red-500",
    ];
    return colors[index] || "from-purple-500 to-pink-500";
  }

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [productSlides.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % productSlides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide(
      (prev) => (prev - 1 + productSlides.length) % productSlides.length
    );
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
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

  const openVideoModal = () => {
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, duration: 0.6 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const videoModalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  // Function to split hero title into parts for styling
  const renderHeroTitle = () => {
    if (!heroContent.heroTitle) {
      return (
        <>
          <span className="block">ঝিনুকের মধ্যে</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            মুক্তা
          </span>
          <span className="block">তেমন সুরক্ষিত</span>
        </>
      );
    }

    // Split the title by asterisks to identify gradient parts
    const parts = heroContent.heroTitle.split("*");

    if (parts.length === 1) {
      // No asterisks found, return as is
      return <span className="block">{heroContent.heroTitle}</span>;
    }

    return parts.map((part, index) => {
      if (index % 2 === 0) {
        // Regular text
        return (
          <span key={index} className="block">
            {part}
          </span>
        );
      } else {
        // Gradient text (between asterisks)
        return (
          <span
            key={index}
            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
          >
            {part}
          </span>
        );
      }
    });
  };

  return (
    <>
      <section className="relative min-h-screen py-10 flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-40"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-40"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Content */}
            <div className="text-center lg:text-left">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 mb-8 shadow-lg"
              >
                <FiStar className="text-yellow-500 text-xl" />
                <span className="text-sm font-bold text-gray-800">
                  ১০,০০০+ সন্তুষ্ট গ্রাহক • ৪.৯/৫ রেটিং
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
              >
                {renderHeroTitle()}
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-700 mb-8 leading-relaxed"
              >
                {heroContent.heroSubtitle || (
                  <>
                    <span className="font-semibold text-purple-600">
                      তেমনই আপনার পর্দাও
                    </span>{" "}
                    – Ronjit Super Cherry ফ্যাব্রিক দিয়ে তৈরি Damamah Sonnoti
                    Burka
                  </>
                )}
              </motion.p>

              {/* Features */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-4 mb-8"
              >
                {[
                  { icon: FiShield, text: "পূর্ণ কভারেজ" },
                  { icon: FiHeart, text: "সুপার কমফোর্ট" },
                  { icon: FiPlay, text: "৩৬০° ভিডিও" },
                  { icon: FiShoppingBag, text: "হিডেন পকেট" },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-3 bg-white/70 backdrop-blur-sm rounded-xl p-3 shadow-md"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <feature.icon className="text-white text-sm" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.button
                  onClick={() => setShowOrderModal(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  এখনই অর্ডার করুন
                </motion.button>

                <motion.button
                  onClick={openVideoModal}
                  disabled={!videoId}
                  whileHover={{ scale: videoId ? 1.02 : 1 }}
                  whileTap={{ scale: videoId ? 0.98 : 1 }}
                  className={`border-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    videoId
                      ? "border-purple-600 text-purple-700 hover:bg-purple-50"
                      : "border-gray-400 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <FiPlay className="text-lg" />
                  <span>ভিডিও দেখুন</span>
                </motion.button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center lg:justify-start gap-6 mt-8"
              >
                {[
                  { icon: "🚚", text: "দ্রুত ডেলিভারি" },
                  { icon: "💰", text: "ক্যাশ অন ডেলিভারি" },
                  { icon: "↩️", text: "৭ দিন রিটার্ন" },
                ].map((badge, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -2 }}
                    className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm"
                  >
                    <span className="text-lg">{badge.icon}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {badge.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Enhanced Image Slider - Bigger Version with Actual Product Images */}
            <motion.div variants={itemVariants} className="relative">
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full mx-auto"
              >
                {/* Main Slider Container - Bigger */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 aspect-[4/5] min-h-[600px]">
                  {/* Slides */}
                  {productSlides.map((slide, index) => (
                    <motion.div
                      key={slide.id}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate={index === currentSlide ? "center" : "exit"}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {/* Product Image */}
                      <div className="relative w-full h-full flex items-center justify-center p-4">
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className="relative w-full h-full flex items-center justify-center rounded-2xl overflow-hidden"
                        >
                          {/* Actual Product Image or Fallback Icon */}
                          {!imageErrors[slide.id] ? (
                            <img
                              src={slide.image}
                              alt={`Product view ${slide.id}`}
                              className="w-full h-full object-cover"
                              onError={() => handleImageError(slide.id)}
                            />
                          ) : (
                            <div
                              className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${slide.color} rounded-2xl`}
                            >
                              <FiImage className="text-white text-6xl opacity-70" />
                            </div>
                          )}

                          {/* Image Overlay with Gradient */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${slide.color} opacity-10`}
                          ></div>

                          {/* Shimmer Effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
                            animate={{
                              x: [-200, 400],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: Math.random() * 2,
                            }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Bigger Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 z-10 border border-white/20"
                  >
                    <FiChevronLeft className="text-gray-800 text-2xl" />
                  </button>

                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 z-10 border border-white/20"
                  >
                    <FiChevronRight className="text-gray-800 text-2xl" />
                  </button>

                  {/* Bigger Slide Indicators */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
                    {productSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? "bg-white scale-125 shadow-lg"
                            : "bg-white/50 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Bigger Slide Counter */}
                  <div className="absolute top-6 right-6 bg-black/30 backdrop-blur-sm rounded-2xl px-4 py-2">
                    <span className="text-white text-lg font-bold">
                      {currentSlide + 1} / {productSlides.length}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <motion.div
                  className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, repeat: Infinity }}
                  key={currentSlide}
                />
              </motion.div>

              {/* Bigger Discount Badge */}
              {product?.discount > 0 && (
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="absolute -top-6 -right-6 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl w-20 h-20 flex items-center justify-center shadow-2xl z-20 border-4 border-white"
                >
                  <div className="text-center">
                    <span className="font-black text-xl block leading-tight">
                      -{product.discount}%
                    </span>
                    <span className="text-xs font-bold block">OFF</span>
                  </div>
                </motion.div>
              )}

              {/* New Collection Badge */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 1,
                }}
                className="absolute -bottom-6 -left-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl w-24 h-24 flex items-center justify-center shadow-2xl border-4 border-white"
              >
                <div className="text-center">
                  <span className="text-sm font-black block leading-tight">
                    নতুন
                  </span>
                  <span className="text-sm font-black block leading-tight">
                    কালেকশন
                  </span>
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 20, 0],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: 2,
                }}
                className="absolute -top-4 -left-8 w-6 h-6 bg-pink-400 rounded-full blur-sm"
              />
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 3,
                }}
                className="absolute -top-8 -right-4 w-7 h-7 bg-blue-400 rounded-full blur-sm"
              />
            </motion.div>
          </motion.div>
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

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && videoId && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeVideoModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              {/* Modal Content */}
              <motion.div
                variants={videoModalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeVideoModal}
                  className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10 border border-white/20"
                >
                  <FiX className="text-gray-800 text-xl" />
                </button>

                {/* YouTube Video */}
                <div className="relative pt-[56.25%] h-0 bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title="Product Video"
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Video Info */}
                <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600">
                  <h3 className="text-xl font-bold text-white text-center">
                    {product?.name || "Damaham Sonnoti Burka"} ভিডিও
                  </h3>
                  <p className="text-white/80 text-center mt-2">
                    আমাদের প্রিমিয়াম কোয়ালিটি বারকা সম্পর্কে বিস্তারিত জানুন
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Hero;
