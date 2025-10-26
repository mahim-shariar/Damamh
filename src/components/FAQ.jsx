import React, { useState, useEffect, useRef } from "react";
import {
  FiPlus,
  FiMinus,
  FiStar,
  FiClock,
  FiTruck,
  FiShield,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import OrderModal from "./OrderModal";
import SuccessMessage from "./SuccessMesage";
import useFetch from "../hooks/useFetch"; // Adjust path as needed

// Optimized animation variants - reduced complexity
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Reduced stagger for faster loading
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 10, // Reduced distance for smoother animation
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween", // Changed to tween for smoother performance
      duration: 0.3, // Reduced duration
      ease: "easeOut",
    },
  },
};

const answerVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const iconVariants = {
  closed: { rotate: 0 },
  open: { rotate: 180 },
};

// Simple scroll animation hook
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.05, // Lower threshold for earlier trigger
        rootMargin: "50px", // Trigger 50px before element enters viewport
      }
    );

    const element = document.getElementById("faq-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return isVisible;
};

// Optimized FAQ Item Component
const FAQItem = React.memo(({ faq, index, isOpen, onClick }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="border border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-200"
      whileHover={{
        y: -2,
        transition: { duration: 0.15 },
      }}
    >
      <motion.button
        className="w-full px-6 py-4 text-left flex items-center justify-between rounded-2xl"
        onClick={onClick}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-white font-bold text-xs">{index + 1}</span>
          </div>
          <span className="text-base font-semibold text-gray-900">
            {faq.question}
          </span>
        </div>

        <motion.div
          className="w-8 h-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center flex-shrink-0"
          variants={iconVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <FiMinus className="text-purple-600 text-sm" />
          ) : (
            <FiPlus className="text-purple-600 text-sm" />
          )}
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={answerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="overflow-hidden"
          >
            <div className="px-6 pb-4">
              <div className="border-t border-gray-100 pt-4">
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

FAQItem.displayName = "FAQItem";

// Optimized Price Box Component with dynamic pricing
const PriceBox = React.memo(({ onOrderClick, product }) => {
  const features = [
    { icon: FiTruck, text: "ফ্রি ডেলিভারি" },
    { icon: FiShield, text: "৭ দিন রিটার্ন" },
    { icon: FiClock, text: "২৪/৭ সাপোর্ট" },
    { icon: FiStar, text: "প্রিমিয়াম কোয়ালিটি" },
  ];

  // Use product data or fallback to default values
  const originalPrice = product?.originalPrice || 2990;
  const currentPrice = product?.price || 2390;
  const discount =
    product?.discountPercentage ||
    Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "-50px" }}
      className="mt-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-6 text-center text-white relative "
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-4 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 right-10 w-16 h-16 bg-white rounded-full animate-bounce"></div>
      </div>

      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-100">
          -{discount}%
        </div>
      )}

      <div className="flex items-center justify-center space-x-3 mb-4 relative z-10">
        {originalPrice > currentPrice && (
          <span className="text-lg line-through opacity-70">
            {originalPrice.toLocaleString("bn-BD")} টাকা
          </span>
        )}
        <span className="text-3xl font-bold">
          {currentPrice.toLocaleString("bn-BD")} টাকা
        </span>
      </div>

      <p className="text-base mb-4 font-medium relative z-10">
        {discount > 0 ? "🎉 স্পেশাল অফার প্রাইস" : "🏷️ বর্তমান মূল্য"}
      </p>

      <div className="grid grid-cols-2 gap-2 mb-4 relative z-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white/20 rounded-lg p-2 flex items-center justify-center space-x-1 hover:bg-white/30 transition-colors duration-200 cursor-pointer"
          >
            <feature.icon className="text-white text-sm" />
            <span className="text-xs font-medium">{feature.text}</span>
          </div>
        ))}
      </div>

      <motion.button
        className="bg-white text-green-700 px-6 py-3 rounded-full font-bold text-base w-full max-w-xs hover:shadow-lg transition-shadow duration-200 relative z-10"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onOrderClick}
      >
        ✅ হ্যাঁ, আমি অর্ডার করতে চাই
      </motion.button>

      {/* Stock Information */}
      {product?.stock && product.stock < 50 && (
        <p className="text-white/80 text-sm mt-3 relative z-10">
          ⚡ মাত্র {product.stock} টি স্টকে আছে!
        </p>
      )}
    </motion.div>
  );
});

PriceBox.displayName = "PriceBox";

