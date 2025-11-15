export default function validateStep2(data) {
  const errors = {};

  if (!data.rooms || data.rooms <= 0)
    errors.rooms = "Inserisci il numero di camere.";

  if (!data.bathrooms || data.bathrooms <= 0)
    errors.bathrooms = "Inserisci il numero di bagni.";

  if (data.floor === "") errors.floor = "Inserisci il piano.";

  return { valid: Object.keys(errors).length === 0, errors };
}
