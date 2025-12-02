const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api";

// module-scoped auth token (set by caller)
let authToken = null;

// token is stored in-module only (not persisted) for improved security
// authToken remains null until setAuthToken is called at runtime

export function setAuthToken(token) {
  // Keep token in module memory only (do not persist to localStorage)
  authToken = token;
}

export function clearAuthToken() {
  authToken = null;
}

export function getPersistedAuthToken() {
  // no persistence: always return null
  return null;
}

function authHeaders(extra = {}) {
  const headers = { ...extra };
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
  return headers;
}

// request helper: returns { ok, status, data, error }
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
      } catch (__) {}
      const err = { status, statusText: response.statusText, body: errBody };
      console.error("request ERROR:", url, err);
      return { ok: false, status, error: err };
    }

    if (!expectJson || status === 204) return { ok: true, status, data: null };
    const data = await response.json();
    return { ok: true, status, data };
  } catch (error) {
    console.error("request EXCEPTION:", url, error);
    return { ok: false, status: 0, error };
  }
}

export { API_BASE_URL };
