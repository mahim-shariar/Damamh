import React from "react";
import {
  FiX,
  FiAlertCircle,
  FiThermometer,
  FiPocket,
  FiFrown,
} from "react-icons/fi";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const problems = [
    {
      icon: FiThermometer,
      title: "ভারী কাপড়",
      description: "হাঁটতে বা চলাফেরায় অসুবিধা, দৈনন্দিন কাজে বাধা",
      gradient: "from-red-500 to-orange-500",
      bgGradient: "from-red-50/80 to-orange-50/80",
      emoji: "🏋️",
    },
    {
      icon: FiX,
      title: "কমফোর্ট না থাকা",
      description: "সঠিক সাইজ না মেলা, খুব টাইট বা খুব ঢিলা",
      gradient: "from-rose-500 to-pink-500",
      bgGradient: "from-rose-50/80 to-pink-50/80",
      emoji: "😣",
    },
    {
      icon: FiPocket,
      title: "পকেটের অভাব",
      description: "মোবাইল বা ছোট জিনিস রাখার কোনো ব্যবস্থা নেই",
      gradient: "from-amber-500 to-yellow-500",
      bgGradient: "from-amber-50/80 to-yellow-50/80",
      emoji: "📱",
    },
    {
      icon: FiAlertCircle,
      title: "গরম লাগা",
      description: "নন-ব্রিদেবল কাপড়ে দীর্ঘ সময় পরে গরম লাগে",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50/80 to-red-50/80",
      emoji: "🔥",
    },
  ];

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
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const pulseVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      id="problems"
      className="relative py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-20 -left-20 w-40 h-40 bg-red-200 rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
          className="absolute -bottom-20 -right-20 w-60 h-60 bg-orange-200 rounded-full blur-3xl opacity-20"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.div
            variants={titleVariants}
            className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-md rounded-2xl px-6 py-3 mb-6 shadow-lg border border-red-100"
          >
            <FiFrown className="text-red-500 text-xl" />
            <span className="text-sm font-bold text-gray-700">
              সাধারণ সমস্যা • সহজ সমাধান
            </span>
          </motion.div>

          <motion.h2
            variants={titleVariants}
            className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight"
          >
            বাজারের বোরকা কেন{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-600 to-rose-600">
              আপনাকে কষ্ট দেয়?
            </span>
          </motion.h2>

          <motion.p
            variants={titleVariants}
            className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            প্রতিদিনের এই সাধারণ সমস্যাগুলোই আপনার পর্দাকে করে তোলে{" "}
            <span className="font-bold text-red-600">
              অস্বস্তিকর ও ব্যবহারে অসুবিধাজনক
            </span>
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
            >
              {/* Background Glow Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${problem.bgGradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:border-red-200/50">
                {/* Icon Container with Proper Emoji Positioning */}
                <div className="relative mb-6">
                  <motion.div
                    variants={pulseVariants}
                    initial="initial"
                    animate="pulse"
                    className={`w-20 h-20 bg-gradient-to-r ${problem.gradient} rounded-2xl flex items-center justify-center mx-auto shadow-2xl group-hover:shadow-3xl transition-all duration-500 relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <problem.icon className="text-white text-3xl relative z-10" />
                  </motion.div>

                  {/* Properly Positioned Emoji Badge - Outside the icon container */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                    className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full border-2 shadow-lg flex items-center justify-center text-xl"
                    style={{
                      borderColor: `var(--color-${
                        problem.gradient.split("-")[1]
                      }-500)`,
                      zIndex: 20,
                    }}
                  >
                    {problem.emoji}
                  </motion.div>
                </div>

                {/* Problem Text */}
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                  className="text-2xl font-black text-gray-900 mb-4 group-hover:text-red-700 transition-colors duration-300"
                >
                  {problem.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.4 }}
                  className="text-gray-600 leading-relaxed text-lg font-medium group-hover:text-gray-700 transition-colors duration-300"
                >
                  {problem.description}
                </motion.p>

                {/* Hover Indicator */}
                <motion.div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full group-hover:w-20 transition-all duration-500" />
              </div>

              {/* Floating Number - Properly Positioned */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full flex items-center justify-center font-black text-sm shadow-lg border-2 border-white z-20"
              >
                {index + 1}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-10 w-16 h-16 bg-white rounded-full"></div>
              <div className="absolute bottom-4 right-10 w-20 h-20 bg-white rounded-full"></div>
            </div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-3xl font-black text-white mb-4 relative z-10"
            >
              😫 এই সমস্যাগুলো কি আপনাও enfrent করছেন?
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="text-xl text-white/90 mb-6 max-w-2xl mx-auto relative z-10"
            >
              এখনই একটি সমাধান খুঁজে নিন যা আপনার সব সমস্যার সমাধান করবে
            </motion.p>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-red-600 px-12 py-5 rounded-2xl font-black text-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 mx-auto relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-orange-50 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl relative z-10"
              >
                😫
              </motion.div>
              <span className="relative z-10">আরামদায়ক বোরকা চাই!</span>
            </motion.button>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mt-8"
          >
            {[
              { number: "১০,০০০+", text: "সমস্যা সমাধান", emoji: "✅" },
              { number: "৯৮%", text: "সন্তুষ্ট গ্রাহক", emoji: "😊" },
              { number: "৫★", text: "রেটিং", emoji: "⭐" },
              { number: "২৪/৭", text: "সাপোর্ট", emoji: "🕒" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 min-w-[120px]"
              >
                <div className="text-2xl mb-1">{item.emoji}</div>
                <div className="text-2xl font-black text-gray-900">
                  {item.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {item.text}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
