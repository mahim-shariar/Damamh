import React, { useState } from "react";
import {
  FiPlus,
  FiMinus,
  FiStar,
  FiClock,
  FiTruck,
  FiShield,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

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

// Optimized Price Box Component
const PriceBox = React.memo(() => {
  const features = [
    { icon: FiTruck, text: "ফ্রি ডেলিভারি" },
    { icon: FiShield, text: "৭ দিন রিটার্ন" },
    { icon: FiClock, text: "২৪/৭ সাপোর্ট" },
    { icon: FiStar, text: "প্রিমিয়াম কোয়ালিটি" },
  ];

  const scrollToOrder = () => {
    const orderSection = document.getElementById("order");
    if (orderSection) {
      orderSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "-50px" }}
      className="mt-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-6 text-center text-white relative overflow-hidden"
    >
      <div className="flex items-center justify-center space-x-3 mb-4">
        <span className="text-lg line-through opacity-70">২৯৯০ টাকা</span>
        <span className="text-3xl font-bold">২৩৯০ টাকা</span>
      </div>

      <p className="text-base mb-4 font-medium">🎉 স্পেশাল অফার প্রাইস</p>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white/20 rounded-lg p-2 flex items-center justify-center space-x-1"
          >
            <feature.icon className="text-white text-sm" />
            <span className="text-xs font-medium">{feature.text}</span>
          </div>
        ))}
      </div>

      <motion.button
        className="bg-white text-green-700 px-6 py-3 rounded-full font-bold text-base w-full max-w-xs hover:shadow-lg transition-shadow duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={scrollToOrder}
      >
        ✅ হ্যাঁ, আমি অর্ডার করতে চাই
      </motion.button>
    </motion.div>
  );
});

PriceBox.displayName = "PriceBox";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const isVisible = useScrollAnimation();

  const faqs = [
    {
      question: "কোন সাইজে পাওয়া যাচ্ছে?",
      answer: "বোরকাটি ৪৮, ৫০, ৫২, ৫৪, ৫৬ ও ৫৮ – এই ৬টি সাইজে available।",
    },
    {
      question: "Hidden pocket আছে কি?",
      answer:
        "হ্যাঁ, অবশ্যই! সাইডে চেইনসহ একটি গোপন পকেট আছে, যেখানে মোবাইল বা ছোট জিনিস নিরাপদে রাখতে পারবেন।",
    },
    {
      question: "কাপড়ের Quality কেমন?",
      answer:
        "Ronjit Super Cherry ফ্যাব্রিক ব্যবহার করা হয়েছে, যা অত্যন্ত নরম, ব্রিদেবল এবং দীর্ঘক্ষণ পরার জন্য আরামদায়ক।",
    },
    {
      question: "ডেলিভারি কত দিনে হবে?",
      answer:
        "অর্ডার confirm হওয়ার পর ১ থেকে ৩ কার্যদিবসের মধ্যে ডেলিভারি পেয়ে যাবেন।",
    },
    {
      question: "দাম কত?",
      answer:
        "প্রোডাক্টের Regular Price 2990 টাকা।但目前 একটি বিশেষ অফারে মাত্র 2390 টাকায় অর্ডার করতে পারবেন!",
    },
    {
      question: "রিটার্ন পলিসি কি?",
      answer:
        "হ্যাঁ, ৭ দিনের রিটার্ন পলিসি আছে। যদি প্রোডাক্টে কোনো সমস্যা থাকে, তাহলে রিটার্ন করতে পারবেন।",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="faq"
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
          <motion.div
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onClick={() => toggleFAQ(index)}
              />
            ))}
          </motion.div>

          <PriceBox />
        </div>
      </div>
    </section>
  );
};

export default React.memo(FAQ);