// Contact Info Component for when no FAQs exist
const ContactInfo = React.memo(({ contactInfo }) => {
  return (
    <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
      <h4 className="font-semibold text-purple-800 mb-4 text-center">
        সরাসরি যোগাযোগ করুন
      </h4>
      <div className="grid md:grid-cols-2 gap-4">
        <motion.a
          href={`tel:${contactInfo.phoneNumber}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-xl p-4 flex items-center space-x-3 hover:shadow-md transition-all duration-200 border border-purple-100"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
            <FiPhone className="text-white text-lg" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 font-medium">কল করুন</p>
            <p className="text-lg font-bold text-gray-800">
              {contactInfo.phoneNumber}
            </p>
          </div>
        </motion.a>

        <motion.a
          href={`mailto:${contactInfo.email}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-xl p-4 flex items-center space-x-3 hover:shadow-md transition-all duration-200 border border-purple-100"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
            <FiMail className="text-white text-lg" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 font-medium">ইমেইল করুন</p>
            <p className="text-lg font-bold text-gray-800 truncate">
              {contactInfo.email}
            </p>
          </div>
        </motion.a>
      </div>
      <p className="text-purple-700 text-sm text-center mt-4">
        আমরা ২৪/৭ আপনার সেবায় Available
      </p>
    </div>
  );
});

ContactInfo.displayName = "ContactInfo";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    phoneNumber: "০১৭XXXXXXXX",
    email: "support@damaham.com",
  });
  const [product, setProduct] = useState(null);
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    address: "",
    size: "",
    quantity: "1",
  });

  const { get } = useFetch();
  const sizes = ["৪৮", "৫০", "৫২", "৫৪", "৫৬", "৫৮"];
  const isVisible = useScrollAnimation();

  // Refs to track API calls
  const hasFetchedFaqsRef = useRef(false);
  const hasFetchedProductRef = useRef(false);
  const hasFetchedContactInfoRef = useRef(false);

  // Fetch FAQs from API - only once
  useEffect(() => {
    const fetchFAQs = async () => {
      if (hasFetchedFaqsRef.current) return;

      try {
        hasFetchedFaqsRef.current = true;
        const response = await get("/faqs");
        if (response.success) {
          setFaqs(response.data.faqs);
        }
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      }
    };

    fetchFAQs();
  }, [get]);

  // Fetch product information for pricing - only once
  useEffect(() => {
    const fetchProduct = async () => {
      if (hasFetchedProductRef.current) return;

      try {
        hasFetchedProductRef.current = true;
        const response = await get("/products");
        if (response.success && response.data.product) {
          setProduct(response.data.product);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [get]);

  // Fetch contact information from API when no FAQs exist - only once
  useEffect(() => {
    const fetchContactInfo = async () => {
      // Only fetch contact info if we have no FAQs and haven't fetched contact info yet
      if (faqs.length === 0 && !hasFetchedContactInfoRef.current) {
        try {
          hasFetchedContactInfoRef.current = true;
          const response = await get("/website-content/contact");
          if (response.success) {
            setContactInfo(response.data.contact);
          }
        } catch (error) {
          console.error("Failed to fetch contact info:", error);
        }
      }
    };

    fetchContactInfo();
  }, [get, faqs.length]);

  // Fallback FAQs in case API fails or no FAQs exist
  const fallbackFaqs = [];

  // Use API FAQs or fallback
  const displayFaqs = faqs.length > 0 ? faqs : fallbackFaqs;

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
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

  const closeSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  const handleOrderClick = () => {
    setShowOrderModal(true);
  };

  return (
    <>
      <section
        id="faq-section"
        className="py-16 bg-gradient-to-br from-purple-50 to-pink-50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              আপনার{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                জিজ্ঞাসার উত্তর
              </span>
            </h2>
            <p className="text-lg text-gray-600">সাধারণত যা জিজ্ঞাসা করা হয়</p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {/* Loading State */}
            {faqs.length === 0 && !hasFetchedFaqsRef.current && (
              <div className="text-center py-8">
                <div className="inline-flex items-center space-x-2 text-gray-600">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                  <span>FAQ লোড হচ্ছে...</span>
                </div>
              </div>
            )}

            {/* FAQs Grid */}
            {displayFaqs.length > 0 && (
              <motion.div
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
              >
                {displayFaqs.map((faq, index) => (
                  <FAQItem
                    key={faq._id || index}
                    faq={faq}
                    index={index}
                    isOpen={openIndex === index}
                    onClick={() => toggleFAQ(index)}
                  />
                ))}
              </motion.div>
            )}

            {/* No FAQs Message */}
            {faqs.length === 0 && hasFetchedFaqsRef.current && (
              <div className="text-center py-8">
                <div className="max-w-2xl mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiPlus className="text-purple-500 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    এখনও কোন FAQ নেই
                  </h3>
                  <p className="text-gray-600 mb-6">
                    শীঘ্রই FAQ যোগ করা হবে। এর মধ্যে আপনি আমাদের সাথে সরাসরি
                    যোগাযোগ করতে পারেন।
                  </p>

                  {/* Dynamic Contact Information */}
                  <ContactInfo contactInfo={contactInfo} />

                  <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                    <p className="text-yellow-800 text-sm text-center">
                      💡 কোন প্রশ্ন থাকলে নির্দ্বিধায় কল বা ইমেইল করুন। আমরা যত
                      দ্রুত সম্ভব আপনার প্রশ্নের উত্তর দেব।
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Dynamic Price Box with product data */}
            <PriceBox onOrderClick={handleOrderClick} product={product} />
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
      />

      {/* Success Message */}
      <SuccessMessage
        showSuccessMessage={showSuccessMessage}
        closeSuccessMessage={closeSuccessMessage}
        orderForm={orderForm}
        setShowOrderModal={setShowOrderModal}
      />
    </>
  );
};

export default React.memo(FAQ);
