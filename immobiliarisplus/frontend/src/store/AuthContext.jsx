/**
 * @file AuthContext.jsx
 * @description Authentication context and hook.
 *
 * Exposes the authentication context and a convenience hook `useAuth` that
 * throws if used outside of `AuthContextProvider`.
 *
 * @module store/AuthContext
 */

import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

/**
 * Accessor hook for the authentication context.
 *
 * @throws {Error} If used outside of an `AuthContextProvider`
 * @returns {{
 *  user: (Object|null),
 *  isLoggedIn: boolean,
 *  userType: (string|null),
 *  login: (userData: Object) => void,
 *  logout: () => void
 * }} Auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth deve essere usato all'interno di un AuthContextProvider"
    );
  }
  return context;
};
