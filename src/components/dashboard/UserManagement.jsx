import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaUser,
  FaUserShield,
  FaUserCheck,
  FaUserTimes,
  FaEnvelope,
  FaCalendar,
  FaKey,
  FaLock,
  FaQuestionCircle,
  FaSignOutAlt,
  FaTimesCircle,
  FaCheckCircle,
  FaEye,
  FaBan,
} from "react-icons/fa";
import useFetch from "../../hooks/useFetch";

// Admin Form Component (Super Admin Only)
const AdminForm = ({
  admin,
  onSave,
  onCancel,
  loading,
  isEdit = false,
  currentUser,
}) => {
  const [formData, setFormData] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
    password: "",
    role: admin?.role || "admin",
    securityQuestion: admin?.securityQuestion || "",
    securityAnswer: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const adminData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role,
      securityQuestion: formData.securityQuestion.trim(),
    };

    // Only include password if provided (for edit) or required (for create)
    if (formData.password) {
      adminData.password = formData.password;
    }

    // Only include security answer if provided
    if (formData.securityAnswer) {
      adminData.securityAnswer = formData.securityAnswer;
    }

    onSave(adminData);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!isEdit && !formData.password) {
      errors.password = "Password is required for new admin";
    } else if (formData.password && formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!formData.securityQuestion.trim()) {
      errors.securityQuestion = "Security question is required";
    }

    if (!formData.securityAnswer && !isEdit) {
      errors.securityAnswer = "Security answer is required for new admin";
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

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-blue-50">
            <FaUserShield className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {isEdit ? "Edit Admin" : "Create New Admin"}
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
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.name ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter full name"
            required
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.email ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter email address"
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password {isEdit ? "(Leave blank to keep current)" : "*"}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.password ? "border-red-300" : "border-gray-300"
            }`}
            placeholder={isEdit ? "Enter new password" : "Enter password"}
            minLength="6"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
          {isEdit && (
            <div className="mt-1 text-xs text-gray-500">
              Leave blank to keep current password
            </div>
          )}
        </div>

        {/* Role - Only for Super Admin */}
        {currentUser?.role === "super-admin" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role *
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="admin">Admin</option>
              <option value="super-admin">Super Admin</option>
            </select>
            {formData.role === "super-admin" && (
              <div className="mt-1 text-xs text-yellow-600">
                Note: Only one super-admin can exist in the system
              </div>
            )}
          </div>
        )}

        {/* Security Question */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Security Question *
          </label>
          <input
            type="text"
            name="securityQuestion"
            value={formData.securityQuestion}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.securityQuestion ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter security question for password recovery"
            required
          />
          {errors.securityQuestion && (
            <p className="mt-1 text-sm text-red-600">
              {errors.securityQuestion}
            </p>
          )}
        </div>

        {/* Security Answer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Security Answer {isEdit ? "(Leave blank to keep current)" : "*"}
          </label>
          <input
            type="text"
            name="securityAnswer"
            value={formData.securityAnswer}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.securityAnswer ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter security answer"
          />
          {errors.securityAnswer && (
            <p className="mt-1 text-sm text-red-600">{errors.securityAnswer}</p>
          )}
          {isEdit && (
            <div className="mt-1 text-xs text-gray-500">
              Leave blank to keep current security answer
            </div>
          )}
        </div>

        <div className="flex space-x-3 pt-6 border-t">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 font-medium"
          >
            <FaPlus className="h-4 w-4" />
            <span>
              {loading ? "Saving..." : isEdit ? "Update Admin" : "Create Admin"}
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

// Admin Card Component
const AdminCard = ({
  admin,
  onEdit,
  onDelete,
  onToggleStatus,
  onView,
  currentUser,
}) => {
  const isSuperAdmin = currentUser?.role === "super-admin";
  const isCurrentUser = currentUser?.id === admin.id;

  // Permissions
  const canEdit = isSuperAdmin || isCurrentUser;
  const canDelete =
    isSuperAdmin && !isCurrentUser && admin.role !== "super-admin";
  const canToggleStatus =
    isSuperAdmin && !isCurrentUser && admin.role !== "super-admin";
  const canView = isSuperAdmin;

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span
              className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                admin.role === "super-admin"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              <FaUserShield className="h-3 w-3" />
              <span className="capitalize">{admin.role}</span>
            </span>
            <span
              className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                admin.isActive
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {admin.isActive ? (
                <FaUserCheck className="h-3 w-3" />
              ) : (
                <FaUserTimes className="h-3 w-3" />
              )}
              <span>{admin.isActive ? "Active" : "Inactive"}</span>
            </span>
            {isCurrentUser && (
              <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                <FaUser className="h-3 w-3" />
                <span>You</span>
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{admin.name}</h3>
          <p className="text-gray-600 text-sm mt-1 flex items-center">
            <FaEnvelope className="h-3 w-3 mr-1" />
            {admin.email}
          </p>
        </div>
        <div className="flex space-x-2 ml-4">
          {canView && (
            <button
              onClick={() => onView(admin)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              title="View Details"
            >
              <FaEye className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => onEdit(admin)}
            disabled={!canEdit}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title={canEdit ? "Edit Admin" : "Cannot edit this admin"}
          >
            <FaEdit className="h-4 w-4" />
          </button>
          {canToggleStatus && (
            <button
              onClick={() => onToggleStatus(admin.id, !admin.isActive)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                admin.isActive
                  ? "text-yellow-600 hover:bg-yellow-50"
                  : "text-green-600 hover:bg-green-50"
              }`}
              title={admin.isActive ? "Deactivate Admin" : "Activate Admin"}
            >
              {admin.isActive ? (
                <FaBan className="h-4 w-4" />
              ) : (
                <FaUserCheck className="h-4 w-4" />
              )}
            </button>
          )}
          {canDelete && (
            <button
              onClick={() => onDelete(admin.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              title="Delete Admin"
            >
              <FaTrash className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="text-xs text-gray-500 space-y-1 border-t pt-3">
        <div className="flex items-center justify-between">
          <span>Created: {new Date(admin.createdAt).toLocaleDateString()}</span>
          <span className="flex items-center">
            <FaUser className="h-3 w-3 mr-1" />
            {admin.activeSessions || 0} active sessions
          </span>
        </div>
        {admin.lastLogin && (
          <div className="flex items-center justify-between">
            <span>
              Last Login: {new Date(admin.lastLogin).toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <FaCalendar className="h-3 w-3 mr-1" />
              {new Date(admin.lastLogin).toLocaleTimeString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// Change Password Component (For All Admins)
const ChangePassword = ({ onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const passwordData = {
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    };

    onSave(passwordData);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.currentPassword) {
      errors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      errors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
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

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-blue-50">
            <FaLock className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Change Password
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
        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Password *
          </label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.currentPassword ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter current password"
            required
          />
          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.currentPassword}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password *
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.newPassword ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter new password"
            required
            minLength="6"
          />
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password *
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.confirmPassword ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Confirm new password"
            required
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="flex space-x-3 pt-6 border-t">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 font-medium"
          >
            <FaKey className="h-4 w-4" />
            <span>{loading ? "Changing..." : "Change Password"}</span>
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

// Profile Component (For All Admins)
const Profile = ({ admin, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
    securityQuestion: admin?.securityQuestion || "",
    securityAnswer: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const profileData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      securityQuestion: formData.securityQuestion.trim(),
    };

    // Only include security answer if provided
    if (formData.securityAnswer) {
      profileData.securityAnswer = formData.securityAnswer;
    }

    onSave(profileData);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.securityQuestion.trim()) {
      errors.securityQuestion = "Security question is required";
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

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-blue-50">
            <FaUser className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Edit Profile</h3>
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
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.name ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter full name"
            required
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.email ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter email address"
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Security Question */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Security Question *
          </label>
          <input
            type="text"
            name="securityQuestion"
            value={formData.securityQuestion}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.securityQuestion ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter security question"
            required
          />
          {errors.securityQuestion && (
            <p className="mt-1 text-sm text-red-600">
              {errors.securityQuestion}
            </p>
          )}
        </div>

        {/* Security Answer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Security Answer (Leave blank to keep current)
          </label>
          <input
            type="text"
            name="securityAnswer"
            value={formData.securityAnswer}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter new security answer"
          />
          <div className="mt-1 text-xs text-gray-500">
            Leave blank to keep current security answer
          </div>
        </div>

        <div className="flex space-x-3 pt-6 border-t">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 font-medium"
          >
            <FaCheckCircle className="h-4 w-4" />
            <span>{loading ? "Saving..." : "Update Profile"}</span>
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

// Main User Management Component
const UserManagement = () => {
  const { loading, error, get, post, put, del } = useFetch();
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [creatingAdmin, setCreatingAdmin] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [changingPassword, setChangingPassword] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    fetchAdmins();
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    filterAdmins();
  }, [admins, searchTerm, roleFilter, statusFilter]);

  const fetchAdmins = async () => {
    try {
      // For Super Admin: Fetch all admins
      // For Regular Admin: Only show their own profile
      const response = await get("/auth/me");
      if (response.success) {
        const user = response.data.admin;
        setCurrentUser(user);

        if (user.role === "super-admin") {
          // Super Admin can see all admins
          const adminsResponse = await get("/admins");
          if (adminsResponse.success) {
            setAdmins(adminsResponse.data.admins);
          }
        } else {
          // Regular Admin can only see themselves
          setAdmins([user]);
        }
      }
    } catch (err) {
      showMessage("Failed to fetch admins", "error");
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await get("/auth/me");
      if (response.success) {
        setCurrentUser(response.data.admin);
      }
    } catch (err) {
      console.error("Failed to fetch current user:", err);
    }
  };

  const filterAdmins = () => {
    let filtered = admins;

    // Apply role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter((admin) => admin.role === roleFilter);
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((admin) =>
        statusFilter === "active" ? admin.isActive : !admin.isActive
      );
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (admin) =>
          admin.name.toLowerCase().includes(term) ||
          admin.email.toLowerCase().includes(term)
      );
    }

    setFilteredAdmins(filtered);
  };

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 4000);
  };

  const handleCreateAdmin = async (adminData) => {
    try {
      const response = await post("/admins", adminData);
      if (response.success) {
        setAdmins((prev) => [response.data.admin, ...prev]);
        setCreatingAdmin(false);
        showMessage("Admin created successfully!");
      }
    } catch (err) {
      showMessage(err.message || "Failed to create admin", "error");
    }
  };

  const handleUpdateAdmin = async (adminData) => {
    try {
      let response;
      if (
        currentUser.role === "super-admin" &&
        editingAdmin.id !== currentUser.id
      ) {
        // Super Admin updating another admin
        response = await put(`/admins/${editingAdmin.id}`, adminData);
      } else {
        // Admin updating their own profile
        response = await put("/auth/profile", adminData);
      }

      if (response.success) {
        setAdmins((prev) =>
          prev.map((admin) =>
            admin.id === editingAdmin.id ? response.data.admin : admin
          )
        );
        setEditingAdmin(null);
        fetchCurrentUser(); // Refresh current user data
        showMessage("Admin updated successfully!");
      }
    } catch (err) {
      showMessage(err.message || "Failed to update admin", "error");
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this admin? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await del(`/admins/${adminId}`);
      if (response.success) {
        setAdmins((prev) => prev.filter((admin) => admin.id !== adminId));
        showMessage("Admin deleted successfully!");
      }
    } catch (err) {
      showMessage(err.message || "Failed to delete admin", "error");
    }
  };

  const handleToggleStatus = async (adminId, newStatus) => {
    try {
      const response = await put(`/admins/${adminId}/status`, {
        isActive: newStatus,
      });
      if (response.success) {
        setAdmins((prev) =>
          prev.map((admin) =>
            admin.id === adminId ? { ...admin, isActive: newStatus } : admin
          )
        );
        showMessage(
          `Admin ${newStatus ? "activated" : "deactivated"} successfully!`
        );
      }
    } catch (err) {
      showMessage(err.message || "Failed to update admin status", "error");
    }
  };

  const handleChangePassword = async (passwordData) => {
    try {
      const response = await put("/auth/change-password", passwordData);
      if (response.success) {
        setChangingPassword(false);
        showMessage("Password changed successfully!");
      }
    } catch (err) {
      showMessage(err.message || "Failed to change password", "error");
    }
  };

  const handleUpdateProfile = async (profileData) => {
    try {
      const response = await put("/auth/profile", profileData);
      if (response.success) {
        setEditingProfile(false);
        fetchCurrentUser();
        fetchAdmins(); // Refresh admins list
        showMessage("Profile updated successfully!");
      }
    } catch (err) {
      showMessage(err.message || "Failed to update profile", "error");
    }
  };

  const handleLogoutAll = async () => {
    if (!window.confirm("Are you sure you want to logout from all devices?")) {
      return;
    }

    try {
      const response = await post("/auth/logout-all");
      if (response.success) {
        showMessage("Logged out from all devices successfully!");
      }
    } catch (err) {
      showMessage(err.message || "Failed to logout from all devices", "error");
    }
  };

  const handleViewAdmin = (admin) => {
    // For future implementation - view admin details
    console.log("View admin:", admin);
  };

  const roleOptions = [
    { value: "all", label: "All Roles" },
    { value: "super-admin", label: "Super Admin" },
    { value: "admin", label: "Admin" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  // Show different forms based on state
  if (creatingAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdminForm
            onSave={handleCreateAdmin}
            onCancel={() => setCreatingAdmin(false)}
            loading={loading}
            isEdit={false}
            currentUser={currentUser}
          />
        </div>
      </div>
    );
  }

  if (editingAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdminForm
            admin={editingAdmin}
            onSave={handleUpdateAdmin}
            onCancel={() => setEditingAdmin(null)}
            loading={loading}
            isEdit={true}
            currentUser={currentUser}
          />
        </div>
      </div>
    );
  }

  if (changingPassword) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ChangePassword
            onSave={handleChangePassword}
            onCancel={() => setChangingPassword(false)}
            loading={loading}
          />
        </div>
      </div>
    );
  }

  if (editingProfile) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Profile
            admin={currentUser}
            onSave={handleUpdateProfile}
            onCancel={() => setEditingProfile(false)}
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
              <p className="text-gray-500 text-sm">
                {currentUser?.role === "super-admin"
                  ? "Admin Manager"
                  : "My Profile"}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FaUserShield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {currentUser?.role === "super-admin"
                    ? "Admin Management"
                    : "My Account"}
                </h1>
                <div className="w-12 h-1 bg-blue-500 rounded-full mt-1"></div>
              </div>
            </div>
            <p className="text-gray-600">
              {currentUser?.role === "super-admin"
                ? "Manage admin users, their roles, and permissions."
                : "Manage your profile, security settings, and password."}
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

        {/* Personal Actions */}
        {currentUser && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Your Role</p>
                  <p className="text-2xl font-bold text-purple-600 capitalize">
                    {currentUser.role}
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <FaUserShield className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Last Login
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {currentUser.lastLogin
                      ? new Date(currentUser.lastLogin).toLocaleDateString()
                      : "Never"}
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FaCalendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Sessions
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {currentUser.activeSessions || 0}
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <FaUserCheck className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            {/* Search and Filters - Only for Super Admin */}
            {currentUser?.role === "super-admin" && (
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
                <div className="flex-1 sm:flex-none">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search admins..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex-1 sm:flex-none">
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {roleOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
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
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              <button
                onClick={() => setEditingProfile(true)}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
              >
                <FaUser className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
              <button
                onClick={() => setChangingPassword(true)}
                className="flex items-center space-x-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
              >
                <FaKey className="h-4 w-4" />
                <span>Change Password</span>
              </button>
              <button
                onClick={handleLogoutAll}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
              >
                <FaSignOutAlt className="h-4 w-4" />
                <span>Logout All</span>
              </button>
              {currentUser?.role === "super-admin" && (
                <button
                  onClick={() => setCreatingAdmin(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                >
                  <FaPlus className="h-4 w-4" />
                  <span>Create Admin</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Admins Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading admins...</p>
          </div>
        ) : filteredAdmins.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <FaUserShield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchTerm || roleFilter !== "all" || statusFilter !== "all"
                ? "No admins found"
                : currentUser?.role === "super-admin"
                ? "No admins yet"
                : "Your Profile"}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || roleFilter !== "all" || statusFilter !== "all"
                ? "Try adjusting your search or filter terms"
                : currentUser?.role === "super-admin"
                ? "Get started by creating the first admin"
                : "Manage your account settings and security"}
            </p>
            {!searchTerm &&
              roleFilter === "all" &&
              statusFilter === "all" &&
              currentUser?.role === "super-admin" && (
                <button
                  onClick={() => setCreatingAdmin(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Create First Admin
                </button>
              )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAdmins.map((admin) => (
              <AdminCard
                key={admin.id}
                admin={admin}
                onEdit={setEditingAdmin}
                onDelete={handleDeleteAdmin}
                onToggleStatus={handleToggleStatus}
                onView={handleViewAdmin}
                currentUser={currentUser}
              />
            ))}
          </div>
        )}

        {/* Summary - Only for Super Admin */}
        {currentUser?.role === "super-admin" && filteredAdmins.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {filteredAdmins.length}
                </div>
                <div className="text-sm text-gray-600">Showing Admins</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {
                    filteredAdmins.filter((a) => a.role === "super-admin")
                      .length
                  }
                </div>
                <div className="text-sm text-gray-600">Super Admins</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {filteredAdmins.filter((a) => a.isActive).length}
                </div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {filteredAdmins.filter((a) => !a.isActive).length}
                </div>
                <div className="text-sm text-gray-600">Inactive</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
