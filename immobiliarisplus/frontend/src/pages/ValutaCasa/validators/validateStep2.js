/**
 * Validate step 2 of the property valuation form.
 *
 * Checks basic structural details of the property such as
 * number of rooms, number of bathrooms, and floor.
 *
 * @param {Object} data - Form data for step 2.
 * @param {number|string} data.rooms - Number of rooms.
 * @param {number|string} data.bathrooms - Number of bathrooms.
 * @param {number|string} data.floor - Floor number.
 *
 * @returns {{ valid: boolean, errors: Object }} Validation result.
 * - `valid` true if all required fields are correctly filled.
 * - `errors` contains validation messages for incorrect fields.
 */
export default function validateStep2(data) {
  const errors = {};

  if (!data.rooms || data.rooms <= 0)
    errors.rooms = "Inserisci il numero di camere.";

  if (!data.bathrooms || data.bathrooms <= 0)
    errors.bathrooms = "Inserisci il numero di bagni.";

  if (data.floor === "") errors.floor = "Inserisci il piano.";

  return { valid: Object.keys(errors).length === 0, errors };
}
