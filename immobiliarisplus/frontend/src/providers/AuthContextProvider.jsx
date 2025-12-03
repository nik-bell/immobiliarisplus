import { useState, useEffect } from "react";
import { AuthContext } from "../store/AuthContext";
import { clearAuthToken, getPersistedAuthToken, setAuthToken } from "../api/api";

/**
 * AuthContextProvider
 *
 * Provides authentication state and actions (login, logout) to the entire app.
 * Automatically restores session from sessionStorage if a token is found.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components wrapped by the provider.
 * @returns {JSX.Element} Provider with authentication context.
 */
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Restore session on mount.
   * Loads token and user info from sessionStorage if available.
   */
  useEffect(() => {
    const token = getPersistedAuthToken();
    if (token) {
      setAuthToken(token);

      // Retrieve user from storage
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
   * Logs the user in and persists information in sessionStorage.
   *
   * @param {Object} userData - User info (name, type, email, ...)
   */
  const login = (userData) => {
    setUser(userData);
    if (typeof window !== "undefined" && window.sessionStorage) {
      sessionStorage.setItem("auth_user", JSON.stringify(userData));
    }
  };

  /**
   * Logs the user out, clears session data and tokens.
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        Caricamento...
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
