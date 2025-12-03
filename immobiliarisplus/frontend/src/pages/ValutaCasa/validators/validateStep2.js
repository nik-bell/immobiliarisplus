export default function validateStep2(data) {
  /**
   * Validates step 2 fields and returns a validity flag with error messages.
   * @param {{rooms?: number, bathrooms?: number, floor?: number|string}} data
   * @returns {{valid: boolean, errors: Record<string,string>}}
   */
  const errors = {};

  if (!data.rooms || data.rooms <= 0)
    errors.rooms = "Inserisci il numero di camere.";

  if (!data.bathrooms || data.bathrooms <= 0)
    errors.bathrooms = "Inserisci il numero di bagni.";

  if (data.floor === "") errors.floor = "Inserisci il piano.";

  return { valid: Object.keys(errors).length === 0, errors };
}
