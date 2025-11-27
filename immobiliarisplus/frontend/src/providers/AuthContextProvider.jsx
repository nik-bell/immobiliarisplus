import { useState } from "react";
import { AuthContext } from "../store/AuthContext";
import { clearAuthToken } from "../api/api";

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData); // userData = { name, type, email, etc... }
  };

  const logout = () => {
    setUser(null);
    clearAuthToken();
  };

  const value = {
    user,
    isLoggedIn: !!user,
    userType: user?.type || null,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
