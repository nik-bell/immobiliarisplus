/**
 * @file request.js
 * @description HTTP request utility with authentication.
 * 
 * Provides a centralized request function with automatic auth token injection,
 * session storage persistence, and standardized error handling.
 * 
 * @module api/request
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api";

const TOKEN_KEY = "auth_token";

/** @type {string|null} Module-scoped auth token (set by caller) */
let authToken = null;

// Initialize token from sessionStorage if available
if (typeof window !== "undefined" && window.sessionStorage) {
  const stored = sessionStorage.getItem(TOKEN_KEY);
  if (stored) authToken = stored;
}

/**
 * Sets the authentication token in memory and sessionStorage.
 * 
 * @param {string|null} token - JWT authentication token, or null to clear
 */
export function setAuthToken(token) {
  authToken = token;
  if (typeof window !== "undefined" && window.sessionStorage) {
    if (token) {
      sessionStorage.setItem(TOKEN_KEY, token);
    } else {
      sessionStorage.removeItem(TOKEN_KEY);
    }
  }
}

/**
 * Clears the authentication token from memory and sessionStorage.
 */
export function clearAuthToken() {
  authToken = null;
  if (typeof window !== "undefined" && window.sessionStorage) {
    sessionStorage.removeItem(TOKEN_KEY);
  }
}

/**
 * Retrieves the persisted authentication token from sessionStorage.
 * 
 * @returns {string|null} The stored auth token, or null if not found
 */
export function getPersistedAuthToken() {
  if (typeof window !== "undefined" && window.sessionStorage) {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  return null;
}

/**
 * Builds HTTP headers with automatic Authorization injection.
 * 
 * @private
 * @param {Object} extra - Additional headers to include
 * @returns {Object} Headers object with Authorization if token exists
 */
function authHeaders(extra = {}) {
  const headers = { ...extra };
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
  return headers;
}

/**
 * Makes an authenticated HTTP request to the API.
 * 
 * @async
 * @param {string} path - API endpoint path (relative to API_BASE_URL)
 * @param {Object} options - Request options
 * @param {string} [options.method="GET"] - HTTP method
 * @param {Object|string} [options.body] - Request body (auto-serialized to JSON if object)
 * @param {Object} [options.headers={}] - Additional headers
 * @param {boolean} [options.expectJson=true] - Whether to parse response as JSON
 * @param {AbortSignal} [options.signal] - AbortSignal for request cancellation
 * @returns {Promise<Object>} Response object: { ok: boolean, status: number, data?: any, error?: any }
 */
export async function request(path, { method = "GET", body, headers = {}, expectJson = true, signal } = {}) {
  const url = `${API_BASE_URL}${path}`;
  const opts = { method, headers: authHeaders(headers) };
  if (body !== undefined) {
    opts.body = typeof body === "string" ? body : JSON.stringify(body);
    opts.headers = { "Content-Type": "application/json", ...opts.headers };
  }

  try {
    const response = await fetch(url, { ...opts, signal });
    const status = response.status;
    if (!response.ok) {
      let errBody = null;
      try {
        errBody = await response.text();
      } catch (parseError) {
        // Failed to parse error body, continue with null
      }
      const err = { status, statusText: response.statusText, body: errBody };
      return { ok: false, status, error: err };
    }

    if (!expectJson || status === 204) return { ok: true, status, data: null };
    const data = await response.json();
    return { ok: true, status, data };
  } catch (error) {
    return { ok: false, status: 0, error };
  }
}

export { API_BASE_URL };
