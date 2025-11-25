// src/api/api.js

const API_BASE_URL = "http://127.0.0.1:8081/api";

// module-scoped auth token (set by caller)
let authToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBpbW1vYmlsaWFyaXMuY29tIiwiaWF0IjoxNzY0MDgzNDEyLCJleHAiOjE3NjQxNjk4MTJ9.F_rfmK9pH083XxhR-g1oUW3T_Dxc5wBKWrglLjyHu3A";

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

    if (!response.ok) throw new Error("Errore nella creazione della valutazione");
    return await response.json();
  } catch (error) {
    console.error("createValuation ERROR:", error);
    return null;
  }
}
