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
  FaQuestionCircle,
  FaListOl,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaGripVertical,
  FaSave,
} from "react-icons/fa";
import useFetch from "../../hooks/useFetch";
import { FaHandSparkles } from "react-icons/fa6";

// FAQ Form Component
const FAQForm = ({ faq, onSave, onCancel, loading, isEdit = false }) => {
  const [formData, setFormData] = useState({
    question: faq?.question || "",
    answer: faq?.answer || "",
    order: faq?.order || 0,
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const faqData = {
      question: formData.question.trim(),
      answer: formData.answer.trim(),
      order: Number(formData.order),
    };

    onSave(faqData);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.question.trim()) {
      errors.question = "Question is required";
    } else if (formData.question.trim().length > 500) {
      errors.question = "Question must be less than 500 characters";
    }

    if (!formData.answer.trim()) {
      errors.answer = "Answer is required";
    } else if (formData.answer.trim().length > 2000) {
      errors.answer = "Answer must be less than 2000 characters";
    }

    if (formData.order < 0 || formData.order > 5) {
      errors.order = "Order must be between 0 and 5";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const orderOptions = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-blue-50">
            <FaQuestionCircle className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {isEdit ? "Edit FAQ" : "Create New FAQ"}
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
        {/* Question */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question *
          </label>
          <textarea
            name="question"
            value={formData.question}
            onChange={handleChange}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
              errors.question ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter the frequently asked question..."
            required
          />
          {errors.question && (
            <p className="mt-1 text-sm text-red-600">{errors.question}</p>
          )}
          <div className="mt-1 text-xs text-gray-500 text-right">
            {formData.question.length}/500 characters
          </div>
        </div>

        {/* Answer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Answer *
          </label>
          <textarea
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            rows={5}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
              errors.answer ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter the detailed answer..."
            required
          />
          {errors.answer && (
            <p className="mt-1 text-sm text-red-600">{errors.answer}</p>
          )}
          <div className="mt-1 text-xs text-gray-500 text-right">
            {formData.answer.length}/2000 characters
          </div>
        </div>

        {/* Order */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Display Order
          </label>
          <select
            name="order"
            value={formData.order}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.order ? "border-red-300" : "border-gray-300"
            }`}
          >
            {orderOptions.map((order) => (
              <option key={order} value={order}>
                Position {order + 1}
              </option>
            ))}
          </select>
          {errors.order && (
            <p className="mt-1 text-sm text-red-600">{errors.order}</p>
          )}
          <div className="mt-1 text-xs text-gray-500">
            Lower numbers appear first (0 = first position)
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
              {loading ? "Saving..." : isEdit ? "Update FAQ" : "Create FAQ"}
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

// FAQ Card Component
const FAQCard = ({ faq, onEdit, onDelete, onView }) => {
  const [showFullAnswer, setShowFullAnswer] = useState(false);

  const toggleAnswer = () => {
    setShowFullAnswer(!showFullAnswer);
  };

  const displayAnswer = showFullAnswer
    ? faq.answer
    : faq.answer.length > 150
    ? `${faq.answer.substring(0, 150)}...`
    : faq.answer;

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              <FaListOl className="h-3 w-3" />
              <span>Position {faq.order + 1}</span>
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {faq.question}
          </h3>
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onView(faq)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            title="View Details"
          >
            <FaEye className="h-4 w-4" />
          </button>
          <button
            onClick={() => onEdit(faq)}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
            title="Edit FAQ"
          >
            <FaEdit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(faq._id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Delete FAQ"
          >
            <FaTrash className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        <p
          className={`${
            !showFullAnswer && faq.answer.length > 150 ? "line-clamp-3" : ""
          }`}
        >
          {displayAnswer}
        </p>
        {faq.answer.length > 150 && (
          <button
            onClick={toggleAnswer}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
          >
            {showFullAnswer ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      <div className="text-xs text-gray-500 space-y-1 border-t pt-3">
        <div className="flex items-center justify-between">
          <span>Created: {new Date(faq.createdAt).toLocaleDateString()}</span>
          <span>By: {faq.createdBy?.name || "Admin"}</span>
        </div>
        {faq.updatedAt !== faq.createdAt && (
          <div className="flex items-center justify-between">
            <span>Updated: {new Date(faq.updatedAt).toLocaleDateString()}</span>
            <span>By: {faq.updatedBy?.name || "Admin"}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// FAQ Details Modal
const FAQDetailsModal = ({ faq, onClose, onEdit }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <FaEye className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  FAQ Details
                </h3>
                <p className="text-sm text-gray-600">
                  Position {faq.order + 1}
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
            {/* Question */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Question</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">{faq.question}</p>
              </div>
            </div>

            {/* Answer */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Answer</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {faq.answer}
                </p>
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2">Created</h5>
                <p className="text-gray-600">
                  {new Date(faq.createdAt).toLocaleDateString()} at{" "}
                  {new Date(faq.createdAt).toLocaleTimeString()}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  By: {faq.createdBy?.name || "Admin"}
                </p>
              </div>

              {faq.updatedAt !== faq.createdAt && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">
                    Last Updated
                  </h5>
                  <p className="text-gray-600">
                    {new Date(faq.updatedAt).toLocaleDateString()} at{" "}
                    {new Date(faq.updatedAt).toLocaleTimeString()}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    By: {faq.updatedBy?.name || "Admin"}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-6 border-t">
              <button
                onClick={() => onEdit(faq)}
                className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium"
              >
                <FaEdit className="h-4 w-4" />
                <span>Edit FAQ</span>
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

// Reorder FAQs Component
const ReorderFAQs = ({ faqs, onSave, onCancel, loading }) => {
  const [reorderedFAQs, setReorderedFAQs] = useState([...faqs]);

  const moveFAQ = (fromIndex, toIndex) => {
    const updatedFAQs = [...reorderedFAQs];
    const [movedFAQ] = updatedFAQs.splice(fromIndex, 1);
    updatedFAQs.splice(toIndex, 0, movedFAQ);

    // Update orders based on new positions
    const withUpdatedOrders = updatedFAQs.map((faq, index) => ({
      ...faq,
      order: index,
    }));

    setReorderedFAQs(withUpdatedOrders);
  };

  const handleSave = async () => {
    const orderMap = {};
    reorderedFAQs.forEach((faq, index) => {
      orderMap[faq._id] = index;
    });

    await onSave(orderMap);
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-purple-50">
            <FaSort className="h-5 w-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Reorder FAQs</h3>
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
          Drag and drop FAQs to reorder them. The order determines how they
          appear on the website.
        </p>

        <div className="space-y-3">
          {reorderedFAQs.map((faq, index) => (
            <div
              key={faq._id}
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex-shrink-0 cursor-move">
                <FaGripVertical className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 line-clamp-1">
                  {faq.question}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-1">
                  {faq.answer.substring(0, 100)}...
                </p>
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

// Main FAQ Management Component
const FaqManagement = () => {
  const { loading, error, get, post, put, del } = useFetch();
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [creatingFAQ, setCreatingFAQ] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [viewingFAQ, setViewingFAQ] = useState(null);
  const [reorderingFAQs, setReorderingFAQs] = useState(false);
  const [limitInfo, setLimitInfo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    fetchFAQs();
    fetchLimitInfo();
  }, []);

  useEffect(() => {
    filterFAQs();
  }, [faqs, searchTerm]);

  const fetchFAQs = async () => {
    try {
      const response = await get("/faqs");
      if (response.success) {
        setFaqs(response.data.faqs);
      }
    } catch (err) {
      showMessage("Failed to fetch FAQs", "error");
    }
  };

  const fetchLimitInfo = async () => {
    try {
      const response = await get("/faqs/limit/info"); // Fixed endpoint
      if (response.success) {
        setLimitInfo(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch limit info:", err);
    }
  };

  const filterFAQs = () => {
    let filtered = faqs;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(term) ||
          faq.answer.toLowerCase().includes(term)
      );
    }

    setFilteredFaqs(filtered);
  };

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 4000);
  };

  const handleCreateFAQ = async (faqData) => {
    try {
      const response = await post("/faqs", faqData);
      if (response.success) {
        setFaqs((prev) => [response.data.faq, ...prev]);
        setCreatingFAQ(false);
        fetchLimitInfo();
        showMessage("FAQ created successfully!");
      }
    } catch (err) {
      showMessage(err.message || "Failed to create FAQ", "error");
    }
  };

  const handleUpdateFAQ = async (faqData) => {
    try {
      const response = await put(`/faqs/${editingFAQ._id}`, faqData);
      if (response.success) {
        setFaqs((prev) =>
          prev.map((faq) =>
            faq._id === editingFAQ._id ? response.data.faq : faq
          )
        );
        setEditingFAQ(null);
        showMessage("FAQ updated successfully!");
      }
    } catch (err) {
      showMessage(err.message || "Failed to update FAQ", "error");
    }
  };

  const handleDeleteFAQ = async (faqId) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) {
      return;
    }

    try {
      const response = await del(`/faqs/${faqId}`);
      if (response.success) {
        setFaqs((prev) => prev.filter((faq) => faq._id !== faqId));
        fetchLimitInfo();
        showMessage("FAQ deleted successfully!");
      }
    } catch (err) {
      showMessage(err.message || "Failed to delete FAQ", "error");
    }
  };

  const handleReorderFAQs = async (orderMap) => {
    try {
      const response = await put("/faqs/reorder", { orderMap });
      if (response.success) {
        setReorderingFAQs(false);
        fetchFAQs(); // Refresh to get updated order
        showMessage("FAQs reordered successfully!");
      }
    } catch (err) {
      showMessage(err.message || "Failed to reorder FAQs", "error");
    }
  };

  if (creatingFAQ) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQForm
            onSave={handleCreateFAQ}
            onCancel={() => setCreatingFAQ(false)}
            loading={loading}
            isEdit={false}
          />
        </div>
      </div>
    );
  }

  if (editingFAQ) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQForm
            faq={editingFAQ}
            onSave={handleUpdateFAQ}
            onCancel={() => setEditingFAQ(null)}
            loading={loading}
            isEdit={true}
          />
        </div>
      </div>
    );
  }

  if (viewingFAQ) {
    return (
      <FAQDetailsModal
        faq={viewingFAQ}
        onClose={() => setViewingFAQ(null)}
        onEdit={setEditingFAQ}
      />
    );
  }

  if (reorderingFAQs) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReorderFAQs
            faqs={faqs}
            onSave={handleReorderFAQs}
            onCancel={() => setReorderingFAQs(false)}
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
              <div className="w-8 h-1 bg-blue-500 rounded-full mb-1 ml-auto"></div>
              <p className="text-gray-500 text-sm">FAQ Manager</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FaQuestionCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  FAQ Management
                </h1>
                <div className="w-12 h-1 bg-blue-500 rounded-full mt-1"></div>
              </div>
            </div>
            <p className="text-gray-600">
              Manage frequently asked questions, their order, and content.
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
        {limitInfo && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total FAQs
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {limitInfo.currentCount}
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FaQuestionCircle className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Max Limit</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {limitInfo.maxLimit}
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <FaExclamationTriangle className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Remaining</p>
                  <p className="text-2xl font-bold text-green-600">
                    {limitInfo.remainingSlots}
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
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {limitInfo.canAddMore ? "Available" : "Full"}
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <FaHandSparkles className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
              <div className="flex-1 sm:flex-none">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              {faqs.length > 1 && (
                <button
                  onClick={() => setReorderingFAQs(true)}
                  className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                >
                  <FaSort className="h-4 w-4" />
                  <span>Reorder FAQs</span>
                </button>
              )}
              <button
                onClick={() => setCreatingFAQ(true)}
                disabled={limitInfo && !limitInfo.canAddMore}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPlus className="h-4 w-4" />
                <span>Create New FAQ</span>
              </button>
            </div>
          </div>
        </div>

        {/* Limit Warning */}
        {limitInfo && !limitInfo.canAddMore && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <FaExclamationTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-800">
                  Maximum Limit Reached
                </h4>
                <p className="text-yellow-700 text-sm">
                  You have reached the maximum limit of {limitInfo.maxLimit}{" "}
                  FAQs. Please delete existing FAQs to create new ones.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* FAQs Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading FAQs...</p>
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <FaQuestionCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchTerm ? "No FAQs found" : "No FAQs yet"}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Get started by creating your first FAQ"}
            </p>
            {!searchTerm && limitInfo?.canAddMore && (
              <button
                onClick={() => setCreatingFAQ(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Create Your First FAQ
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFaqs
              .sort((a, b) => a.order - b.order)
              .map((faq) => (
                <FAQCard
                  key={faq._id}
                  faq={faq}
                  onView={setViewingFAQ}
                  onEdit={setEditingFAQ}
                  onDelete={handleDeleteFAQ}
                />
              ))}
          </div>
        )}

        {/* Summary */}
        {filteredFaqs.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {filteredFaqs.length}
                </div>
                <div className="text-sm text-gray-600">Showing FAQs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {limitInfo?.remainingSlots || 0}
                </div>
                <div className="text-sm text-gray-600">Remaining Slots</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {limitInfo?.maxLimit || 6}
                </div>
                <div className="text-sm text-gray-600">Maximum Limit</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqManagement;
