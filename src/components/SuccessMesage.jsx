import React, { useState, useEffect } from "react";
import { FiCheckCircle, FiPhone, FiMail, FiX } from "react-icons/fi";
import useFetch from "../hooks/useFetch"; // Adjust path as needed

const SuccessMessage = ({
  showSuccessMessage,
  closeSuccessMessage,
  orderForm,
  setShowOrderModal,
}) => {
  const [contactInfo, setContactInfo] = useState({
    phoneNumber: "০১৭XXXXXXXX",
    email: "support@damaham.com",
  });
  const [hasFetchedContactInfo, setHasFetchedContactInfo] = useState(false);

  const { get } = useFetch();

  // Fetch contact information when success message shows
  useEffect(() => {
    const fetchContactInfo = async () => {
      if (!showSuccessMessage || hasFetchedContactInfo) return;

      try {
        const response = await get("/website-content/contact");
        if (response.success) {
          setContactInfo(response.data.contact);
          setHasFetchedContactInfo(true);
        }
      } catch (error) {
        console.error("Failed to fetch contact info:", error);
        setHasFetchedContactInfo(true);
      }
    };

    fetchContactInfo();
  }, [showSuccessMessage, get, hasFetchedContactInfo]);

  if (!showSuccessMessage) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Success Header - Fixed */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 relative flex-shrink-0">
          <button
            onClick={closeSuccessMessage}
            className="absolute top-6 right-6 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <FiX className="text-white text-lg" />
          </button>

          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <FiCheckCircle className="text-white text-5xl" />
            </div>
            <div className="flex-1">
              <h3 className="text-4xl font-black mb-3">অর্ডার সফল!</h3>
              <p className="text-white/90 text-xl">
                আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে
              </p>
              <div className="flex items-center space-x-2 mt-4 text-white/80">
                <FiCheckCircle className="text-xl" />
                <span className="font-bold text-lg">
                  অর্ডার কনফার্মেশন সম্পূর্ণ
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Main Message */}
            <div className="text-center mb-8">
              <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
                ধন্যবাদ!{" "}
                <strong className="text-green-600">{orderForm.name}</strong>{" "}
                আপনার অর্ডারটি সফলভাবে জমা হয়েছে। আমাদের প্রতিনিধি{" "}
                <strong className="text-green-600">২৪ ঘন্টার মধ্যে</strong>{" "}
                আপনার প্রদত্ত নম্বর{" "}
                <strong className="text-green-600">{orderForm.phone}</strong> এ
                যোগাযোগ করবে।
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                  <h4 className="font-bold text-blue-800 text-xl mb-4 text-center">
                    📞 যোগাযোগের তথ্য
                  </h4>
                  <div className="space-y-4">
                    {/* Phone Contact */}
                    <a
                      href={`tel:${contactInfo.phoneNumber}`}
                      className="flex items-center space-x-4 bg-white rounded-xl p-4 border border-blue-100 hover:shadow-lg transition-all duration-300 group hover:scale-105"
                    >
                      <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <FiPhone className="text-white text-xl" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm text-gray-600 font-medium">
                          কল করুন
                        </p>
                        <p className="text-xl font-bold text-gray-800">
                          {contactInfo.phoneNumber}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          সরাসরি কল করতে ক্লিক করুন
                        </p>
                      </div>
                    </a>

                    {/* Email Contact */}
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="flex items-center space-x-4 bg-white rounded-xl p-4 border border-blue-100 hover:shadow-lg transition-all duration-300 group hover:scale-105"
                    >
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <FiMail className="text-white text-xl" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm text-gray-600 font-medium">
                          ইমেইল করুন
                        </p>
                        <p className="text-xl font-bold text-gray-800 break-all">
                          {contactInfo.email}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          সরাসরি ইমেইল করতে ক্লিক করুন
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                    <p className="text-blue-700 text-sm text-center font-medium">
                      💫 আমরা ২৪/৭ আপনার সেবায় Available
                    </p>
                  </div>
                </div>

                {/* Support Information */}
                <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
                  <h4 className="font-bold text-yellow-800 text-xl mb-4 text-center">
                    💡 সাপোর্ট তথ্য
                  </h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-white rounded-lg p-3 border border-yellow-200">
                        <div className="text-2xl">🕒</div>
                        <p className="text-xs font-bold text-yellow-800 mt-1">
                          ২৪/৭ সাপোর্ট
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-yellow-200">
                        <div className="text-2xl">🚚</div>
                        <p className="text-xs font-bold text-yellow-800 mt-1">
                          ফাস্ট ডেলিভারি
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-yellow-200">
                        <div className="text-2xl">💯</div>
                        <p className="text-xs font-bold text-yellow-800 mt-1">
                          সন্তুষ্টি গ্যারান্টি
                        </p>
                      </div>
                    </div>
                    <p className="text-yellow-700 text-sm text-center mt-3">
                      কোন জরুরি প্রশ্ন থাকলে সরাসরি কল বা ইমেইল করুন
                    </p>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="space-y-6">
                <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
                  <h4 className="font-bold text-purple-800 text-xl mb-6 text-center">
                    📋 পরবর্তী ধাপসমূহ
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 bg-white rounded-xl p-4 border border-purple-100">
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-sm font-bold">
                        ১
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-purple-800 text-lg mb-1">
                          যোগাযোগ
                        </p>
                        <p className="text-purple-700">
                          আমাদের প্রতিনিধি আপনার সাথে সরাসরি যোগাযোগ করবে অর্ডার
                          কনফার্ম করার জন্য
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 bg-white rounded-xl p-4 border border-purple-100">
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-sm font-bold">
                        ২
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-purple-800 text-lg mb-1">
                          ভেরিফিকেশন
                        </p>
                        <p className="text-purple-700">
                          অর্ডার ডিটেইলস এবং ডেলিভারি ঠিকানা ভেরিফিকেশন সম্পূর্ণ
                          হবে
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 bg-white rounded-xl p-4 border border-purple-100">
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-sm font-bold">
                        ৩
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-purple-800 text-lg mb-1">
                          ডেলিভারি
                        </p>
                        <p className="text-purple-700">
                          ১-৩ কর্মদিবসের মধ্যে আপনার অর্ডারটি ডেলিভারি করা হবে
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                  <h4 className="font-bold text-green-800 text-xl mb-4 text-center">
                    ⚡ দ্রুত একশন
                  </h4>
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        closeSuccessMessage();
                        setShowOrderModal(true);
                      }}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <span>🔄</span>
                      <span>আরেকটি অর্ডার করুন</span>
                    </button>

                    <a
                      href={`tel:${contactInfo.phoneNumber}`}
                      className="w-full border-2 border-green-500 text-green-600 py-3 rounded-xl font-bold hover:bg-green-50 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>📞</span>
                      <span>এখনই কল করুন</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h4 className="font-bold text-gray-800 text-lg mb-3 text-center">
                ℹ️ অতিরিক্ত তথ্য
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="text-2xl mb-2">⏰</div>
                  <p className="text-sm font-bold text-gray-700">
                    দ্রুত রেসপন্স
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    ২৪ ঘন্টার মধ্যে যোগাযোগ
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="text-2xl mb-2">🛡️</div>
                  <p className="text-sm font-bold text-gray-700">
                    সুরক্ষিত অর্ডার
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    ১০০% সুরক্ষিত পেমেন্ট
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="text-2xl mb-2">🎁</div>
                  <p className="text-sm font-bold text-gray-700">বিশেষ অফার</p>
                  <p className="text-xs text-gray-600 mt-1">
                    নেক্সট অর্ডারে ডিসকাউন্ট
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="bg-gray-50 border-t border-gray-200 p-4 flex-shrink-0">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 text-sm">
              যেকোনো সমস্যায় আমরা এখানে আছি আপনার জন্য
            </p>
            <button
              onClick={closeSuccessMessage}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg font-bold hover:shadow-lg transition-all duration-300"
            >
              👍 ধন্যবাদ!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
