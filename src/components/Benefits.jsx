import React, { useEffect, useState } from "react";
import { FiWind, FiHeart, FiUsers, FiGift, FiAward } from "react-icons/fi";
import OrderModal from "./OrderModal";
import SuccessMessage from "./SuccessMesage";

const Benefits = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    address: "",
    size: "",
    quantity: "1",
  });

  const sizes = ["৪৮", "৫০", "৫২", "৫৪", "৫৬", "৫৮"];

  const benefits = [
    {
      icon: FiWind,
      title: "আরামদায়ক ও ব্রিদেবল",
      description: "দীর্ঘ সময় পরলেও গরম লাগবে না, Cherry ফ্যাব্রিকের বিশেষ গুণ",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: FiAward,
      title: "ইসলামিক শালীনতা + মার্জিত লুক",
      description: "পর্দার সকল শর্ত রক্ষা করে আধুনিক ফ্যাশন",
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      icon: FiUsers,
      title: "যেকোনো জায়গায় কমফোর্টলি",
      description: "বাজার, অফিস, ভ্রমণ - সবখানেই আত্মবিশ্বাসের সাথে পরুন",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      icon: FiHeart,
      title: "পরিবারের সকলের জন্য",
      description: "মা, বোন, স্ত্রী - সবার জন্য পারফেক্ট ফিট",
      gradient: "from-pink-500 to-rose-600",
    },
    {
      icon: FiGift,
      title: "সাওয়াব ও খুশি একসাথে",
      description: "সহধর্মিণীকে উপহার দিলে সাওয়াব এবং খুশি দুটোই",
      gradient: "from-orange-500 to-amber-600",
    },
  ];

  useEffect(() => {
    // Scroll animation for benefit cards
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0) scale(1)";
          entry.target.style.transition =
            "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        }
      });
    }, observerOptions);

    // Observe all benefit cards
    const benefitCards = document.querySelectorAll(".benefit-card");
    const specialOffer = document.querySelector(".special-offer");
    const sectionTitle = document.querySelector(".section-title");
    const sectionSubtitle = document.querySelector(".section-subtitle");

    benefitCards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px) scale(0.95)";
      card.style.transition = `all 0.6s ease-out ${index * 100}ms`;
      observer.observe(card);
    });

    if (specialOffer) {
      specialOffer.style.opacity = "0";
      specialOffer.style.transform = "scale(0.9)";
      specialOffer.style.transition = "all 0.8s ease-out 0.5s";
      observer.observe(specialOffer);
    }

    if (sectionTitle) {
      sectionTitle.style.opacity = "0";
      sectionTitle.style.transform = "translateY(-20px)";
      sectionTitle.style.transition = "all 0.8s ease-out";
      observer.observe(sectionTitle);
    }

    if (sectionSubtitle) {
      sectionSubtitle.style.opacity = "0";
      sectionSubtitle.style.transform = "translateY(-10px)";
      sectionSubtitle.style.transition = "all 0.8s ease-out 0.2s";
      observer.observe(sectionSubtitle);
    }

    return () => observer.disconnect();
  }, []);

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
    setIsClicked(true);

    // Ripple effect
    const button = document.querySelector(".order-button");
    if (button) {
      const ripple = document.createElement("span");
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple-effect");

      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    }

    // Open order modal instead of scrolling
    setTimeout(() => {
      setShowOrderModal(true);
    }, 300);

    // Reset click state
    setTimeout(() => setIsClicked(false), 600);
  };

  return (
    <>
      <section id="benefits" className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl font-bold text-gray-900 mb-4">
              কেন{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                Damaham Sonnoti Burka
              </span>{" "}
              আপনার সেরা পছন্দ?
            </h2>
            <p className="section-subtitle text-xl text-gray-600 max-w-3xl mx-auto">
              শুধু একটি বোরকা নয়, এটি আপনার জীবনযাপনের অংশ হয়ে উঠবে
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="benefit-card group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden cursor-pointer"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Background Gradient Effect */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${benefit.gradient} rounded-full filter blur-xl opacity-10 group-hover:opacity-20 transition-all duration-500 group-hover:scale-150`}
                ></div>

                {/* Hover Pulse Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}
                ></div>

                <div
                  className={`w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}
                >
                  <benefit.icon className="text-white text-2xl group-hover:scale-110 transition-transform duration-300" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10 group-hover:text-gray-800 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed relative z-10 group-hover:text-gray-700 transition-colors duration-300">
                  {benefit.description}
                </p>

                {/* Hover Effect Line */}
                <div
                  className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${benefit.gradient} group-hover:w-full transition-all duration-500`}
                ></div>

                {/* Floating Animation on Hover */}
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-transparent to-white opacity-0 group-hover:opacity-100 rounded-full blur-sm transition-all duration-700 group-hover:animate-float"></div>
              </div>
            ))}
          </div>

          {/* Special Offer Banner */}
          <div className="special-offer bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 text-center text-white relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-4 left-10 w-20 h-20 bg-white rounded-full animate-pulse-slow"></div>
              <div className="absolute bottom-4 right-10 w-16 h-16 bg-white rounded-full animate-bounce-slow"></div>
              <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white rounded-full animate-ping-slow"></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 2}s`,
                    animationDuration: `${3 + i * 2}s`,
                  }}
                ></div>
              ))}
            </div>

            <h3 className="text-2xl font-bold mb-4 relative z-10 animate-pulse">
              🎁 বিশেষ অফার: আজই অর্ডার করুন এবং পেয়ে যান
            </h3>

            <div className="grid md:grid-cols-3 gap-6 mb-6 relative z-10">
              {[
                "🚚 ফ্রি হোম ডেলিভারি",
                "💰 ক্যাশ অন ডেলিভারি",
                "↩️ ৭ দিন রিটার্ন পলিসি",
              ].map((offer, index) => (
                <div
                  key={index}
                  className="offer-item bg-white/20 backdrop-blur-sm rounded-xl p-4 transform hover:scale-105 transition-all duration-300 hover:bg-white/30 cursor-pointer"
                >
                  <p className="font-semibold">{offer}</p>
                </div>
              ))}
            </div>

            <button
              onClick={handleOrderClick}
              className={`order-button relative bg-white text-green-700 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 transform ${
                isClicked ? "scale-95" : "hover:scale-105"
              } overflow-hidden`}
            >
              🎁 আমি আজই অর্ডার করতে চাই
              {/* Ripple effect container */}
              <style jsx>{`
                .ripple-effect {
                  position: absolute;
                  border-radius: 50%;
                  background: rgba(255, 255, 255, 0.6);
                  transform: scale(0);
                  animation: ripple 0.6s linear;
                }

                @keyframes ripple {
                  to {
                    transform: scale(4);
                    opacity: 0;
                  }
                }

                @keyframes float {
                  0%,
                  100% {
                    transform: translateY(0px) rotate(0deg);
                  }
                  50% {
                    transform: translateY(-10px) rotate(180deg);
                  }
                }

                @keyframes pulse-slow {
                  0%,
                  100% {
                    opacity: 0.1;
                    transform: scale(1);
                  }
                  50% {
                    opacity: 0.2;
                    transform: scale(1.1);
                  }
                }

                @keyframes bounce-slow {
                  0%,
                  100% {
                    transform: translateY(0);
                  }
                  50% {
                    transform: translateY(-10px);
                  }
                }

                @keyframes ping-slow {
                  0% {
                    transform: scale(1);
                    opacity: 0.1;
                  }
                  75%,
                  100% {
                    transform: scale(2);
                    opacity: 0;
                  }
                }

                .animate-float {
                  animation: float 6s ease-in-out infinite;
                }

                .animate-pulse-slow {
                  animation: pulse-slow 4s ease-in-out infinite;
                }

                .animate-bounce-slow {
                  animation: bounce-slow 3s ease-in-out infinite;
                }

                .animate-ping-slow {
                  animation: ping-slow 2s ease-out infinite;
                }
              `}</style>
            </button>
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

export default Benefits;
