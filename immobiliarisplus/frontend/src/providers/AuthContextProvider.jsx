/**
 * @file AuthContextProvider.jsx
 * @description Authentication context provider.
 *
 * Restores sessions from storage, exposes `login` and `logout` helpers, and
 * provides the auth value (user, isLoggedIn, userType) to the app.
 *
 * @module providers/AuthContextProvider
 */

import { useState, useEffect } from "react";
import { AuthContext } from "../store/AuthContext";
import { clearAuthToken, getPersistedAuthToken, setAuthToken } from "../api/api";

/**
 * AuthContextProvider component.
 *
 * Wrap your app with this provider to make authentication state available
 * via the `useAuth` hook.
 *
 * @param {{children: React.ReactNode}} props - Provider props
 * @returns {JSX.Element} Auth context provider
 */
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on mount if token exists in sessionStorage
  useEffect(() => {
    const token = getPersistedAuthToken();
    if (token) {
      setAuthToken(token);
      // Retrieve user from sessionStorage if available
      const storedUser = sessionStorage.getItem("auth_user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse stored user", e);
        }
      }
    }
    setLoading(false);
  }, []);

  /**
   * Logs the user in and persists user data in sessionStorage.
   * @param {Object} userData - Authenticated user data (name, type, email, ...)
   */
  const login = (userData) => {
    setUser(userData); // userData = { name, type, email, etc... }
    // Persist user data to sessionStorage
    if (typeof window !== "undefined" && window.sessionStorage) {
      sessionStorage.setItem("auth_user", JSON.stringify(userData));
    }
  };

  /**
   * Logs the user out, clears token and removes persisted user data.
   */
  const logout = () => {
    setUser(null);
    clearAuthToken();
    if (typeof window !== "undefined" && window.sessionStorage) {
      sessionStorage.removeItem("auth_user");
    }
  };

  const value = {
    user,
    isLoggedIn: !!user,
    userType: user?.type || null,
    login,
    logout,
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Caricamento...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
