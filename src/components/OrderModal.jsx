import React, { useState, useEffect } from "react";
import {
  FiX,
  FiCheckCircle,
  FiLoader,
  FiPlus,
  FiMinus,
  FiShoppingBag,
} from "react-icons/fi";
import useFetch from "../hooks/useFetch";

const OrderModal = ({
  showOrderModal,
  setShowOrderModal,
  orderForm,
  setOrderForm,
  handleOrderSubmit,
  sizes, // This prop might not be needed anymore since we get sizes from product
}) => {
  const [localOrderForm, setLocalOrderForm] = useState(orderForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [product, setProduct] = useState(null);
  const [selectedRelatedProducts, setSelectedRelatedProducts] = useState([]);
  const [hasFetchedProduct, setHasFetchedProduct] = useState(false);

  const { post, get } = useFetch();

  // Fetch product data when modal opens
  useEffect(() => {
    const fetchProduct = async () => {
      if (!showOrderModal || hasFetchedProduct) return;

      try {
        const response = await get("/products");
        if (response.success && response.data.product) {
          const productData = response.data.product;
          setProduct(productData);

          // Auto-select first available size if no size is selected
          if (
            !localOrderForm.size &&
            productData.sizes &&
            productData.sizes.length > 0
          ) {
            setLocalOrderForm((prev) => ({
              ...prev,
              size: productData.sizes[0],
            }));
          }
        }
        setHasFetchedProduct(true);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setHasFetchedProduct(true);
      }
    };

    fetchProduct();
  }, [showOrderModal, get, hasFetchedProduct, localOrderForm.size]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalOrderForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (submitError) setSubmitError("");
  };

  const handleSizeSelect = (size) => {
    setLocalOrderForm((prev) => ({ ...prev, size }));
  };

  // Handle related product selection
  const handleRelatedProductToggle = (relatedProduct) => {
    setSelectedRelatedProducts((prev) => {
      const existingIndex = prev.findIndex(
        (rp) => rp._id === relatedProduct._id
      );

      if (existingIndex >= 0) {
        // Remove if already selected
        return prev.filter((rp) => rp._id !== relatedProduct._id);
      } else {
        // Add with quantity 1
        return [...prev, { ...relatedProduct, quantity: 1 }];
      }
    });
  };

  // Update related product quantity
  const updateRelatedProductQuantity = (productId, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 5) return;

    setSelectedRelatedProducts((prev) =>
      prev.map((rp) =>
        rp._id === productId ? { ...rp, quantity: newQuantity } : rp
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (
      !localOrderForm.name ||
      !localOrderForm.phone ||
      !localOrderForm.address ||
      !localOrderForm.size
    ) {
      setSubmitError("দয়া করে সকল প্রয়োজনীয় তথ্য প্রদান করুন");
      return;
    }

    // Validate that selected size is available
    if (
      product &&
      product.sizes &&
      !product.sizes.includes(localOrderForm.size)
    ) {
      setSubmitError("দয়া করে একটি বৈধ সাইজ নির্বাচন করুন");
      return;
    }

    const phoneRegex = /^(?:\+88|01)?(?:\d{9}|\d{10})$/;
    if (!phoneRegex.test(localOrderForm.phone.replace(/\s/g, ""))) {
      setSubmitError("দয়া করে একটি বৈধ মোবাইল নম্বর প্রদান করুন");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Prepare order data with related products
      const orderData = {
        name: localOrderForm.name.trim(),
        phone: localOrderForm.phone.trim(),
        address: localOrderForm.address.trim(),
        size: localOrderForm.size,
        quantity: parseInt(localOrderForm.quantity) || 1,
        relatedProducts: selectedRelatedProducts.map((rp) => ({
          _id: rp._id,
          quantity: rp.quantity,
        })),
      };

      // Submit order to API
      const response = await post("/orders", orderData);

      if (response.success) {
        setOrderForm(localOrderForm);

        if (handleOrderSubmit) {
          handleOrderSubmit(e, response.data);
        }

        // Reset form and selections
        setLocalOrderForm({
          name: "",
          phone: "",
          address: "",
          size: "",
          quantity: "1",
        });
        setSelectedRelatedProducts([]);
      } else {
        setSubmitError(
          response.message ||
            "অর্ডার জমা দিতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।"
        );
      }
    } catch (error) {
      console.error("Order submission error:", error);
      setSubmitError("নেটওয়ার্ক সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setShowOrderModal(false);
    setSubmitError("");
    setLocalOrderForm(orderForm);
    setSelectedRelatedProducts([]);
    setHasFetchedProduct(false);
  };

  if (!showOrderModal) return null;

  // Get available sizes from product data
  const availableSizes = product?.sizes || [];

  // Calculate totals
  const mainProductTotal = product
    ? product.price * (parseInt(localOrderForm.quantity) || 1)
    : 0;
  const relatedProductsTotal = selectedRelatedProducts.reduce(
    (total, rp) => total + rp.price * rp.quantity,
    0
  );
  const totalAmount = mainProductTotal + relatedProductsTotal;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-3xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-black">অর্ডার ফর্ম</h3>
              <p className="text-white/90 mt-1">
                Damamah Sonnoti Burka - আপনার অর্ডার সম্পূর্ণ করুন
              </p>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors disabled:opacity-50"
            >
              <FiX className="text-white" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Error Message */}
          {submitError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 text-sm text-center">{submitError}</p>
            </div>
          )}

          {/* Product Display */}
          {product && (
            <div className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4">
              <div className="flex items-center space-x-4">
                {product.images &&
                  product.images.length > 0 &&
                  product.images[0] && (
                    <div className="w-20 h-20 bg-white rounded-xl overflow-hidden border-2 border-purple-200">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg">
                    {product.name}
                  </h4>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-2xl font-bold text-purple-600">
                      ৳{product.price?.toLocaleString("bn-BD")}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-lg line-through text-gray-500">
                        ৳{product.originalPrice?.toLocaleString("bn-BD")}
                      </span>
                    )}
                  </div>
                  {/* Available Sizes Info */}
                  <div className="mt-2">
                    <span className="text-sm text-gray-600 font-medium">
                      উপলব্ধ সাইজ: {availableSizes.join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information Section */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  আপনার নাম *
                </label>
                <input
                  type="text"
                  name="name"
                  value={localOrderForm.name}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50"
                  placeholder="আপনার পূর্ণ নাম লিখুন"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  মোবাইল নম্বর *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={localOrderForm.phone}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50"
                  placeholder="01XXXXXXXXX"
                />
              </div>
            </div>

            {/* Product Configuration Section */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Size Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  সাইজ নির্বাচন করুন *
                </label>
                {availableSizes.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSizeSelect(size)}
                        disabled={isSubmitting}
                        className={`py-3 rounded-xl border-2 font-bold transition-all disabled:opacity-50 ${
                          localOrderForm.size === size
                            ? "bg-purple-600 text-white border-purple-600"
                            : "bg-gray-100 text-gray-700 border-gray-200 hover:border-purple-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <p className="text-yellow-700 text-sm">
                      ⚠️ বর্তমানে কোন সাইজ উপলব্ধ নেই
                    </p>
                  </div>
                )}
                {availableSizes.length > 0 && (
                  <p className="text-xs text-gray-500 mt-2">
                    শুধুমাত্র উপলব্ধ সাইজ গুলো দেখানো হচ্ছে
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  পরিমাণ
                </label>
                <select
                  name="quantity"
                  value={localOrderForm.quantity}
                  onChange={handleInputChange}
                  disabled={isSubmitting || availableSizes.length === 0}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num.toString()}>
                      {num} টি
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Related Products Section */}
            {product?.relatedProducts && product.relatedProducts.length > 0 && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  অতিরিক্ত পণ্য নির্বাচন করুন (ঐচ্ছিক)
                </label>
                <div className="grid gap-3">
                  {product.relatedProducts.map((relatedProduct) => {
                    const isSelected = selectedRelatedProducts.some(
                      (rp) => rp._id === relatedProduct._id
                    );
                    const selectedProduct = selectedRelatedProducts.find(
                      (rp) => rp._id === relatedProduct._id
                    );

                    return (
                      <div
                        key={relatedProduct._id}
                        className={`border-2 rounded-xl p-3 transition-all cursor-pointer ${
                          isSelected
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 bg-white hover:border-purple-300"
                        }`}
                        onClick={() =>
                          handleRelatedProductToggle(relatedProduct)
                        }
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {relatedProduct.image && (
                              <div className="w-12 h-12 bg-white rounded-lg overflow-hidden border">
                                <img
                                  src={relatedProduct.image}
                                  alt={relatedProduct.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                  }}
                                />
                              </div>
                            )}
                            <div>
                              <h5 className="font-semibold text-gray-900">
                                {relatedProduct.title}
                              </h5>
                              <p className="text-purple-600 font-bold">
                                ৳{relatedProduct.price?.toLocaleString("bn-BD")}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            {isSelected ? (
                              <>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateRelatedProductQuantity(
                                      relatedProduct._id,
                                      (selectedProduct.quantity || 1) - 1
                                    );
                                  }}
                                  className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700"
                                >
                                  <FiMinus className="text-sm" />
                                </button>
                                <span className="w-8 text-center font-bold">
                                  {selectedProduct.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateRelatedProductQuantity(
                                      relatedProduct._id,
                                      (selectedProduct.quantity || 1) + 1
                                    );
                                  }}
                                  className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700"
                                >
                                  <FiPlus className="text-sm" />
                                </button>
                              </>
                            ) : (
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                <FiPlus className="text-gray-600" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Address Field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                সম্পূর্ণ ঠিকানা *
              </label>
              <textarea
                name="address"
                value={localOrderForm.address}
                onChange={handleInputChange}
                required
                disabled={isSubmitting || availableSizes.length === 0}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none disabled:opacity-50"
                placeholder="বাড়ি নং, রোড নং, এলাকা, জেলা"
              />
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                <FiShoppingBag className="mr-2" />
                অর্ডার সামারি
              </h4>
              <div className="space-y-2 text-sm">
                {/* Main Product */}
                <div className="flex justify-between">
                  <span>মূল পণ্য:</span>
                  <div className="text-right">
                    <span>{product?.name || "Damaham Sonnoti Burka"}</span>
                    <div className="text-gray-600 text-xs">
                      সাইজ: {localOrderForm.size || "নির্বাচন করুন"} | পরিমাণ:{" "}
                      {localOrderForm.quantity} টি
                    </div>
                  </div>
                </div>

                {/* Related Products */}
                {selectedRelatedProducts.length > 0 && (
                  <div>
                    <div className="font-medium mb-1">অতিরিক্ত পণ্য:</div>
                    {selectedRelatedProducts.map((rp) => (
                      <div
                        key={rp._id}
                        className="flex justify-between text-gray-600 ml-2"
                      >
                        <span>• {rp.title}</span>
                        <span>
                          {rp.quantity} x ৳{rp.price?.toLocaleString("bn-BD")}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Totals */}
                <div className="border-t pt-2 mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span>সাবটোটাল:</span>
                    <span>৳{mainProductTotal.toLocaleString("bn-BD")}</span>
                  </div>
                  {selectedRelatedProducts.length > 0 && (
                    <div className="flex justify-between">
                      <span>অতিরিক্ত পণ্য:</span>
                      <span>
                        ৳{relatedProductsTotal.toLocaleString("bn-BD")}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-purple-600 text-base border-t pt-2">
                    <span>মোট Amount:</span>
                    <span>৳{totalAmount.toLocaleString("bn-BD")}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>পেমেন্ট পদ্ধতি:</span>
                    <span>ক্যাশ অন ডেলিভারি</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                isSubmitting ||
                !localOrderForm.name ||
                !localOrderForm.phone ||
                !localOrderForm.address ||
                !localOrderForm.size ||
                availableSizes.length === 0
              }
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin text-white" />
                  <span>অর্ডার জমা হচ্ছে...</span>
                </>
              ) : (
                <>
                  <FiCheckCircle className="text-white" />
                  <span>অর্ডার কনফার্ম করুন</span>
                </>
              )}
            </button>

            {/* Additional Info */}
            <div className="text-center text-xs text-gray-500 space-y-1">
              <p>
                অর্ডার কনফার্ম করলে আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবে
              </p>
              <p>ডেলিভারি সময়: ১-৩ কার্যদিবস</p>
              {availableSizes.length === 0 && (
                <p className="text-red-500 font-medium">
                  ⚠️ বর্তমানে অর্ডার দেওয়া যাচ্ছে না - কোন সাইজ উপলব্ধ নেই
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
