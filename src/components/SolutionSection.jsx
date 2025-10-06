import React, { useEffect } from "react";
import { FaPencilRuler } from "react-icons/fa";
import { FiPocket, FiScissors, FiShield } from "react-icons/fi";

const SolutionSection = () => {
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

  const scrollToOrder = () => {
    // Smooth scroll to order section
    const orderSection = document.getElementById("order");
    if (orderSection) {
      orderSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
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
              onClick={scrollToOrder}
              className="cta-button w-full mt-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              👗 আমি এখনই বুক করতে চাই
            </button>
          </div>

          {/* Product Showcase */}
          <div className="product-showcase relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="w-40 h-48 bg-gradient-to-b from-purple-300 to-blue-200 rounded-lg mx-auto mb-4 shadow-inner relative">
                    {/* Hidden Pocket Indicator */}
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <div className="w-6 h-8 bg-yellow-400 rounded-lg border-2 border-white shadow-lg"></div>
                      <div className="text-xs mt-1 font-bold">পকেট</div>
                    </div>
                  </div>
                  <p className="text-gray-600 font-semibold">
                    3D প্রোডাক্ট ভিউ
                  </p>
                </div>
              </div>
            </div>

            {/* Size Chart */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-purple-200">
              <h4 className="font-bold text-gray-900 mb-3">সাইজ চার্ট</h4>
              <div className="grid grid-cols-3 gap-2">
                {["৪৮", "৫০", "৫২", "৫৪", "৫৬", "৫৮"].map((size) => (
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
  );
};

export default SolutionSection;
