// src/api/api.js

const API_BASE_URL = "http://127.0.0.1:8081/api";

// module-scoped auth token (set by caller)
let authToken = null;
export function setAuthToken(token) {
  authToken = token;
}

export function clearAuthToken() {
  authToken = null;
}

function authHeaders(extra = {}) {
  const headers = { ...extra };
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
  return headers;
}

/* ------------------------ GET: elenco proprietà ------------------------ */
export async function getProperties() {
  try {
    const response = await fetch(`${API_BASE_URL}/properties`, {
      headers: authHeaders(),
    });
    if (!response.ok) throw new Error("Errore nel recupero delle proprietà");
    return await response.json();
  } catch (error) {
    console.error("getProperties ERROR:", error);
    return null;
  }
}

/* ------------------------ POST: crea una valuation ------------------------ */
export async function createValuation(valuationData) {
  try {
    const response = await fetch(`${API_BASE_URL}/valuations/calculate`, {
      method: "POST",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(valuationData),
    });

    if (!response.ok) {
      // try to read JSON error body, fallback to text
      let bodyText = null;
      try {
        const json = await response.json();
        bodyText = JSON.stringify(json);
      } catch (e) {
        try {
          bodyText = await response.text();
        } catch (__) {
          bodyText = null;
        }
      }
      const msg = `Errore nella creazione della valutazione: ${response.status} ${response.statusText}${bodyText ? " - " + bodyText : ""}`;
      console.error("createValuation ERROR:", msg, "payload:", valuationData);
      throw new Error(msg);
    }

    return await response.json();
  } catch (error) {
    console.error("createValuation ERROR:", error);
    return null;
  }
}

/* ------------------------ POST: login ------------------------ */
export async function login(credentials) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Login failed: ${response.status} ${text}`);
    }

    return await response.json();
  } catch (error) {
    console.error("login ERROR:", error);
    return null;
  }
}
