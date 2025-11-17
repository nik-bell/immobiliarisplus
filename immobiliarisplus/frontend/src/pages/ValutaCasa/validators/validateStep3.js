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
