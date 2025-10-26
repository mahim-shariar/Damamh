import React, { useState, useEffect, useRef } from "react";
import { FiStar, FiMessageCircle, FiUsers } from "react-icons/fi";
import OrderModal from "./OrderModal";
import SuccessMessage from "./SuccessMesage";
import useFetch from "../hooks/useFetch"; // Adjust path as needed

const Testimonials = () => {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    address: "",
    size: "",
    quantity: "1",
  });
  const [reviews, setReviews] = useState([]);

  const { get } = useFetch();
  const sizes = ["৪৮", "৫০", "৫২", "৫৪", "৫৬", "৫৮"];
  const hasFetchedReviewsRef = useRef(false); // Use ref instead of state

  // Fetch reviews from API - only once
  useEffect(() => {
    const fetchReviews = async () => {
      if (hasFetchedReviewsRef.current) return;

      try {
        hasFetchedReviewsRef.current = true;
        const response = await get("/reviews?active=true");
        if (response.success) {
          setReviews(response.data.reviews);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, [get]);

  // Use API reviews
  const testimonials = reviews.map((review) => ({
    name: review.name,
    location: review.district,
    rating: review.rating,
    comment: review.description,
    image: review.name.charAt(0), // Use first letter of name as image
  }));

  const stats = [
    { number: "1000+", label: "সন্তুষ্ট গ্রাহক" },
    { number: "4.9/5", label: "গ্রাহক রেটিং" },
    { number: "98%", label: "রিকমেন্ডেশন রেট" },
    { number: "500+", label: "রিপিট অর্ডার" },
  ];

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

  // Function to render star ratings
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FiStar
        key={i}
        className={`${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  // Function to get initials from name
  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <>
      <section
        id="testimonials"
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg">
              <FiMessageCircle className="text-blue-600" />
              <span className="font-semibold text-gray-700">গ্রাহকদের কথা</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {reviews.length > 0
                  ? `${reviews.length}+ বোনেরা`
                  : "১০০০+ বোনেরা"}
              </span>{" "}
              ইতিমধ্যেই বেছে নিয়েছেন
            </h2>
            <p className="text-xl text-gray-600">
              {reviews.length > 0
                ? "আমাদের গ্রাহকরা যা বলছেন"
                : "আমাদের গ্রাহকরা যা বলছেন"}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Show loading state if no reviews yet */}
          {reviews.length === 0 && !hasFetchedReviewsRef.current && (
            <div className="text-center mt-8">
              <div className="inline-flex items-center space-x-2 text-gray-600">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span>রিভিউ লোড হচ্ছে...</span>
              </div>
            </div>
          )}

          {/* Show "No reviews found" message */}
          {reviews.length === 0 && hasFetchedReviewsRef.current && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiUsers className="text-blue-500 text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  এখনও কোন রিভিউ নেই
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  আমাদের প্রথম রিভিউটি লিখে ইতিহাস তৈরি করুন! আপনার অভিজ্ঞতা
                  শেয়ার করে অন্য বোনদের সাহায্য করুন।
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8">
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    প্রথম ক্রেতা বিশেষ অফার!
                  </h4>
                  <p className="text-yellow-700 text-sm">
                    প্রথম অর্ডার করলে পাবেন বিশেষ ডিসকাউন্ট এবং উপহার
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Testimonials Grid - Only show if reviews exist */}
          {reviews.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 cursor-pointer"
                  onClick={handleOrderClick}
                >
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonial.comment}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {getInitials(testimonial.name)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA - Always show CTA button */}
          <div className="text-center mt-12">
            <button
              onClick={handleOrderClick}
              className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              {reviews.length === 0 && hasFetchedReviewsRef.current
                ? "🚀 প্রথম ক্রেতা হোন এবং বিশেষ অফার পান!"
                : "👍 আমি নিজেও ট্রাই করতে চাই!"}
            </button>
          </div>

          {/* Special message for no reviews case */}
          {reviews.length === 0 && hasFetchedReviewsRef.current && (
            <div className="text-center mt-8">
              <p className="text-gray-500 text-sm">
                আমাদের পণ্য সম্পর্কে আপনার মতামত শুনতে আমরা উৎসুক!
              </p>
            </div>
          )}
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

export default Testimonials;
