export default function validateStep1(data) {
  const errors = {};

  if (!data.address.trim()) errors.address = "Inserisci la via.";
  const zip = String(data.zipCode || "").trim();
  if (!zip) {
    errors.zipCode = "Inserisci il CAP.";
  } else if (!/^\d{5}$/.test(zip)) {
    errors.zipCode = "Inserisci un CAP valido (5 cifre).";
  }

  if (!data.city || !data.city.trim()) errors.city = "Inserisci la città.";
  if (!data.propertyType) errors.propertyType = "Scegli una tipologia.";
  if (!data.condition) errors.condition = "Seleziona lo stato dell'immobile.";
  if (!data.surfaceM2 || data.surfaceM2 <= 0)
    errors.surfaceM2 = "Inserisci i metri quadrati.";

  return { valid: Object.keys(errors).length === 0, errors };
}
