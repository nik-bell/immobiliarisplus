/**
 * @file authService.js
 * @description Authentication service layer.
 * 
 * Centralizes login side-effects including API calls and token persistence.
 * This service acts as a facade to coordinate authentication operations.
 * 
 * @module api/authService
 */

import { login as apiLogin } from "./auth";
import { setAuthToken } from "./request";

/**
 * Performs user login with side-effects (API call + token persistence).
 * 
 * This function centralizes the login flow by calling the login API and
 * automatically storing the returned token for subsequent requests.
 * 
 * @async
 * @param {Object} credentials - User login credentials
 * @param {string} credentials.email - User email address
 * @param {string} credentials.password - User password
 * @returns {Promise<Object|null>} Authentication response with token and user data, or null on failure
 */
export async function performLogin(credentials) {
  const resp = await apiLogin(credentials);
  if (!resp) return null;
  if (resp.token) {
    setAuthToken(resp.token);
  }
  return resp;
}

export default { performLogin };
