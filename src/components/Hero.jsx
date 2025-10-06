import React, { useEffect, useRef } from "react";
import {
  FiPlay,
  FiShield,
  FiHeart,
  FiStar,
  FiShoppingBag,
} from "react-icons/fi";
import { motion, useInView, useAnimation } from "framer-motion";

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const glowVariants = {
    initial: {
      scale: 1,
      opacity: 0.5,
    },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex py-10 items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-purple-200 to-pink-200"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20"
        variants={glowVariants}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-3xl opacity-20"
        variants={glowVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 1 }}
      />

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
              className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-md rounded-full px-6 py-3 mb-8 shadow-2xl border border-white/20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <FiStar className="text-yellow-500 text-xl" />
              </motion.div>
              <span className="text-sm font-bold text-gray-800 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ১০,০০০+ সন্তুষ্ট গ্রাহক • ৪.৯/৫ রেটিং
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight mb-8"
            >
              <span className="block">ঝিনুকের মধ্যে</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-gradient-x">
                মুক্তা
              </span>
              <span className="block">তেমন সুরক্ষিত</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-2xl text-gray-700 mb-8 leading-relaxed font-medium"
            >
              <span className="font-black bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent">
                তেমনই আপনার পর্দাও
              </span>{" "}
              – Ronjit Super Cherry ফ্যাব্রিক দিয়ে তৈরি Damaham Sonnoti Burka
            </motion.p>

            {/* Enhanced Features Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 mb-12"
            >
              {[
                {
                  icon: FiShield,
                  text: "পূর্ণ কভারেজ",
                  color: "from-green-500 to-emerald-600",
                },
                {
                  icon: FiHeart,
                  text: "সুপার কমফোর্ট",
                  color: "from-pink-500 to-rose-600",
                },
                {
                  icon: FiPlay,
                  text: "৩৬০° ভিডিও",
                  color: "from-blue-500 to-cyan-600",
                },
                {
                  icon: FiShoppingBag,
                  text: "হিডেন পকেট",
                  color: "from-purple-500 to-indigo-600",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <feature.icon className="text-white text-lg" />
                  </div>
                  <span className="text-sm font-bold text-gray-800">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(5, 150, 105, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-lg">✓</span>
                </div>
                <span>আমি এখনই অর্ডার করতে চাই</span>
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-purple-600 text-purple-700 px-8 py-5 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 group"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center"
                >
                  <FiPlay className="text-white text-lg ml-1" />
                </motion.div>
                <span>ভিডিও ট্রেলার দেখুন</span>
              </motion.button>
            </motion.div>

            {/* Enhanced Trust Badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12"
            >
              {[
                { icon: "🚚", text: "১-৩ দিনে ডেলিভারি", sub: "দ্রুত সার্ভিস" },
                {
                  icon: "💰",
                  text: "ক্যাশ অন ডেলিভারি",
                  sub: "নিরাপদ পেমেন্ট",
                },
                { icon: "↩️", text: "৭ দিন রিটার্ন", sub: "নো রিস্ক" },
                { icon: "🛡️", text: "১০০% অথেনটিক", sub: "গ্যারান্টিড" },
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -2 }}
                  className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-white/20"
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <div className="text-left">
                    <div className="font-bold text-gray-800 text-sm">
                      {badge.text}
                    </div>
                    <div className="text-xs text-gray-600">{badge.sub}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Enhanced Product Display */}
          <motion.div
            variants={floatVariants}
            animate="float"
            className="relative"
          >
            {/* Main Product Card */}
            <motion.div
              whileHover={{
                rotateY: 10,
                transition: { duration: 0.5 },
              }}
              className="bg-white rounded-3xl shadow-2xl p-8 transform perspective-1000 hover:shadow-3xl transition-all duration-500 border border-white/20 backdrop-blur-sm"
            >
              <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 rounded-2xl p-8 aspect-square flex items-center justify-center relative overflow-hidden">
                {/* Animated Product Silhouette */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 2, 0, -2, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-center relative"
                >
                  <div className="w-40 h-52 bg-gradient-to-b from-purple-300 via-pink-300 to-blue-300 rounded-2xl mx-auto mb-6 shadow-2xl relative overflow-hidden">
                    {/* Hidden Pocket Indicator */}
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <div className="w-8 h-10 bg-yellow-400 rounded-lg border-2 border-white shadow-xl flex items-center justify-center">
                        <FiShoppingBag className="text-white text-sm" />
                      </div>
                      <div className="text-xs mt-1 font-bold text-gray-700 bg-white/80 rounded px-1">
                        পকেট
                      </div>
                    </motion.div>
                  </div>
                  <motion.p
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-gray-700 font-semibold text-lg"
                  >
                    Premium 3D Preview
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>

            {/* Fixed 20% Off Badge - No Rotation */}
            <motion.div
              animate={{
                y: [-15, 15, -15],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl w-20 h-20 flex items-center justify-center shadow-2xl border-4 border-white"
            >
              <div className="text-center">
                <span className="font-black text-lg block leading-tight">
                  -২০%
                </span>
                <span className="text-[10px] font-bold block mt-1">OFF</span>
              </div>
            </motion.div>

            {/* New Collection Badge */}
            <motion.div
              animate={{
                y: [15, -15, 15],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-6 -left-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl w-24 h-24 flex items-center justify-center shadow-2xl border-4 border-white"
            >
              <div className="text-center">
                <span className="text-xs font-black block leading-tight">
                  নতুন
                </span>
                <span className="text-xs font-black block leading-tight">
                  কালেকশন
                </span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="w-2 h-2 bg-white rounded-full mx-auto mt-1"
                />
              </div>
            </motion.div>

            {/* Floating Particles Around Product */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full ${
                  i % 2 === 0 ? "animate-pulse" : ""
                }`}
                style={{
                  top: `${20 + i * 12}%`,
                  left: i % 2 === 0 ? "-10%" : "110%",
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
