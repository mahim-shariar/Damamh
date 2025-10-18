import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaFilePdf,
  FaSearch,
  FaFilter,
  FaSort,
  FaShoppingCart,
  FaBox,
  FaShippingFast,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaDollarSign,
  FaChartBar,
  FaPrint,
  FaDownload,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaRulerVertical,
  FaImage,
} from "react-icons/fa";
import useFetch from "../../hooks/useFetch";
import { FaHandSparkles } from "react-icons/fa6";

// Image With Fallback Component
const ImageWithFallback = ({ src, alt, className, fallbackIcon = FaImage }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const FallbackIcon = fallbackIcon;

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (imageError || !src) {
    return (
      <div
        className={`${className} bg-gray-100 flex items-center justify-center rounded border border-gray-200`}
      >
        <FallbackIcon className="h-6 w-6 text-gray-400" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${
        !imageLoaded ? "opacity-0" : "opacity-100"
      } transition-opacity duration-200 object-cover rounded border border-gray-200`}
      onError={handleImageError}
      onLoad={handleImageLoad}
    />
  );
};

// Order Form Component
const OrderForm = ({ order, onSave, onCancel, loading, isEdit = false }) => {
  const { get } = useFetch();
  const [formData, setFormData] = useState({
    name: order?.name || "",
    phone: order?.phone || "",
    address: order?.address || "",
    size: order?.size || "",
    quantity: order?.quantity || 1,
    relatedProducts: order?.relatedProducts || [],
  });
  const [mainProduct, setMainProduct] = useState(null);
  const [availableRelatedProducts, setAvailableRelatedProducts] = useState([]);

  useEffect(() => {
    fetchMainProduct();
  }, []);

  const fetchMainProduct = async () => {
    try {
      const response = await get("/products");
      if (response.success && response.data.product) {
        setMainProduct(response.data.product);
        setAvailableRelatedProducts(
          response.data.product.relatedProducts || []
        );
      }
    } catch (err) {
      console.error("Failed to fetch main product:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      size: formData.size,
      quantity: Number(formData.quantity),
      relatedProducts: formData.relatedProducts.map((rp) => ({
        _id: rp._id,
        quantity: Number(rp.quantity),
      })),
    };

    onSave(orderData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRelatedProductChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      relatedProducts: prev.relatedProducts.map((rp, i) =>
        i === index ? { ...rp, [field]: value } : rp
      ),
    }));
  };

  const addRelatedProduct = (productId) => {
    const product = availableRelatedProducts.find((p) => p._id === productId);
    if (
      product &&
      !formData.relatedProducts.some((rp) => rp._id === productId)
    ) {
      setFormData((prev) => ({
        ...prev,
        relatedProducts: [...prev.relatedProducts, { ...product, quantity: 1 }],
      }));
    }
  };

  const removeRelatedProduct = (index) => {
    setFormData((prev) => ({
      ...prev,
      relatedProducts: prev.relatedProducts.filter((_, i) => i !== index),
    }));
  };

  const calculateTotals = () => {
    const mainProductPrice = mainProduct?.price || 0;
    const mainProductTotal = mainProductPrice * (formData.quantity || 1);

    const relatedProductsTotal = formData.relatedProducts.reduce(
      (total, rp) => total + (rp.price || 0) * (rp.quantity || 1),
      0
    );

    return {
      subtotal: mainProductTotal,
      relatedTotal: relatedProductsTotal,
      grandTotal: mainProductTotal + relatedProductsTotal,
    };
  };

  const totals = calculateTotals();
  const sizeOptions = ["৪৮", "৫০", "৫২", "৫৪", "৫৬", "৫৮"];

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-blue-50">
            <FaShoppingCart className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {isEdit ? "Edit Order" : "Create New Order"}
          </h3>
        </div>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <FaTimesCircle className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Information */}
        <div className="space-y-4">
          <h4 className="text-md font-semibold text-gray-900 border-b pb-2">
            Customer Information
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Address *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>
        </div>

        {/* Main Product Information */}
        {mainProduct && (
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-gray-900 border-b pb-2">
              Main Product
            </h4>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-semibold text-gray-900">
                    {mainProduct.name}
                  </h5>
                  <p className="text-sm text-gray-600">
                    {mainProduct.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <FaDollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-lg font-bold text-green-600">
                        ৳{mainProduct.price}
                      </span>
                      {mainProduct.originalPrice > mainProduct.price && (
                        <span className="text-sm text-gray-400 line-through">
                          ৳{mainProduct.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {mainProduct.images && mainProduct.images.length > 0 && (
                  <ImageWithFallback
                    src={mainProduct.images[0]}
                    alt={mainProduct.name}
                    className="w-16 h-16"
                    fallbackIcon={FaBox}
                  />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size *
                  </label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Size</option>
                    {sizeOptions.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                    max="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Related Products */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-semibold text-gray-900">
              Related Products
            </h4>
            <span className="text-sm text-gray-500">
              {formData.relatedProducts.length} added
            </span>
          </div>

          {/* Add Related Product */}
          {availableRelatedProducts.length > 0 && (
            <div className="flex space-x-2">
              <select
                onChange={(e) => addRelatedProduct(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                defaultValue=""
              >
                <option value="">Add Related Product</option>
                {availableRelatedProducts
                  .filter(
                    (product) =>
                      !formData.relatedProducts.some(
                        (rp) => rp._id === product._id
                      )
                  )
                  .map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.title} - ৳{product.price}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* Related Products List */}
          {formData.relatedProducts.length > 0 && (
            <div className="space-y-3">
              {formData.relatedProducts.map((product, index) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.title}
                      className="w-12 h-12"
                      fallbackIcon={FaBox}
                    />
                    <div>
                      <h6 className="font-medium text-gray-900">
                        {product.title}
                      </h6>
                      <p className="text-sm text-green-600">৳{product.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={product.quantity}
                      onChange={(e) =>
                        handleRelatedProductChange(
                          index,
                          "quantity",
                          e.target.value
                        )
                      }
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                    />
                    <button
                      type="button"
                      onClick={() => removeRelatedProduct(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <h5 className="font-semibold text-gray-900 border-b pb-2">
            Order Summary
          </h5>
          <div className="flex justify-between text-sm">
            <span>Main Product:</span>
            <span>৳{totals.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Related Products:</span>
            <span>৳{totals.relatedTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-2">
            <span>Total Amount:</span>
            <span className="text-green-600">
              ৳{totals.grandTotal.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex space-x-3 pt-6 border-t">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 font-medium"
          >
            <FaPlus className="h-4 w-4" />
            <span>
              {loading ? "Saving..." : isEdit ? "Update Order" : "Create Order"}
            </span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Order Details Modal
const OrderDetailsModal = ({ order, onClose, onStatusUpdate }) => {
  const { put, get } = useFetch();
  const [updating, setUpdating] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(order);

  const statusOptions = [
    {
      value: "pending",
      label: "Pending",
      color: "bg-yellow-100 text-yellow-800",
      icon: FaClock,
    },
    {
      value: "confirmed",
      label: "Confirmed",
      color: "bg-blue-100 text-blue-800",
      icon: FaCheckCircle,
    },
    {
      value: "shipped",
      label: "Shipped",
      color: "bg-purple-100 text-purple-800",
      icon: FaShippingFast,
    },
    {
      value: "delivered",
      label: "Delivered",
      color: "bg-green-100 text-green-800",
      icon: FaBox,
    },
    {
      value: "cancelled",
      label: "Cancelled",
      color: "bg-red-100 text-red-800",
      icon: FaTimesCircle,
    },
  ];

  // Update local state when prop changes
  useEffect(() => {
    setCurrentOrder(order);
  }, [order]);

  const handleStatusUpdate = async (newStatus) => {
    setUpdating(true);
    try {
      // Immediately update local state for instant UI feedback
      setCurrentOrder((prev) => ({
        ...prev,
        status: newStatus,
      }));

      // Make API call
      await put(`/orders/${order._id}/status`, { status: newStatus });

      // Notify parent component to refresh the main list
      onStatusUpdate();
    } catch (error) {
      console.error("Failed to update status:", error);
      // Revert on error
      setCurrentOrder((prev) => ({
        ...prev,
        status: order.status,
      }));
    } finally {
      setUpdating(false);
    }
  };

  const handleDownloadInvoice = async () => {
    setDownloading(true);
    try {
      const response = await get(
        `/orders/${currentOrder._id}/invoice`,
        {},
        true
      );

      if (response.success && response.data) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `invoice-${currentOrder.orderNumber}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        throw new Error("Failed to download invoice");
      }
    } catch (error) {
      console.error("Error downloading invoice:", error);
      alert("Failed to download invoice. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const getStatusIcon = (status) => {
    const statusOption = statusOptions.find((opt) => opt.value === status);
    const IconComponent = statusOption?.icon || FaClock;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <FaEye className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Order Details
                </h3>
                <p className="text-sm text-gray-600">
                  #{currentOrder.orderNumber}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <FaTimesCircle className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Customer Information
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <FaUser className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{currentOrder.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaPhone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{currentOrder.phone}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FaMapMarkerAlt className="h-4 w-4 text-gray-400 mt-0.5" />
                    <span className="text-sm">{currentOrder.address}</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Order Items
                </h4>

                {/* Main Product */}
                <div className="border-b border-gray-200 pb-3 mb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-gray-900">
                        {currentOrder.mainProduct?.name || "Main Product"}
                      </h5>
                      <div className="flex items-center space-x-2 mt-1">
                        <FaRulerVertical className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-600">
                          Size: {currentOrder.size}
                        </span>
                        <span className="text-xs text-gray-600">
                          Qty: {currentOrder.quantity}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">
                        ৳{currentOrder.subtotal?.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        ৳{currentOrder.mainProduct?.price} ×{" "}
                        {currentOrder.quantity}
                      </p>
                    </div>
                  </div>
                  {currentOrder.mainProduct?.image && (
                    <div className="mt-2">
                      <ImageWithFallback
                        src={currentOrder.mainProduct.image}
                        alt={currentOrder.mainProduct.name}
                        className="w-20 h-20"
                        fallbackIcon={FaBox}
                      />
                    </div>
                  )}
                </div>

                {/* Related Products */}
                {currentOrder.relatedProducts &&
                  currentOrder.relatedProducts.length > 0 && (
                    <div className="space-y-2">
                      <h6 className="font-medium text-gray-700 text-sm">
                        Related Products:
                      </h6>
                      {currentOrder.relatedProducts.map((product, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center text-sm"
                        >
                          <div className="flex items-center space-x-2">
                            <ImageWithFallback
                              src={product.image}
                              alt={product.title}
                              className="w-8 h-8"
                              fallbackIcon={FaBox}
                            />
                            <span>{product.title}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-medium">
                              ৳
                              {(
                                product.price * (product.quantity || 1)
                              ).toLocaleString()}
                            </span>
                            <p className="text-xs text-gray-500">
                              ৳{product.price} × {product.quantity || 1}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>

            {/* Order Summary & Actions */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Order Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>৳{currentOrder.subtotal?.toLocaleString()}</span>
                  </div>
                  {currentOrder.relatedProductsTotal > 0 && (
                    <div className="flex justify-between">
                      <span>Related Products:</span>
                      <span>
                        ৳{currentOrder.relatedProductsTotal?.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span>Total:</span>
                    <span className="text-green-600">
                      ৳{currentOrder.totalPrice?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Status - Hidden in print */}
              <div className="bg-gray-50 rounded-lg p-4 no-print">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Order Status
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(currentOrder.status)}
                    <span className="capitalize">{currentOrder.status}</span>
                  </div>

                  <div className="space-y-2 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Update Status:
                    </label>
                    <div className="space-y-1">
                      {statusOptions.map((status) => (
                        <button
                          key={status.value}
                          onClick={() => handleStatusUpdate(status.value)}
                          disabled={
                            updating || currentOrder.status === status.value
                          }
                          className={`w-full text-left px-3 py-2 rounded text-sm transition-colors duration-200 ${
                            currentOrder.status === status.value
                              ? status.color
                              : "hover:bg-gray-100"
                          } ${updating ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          <div className="flex items-center space-x-2">
                            <status.icon className="h-3 w-3" />
                            <span>{status.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions - Hidden in print */}
              <div className="bg-gray-50 rounded-lg p-4 no-print">
                <h4 className="font-semibold text-gray-900 mb-3">Actions</h4>
                <div className="space-y-2">
                  <button
                    onClick={handleDownloadInvoice}
                    disabled={downloading}
                    className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 disabled:opacity-50"
                  >
                    {downloading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Downloading...</span>
                      </>
                    ) : (
                      <>
                        <FaFilePdf className="h-4 w-4" />
                        <span>Download Invoice</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="w-full flex items-center justify-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  >
                    <FaPrint className="h-4 w-4" />
                    <span>Print</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Order Card Component
const OrderCard = ({ order, onView, onEdit, onDelete, onStatusUpdate }) => {
  const { get } = useFetch();
  const [downloading, setDownloading] = useState(false);

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: FaClock,
      confirmed: FaCheckCircle,
      shipped: FaShippingFast,
      delivered: FaBox,
      cancelled: FaTimesCircle,
    };
    const IconComponent = icons[status] || FaClock;
    return <IconComponent className="h-4 w-4" />;
  };

  const handleQuickDownload = async () => {
    setDownloading(true);
    try {
      const response = await get(`/orders/${order._id}/invoice`, {}, true);

      if (response.success && response.data) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `invoice-${order.orderNumber}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        throw new Error("Download failed");
      }
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download invoice");
    } finally {
      setDownloading(false);
    }
  };

  const StatusIcon = getStatusIcon(order.status);

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2 no-print">
            <span
              className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                order.status
              )}`}
            >
              {StatusIcon}
              <span className="capitalize">{order.status}</span>
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              #{order.orderNumber}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{order.name}</h3>
          <p className="text-gray-600 text-sm mt-1">{order.phone}</p>
        </div>
        <div className="flex space-x-2 ml-4 no-print">
          <button
            onClick={() => onView(order)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            title="View Details"
          >
            <FaEye className="h-4 w-4" />
          </button>
          <button
            onClick={handleQuickDownload}
            disabled={downloading}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
            title="Download Invoice"
          >
            {downloading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
            ) : (
              <FaFilePdf className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => onEdit(order)}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
            title="Edit Order"
          >
            <FaEdit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(order._id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Delete Order"
          >
            <FaTrash className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <span className="text-gray-500">Items:</span>
          <span className="ml-2 font-medium">{order.totalItems || 1}</span>
        </div>
        <div>
          <span className="text-gray-500">Total:</span>
          <span className="ml-2 font-semibold text-green-600">
            ৳{order.totalPrice?.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="text-xs text-gray-500 space-y-1">
        <div className="flex items-center space-x-1">
          <FaMapMarkerAlt className="h-3 w-3" />
          <span className="truncate">{order.address}</span>
        </div>
        <div className="flex items-center space-x-1">
          <FaRulerVertical className="h-3 w-3" />
          <span>Size: {order.size}</span>
          <span>•</span>
          <span>Qty: {order.quantity}</span>
        </div>
        <div className="flex items-center space-x-1">
          <FaClock className="h-3 w-3" />
          <span>{new Date(order.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {order.relatedProducts && order.relatedProducts.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs text-purple-600">
              +{order.relatedProducts.length} related product(s)
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Order Management Component
const OrderManagement = () => {
  const { loading, error, get, post, put, del } = useFetch();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [stats, setStats] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  const fetchOrders = async () => {
    try {
      const response = await get("/orders");
      if (response.success) {
        setOrders(response.data.orders);
      }
    } catch (err) {
      showMessage("Failed to fetch orders", "error");
    }
  };

  const fetchStats = async () => {
    try {
      const response = await get("/orders/stats");
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.name.toLowerCase().includes(term) ||
          order.phone.includes(term) ||
          order.orderNumber.toLowerCase().includes(term) ||
          order.address.toLowerCase().includes(term)
      );
    }

    setFilteredOrders(filtered);
  };

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 4000);
  };

  const handleCreateOrder = async (orderData) => {
    try {
      const response = await post("/orders", orderData);
      if (response.success) {
        setOrders((prev) => [response.data.order, ...prev]);
        setCreatingOrder(false);
        fetchStats();
        showMessage("Order created successfully!");
      }
    } catch (err) {
      showMessage(err.message || "Failed to create order", "error");
    }
  };

  const handleUpdateOrder = async (orderData) => {
    try {
      const response = await put(`/orders/${editingOrder._id}`, orderData);
      if (response.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === editingOrder._id ? response.data.order : order
          )
        );
        setEditingOrder(null);
        fetchStats();
        showMessage("Order updated successfully!");
      }
    } catch (err) {
      showMessage(err.message || "Failed to update order", "error");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }

    try {
      const response = await del(`/orders/${orderId}`);
      if (response.success) {
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
        fetchStats();
        showMessage("Order deleted successfully!");
      }
    } catch (err) {
      showMessage(err.message || "Failed to delete order", "error");
    }
  };

  const handleStatusUpdate = () => {
    fetchOrders();
    fetchStats();
    showMessage("Order status updated successfully!");
  };

  const statusOptions = [
    { value: "all", label: "All Orders" },
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  if (creatingOrder) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <OrderForm
            onSave={handleCreateOrder}
            onCancel={() => setCreatingOrder(false)}
            loading={loading}
            isEdit={false}
          />
        </div>
      </div>
    );
  }

  if (editingOrder) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <OrderForm
            order={editingOrder}
            onSave={handleUpdateOrder}
            onCancel={() => setEditingOrder(null)}
            loading={loading}
            isEdit={true}
          />
        </div>
      </div>
    );
  }

  if (viewingOrder) {
    return (
      <OrderDetailsModal
        order={viewingOrder}
        onClose={() => setViewingOrder(null)}
        onStatusUpdate={handleStatusUpdate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Print Styles */}
      <style>
        {`
          @media print {
            .no-print {
              display: none !important;
            }
            body {
              background: white !important;
            }
            .bg-gray-50 {
              background: white !important;
            }
            .border, .border-2 {
              border: 1px solid #000 !important;
            }
            .text-gray-900, .text-gray-700, .text-gray-600 {
              color: #000 !important;
            }
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="group flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm border border-gray-200 hover:border-gray-300 no-print"
            >
              <FaArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
              <span className="font-medium">Dashboard</span>
            </button>

            <div className="text-right">
              <div className="w-8 h-1 bg-blue-500 rounded-full mb-1 ml-auto"></div>
              <p className="text-gray-500 text-sm">Order Manager</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FaShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Order Management
                </h1>
                <div className="w-12 h-1 bg-blue-500 rounded-full mt-1"></div>
              </div>
            </div>
            <p className="text-gray-600">
              Manage customer orders, track order status, and generate invoices.
            </p>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg border-l-4 ${
              messageType === "error"
                ? "bg-red-50 text-red-700 border-red-400"
                : "bg-green-50 text-green-700 border-green-400"
            } shadow-sm no-print`}
          >
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  messageType === "error" ? "bg-red-400" : "bg-green-400"
                }`}
              ></div>
              <span className="font-medium">{message}</span>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 no-print">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Orders
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalOrders}
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FaShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {stats.pendingOrders}
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <FaClock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Delivered</p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.deliveredOrders}
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <FaBox className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-purple-600">
                    ৳{stats.totalRevenue?.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <FaDollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 no-print">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
              <div className="flex-1 sm:flex-none">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex-1 sm:flex-none">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={() => setCreatingOrder(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium w-full sm:w-auto justify-center"
            >
              <FaPlus className="h-4 w-4" />
              <span>Create New Order</span>
            </button>
          </div>
        </div>

        {/* Orders Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <FaShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchTerm || statusFilter !== "all"
                ? "No orders found"
                : "No orders yet"}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter terms"
                : "Get started by creating your first order"}
            </p>
            {!searchTerm && statusFilter === "all" && (
              <button
                onClick={() => setCreatingOrder(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Create Your First Order
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onView={setViewingOrder}
                onEdit={setEditingOrder}
                onDelete={handleDeleteOrder}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </div>
        )}

        {/* Summary */}
        {filteredOrders.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6 no-print">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {filteredOrders.length}
                </div>
                <div className="text-sm text-gray-600">Showing Orders</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {
                    filteredOrders.filter((o) => o.status === "delivered")
                      .length
                  }
                </div>
                <div className="text-sm text-gray-600">Delivered</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {filteredOrders.filter((o) => o.status === "pending").length}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  ৳
                  {filteredOrders
                    .reduce((sum, order) => sum + (order.totalPrice || 0), 0)
                    .toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Value</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
