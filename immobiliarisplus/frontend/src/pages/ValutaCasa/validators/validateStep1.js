import allowedCaps from '../../../data/allowedCaps';

/**
 * Validate step 1 of the property valuation form.
 *
 * Checks required fields such as address, property type, condition,
 * surface area, and ensures the ZIP code (CAP) is included in the
 * allowed list.
 *
 * @param {Object} data - Form data for step 1.
 * @param {string} data.address - Full property address.
 * @param {string|number} data.zipCode - CAP entered by the user.
 * @param {string} data.city - City name (optional at this step).
 * @param {string} data.propertyType - Selected property type.
 * @param {string} data.condition - Selected property condition.
 * @param {number|string} data.sizeMq - Surface area in square meters.
 *
 * @returns {{ valid: boolean, errors: Object }} Validation result.
 * - `valid` indicates whether the data is correct.
 * - `errors` contains field-specific error messages.
 */
export default function validateStep1(data) {
  const errors = {};

  if (!data.address || !data.address.trim()) errors.address = "Inserisci l'indirizzo.";
  if (!data.propertyType) errors.propertyType = "Scegli una tipologia.";
  if (!data.condition) errors.condition = "Seleziona lo stato dell'immobile.";
  if (!data.sizeMq || data.sizeMq <= 0) errors.sizeMq = "Inserisci la superficie.";

  // CAP must be one of allowedCaps
  const capVal = data.zipCode ? String(data.zipCode).trim() : "";
  const capAllowed = capVal && allowedCaps.some((c) => String(c.cap) === capVal);
  if (!capAllowed) errors.zipCode = "Inserisci un CAP valido.";

  return { valid: Object.keys(errors).length === 0, errors };
}
