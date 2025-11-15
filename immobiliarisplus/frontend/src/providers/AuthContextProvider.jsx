import { useState } from "react";
import { AuthContext } from "../store/AuthContext";

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
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
