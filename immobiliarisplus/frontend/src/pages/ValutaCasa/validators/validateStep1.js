export default function validateStep1(data) {
  const errors = {};

  if (!data.address.trim()) errors.address = "Inserisci l'indirizzo'.";
  if (!data.propertyType) errors.propertyType = "Scegli una tipologia.";
  if (!data.condition) errors.condition = "Seleziona lo stato dell'immobile.";
  if (!data.sizeMq || data.sizeMq <= 0)
    errors.sizeMq = "Inserisci la superficie.";

  return { valid: Object.keys(errors).length === 0, errors };
}
