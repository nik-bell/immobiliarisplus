// src/api/api.js

const API_BASE_URL = "http://127.0.0.1:8081/api";

/* ------------------------ GET: elenco proprietà ------------------------ */
export async function getProperties() {
  try {
    const response = await fetch(`${API_BASE_URL}/properties`);
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
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(valuationData)
    });

    if (!response.ok) throw new Error("Errore nella creazione della valutazione");
    return await response.json();
  } catch (error) {
    console.error("createValuation ERROR:", error);
    return null;
  }
}
