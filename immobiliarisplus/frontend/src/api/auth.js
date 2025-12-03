/**
 * @file auth.js
 * @description Authentication API functions.
 * 
 * Provides core authentication operations including login, token management,
 * and session persistence.
 * 
 * @module api/auth
 */

import { request, setAuthToken as _setAuthToken, clearAuthToken as _clearAuthToken, getPersistedAuthToken } from "./request";

/**
 * Authenticates a user with the provided credentials.
 * 
 * @async
 * @param {Object} credentials - User login credentials
 * @param {string} credentials.email - User email address
 * @param {string} credentials.password - User password
 * @returns {Promise<Object|null>} Authentication response with token and user data, or null on failure
 */
export async function login(credentials) {
  const res = await request("/auth/login", { method: "POST", body: credentials });
  if (res.ok) {
    // expected server payload: { token, user }
    return res.data;
  }
  return null;
}

/**
 * Sets the authentication token for API requests.
 * 
 * @param {string} token - JWT authentication token
 */
export function setAuthToken(token) {
  _setAuthToken(token);
}

/**
 * Clears the authentication token from memory and storage.
 */
export function clearAuthToken() {
  _clearAuthToken();
}

export { getPersistedAuthToken };
