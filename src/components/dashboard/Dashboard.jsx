import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const dashboardCards = [
    {
      id: 1,
      title: "Website Content",
      description: "Manage your website pages, banners, and content",
      icon: "📝",
      path: "/dashboard/website-content",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      id: 2,
      title: "Product Management",
      description: "Add, edit, and manage your products",
      icon: "📦",
      path: "/dashboard/products",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      id: 3,
      title: "Order Management",
      description: "View and process customer orders",
      icon: "🛒",
      path: "/dashboard/orders",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      id: 4,
      title: "Review Management",
      description: "Manage customer reviews and ratings",
      icon: "⭐",
      path: "/dashboard/reviews",
      color: "bg-yellow-500 hover:bg-yellow-600",
    },
    {
      id: 5,
      title: "FAQ Management",
      description: "Manage frequently asked questions",
      icon: "❓",
      path: "/dashboard/faqs",
      color: "bg-red-500 hover:bg-red-600",
    },
    {
      id: 6,
      title: "User Management",
      description: "Manage users and their permissions",
      icon: "👥",
      path: "/dashboard/users",
      color: "bg-indigo-500 hover:bg-indigo-600",
    },
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Manage your website content and operations
            </p>
          </div>
          <button
            onClick={handleBackToHome}
            className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
          >
            <span>←</span>
            <span>Back to Home</span>
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.path)}
              className={`${card.color} text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left`}
            >
              <div className="flex items-start space-x-4">
                <span className="text-3xl">{card.icon}</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                  <p className="text-white/90 text-sm">{card.description}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <span className="text-white/80 text-sm">Click to manage →</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
