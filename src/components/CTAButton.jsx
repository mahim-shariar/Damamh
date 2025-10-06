import React from "react";

const CTAButton = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseClasses =
    "font-bold rounded-full hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center space-x-2";

  const variants = {
    primary: "bg-gradient-to-r from-green-600 to-islamic-green text-white",
    secondary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
    outline: "border-2 border-purple-600 text-purple-700 hover:bg-purple-50",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CTAButton;
