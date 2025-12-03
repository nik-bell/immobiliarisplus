/**
 * @file useValutaCasaForm.js
 * @description Hook to access the valuation form context (state + actions).
 */
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
  /**
   * Returns the form context, including current state and helpers
   * such as nextStep, prevStep, submitForm, dispatch, loading, and error.
   * @returns {import('../../store/FormContext').FormContextValue}
   */
  return useContext(FormContext);
}
