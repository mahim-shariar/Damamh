import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaFilter,
  FaSort,
  FaStar,
  FaListOl,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaGripVertical,
  FaSave,
  FaMapMarkerAlt,
} from "react-icons/fa";
import useFetch from "../../hooks/useFetch";
import { FaHandSparkles } from "react-icons/fa6";

// Review Form Component
const ReviewForm = ({ review, onSave, onCancel, loading, isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: review?.name || "",
    rating: review?.rating || 5,
    description: review?.description || "",
    district: review?.district || "",
    order: review?.order || 0,
    isActive: review?.isActive ?? true,
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const reviewData = {
      name: formData.name.trim(),
      rating: Number(formData.rating),
      description: formData.description.trim(),
      district: formData.district.trim(),
      order: Number(formData.order),
      isActive: formData.isActive,
    };

    onSave(reviewData);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length > 100) {
      errors.name = "Name must be less than 100 characters";
    }

    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      errors.rating = "Rating must be between 1 and 5";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    } else if (formData.description.trim().length > 1000) {
      errors.description = "Description must be less than 1000 characters";
    }

    if (!formData.district.trim()) {
      errors.district = "District is required";
    } else if (formData.district.trim().length > 100) {
      errors.district = "District must be less than 100 characters";
    }

    if (formData.order < 0) {
      errors.order = "Order cannot be negative";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`h-5 w-5 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-green-50">
            <FaStar className="h-5 w-5 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {isEdit ? "Edit Review" : "Create New Review"}
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
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.name ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter reviewer name..."
            required
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
          <div className="mt-1 text-xs text-gray-500 text-right">
            {formData.name.length}/100 characters
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating *
          </label>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1">{renderStars(formData.rating)}</div>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.rating ? "border-red-300" : "border-gray-300"
              }`}
            >
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} Star{rating !== 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
          )}
        </div>

        {/* District */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            District *
          </label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.district ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter district..."
            required
          />
          {errors.district && (
            <p className="mt-1 text-sm text-red-600">{errors.district}</p>
          )}
          <div className="mt-1 text-xs text-gray-500 text-right">
            {formData.district.length}/100 characters
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none ${
              errors.description ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter the review description..."
            required
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
          <div className="mt-1 text-xs text-gray-500 text-right">
            {formData.description.length}/1000 characters
          </div>
        </div>

        {/* Order */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Display Order
          </label>
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            min="0"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.order ? "border-red-300" : "border-gray-300"
            }`}
          />
          {errors.order && (
            <p className="mt-1 text-sm text-red-600">{errors.order}</p>
          )}
          <div className="mt-1 text-xs text-gray-500">
            Lower numbers appear first (0 = first position)
          </div>
        </div>

        {/* Active Status */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label className="text-sm font-medium text-gray-700">
            Active Review
          </label>
          <span className="text-xs text-gray-500">
            (Visible to public when active)
          </span>
        </div>

        <div className="flex space-x-3 pt-6 border-t">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 font-medium"
          >
            <FaPlus className="h-4 w-4" />
            <span>
              {loading
                ? "Saving..."
                : isEdit
                ? "Update Review"
                : "Create Review"}
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

// Review Card Component
const ReviewCard = ({ review, onEdit, onDelete, onView, onToggleStatus }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const displayDescription = showFullDescription
    ? review.description
    : review.description.length > 150
    ? `${review.description.substring(0, 150)}...`
    : review.description;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span
              className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                review.isActive
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <FaCheckCircle className="h-3 w-3" />
              <span>{review.isActive ? "Active" : "Inactive"}</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              <FaListOl className="h-3 w-3" />
              <span>Position {review.order + 1}</span>
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {review.name}
          </h3>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex space-x-1">{renderStars(review.rating)}</div>
            <span className="text-sm text-gray-600">({review.rating}/5)</span>
          </div>
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onView(review)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            title="View Details"
          >
            <FaEye className="h-4 w-4" />
          </button>
          <button
            onClick={() => onEdit(review)}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
            title="Edit Review"
          >
            <FaEdit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(review._id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Delete Review"
          >
            <FaTrash className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
        <FaMapMarkerAlt className="h-4 w-4 text-gray-400" />
        <span>{review.district}</span>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        <p
          className={`${
            !showFullDescription && review.description.length > 150
              ? "line-clamp-3"
              : ""
          }`}
        >
          {displayDescription}
        </p>
        {review.description.length > 150 && (
          <button
            onClick={toggleDescription}
            className="text-green-600 hover:text-green-800 text-sm font-medium mt-2"
          >
            {showFullDescription ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      <div className="text-xs text-gray-500 space-y-1 border-t pt-3">
        <div className="flex items-center justify-between">
          <span>
            Created: {new Date(review.createdAt).toLocaleDateString()}
          </span>
          <span>By: {review.createdBy?.name || "Admin"}</span>
        </div>
        {review.updatedAt !== review.createdAt && (
          <div className="flex items-center justify-between">
            <span>
              Updated: {new Date(review.updatedAt).toLocaleDateString()}
            </span>
            <span>By: {review.updatedBy?.name || "Admin"}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Review Details Modal
const ReviewDetailsModal = ({ review, onClose, onEdit }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`h-6 w-6 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-green-50">
                <FaEye className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Review Details
                </h3>
                <p className="text-sm text-gray-600">
                  Position {review.order + 1}
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

          <div className="space-y-6">
            {/* Name and Rating */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 text-xl">
                  {review.name}
                </h4>
                <div className="flex items-center space-x-2 mt-1">
                  <FaMapMarkerAlt className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{review.district}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex space-x-1 mb-1">
                  {renderStars(review.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {review.rating} out of 5 stars
                </span>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center space-x-2">
              <span
                className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                  review.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <FaCheckCircle className="h-4 w-4" />
                <span>
                  {review.isActive ? "Active Review" : "Inactive Review"}
                </span>
              </span>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Review</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {review.description}
                </p>
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2">Created</h5>
                <p className="text-gray-600">
                  {new Date(review.createdAt).toLocaleDateString()} at{" "}
                  {new Date(review.createdAt).toLocaleTimeString()}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  By: {review.createdBy?.name || "Admin"}
                </p>
              </div>

              {review.updatedAt !== review.createdAt && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">
                    Last Updated
                  </h5>
                  <p className="text-gray-600">
                    {new Date(review.updatedAt).toLocaleDateString()} at{" "}
                    {new Date(review.updatedAt).toLocaleTimeString()}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    By: {review.updatedBy?.name || "Admin"}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-6 border-t">
              <button
                onClick={() => onEdit(review)}
                className="flex items-center space-x-2 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all duration-200 font-medium"
              >
                <FaEdit className="h-4 w-4" />
                <span>Edit Review</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reorder Reviews Component
const ReorderReviews = ({ reviews, onSave, onCancel, loading }) => {
  const [reorderedReviews, setReorderedReviews] = useState([...reviews]);

  const moveReview = (fromIndex, toIndex) => {
    const updatedReviews = [...reorderedReviews];
    const [movedReview] = updatedReviews.splice(fromIndex, 1);
    updatedReviews.splice(toIndex, 0, movedReview);

    // Update orders based on new positions
    const withUpdatedOrders = updatedReviews.map((review, index) => ({
      ...review,
      order: index,
    }));

    setReorderedReviews(withUpdatedOrders);
  };

  const handleSave = async () => {
    const orderMap = {};
    reorderedReviews.forEach((review, index) => {
      orderMap[review._id] = index;
    });

    await onSave(orderMap);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`h-3 w-3 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-purple-50">
            <FaSort className="h-5 w-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Reorder Reviews
          </h3>
        </div>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <FaTimesCircle className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        <p className="text-gray-600">
          Drag and drop reviews to reorder them. The order determines how they
          appear on the website.
        </p>

        <div className="space-y-3">
          {reorderedReviews.map((review, index) => (
            <div
              key={review._id}
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex-shrink-0 cursor-move">
                <FaGripVertical className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-gray-900">{review.name}</h4>
                  <div className="flex space-x-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-1">
                  {review.description.substring(0, 100)}...
                </p>
                <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                  <FaMapMarkerAlt className="h-3 w-3" />
                  <span>{review.district}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  Position {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-3 pt-6 border-t">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center space-x-2 bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 font-medium"
          >
            <FaSave className="h-4 w-4" />
            <span>{loading ? "Saving..." : "Save New Order"}</span>
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Review Management Component
const ReviewManagement = () => {
  const { loading, error, get, post, put, del } = useFetch();
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [creatingReview, setCreatingReview] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [viewingReview, setViewingReview] = useState(null);
  const [reorderingReviews, setReorderingReviews] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    filterReviews();
  }, [reviews, searchTerm, statusFilter]);

  const fetchReviews = async () => {
    try {
      const response = await get("/reviews");
      if (response.success) {
        setReviews(response.data.reviews);
      }
    } catch (err) {
      showMessage("Failed to fetch reviews", "error");
    }
  };

  const filterReviews = () => {
    let filtered = reviews;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (review) =>
          review.name.toLowerCase().includes(term) ||
          review.description.toLowerCase().includes(term) ||
          review.district.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (review) => review.isActive === (statusFilter === "active")
      );
    }

    setFilteredReviews(filtered);
  };

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 4000);
  };

  const handleCreateReview = async (reviewData) => {
    try {
      const response = await post("/reviews", reviewData);
      if (response.success) {
        setReviews((prev) => [response.data.review, ...prev]);
        setCreatingReview(false);
        showMessage("Review created successfully!");
      }
    } catch (err) {
      showMessage(err.message || "Failed to create review", "error");
    }
  };

  const handleUpdateReview = async (reviewData) => {
    try {
      const response = await put(`/reviews/${editingReview._id}`, reviewData);
      if (response.success) {
        setReviews((prev) =>
          prev.map((review) =>
            review._id === editingReview._id ? response.data.review : review
          )
        );
        setEditingReview(null);
        showMessage("Review updated successfully!");
      }
    } catch (err) {
      showMessage(err.message || "Failed to update review", "error");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }

    try {
      const response = await del(`/reviews/${reviewId}`);
      if (response.success) {
        setReviews((prev) => prev.filter((review) => review._id !== reviewId));
        showMessage("Review deleted successfully!");
      }
    } catch (err) {
      showMessage(err.message || "Failed to delete review", "error");
    }
  };

  const handleToggleReviewStatus = async (reviewId) => {
    try {
      const response = await put(`/reviews/${reviewId}/toggle-status`);
      if (response.success) {
        setReviews((prev) =>
          prev.map((review) =>
            review._id === reviewId ? response.data.review : review
          )
        );
        showMessage(
          `Review ${
            response.data.review.isActive ? "activated" : "deactivated"
          } successfully!`
        );
      }
    } catch (err) {
      showMessage(err.message || "Failed to toggle review status", "error");
    }
  };

  const handleReorderReviews = async (orderMap) => {
    try {
      const response = await put("/reviews/reorder", { orderMap });
      if (response.success) {
        setReorderingReviews(false);
        fetchReviews(); // Refresh to get updated order
        showMessage("Reviews reordered successfully!");
      }
    } catch (err) {
      showMessage(err.message || "Failed to reorder reviews", "error");
    }
  };

  // Calculate statistics
  const stats = {
    total: reviews.length,
    active: reviews.filter((r) => r.isActive).length,
    inactive: reviews.filter((r) => !r.isActive).length,
    averageRating:
      reviews.length > 0
        ? (
            reviews.reduce((sum, review) => sum + review.rating, 0) /
            reviews.length
          ).toFixed(1)
        : 0,
  };

  if (creatingReview) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReviewForm
            onSave={handleCreateReview}
            onCancel={() => setCreatingReview(false)}
            loading={loading}
            isEdit={false}
          />
        </div>
      </div>
    );
  }

  if (editingReview) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReviewForm
            review={editingReview}
            onSave={handleUpdateReview}
            onCancel={() => setEditingReview(null)}
            loading={loading}
            isEdit={true}
          />
        </div>
      </div>
    );
  }

  if (viewingReview) {
    return (
      <ReviewDetailsModal
        review={viewingReview}
        onClose={() => setViewingReview(null)}
        onEdit={setEditingReview}
      />
    );
  }

  if (reorderingReviews) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReorderReviews
            reviews={reviews}
            onSave={handleReorderReviews}
            onCancel={() => setReorderingReviews(false)}
            loading={loading}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="group flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm border border-gray-200 hover:border-gray-300"
            >
              <FaArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
              <span className="font-medium">Dashboard</span>
            </button>

            <div className="text-right">
              <div className="w-8 h-1 bg-green-500 rounded-full mb-1 ml-auto"></div>
              <p className="text-gray-500 text-sm">Review Manager</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <FaStar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Review Management
                </h1>
                <div className="w-12 h-1 bg-green-500 rounded-full mt-1"></div>
              </div>
            </div>
            <p className="text-gray-600">
              Manage customer reviews, ratings, and their display order.
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
            } shadow-sm`}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Reviews
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <FaStar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Reviews
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.active}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <FaCheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Average Rating
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.averageRating}
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <FaHandSparkles className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inactive</p>
                <p className="text-2xl font-bold text-gray-600">
                  {stats.inactive}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <FaTimesCircle className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
              <div className="flex-1 sm:flex-none">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex-1 sm:flex-none">
                <div className="relative">
                  <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full sm:w-48 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              {reviews.length > 1 && (
                <button
                  onClick={() => setReorderingReviews(true)}
                  className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                >
                  <FaSort className="h-4 w-4" />
                  <span>Reorder Reviews</span>
                </button>
              )}
              <button
                onClick={() => setCreatingReview(true)}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
              >
                <FaPlus className="h-4 w-4" />
                <span>Create New Review</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading reviews...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <FaStar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchTerm ? "No reviews found" : "No reviews yet"}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Get started by creating your first review"}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setCreatingReview(true)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Create Your First Review
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews
              .sort((a, b) => a.order - b.order)
              .map((review) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  onView={setViewingReview}
                  onEdit={setEditingReview}
                  onDelete={handleDeleteReview}
                  onToggleStatus={handleToggleReviewStatus}
                />
              ))}
          </div>
        )}

        {/* Summary */}
        {filteredReviews.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {filteredReviews.length}
                </div>
                <div className="text-sm text-gray-600">Showing Reviews</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {stats.active}
                </div>
                <div className="text-sm text-gray-600">Active Reviews</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {stats.averageRating}
                </div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-600">
                  {stats.inactive}
                </div>
                <div className="text-sm text-gray-600">Inactive Reviews</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewManagement;
