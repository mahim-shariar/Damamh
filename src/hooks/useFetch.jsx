import { useState, useEffect } from "react";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("adminToken");
      const refreshToken = localStorage.getItem("adminRefreshToken");

      const config = {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      };

      // Add authorization header if token exists
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}${url}`,
        config
      );

      // Handle token expiration - try to refresh
      if (response.status === 401 && !url.includes("/auth/refresh-token")) {
        const newTokens = await refreshAuthToken(refreshToken);
        if (newTokens) {
          // Retry original request with new token
          config.headers.Authorization = `Bearer ${newTokens.accessToken}`;
          const retryResponse = await fetch(
            `${
              import.meta.env.VITE_API_URL || "http://localhost:5000/api"
            }${url}`,
            config
          );
          return handleResponse(retryResponse);
        }
      }

      return handleResponse(response);
    } catch (err) {
      const errorMessage = err.message || "An error occurred";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const refreshAuthToken = async (refreshToken) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000/api"
        }/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("adminToken", data.data.accessToken);
        localStorage.setItem("adminRefreshToken", data.data.refreshToken);
        return data.data;
      } else {
        // Refresh token failed, logout user
        logout();
        return null;
      }
    } catch (error) {
      logout();
      return null;
    }
  };

  const handleResponse = async (response) => {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRefreshToken");
    localStorage.removeItem("adminData");
    window.location.href = "/admin/login";
  };

  // HTTP method helpers - Fixed: Remove base URL duplication
  const get = (url, options = {}) =>
    request(url, {
      ...options,
      method: "GET",
    });

  const post = (url, data, options = {}) =>
    request(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });

  const put = (url, data, options = {}) =>
    request(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });

  const patch = (url, data, options = {}) =>
    request(url, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    });

  const del = (url, options = {}) =>
    request(url, {
      ...options,
      method: "DELETE",
    });

  return {
    loading,
    error,
    get,
    post,
    put,
    patch,
    del,
    request,
  };
};

export default useFetch;
