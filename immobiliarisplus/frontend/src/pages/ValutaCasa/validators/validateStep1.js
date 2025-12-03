/**
 * @file validateStep1.js
 * @description Validation for step 1 (address and basic property data).
 */
import allowedCaps from '../../../data/allowedCaps';

export default function validateStep1(data) {
  /**
   * Validates step 1 fields and returns a validity flag with error messages.
   * @param {{
   *   address?: string,
   *   propertyType?: string,
   *   condition?: string,
   *   sizeMq?: number,
   *   zipCode?: string|number
   * }} data
   * @returns {{valid: boolean, errors: Record<string,string>}}
   */
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
