import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaEdit,
  FaSave,
  FaTimes,
  FaPlus,
  FaTrash,
  FaImage,
  FaTag,
  FaDollarSign,
  FaList,
  FaBox,
  FaPaintBrush,
  FaSearch,
  FaLink,
  FaUnlink,
  FaExternalLinkAlt,
} from "react-icons/fa";
import useFetch from "../../hooks/useFetch";
import { FaHandSparkles } from "react-icons/fa6";

// Image Error Handler Component
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
        className={`${className} bg-gray-100 flex items-center justify-center`}
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
      } transition-opacity duration-200`}
      onError={handleImageError}
      onLoad={handleImageLoad}
    />
  );
};

// Create separate form components
const ProductForm = ({
  product,
  onSave,
  onCancel,
  loading,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    originalPrice: product?.originalPrice || "",
    discount: product?.discount || 0,
    sizes: product?.sizes || [],
    images: product?.images || [],
    stock: product?.stock || 100,
    tags: product?.tags || [],
    features: product?.features || [],
    relatedProducts: product?.relatedProducts || [],
  });

  const [newTag, setNewTag] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newFeature, setNewFeature] = useState({
    title: "",
    description: "",
    icon: "",
  });
  const [newRelatedProduct, setNewRelatedProduct] = useState({
    title: "",
    image: "",
    price: "",
    productId: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      discount: Number(formData.discount),
      stock: Number(formData.stock),
      sizes: formData.sizes,
      images: formData.images,
      tags: formData.tags,
      features: formData.features,
      relatedProducts: formData.relatedProducts,
    };
    onSave(processedData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const addSize = () => {
    if (newSize && !formData.sizes.includes(newSize)) {
      setFormData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, newSize],
      }));
      setNewSize("");
    }
  };

  const removeSize = (sizeToRemove) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((size) => size !== sizeToRemove),
    }));
  };

  const addImage = () => {
    if (newImage.trim() && !formData.images.includes(newImage.trim())) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, newImage.trim()],
      }));
      setNewImage("");
    }
  };

  const removeImage = (imageToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((image) => image !== imageToRemove),
    }));
  };

  const addFeature = () => {
    if (newFeature.title.trim() && newFeature.description.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, { ...newFeature }],
      }));
      setNewFeature({ title: "", description: "", icon: "" });
    }
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const updateFeature = (field, value) => {
    setNewFeature((prev) => ({ ...prev, [field]: value }));
  };

  const addRelatedProduct = () => {
    if (
      newRelatedProduct.title.trim() &&
      newRelatedProduct.image.trim() &&
      newRelatedProduct.price
    ) {
      const relatedProduct = {
        ...newRelatedProduct,
        price: Number(newRelatedProduct.price),
      };
      setFormData((prev) => ({
        ...prev,
        relatedProducts: [...prev.relatedProducts, relatedProduct],
      }));
      setNewRelatedProduct({ title: "", image: "", price: "", productId: "" });
    }
  };

  const removeRelatedProduct = (index) => {
    setFormData((prev) => ({
      ...prev,
      relatedProducts: prev.relatedProducts.filter((_, i) => i !== index),
    }));
  };

  const updateRelatedProduct = (field, value) => {
    setNewRelatedProduct((prev) => ({ ...prev, [field]: value }));
  };

  const sizeOptions = ["৪৮", "৫০", "৫২", "৫৪", "৫৬", "৫৮"];

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-blue-50">
            <FaPaintBrush className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {isEdit ? "Edit Main Product" : "Create New Main Product"}
          </h3>
        </div>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <FaTimes className="h-5 w-5" />
        </button>
      </div>

      {/* Important Notice */}
      <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <FaHandSparkles className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-yellow-800">
              Single Main Product System
            </h4>
            <p className="text-sm text-yellow-700 mt-1">
              {isEdit
                ? "You are editing the main product. All changes will be reflected immediately."
                : "Creating a new product will replace the current main product. Only one main product can be active at a time."}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h4 className="text-md font-semibold text-gray-900 border-b pb-2">
            Basic Information
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
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
                Stock Quantity *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price *
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selling Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount (%)
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h4 className="text-md font-semibold text-gray-900 border-b pb-2">
            Product Features
          </h4>

          {formData.features.map((feature, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-medium text-gray-900">{feature.title}</h5>
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTimes className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600">{feature.description}</p>
              {feature.icon && (
                <p className="text-xs text-gray-500 mt-1">
                  Icon: {feature.icon}
                </p>
              )}
            </div>
          ))}

          <div className="space-y-3 p-4 border border-gray-300 border-dashed rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Feature Title
                </label>
                <input
                  type="text"
                  value={newFeature.title}
                  onChange={(e) => updateFeature("title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter feature title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icon (optional)
                </label>
                <input
                  type="text"
                  value={newFeature.icon}
                  onChange={(e) => updateFeature("icon", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Icon name or URL"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Feature Description
              </label>
              <textarea
                value={newFeature.description}
                onChange={(e) => updateFeature("description", e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter feature description"
              />
            </div>
            <button
              type="button"
              onClick={addFeature}
              disabled={
                !newFeature.title.trim() || !newFeature.description.trim()
              }
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 disabled:opacity-50"
            >
              <FaPlus className="h-4 w-4 inline mr-2" />
              Add Feature
            </button>
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-4">
          <h4 className="text-md font-semibold text-gray-900 border-b pb-2">
            Available Sizes
          </h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.sizes.map((size, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
              >
                <span>{size}</span>
                <button
                  type="button"
                  onClick={() => removeSize(size)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaTimes className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <select
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Size</option>
              {sizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addSize}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              <FaPlus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Images */}
        <div className="space-y-4">
          <h4 className="text-md font-semibold text-gray-900 border-b pb-2">
            Product Images
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative group">
                <ImageWithFallback
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border border-gray-200"
                  fallbackIcon={FaImage}
                />
                <button
                  type="button"
                  onClick={() => removeImage(image)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <FaTimes className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
              type="url"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={addImage}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              <FaPlus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Related Products */}
        <div className="space-y-4">
          <h4 className="text-md font-semibold text-gray-900 border-b pb-2">
            Related Products ({formData.relatedProducts.length}/4)
          </h4>

          {formData.relatedProducts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {formData.relatedProducts.map((relatedProduct, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h5 className="font-medium text-gray-900">
                        {relatedProduct.title}
                      </h5>
                      <p className="text-sm text-green-600">
                        ৳{relatedProduct.price}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeRelatedProduct(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTimes className="h-4 w-4" />
                    </button>
                  </div>
                  <ImageWithFallback
                    src={relatedProduct.image}
                    alt={relatedProduct.title}
                    className="w-full h-16 object-cover rounded border border-gray-200 mt-2"
                    fallbackIcon={FaBox}
                  />
                </div>
              ))}
            </div>
          )}

          {formData.relatedProducts.length < 4 && (
            <div className="space-y-3 p-4 border border-gray-300 border-dashed rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    value={newRelatedProduct.title}
                    onChange={(e) =>
                      updateRelatedProduct("title", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter product title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price *
                  </label>
                  <input
                    type="number"
                    value={newRelatedProduct.price}
                    onChange={(e) =>
                      updateRelatedProduct("price", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter price"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  value={newRelatedProduct.image}
                  onChange={(e) =>
                    updateRelatedProduct("image", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product ID (Optional)
                </label>
                <input
                  type="text"
                  value={newRelatedProduct.productId}
                  onChange={(e) =>
                    updateRelatedProduct("productId", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Product ID for linking"
                />
              </div>
              <button
                type="button"
                onClick={addRelatedProduct}
                disabled={
                  !newRelatedProduct.title.trim() ||
                  !newRelatedProduct.image.trim() ||
                  !newRelatedProduct.price
                }
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200 disabled:opacity-50"
              >
                <FaPlus className="h-4 w-4 inline mr-2" />
                Add Related Product
              </button>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="space-y-4">
          <h4 className="text-md font-semibold text-gray-900 border-b pb-2">
            Tags
          </h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-green-600 hover:text-green-800"
                >
                  <FaTimes className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              <FaPlus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex space-x-3 pt-6 border-t">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 font-medium"
          >
            <FaSave className="h-4 w-4" />
            <span>
              {loading
                ? "Saving..."
                : isEdit
                ? "Update Main Product"
                : "Create Main Product"}
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

const ProductManagement = () => {
  const { loading, error, get, post, put, del } = useFetch();
  const [mainProduct, setMainProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [creatingProduct, setCreatingProduct] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    fetchMainProduct();
  }, []);

  const fetchMainProduct = async () => {
    try {
      const response = await get("/products");
      if (response.success) {
        setMainProduct(response.data.product);
      }
    } catch (err) {
      showMessage("Failed to fetch product", "error");
    }
  };

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 4000);
  };

  const handleCreateProduct = async (productData) => {
    try {
      const response = await post("/products", productData);
      if (response.success) {
        setMainProduct(response.data.product);
        setCreatingProduct(false);
        showMessage(response.message || "Product created successfully!");
      }
    } catch (err) {
      showMessage(err.message || "Failed to create product", "error");
    }
  };

  const handleUpdateProduct = async (productData) => {
    try {
      const response = await put(
        `/products/${editingProduct._id}`,
        productData
      );
      if (response.success) {
        setMainProduct(response.data.product);
        setEditingProduct(null);
        showMessage("Product updated successfully!");
      }
    } catch (err) {
      showMessage(err.message || "Failed to update product", "error");
    }
  };

  const handleDeleteProduct = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete the main product? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await del(`/products/${mainProduct._id}`);
      if (response.success) {
        setMainProduct(null);
        showMessage("Product deleted successfully!");
      }
    } catch (err) {
      showMessage(err.message || "Failed to delete product", "error");
    }
  };

  if (creatingProduct) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductForm
            onSave={handleCreateProduct}
            onCancel={() => setCreatingProduct(false)}
            loading={loading}
            isEdit={false}
          />
        </div>
      </div>
    );
  }

  if (editingProduct) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductForm
            product={editingProduct}
            onSave={handleUpdateProduct}
            onCancel={() => setEditingProduct(null)}
            loading={loading}
            isEdit={true}
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
              <p className="text-gray-500 text-sm">Product Manager</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FaBox className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Main Product Management
                </h1>
                <div className="w-12 h-1 bg-blue-500 rounded-full mt-1"></div>
              </div>
            </div>
            <p className="text-gray-600">
              Manage your main product. Only one product can be active at a
              time. Creating a new product will replace the current one.
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

        {/* Main Product Display */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product...</p>
          </div>
        ) : mainProduct ? (
          <div className="space-y-6">
            {/* Product Card */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                      MAIN PRODUCT
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        mainProduct.stock > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {mainProduct.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {mainProduct.name}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {mainProduct.description}
                  </p>
                </div>
                <div className="flex space-x-2 ml-6">
                  <button
                    onClick={() => setEditingProduct(mainProduct)}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    title="Edit Product"
                  >
                    <FaEdit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={handleDeleteProduct}
                    className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                    title="Delete Product"
                  >
                    <FaTrash className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              {/* Product Images Preview */}
              {mainProduct.images && mainProduct.images.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Product Images
                  </h4>
                  <div className="flex space-x-4 overflow-x-auto pb-4">
                    {mainProduct.images.map((image, index) => (
                      <ImageWithFallback
                        key={index}
                        src={image}
                        alt={`${mainProduct.name} ${index + 1}`}
                        className="w-32 h-32 object-cover rounded-lg border border-gray-200 flex-shrink-0 hover:shadow-md transition-shadow duration-200"
                        fallbackIcon={FaImage}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">
                    ৳{mainProduct.price}
                  </div>
                  <div className="text-sm text-gray-600">Current Price</div>
                  {mainProduct.originalPrice > mainProduct.price && (
                    <div className="text-xs text-gray-400 line-through">
                      ৳{mainProduct.originalPrice}
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div
                    className={`text-2xl font-bold ${
                      mainProduct.stock > 10
                        ? "text-green-600"
                        : mainProduct.stock > 0
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {mainProduct.stock}
                  </div>
                  <div className="text-sm text-gray-600">Stock Available</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {mainProduct.features?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Features</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">
                    {mainProduct.relatedProducts?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Related Products</div>
                </div>
              </div>

              {/* Features Preview */}
              {mainProduct.features && mainProduct.features.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Product Features
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {mainProduct.features.map((feature, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-3"
                      >
                        <h5 className="font-medium text-gray-900">
                          {feature.title}
                        </h5>
                        <p className="text-sm text-gray-600 mt-1">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes and Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mainProduct.sizes && mainProduct.sizes.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Available Sizes
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {mainProduct.sizes.map((size, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {mainProduct.tags && mainProduct.tags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {mainProduct.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Related Products Preview */}
              {mainProduct.relatedProducts &&
                mainProduct.relatedProducts.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      Related Products
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mainProduct.relatedProducts.map(
                        (relatedProduct, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                          >
                            <div className="flex items-center space-x-3">
                              <ImageWithFallback
                                src={relatedProduct.image}
                                alt={relatedProduct.title}
                                className="w-12 h-12 object-cover rounded border border-gray-200"
                                fallbackIcon={FaBox}
                              />
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900">
                                  {relatedProduct.title}
                                </h5>
                                <p className="text-sm text-green-600">
                                  ৳{relatedProduct.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <FaBox className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Main Product Found
            </h3>
            <p className="text-gray-600 mb-4">
              Get started by creating your main product. Only one product can be
              active at a time.
            </p>
            <button
              onClick={() => setCreatingProduct(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Create Main Product
            </button>
          </div>
        )}

        {/* Create Button when product exists */}
        {mainProduct && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setCreatingProduct(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
            >
              <FaPlus className="h-4 w-4 inline mr-2" />
              Create New Main Product
            </button>
            <p className="text-sm text-gray-600 mt-2">
              This will replace the current main product
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
