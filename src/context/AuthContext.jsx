import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize user from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        
        if (storedUser && token) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (err) {
        console.error("Error initializing auth:", err);
        // Clear invalid data
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setError("Failed to restore session");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (data) => {
    try {
      if (!data.token || !data.user) {
        throw new Error("Invalid login data");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user || data));
      setUser(data.user || data);
      setError(null);
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to login");
      throw err;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setError(null);
    } catch (err) {
      console.error("Logout error:", err);
      setError("Failed to logout");
    }
  };

  const clearError = () => {
    setError(null);
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === "admin";
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem("token");
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    clearError,
    isAdmin,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};