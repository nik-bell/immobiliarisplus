import { useContext } from "react";
import FormContext from "../../store/FormContext";

/**
 * Custom hook: useValutaCasaForm
 *
 * Provides access to the global form state and form actions
 * used in the "Valuta Casa" multi-step form.
 *
 * @returns {Object} The form context value (state, actions, errors, etc.)
 */
export default function useValutaCasaForm() {
  return useContext(FormContext);
}
