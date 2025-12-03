/**
 * @file useValutaCasaForm.js
 * @description Hook to access the valuation form context (state + actions).
 */
import { useContext } from "react";
import FormContext from "../../store/FormContext";

export default function useValutaCasaForm() {
  /**
   * Returns the form context, including current state and helpers
   * such as nextStep, prevStep, submitForm, dispatch, loading, and error.
   * @returns {import('../../store/FormContext').FormContextValue}
   */
  return useContext(FormContext);
}
