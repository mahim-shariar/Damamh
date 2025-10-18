import React, { createContext, useState, useContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { post, loading, error } = useFetch();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const adminData = localStorage.getItem("adminData");

    if (token && adminData) {
      setAdmin(JSON.parse(adminData));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await post("/auth/login", { email, password });

      if (response.success) {
        const { admin: adminData, accessToken, refreshToken } = response.data;

        localStorage.setItem("adminToken", accessToken);
        localStorage.setItem("adminRefreshToken", refreshToken);
        localStorage.setItem("adminData", JSON.stringify(adminData));

        setAdmin(adminData);
        setIsAuthenticated(true);

        return { success: true, data: adminData };
      }
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (token) {
        await post(
          "/auth/logout",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminRefreshToken");
      localStorage.removeItem("adminData");
      setAdmin(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    admin,
    isAuthenticated,
    login,
    logout,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
