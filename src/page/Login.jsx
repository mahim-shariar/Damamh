// components/Login.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
  FiAlertCircle,
  FiCheckCircle,
  FiHome,
  FiLogIn,
  FiHelpCircle,
  FiKey,
  FiArrowLeft,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);

  // Reset password states
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetStep, setResetStep] = useState(1); // 1: Email, 2: Security Question, 3: New Password
  const [resetData, setResetData] = useState({
    email: "",
    securityAnswer: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const { login, loading, error, isAuthenticated, user } = useAuth();
  const { get, post } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      setIsAlreadyLoggedIn(true);
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.email || !formData.password) {
      setFormError("Please fill in all fields");
      return;
    }

    const result = await login(formData.email, formData.password);

    if (!result.success) {
      setFormError(result.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (formError) setFormError("");
  };

  const handleResetChange = (e) => {
    setResetData({
      ...resetData,
      [e.target.name]: e.target.value,
    });
    if (resetError) setResetError("");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  // Reset Password Flow
  const handleForgotPassword = () => {
    setShowResetPassword(true);
    setResetStep(1);
    setResetData({
      email: "",
      securityAnswer: "",
      newPassword: "",
      confirmPassword: "",
    });
    setSecurityQuestion("");
    setResetError("");
    setResetSuccess("");
  };

  const handleBackToLogin = () => {
    setShowResetPassword(false);
    setResetStep(1);
    setResetError("");
    setResetSuccess("");
  };

  const handleGetSecurityQuestion = async () => {
    if (!resetData.email) {
      setResetError("Please enter your email address");
      return;
    }

    setResetLoading(true);
    setResetError("");

    try {
      const response = await get(`/auth/security-question/${resetData.email}`);

      if (response.success) {
        setSecurityQuestion(response.data.securityQuestion);
        setResetStep(2);
        setResetSuccess("Security question retrieved successfully");
      } else {
        setResetError(response.message || "Failed to get security question");
      }
    } catch (error) {
      setResetError(
        "Failed to retrieve security question. Please check your email."
      );
    } finally {
      setResetLoading(false);
    }
  };

  const handleVerifySecurityAnswer = async () => {
    if (!resetData.securityAnswer) {
      setResetError("Please answer the security question");
      return;
    }

    setResetLoading(true);
    setResetError("");

    try {
      // We'll verify the answer when submitting the new password
      setResetStep(3);
      setResetSuccess(
        "Security answer accepted. Please set your new password."
      );
    } catch (error) {
      setResetError("Failed to verify security answer");
    } finally {
      setResetLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetData.newPassword || !resetData.confirmPassword) {
      setResetError("Please fill in all password fields");
      return;
    }

    if (resetData.newPassword !== resetData.confirmPassword) {
      setResetError("Passwords do not match");
      return;
    }

    if (resetData.newPassword.length < 6) {
      setResetError("Password must be at least 6 characters long");
      return;
    }

    setResetLoading(true);
    setResetError("");

    try {
      const response = await post("/auth/reset-password", {
        email: resetData.email,
        securityAnswer: resetData.securityAnswer,
        newPassword: resetData.newPassword,
      });

      if (response.success) {
        setResetSuccess(
          "Password reset successfully! You can now login with your new password."
        );
        setTimeout(() => {
          setShowResetPassword(false);
          setResetStep(1);
          setResetData({
            email: "",
            securityAnswer: "",
            newPassword: "",
            confirmPassword: "",
          });
        }, 3000);
      } else {
        setResetError(response.message || "Failed to reset password");
      }
    } catch (error) {
      setResetError(
        "Failed to reset password. Please check your security answer."
      );
    } finally {
      setResetLoading(false);
    }
  };

  // If user is already logged in
  if (isAlreadyLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-40"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-40"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-md"
        >
          {/* Success Container */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <FiCheckCircle className="text-white text-2xl" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-gray-900 mb-2"
              >
                Already Logged In
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 text-sm"
              >
                You are already signed in to your account
              </motion.p>
            </div>

            {/* User Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-blue-50 rounded-xl p-4 mb-6 text-center"
            >
              <p className="text-blue-800 font-medium">
                Welcome back, {user?.name || user?.email || "User"}!
              </p>
              <p className="text-blue-600 text-sm mt-1">
                You are currently logged in as {user?.role || "admin"}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <button
                onClick={handleGoToDashboard}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center"
              >
                <FiLogIn className="mr-2" />
                Go to Dashboard
              </button>

              <button
                onClick={handleGoHome}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center"
              >
                <FiHome className="mr-2" />
                Back to Home
              </button>
            </motion.div>

            {/* Security Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg text-center"
            >
              <p className="text-xs text-green-700">
                ✅ You are securely logged in. Your session is active.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Reset Password Flow
  if (showResetPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-40"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-40"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-md"
        >
          {/* Reset Password Container */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <FiKey className="text-white text-2xl" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-gray-900 mb-2"
              >
                Reset Password
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 text-sm"
              >
                {resetStep === 1 && "Enter your email to get started"}
                {resetStep === 2 && "Answer your security question"}
                {resetStep === 3 && "Set your new password"}
              </motion.p>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        resetStep >= step
                          ? "bg-blue-600 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {step}
                    </div>
                    {step < 3 && (
                      <div
                        className={`w-8 h-1 ${
                          resetStep > step ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {resetError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2"
              >
                <FiAlertCircle className="text-red-500 flex-shrink-0" />
                <span className="text-red-700 text-sm">{resetError}</span>
              </motion.div>
            )}

            {/* Success Message */}
            {resetSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-2"
              >
                <FiCheckCircle className="text-green-500 flex-shrink-0" />
                <span className="text-green-700 text-sm">{resetSuccess}</span>
              </motion.div>
            )}

            {/* Step 1: Email */}
            {resetStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                      type="email"
                      name="email"
                      value={resetData.email}
                      onChange={handleResetChange}
                      placeholder="admin@example.com"
                      className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                      disabled={resetLoading}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleGetSecurityQuestion}
                    disabled={resetLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                  >
                    {resetLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Checking...
                      </>
                    ) : (
                      "Continue"
                    )}
                  </button>

                  <button
                    onClick={handleBackToLogin}
                    className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center"
                  >
                    <FiArrowLeft className="mr-2" />
                    Back to Login
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Security Question */}
            {resetStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <FiHelpCircle className="text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">
                      Security Question
                    </span>
                  </div>
                  <p className="text-blue-700">{securityQuestion}</p>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Answer
                  </label>
                  <div className="relative">
                    <FiShield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                      type="text"
                      name="securityAnswer"
                      value={resetData.securityAnswer}
                      onChange={handleResetChange}
                      placeholder="Enter your answer"
                      className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                      disabled={resetLoading}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleVerifySecurityAnswer}
                    disabled={resetLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                  >
                    {resetLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Verifying...
                      </>
                    ) : (
                      "Verify Answer"
                    )}
                  </button>

                  <button
                    onClick={() => setResetStep(1)}
                    className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center"
                  >
                    <FiArrowLeft className="mr-2" />
                    Back
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: New Password */}
            {resetStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                      type="password"
                      name="newPassword"
                      value={resetData.newPassword}
                      onChange={handleResetChange}
                      placeholder="Enter new password"
                      className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                      disabled={resetLoading}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={resetData.confirmPassword}
                      onChange={handleResetChange}
                      placeholder="Confirm new password"
                      className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                      disabled={resetLoading}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleResetPassword}
                    disabled={resetLoading}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                  >
                    {resetLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Resetting...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </button>

                  <button
                    onClick={() => setResetStep(2)}
                    className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center"
                  >
                    <FiArrowLeft className="mr-2" />
                    Back
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // Original login form
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-40"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-40"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <FiShield className="text-white text-2xl" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-gray-900 mb-2"
            >
              Admin Login
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 text-sm"
            >
              Access the admin dashboard
            </motion.p>
          </div>

          {/* Error Message */}
          {(formError || error) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2"
            >
              <FiAlertCircle className="text-red-500 flex-shrink-0" />
              <span className="text-red-700 text-sm">{formError || error}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  required
                  disabled={loading}
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 disabled:opacity-50"
                >
                  {showPassword ? (
                    <FiEyeOff className="text-lg" />
                  ) : (
                    <FiEye className="text-lg" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  disabled={loading}
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 disabled:opacity-50"
                disabled={loading}
              >
                Forgot password?
              </button>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          {/* Back to Home Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6"
          >
            <button
              onClick={handleGoHome}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center"
            >
              <FiHome className="mr-2" />
              Back to Home
            </button>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center"
          >
            <p className="text-xs text-yellow-700">
              🔒 Restricted access. Authorized personnel only.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
