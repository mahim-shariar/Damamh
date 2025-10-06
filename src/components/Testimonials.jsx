import React from "react";
import { FiStar, FiMessageCircle } from "react-icons/fi";

const Testimonials = () => {
  const testimonials = [
    {
      name: "ফারিহা আহমেদ",
      location: "ঢাকা",
      rating: 5,
      comment:
        "বাজারের বোরকার সাথে তুলনা করা যায় না – কাপড় হালকা আর আরামদায়ক। হিডেন পকেট থাকায়日常工作 অনেক সহজ হয়েছে!",
      image: "F",
    },
    {
      name: "শাইলা ইসলাম",
      location: "চট্টগ্রাম",
      rating: 5,
      comment:
        "Hidden pocket ও চেইন থাকায় মোবাইল রাখা অনেক সহজ। ফ্যাব্রিক的质量真的很好, দীর্ঘক্ষণ পরেও অস্বস্তি হয় না।",
      image: "S",
    },
    {
      name: "আয়েশা সিদ্দিকা",
      location: "সিলেট",
      rating: 5,
      comment:
        "সাইজ পারফেক্ট fits, এবং কাপড়ের quality দেখে আমি realmente impressed! আমার তিন বোনকেও推荐 দিয়েছি।",
      image: "A",
    },
  ];

  const stats = [
    { number: "1000+", label: "সন্তুষ্ট গ্রাহক" },
    { number: "4.9/5", label: "গ্রাহক রেটিং" },
    { number: "98%", label: "রিকমেন্ডেশন রেট" },
    { number: "500+", label: "রিপিট অর্ডার" },
  ];

  return (
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
              ১০০০+ বোনেরা
            </span>{" "}
            ইতিমধ্যেই বেছে নিয়েছেন
          </h2>
          <p className="text-xl text-gray-600">আমাদের গ্রাহকরা যা বলছেন</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-lg border border-blue-100"
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`${
                      i < testimonial.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.comment}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.image}
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

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            👍 আমি নিজেও ট্রাই করতে চাই!
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
