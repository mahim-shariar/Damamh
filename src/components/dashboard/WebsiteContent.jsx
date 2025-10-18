import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaEdit,
  FaSave,
  FaTimes,
  FaImage,
  FaEnvelope,
  FaPhone,
  FaPlayCircle,
  FaInfoCircle,
  FaPaintBrush,
} from "react-icons/fa";
import useFetch from "../../hooks/useFetch";
import { FaHandSparkles } from "react-icons/fa6";

// Create separate form components to prevent re-renders
const HeroSectionForm = ({ content, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    heroTitle: content?.heroTitle || "",
    heroSubtitle: content?.heroSubtitle || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-blue-50">
            <FaPaintBrush className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Edit Hero Section
          </h3>
        </div>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <FaTimes className="h-5 w-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hero Title
          </label>
          <input
            type="text"
            name="heroTitle"
            value={formData.heroTitle}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            maxLength={200}
            placeholder="Enter your hero title..."
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500">Main headline</span>
            <span className="text-xs text-gray-500">
              {formData.heroTitle.length}/200
            </span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hero Subtitle
          </label>
          <textarea
            name="heroSubtitle"
            value={formData.heroSubtitle}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            maxLength={500}
            placeholder="Enter your hero subtitle..."
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500">
              Supporting description
            </span>
            <span className="text-xs text-gray-500">
              {formData.heroSubtitle.length}/500
            </span>
          </div>
        </div>
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 font-medium"
          >
            <FaSave className="h-4 w-4" />
            <span>{loading ? "Saving..." : "Save Changes"}</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const ContactSectionForm = ({ content, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    email: content?.email || "",
    phoneNumber: content?.phoneNumber || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-green-50">
            <FaPaintBrush className="h-5 w-5 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Edit Contact Information
          </h3>
        </div>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <FaTimes className="h-5 w-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            placeholder="contact@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            maxLength={20}
            placeholder="+1 (555) 123-4567"
          />
          <div className="text-xs text-gray-500 mt-1">
            {formData.phoneNumber.length}/20 characters
          </div>
        </div>
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 font-medium"
          >
            <FaSave className="h-4 w-4" />
            <span>{loading ? "Saving..." : "Save Changes"}</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const YouTubeSectionForm = ({ content, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    youtubeVideoUrl: content?.youtubeVideoUrl || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-red-50">
            <FaPaintBrush className="h-5 w-5 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Edit YouTube Video
          </h3>
        </div>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <FaTimes className="h-5 w-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            YouTube Video URL
          </label>
          <input
            type="url"
            name="youtubeVideoUrl"
            value={formData.youtubeVideoUrl}
            onChange={handleChange}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter the full YouTube URL
          </p>
        </div>
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 font-medium"
          >
            <FaSave className="h-4 w-4" />
            <span>{loading ? "Saving..." : "Save Changes"}</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const AboutSectionForm = ({ content, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    aboutText: content?.aboutText || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-amber-50">
            <FaPaintBrush className="h-5 w-5 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Edit About Text
          </h3>
        </div>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <FaTimes className="h-5 w-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            About Text
          </label>
          <textarea
            name="aboutText"
            value={formData.aboutText}
            onChange={handleChange}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 resize-none"
            maxLength={2000}
            placeholder="Tell your story..."
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500">Share your story</span>
            <span className="text-xs text-gray-500">
              {formData.aboutText.length}/2000
            </span>
          </div>
        </div>
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 font-medium"
          >
            <FaSave className="h-4 w-4" />
            <span>{loading ? "Saving..." : "Save Changes"}</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const WebsiteContent = () => {
  const { loading, error, get, put, patch, post } = useFetch();
  const [websiteContent, setWebsiteContent] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [bulkFormData, setBulkFormData] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isInitializing, setIsInitializing] = useState(false);
  const [sectionLoading, setSectionLoading] = useState(false);

  useEffect(() => {
    fetchWebsiteContent();
  }, []);

  const fetchWebsiteContent = async () => {
    try {
      const response = await get("/website-content");
      if (response.success) {
        setWebsiteContent(response.data.content);
      }
    } catch (err) {
      showMessage("Failed to fetch website content", "error");
    }
  };

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 4000);
  };

  const handleEdit = (section) => {
    setEditingSection(section);
    if (section === "full") {
      setBulkFormData(websiteContent ? { ...websiteContent } : {});
    }
  };

  const handleCancelEdit = () => {
    setEditingSection(null);
    setBulkFormData({});
  };

  const handleSectionUpdate = async (section, data) => {
    setSectionLoading(true);
    try {
      const response = await patch("/website-content", data);
      if (response.success) {
        setWebsiteContent(response.data.content);
        setEditingSection(null);
        showMessage(`${getSectionName(section)} updated successfully!`);
      }
    } catch (err) {
      showMessage(err.message || `Failed to update ${section}`, "error");
    } finally {
      setSectionLoading(false);
    }
  };

  const handleFullUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await put("/website-content", bulkFormData);
      if (response.success) {
        setWebsiteContent(response.data.content);
        setEditingSection(null);
        setBulkFormData({});
        showMessage("Website content updated successfully! 🎉");
      }
    } catch (err) {
      showMessage(err.message || "Failed to update website content", "error");
    }
  };

  const handleInitializeContent = async () => {
    setIsInitializing(true);
    try {
      const response = await post("/website-content/init", {});
      if (response.success) {
        setWebsiteContent(response.data.content);
        showMessage("Website content initialized successfully!");
      }
    } catch (err) {
      showMessage(
        err.message || "Failed to initialize website content",
        "error"
      );
    } finally {
      setIsInitializing(false);
    }
  };

  const getSectionName = (section) => {
    const names = {
      hero: "Hero Section",
      contact: "Contact Information",
      youtube: "YouTube Video",
      about: "About Text",
    };
    return names[section] || section;
  };

  const SectionCard = ({
    title,
    section,
    icon: Icon,
    children,
    color = "blue",
  }) => {
    const colorClasses = {
      blue: "border-blue-200 hover:border-blue-300",
      green: "border-green-200 hover:border-green-300",
      red: "border-red-200 hover:border-red-300",
      amber: "border-amber-200 hover:border-amber-300",
    };

    const iconColors = {
      blue: "text-blue-600",
      green: "text-green-600",
      red: "text-red-600",
      amber: "text-amber-600",
    };

    const buttonColors = {
      blue: "bg-blue-500 hover:bg-blue-600",
      green: "bg-green-500 hover:bg-green-600",
      red: "bg-red-500 hover:bg-red-600",
      amber: "bg-amber-500 hover:bg-amber-600",
    };

    return (
      <div
        className={`bg-white rounded-xl border-2 ${colorClasses[color]} p-6 transition-all duration-300 hover:shadow-lg`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-${color}-50`}>
              <Icon className={`h-6 w-6 ${iconColors[color]}`} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              <div
                className={`w-8 h-1 bg-${color}-500 rounded-full mt-1`}
              ></div>
            </div>
          </div>
          <button
            onClick={() => handleEdit(section)}
            className={`flex items-center space-x-2 ${buttonColors[color]} text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md`}
          >
            <FaEdit className="h-4 w-4" />
            <span className="text-sm font-medium">Edit</span>
          </button>
        </div>
        {children}
      </div>
    );
  };

  if (loading && !websiteContent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your content...</p>
        </div>
      </div>
    );
  }

  if (!websiteContent && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaHandSparkles className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Begin?
            </h2>
            <p className="text-gray-600 mb-6">
              Initialize your website with beautiful, engaging content to get
              started.
            </p>
            <button
              onClick={handleInitializeContent}
              disabled={isInitializing}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 font-semibold"
            >
              {isInitializing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Initializing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <FaHandSparkles className="h-4 w-4" />
                  <span>Initialize Content</span>
                </div>
              )}
            </button>
          </div>
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
              <p className="text-gray-500 text-sm">Content Manager</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FaPaintBrush className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Content Manager
                </h1>
                <div className="w-12 h-1 bg-blue-500 rounded-full mt-1"></div>
              </div>
            </div>
            <p className="text-gray-600">
              Manage your website content with ease. Edit sections individually
              or all at once.
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Hero Section */}
          <SectionCard
            title="Hero Section"
            section="hero"
            icon={FaImage}
            color="blue"
          >
            {editingSection === "hero" ? (
              <HeroSectionForm
                content={websiteContent}
                onSave={(data) => handleSectionUpdate("hero", data)}
                onCancel={handleCancelEdit}
                loading={sectionLoading}
              />
            ) : (
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Title
                  </h3>
                  <p className="text-gray-900 font-medium">
                    {websiteContent.heroTitle}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Subtitle
                  </h3>
                  <p className="text-gray-700">{websiteContent.heroSubtitle}</p>
                </div>
              </div>
            )}
          </SectionCard>

          {/* Contact Information */}
          <SectionCard
            title="Contact Information"
            section="contact"
            icon={FaEnvelope}
            color="green"
          >
            {editingSection === "contact" ? (
              <ContactSectionForm
                content={websiteContent}
                onSave={(data) => handleSectionUpdate("contact", data)}
                onCancel={handleCancelEdit}
                loading={sectionLoading}
              />
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FaEnvelope className="h-4 w-4 text-gray-400" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="text-gray-900 font-medium">
                      {websiteContent.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FaPhone className="h-4 w-4 text-gray-400" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                    <p className="text-gray-900 font-medium">
                      {websiteContent.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </SectionCard>

          {/* YouTube Video */}
          <SectionCard
            title="YouTube Video"
            section="youtube"
            icon={FaPlayCircle}
            color="red"
          >
            {editingSection === "youtube" ? (
              <YouTubeSectionForm
                content={websiteContent}
                onSave={(data) => handleSectionUpdate("youtube", data)}
                onCancel={handleCancelEdit}
                loading={sectionLoading}
              />
            ) : (
              <div>
                {websiteContent.youtubeVideoUrl ? (
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-900 text-sm break-all font-medium">
                        {websiteContent.youtubeVideoUrl}
                      </p>
                    </div>
                    <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg flex items-center justify-center p-6">
                      <FaPlayCircle className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <FaPlayCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium mb-1">
                      No video added
                    </p>
                    <p className="text-gray-400 text-sm">
                      Add a YouTube video URL
                    </p>
                  </div>
                )}
              </div>
            )}
          </SectionCard>

          {/* About Text */}
          <SectionCard
            title="About Text"
            section="about"
            icon={FaInfoCircle}
            color="amber"
          >
            {editingSection === "about" ? (
              <AboutSectionForm
                content={websiteContent}
                onSave={(data) => handleSectionUpdate("about", data)}
                onCancel={handleCancelEdit}
                loading={sectionLoading}
              />
            ) : (
              <div>
                {websiteContent.aboutText ? (
                  <div className="p-3 bg-gray-50 rounded-lg max-h-48 overflow-y-auto">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
                      {websiteContent.aboutText}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <FaInfoCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium mb-1">
                      No about text
                    </p>
                    <p className="text-gray-400 text-sm">Add your story here</p>
                  </div>
                )}
              </div>
            )}
          </SectionCard>
        </div>

        {/* Bulk Edit Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Bulk Editor
          </h3>
          <p className="text-gray-600 mb-4">
            Edit all sections together in one comprehensive view.
          </p>
          <button
            onClick={() => handleEdit("full")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
          >
            <div className="flex items-center space-x-2">
              <FaPaintBrush className="h-4 w-4" />
              <span>Open Bulk Editor</span>
            </div>
          </button>
        </div>

        {/* Full Content Edit Modal */}
        {editingSection === "full" && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <FaPaintBrush className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Bulk Editor
                      </h2>
                      <p className="text-gray-600 text-sm">Edit all content</p>
                    </div>
                  </div>
                  <button
                    onClick={handleCancelEdit}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleFullUpdate} className="space-y-6">
                  {/* Hero Section */}
                  <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <FaImage className="h-5 w-5 text-blue-600" />
                      <span>Hero Section</span>
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hero Title
                        </label>
                        <input
                          type="text"
                          name="heroTitle"
                          value={bulkFormData.heroTitle || ""}
                          onChange={(e) =>
                            setBulkFormData((prev) => ({
                              ...prev,
                              heroTitle: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          maxLength={200}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hero Subtitle
                        </label>
                        <textarea
                          name="heroSubtitle"
                          value={bulkFormData.heroSubtitle || ""}
                          onChange={(e) =>
                            setBulkFormData((prev) => ({
                              ...prev,
                              heroSubtitle: e.target.value,
                            }))
                          }
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          maxLength={500}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4 p-4 bg-green-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <FaEnvelope className="h-5 w-5 text-green-600" />
                      <span>Contact Information</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={bulkFormData.email || ""}
                          onChange={(e) =>
                            setBulkFormData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          name="phoneNumber"
                          value={bulkFormData.phoneNumber || ""}
                          onChange={(e) =>
                            setBulkFormData((prev) => ({
                              ...prev,
                              phoneNumber: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          maxLength={20}
                        />
                      </div>
                    </div>
                  </div>

                  {/* YouTube Video */}
                  <div className="space-y-4 p-4 bg-red-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <FaPlayCircle className="h-5 w-5 text-red-600" />
                      <span>YouTube Video</span>
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        YouTube Video URL
                      </label>
                      <input
                        type="url"
                        name="youtubeVideoUrl"
                        value={bulkFormData.youtubeVideoUrl || ""}
                        onChange={(e) =>
                          setBulkFormData((prev) => ({
                            ...prev,
                            youtubeVideoUrl: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* About Text */}
                  <div className="space-y-4 p-4 bg-orange-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <FaInfoCircle className="h-5 w-5 text-orange-600" />
                      <span>About Text</span>
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        About Text
                      </label>
                      <textarea
                        name="aboutText"
                        value={bulkFormData.aboutText || ""}
                        onChange={(e) =>
                          setBulkFormData((prev) => ({
                            ...prev,
                            aboutText: e.target.value,
                          }))
                        }
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                        maxLength={2000}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 font-semibold"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Saving All Changes...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <FaSave className="h-4 w-4" />
                          <span>Save All Changes</span>
                        </div>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsiteContent;
