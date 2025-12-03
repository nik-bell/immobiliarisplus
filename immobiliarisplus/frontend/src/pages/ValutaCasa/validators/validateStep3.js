/**
 * Validate step 3 of the property valuation form.
 *
 * Ensures user contact information is correctly provided,
 * including name, surname, email, phone number, and privacy consent.
 *
 * @param {Object} data - Contact information provided in step 3.
 * @param {string} data.name - User's first name.
 * @param {string} data.surname - User's last name.
 * @param {string} data.email - User's email address.
 * @param {string} data.phone - User's phone number.
 * @param {boolean} data.privacyAccepted - Whether privacy terms were accepted.
 *
 * @returns {{ valid: boolean, errors: Object }} Validation result.
 * - `valid` true if all fields pass validation.
 * - `errors` contains validation messages for invalid fields.
 */
export default function validateStep3(data) {
  const errors = {};

  if (!data.name.trim()) errors.name = "Inserisci il nome.";
  if (!data.surname.trim()) errors.surname = "Inserisci il cognome.";

  if (!data.email.includes("@")) errors.email = "Email non valida.";

  if (!data.phone.trim()) errors.phone = "Inserisci un numero di telefono.";

  if (!data.privacyAccepted)
    errors.privacyAccepted = "Devi accettare la privacy.";

  return { valid: Object.keys(errors).length === 0, errors };
}
